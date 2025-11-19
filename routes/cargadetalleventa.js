const express = require('express');
const router = express.Router();

// IMPORTANTE: Conexión centralizada
const { getConnection } = require('../config/db');

router.get('/articulos', async (req, res) => {
    const query = 'SELECT idProducto, articulo as nombre FROM productos WHERE cantidad > 0'; 
    
    try {
        const connection = await getConnection();
        const [rows] = await connection.query(query);
        connection.release();
        res.json(rows);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Error en la consulta de artículos.' });
    }
});

router.post('/agregarArticuloAVenta/:idVenta', async (req, res) => {
    const { idVenta } = req.params;
    const { id_articulo, cantidad } = req.body;

    if (!id_articulo || !cantidad) {
        return res.status(400).json({ error: 'El id del artículo y la cantidad son obligatorios.' });
    }

    const stockQuery = 'SELECT cantidad FROM productos WHERE idProducto = ?';
    
    const connection = await getConnection(); // Sacamos la conexión fuera del try para el rollback
    try {
        // Nota: Deberíamos usar beginTransaction aquí también
        
        const [product] = await connection.query(stockQuery, [id_articulo]);

        if (product.length === 0) {
            connection.release();
            return res.status(404).json({ error: 'Producto no encontrado.' });
        }

        if (product[0].cantidad < cantidad) {
            connection.release();
            return res.status(400).json({ error: 'Stock insuficiente.' });
        }

        const query = 'INSERT INTO productoventa (idVenta, idProducto, cantidadVendida, subtotal) VALUES (?, ?, ?, ?)';
        
        // FIXME: Ojo aquí, el precio está en la tabla 'precios', no en 'productos'.
        // Dejamos la query original por ahora, pero esto fallará si 'precioVenta' no existe en productos.
        // Te sugiero revisar la columna correcta.
        const precioQuery = 'SELECT monto as precioVenta FROM precios WHERE idProducto = ? ORDER BY fechaHora DESC LIMIT 1';
        const [precioProducto] = await connection.query(precioQuery, [id_articulo]);
        
        let subtotal = 0;
        if (precioProducto.length > 0) {
             subtotal = precioProducto[0].precioVenta * cantidad;
        }

        await connection.query(query, [idVenta, id_articulo, cantidad, subtotal]);

        const updateStockQuery = 'UPDATE productos SET cantidad = cantidad - ? WHERE idProducto = ?';
        await connection.query(updateStockQuery, [cantidad, id_articulo]);

        connection.release();
        res.json({ message: 'Artículo agregado a la venta correctamente.' });
    } catch (error) {
        console.error('Error al agregar artículo a la venta:', error);
        connection.release();
        res.status(500).json({ error: 'Error al agregar el artículo.' });
    }
});

module.exports = router;