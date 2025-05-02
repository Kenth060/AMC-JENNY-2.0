const conexion = require('../config/db');

const HomeService = 
{
  async cargarEstadisticas(user) 
  {
    const isGerente = user.Rol === 'Gerente';
    const Id_Persona = user.Id_Persona;

    await conexion.promise().query(`SET lc_time_names = 'es_ES';`);

    const [
      VentaContado,
      VentaCredito,
      Ingresos,
      ProductosAct,
      No_Clientes,
      Ventas,
      Egresos,
      Vendedores
    ] = await Promise.all([
      obtenerVentasContado(isGerente, Id_Persona),
      obtenerVentasCredito(isGerente, Id_Persona),
      obtenerIngresos(isGerente, Id_Persona),
      querySimple(`SELECT COUNT(Id_Producto) AS Total FROM productos WHERE Estado_Producto = 'Activo'`),
      querySimple(`SELECT COUNT(Id_Persona) AS Total FROM persona WHERE Tipo_Persona='Cliente' AND Estado='Activo'`),
      obtenerUltimasVentas(isGerente, Id_Persona),
      isGerente ? obtenerEgresos() : Promise.resolve([{ Egresos: null }]),
      querySimple(`SELECT * FROM Vendedores_mas_Ventas`)
    ]);

    return {
      VentaContado,
      VentaCredito,
      Ingresos: 'C$ ' + (Ingresos[0].Ingresos || 0),
      Productos: ProductosAct[0].Total,
      No_Clientes: No_Clientes[0].Total,
      Ventas,
      Egresos: Egresos[0]?.Egresos || 0,
      Vendedores
    };
  }
};

module.exports = HomeService;

// -----------------------------------------
// Funciones auxiliares internas del módulo
// -----------------------------------------

async function querySimple(query) {
  const [rows] = await conexion.promise().query(query);
  return rows;
}

async function obtenerVentasContado(isGerente, idVendedor) {
  const query = isGerente
    ? `SELECT * FROM ventasContxmes;`
    : `
      SELECT
        v.Id_Vendedor,
        DATE_FORMAT(v.Fecha_Venta, '%M %Y') AS 'Mes',
        SUM(v.Total_Venta) AS Total_Ventas
      FROM venta v
      WHERE v.Fecha_Venta >= DATE_FORMAT(CURDATE() - INTERVAL 4 month, '%Y-%m-01')
        AND v.Tipo_Venta = 'Contado'
        AND v.Id_Vendedor = ${idVendedor}
      GROUP BY DATE_FORMAT(v.Fecha_Venta, '%Y-%m')
      ORDER BY v.Fecha_Venta
    `;
  return querySimple(query);
}

async function obtenerVentasCredito(isGerente, idVendedor) {
  const query = isGerente
    ? `SELECT * FROM ventasCredxmes;`
    : `
      SELECT
        v.Id_Vendedor,
        DATE_FORMAT(v.Fecha_Venta, '%M %Y') AS 'Mes',
        SUM(a.Monto_Abonado) AS 'IngresoTotal'
      FROM venta v
      INNER JOIN abonos a ON a.Id_Venta = v.Id_Venta
      WHERE v.Fecha_Venta >= DATE_FORMAT(CURDATE() - INTERVAL 4 month, '%Y-%m-01')
        AND v.Tipo_Venta = 'Credito'
        AND v.Id_Vendedor = ${idVendedor}
      GROUP BY DATE_FORMAT(v.Fecha_Venta, '%Y-%m')
      ORDER BY v.Fecha_Venta
    `;
  return querySimple(query);
}

async function obtenerIngresos(isGerente, idVendedor) {
  const [results] = await conexion.promise().query(
    isGerente
      ? `CALL IngresosVentasMensuales();`
      : `CALL IngresosVentasMensualesVendedor(${idVendedor});`
  );
  return results[0];
}

async function obtenerUltimasVentas(isGerente, idVendedor) {
  const query = `
    SELECT 
      v.Tipo_Venta, 
      v.Fecha_Venta, 
      v.Total_Venta, 
      CONCAT(c.Nombre,' ',c.Apellido) AS Cliente, 
      CONCAT(vdr.Nombre,' ',vdr.Apellido) AS Vendedor
    FROM Venta v
    JOIN Persona c ON v.Id_Cliente = c.Id_Persona
    JOIN Persona vdr ON v.Id_Vendedor = vdr.Id_Persona
    WHERE MONTH(v.Fecha_Venta) = MONTH(CURDATE()) 
      AND YEAR(v.Fecha_Venta) = YEAR(CURDATE())
      ${!isGerente ? `AND v.Id_Vendedor = ${idVendedor}` : ''}
    ORDER BY v.Fecha_Venta DESC
    LIMIT 5
  `;
  const rows = await querySimple(query);
  return rows.map(venta => ({
    ...venta,
    Fecha_Venta: new Date(venta.Fecha_Venta).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }));
}

async function obtenerEgresos() 
{
  const query = `
    SELECT SUM(Total_Compra) AS Egresos FROM Compras
    WHERE MONTH(Fecha_Compra) = MONTH(CURDATE()) AND
          YEAR(Fecha_Compra) = YEAR(CURDATE())
  `;
  return querySimple(query);
}
