const express = require('express');
const mysql = require('mysql2/promise');
const router = express.Router();

const conexionConfig = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'dsw_gestion'
};

const pool = mysql.createPool(conexionConfig);

async function getConnection() {
    try {
        return await pool.getConnection();
    } catch (error) {
        console.error('Database connection failed:', error);
        throw error;
    }
}

router.get('/articulos', async (req, res) => {
    const query = 'SELECT idProducto, nombre FROM productos WHERE cantidad > 0'; 
    
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

// Route to add an article to a sale
router.post('/agregarArticuloAVenta/:idVenta', async (req, res) => {
    const { idVenta } = req.params;
    const { id_articulo, cantidad } = req.body;

    if (!id_articulo || !cantidad) {
        return res.status(400).json({ error: 'El id del artículo y la cantidad son obligatorios.' });
    }

    const stockQuery = 'SELECT cantidad FROM productos WHERE idProducto = ?';
    try {
        const connection = await getConnection();
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
        
        const precioQuery = 'SELECT precioVenta FROM productos WHERE idProducto = ?';
        const [precioProducto] = await connection.query(precioQuery, [id_articulo]);
        const subtotal = precioProducto[0].precioVenta * cantidad;

        const [result] = await connection.query(query, [idVenta, id_articulo, cantidad, subtotal]);

        const updateStockQuery = 'UPDATE productos SET cantidad = cantidad - ? WHERE idProducto = ?';
        await connection.query(updateStockQuery, [cantidad, id_articulo]);

        connection.release();
        res.json({ message: 'Artículo agregado a la venta correctamente.' });
    } catch (error) {
        console.error('Error al agregar artículo a la venta:', error);
        res.status(500).json({ error: 'Error al agregar el artículo.' });
    }
});

module.exports = router;
