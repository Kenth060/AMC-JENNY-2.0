const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const conexion = require('../config/db');

const AuthService = 
{
  async login(user, pass) 
  {
    try 
    {
      const [results] = await conexion.promise().query( 'SELECT * FROM usuarios WHERE usuario = ?', [user] );

      if (results.length === 0) 
      { return { success: false, message: 'Usuario no encontrado' }; }

      const usuario = results[0];
      const passwordValida = await bcryptjs.compare(pass, usuario.Contraseña);

      if (!passwordValida) 
      { return { success: false, message: 'Contraseña incorrecta' }; }

      const token = jwt.sign
      (
        { Id: usuario.Id_Persona, rol: usuario.Rol },
        process.env.JWT_SECRETO, 
        { expiresIn: process.env.JWT_EXPIRES_TIME }
      );

      const cookieOptions = 
      {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
        httpOnly: true
      };

      return {success: true, token, cookieOptions};

    } catch (error) 
    {
      console.error('Error en AuthService.login:', error);
      throw error;
    }
  },

  async obtenerColaboradorPorCedula(cedula) 
  {
    const [rows] = await conexion.promise().query( `SELECT P.Id_Persona, CONCAT(P.Nombre, ' ', P.Apellido) AS 'Nombre', P.Tipo_Persona FROM persona P WHERE Cedula = ?`, [cedula]);
    return rows;
  },

  async registrarUsuario(data) 
  {
    const Id_Persona = data.ColabName;
    const user = data.ColabUser;
    const Rol = data.ColabRol;
    const Pass = data.ColabPass;
    const passHash = await bcryptjs.hash(Pass, 8);

    await conexion.promise().query('CALL AddUser(?,?,?,?)', [user,passHash,Rol,Id_Persona]);
  }
};

module.exports = AuthService;
