const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Configuración de la base de datos
const pool = mysql.createPool({
  host: 'localhost', // Cambia esto a tu host
  user: 'root', // Cambia esto a tu usuario
  password: 'password', // Cambia esto a tu contraseña
  database: 'nombre_base_datos', // Cambia esto a tu base de datos
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const getConnection = async () => {
  return pool.getConnection();
};

// Ruta para obtener productos
app.get('/productos', async (req, res) => {
    const { nombre } = req.query; // Nombre a filtrar obtenido desde la query
  
    try {
      const connection = await getConnection();
      let query = `
        SELECT prod.idProducto, prod.articulo, prod.descripcion, prod.cantidad, pre.monto
        FROM productos prod LEFT JOIN precios pre ON prod.idProducto = pre.idProducto
      `;
      let queryParams = [];
  
      if (nombre) {
        query += ' WHERE prod.articulo LIKE ? OR prod.descripcion LIKE ?';
        queryParams = [`%${nombre}%`, `%${nombre}%`];
      }
  
      console.log('Generated Query:', query);
      console.log('Query Parameters:', queryParams);
  
      const [rows] = await connection.execute(query, queryParams);
      connection.release(); // Liberar la conexión de vuelta al pool
  
      console.log('Rows retrieved:', rows);
  
      res.status(200).json(rows);
    } catch (error) {
      console.error('Error al obtener productos:', error);
      res.status(500).json({ error: 'Error al obtener productos' });
    }
  });

// Ruta para insertar un nuevo producto
app.post('/productos', async (req, res) => {
    const { articulo, descripcion, cantidad, monto } = req.body;
  
    if (!articulo || !descripcion || cantidad === undefined || monto === undefined) {
      return res.status(400).json({ error: 'Faltan datos necesarios para insertar el producto' });
    }
  
    let connection;
  
    try {
      connection = await getConnection();
      await connection.beginTransaction(); // Iniciar la transacción
  
      // Insertar el nuevo producto en la base de datos usando parámetros
      const query1 = 'INSERT INTO productos (articulo, descripcion, cantidad) VALUES (?, ?, ?)';
      const [result1] = await connection.execute(query1, [articulo, descripcion, cantidad]);
  
      // Obtener el id del producto insertado
      const idProducto = result1.insertId;
      console.log('ID del producto insertado:', idProducto);
  
      // Insertar el precio para el producto insertado usando parámetros
      const fechaHora = new Date(); // Obtener la fecha y hora actual
      const query2 = 'INSERT INTO precios (idProducto, fechaHora, monto) VALUES (?, ?, ?)';
      const [result2] = await connection.execute(query2, [idProducto, fechaHora, monto]);
  
      console.log('Resultado de la inserción de precios:', result2);
  
      // Consulta para obtener el producto con su precio
      const query3 = `
        SELECT prod.idProducto, prod.articulo, prod.descripcion, prod.cantidad, 
               pre.monto
        FROM productos prod
        LEFT JOIN precios pre ON prod.idProducto = pre.idProducto
        WHERE prod.idProducto = ?
      `;
      const [rows] = await connection.execute(query3, [idProducto]);
  
      console.log('Producto ingresado con su precio:', rows);
  
      await connection.commit(); // Confirmar la transacción
    } catch (error) {
      console.error('Error al ingresar el producto:', error);
  
      // Revertir la transacción si ocurre un error
      if (connection) {
        await connection.rollback();
      }
  
      res.status(500).json({ error: 'Error al ingresar el producto' });
      return;
    } finally {
      if (connection) {
        connection.release(); // Liberar la conexión de vuelta al pool
      }
    }
  
    res.status(200).json({ message: 'Producto ingresado correctamente' });
  });
  
// Ruta para actualizar un producto
app.put('/productos/:id', async (req, res) => {
  const { id } = req.params;
  const { articulo, descripcion, cantidad } = req.body;

  try {
    const connection = await getConnection();

    // Actualizar el producto en la base de datos
    const query = 'UPDATE productos SET articulo = ?, descripcion = ?, cantidad = ? WHERE idProducto = ?';
    const [result] = await connection.execute(query, [articulo, descripcion, cantidad, id]);

    connection.release(); // Liberar la conexión de vuelta al pool

    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Producto actualizado correctamente' });
    } else {
      res.status(404).json({ error: 'No se encontró el producto con el ID especificado' });
    }
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});