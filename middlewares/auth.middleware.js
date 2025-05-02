// src/middlewares/auth.middleware.js
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const conexion = require('../config/db');

const authMiddleware = {
  isAuthenticated: async (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) return res.redirect('/login');

    try {
      const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRETO);

      conexion.query('CALL BuscarUser(?)', [decoded.Id], (err, results) => {
        if (err) {
          console.error('Error al buscar usuario:', err);
          return res.redirect('/login');
        }

        if (!results[0] || results[0].length === 0) {
          console.log('Usuario no encontrado');
          return res.redirect('/login');
        }

        const usuario = results[0][0];
        req.user = {
          Usuario: usuario.Usuario,
          NombreUsuario: usuario.Nombre,
          Id_Persona: usuario.Id_Persona,
          Rol: decoded.rol
        };

        next();
      });
    } catch (error) {
      console.log('Error al verificar token JWT:', error);
      res.redirect('/login');
    }
  },

  isGerente: (req, res, next) => {
    if (req.user?.Rol === 'Gerente') {
      return next();
    }

    res.cookie('errorMessage', 'Solo los gerentes pueden acceder a esta ruta', { httpOnly: true });
    res.redirect('/inicio');
  }
};

module.exports = authMiddleware;
