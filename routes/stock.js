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

// Route to fetch productos with optional filtering by nombre
router.get('/productos', async (req, res) => {
    const { producto } = req.query;

    try {
        const connection = await getConnection();
        let query = `
            SELECT prod.idProducto, prod.articulo, prod.descripcion, prod.cantidad, pre.monto
            FROM productos prod
            LEFT JOIN precios pre ON prod.idProducto = pre.idProducto
        `;
        queryParams = [`%${producto}%`, `%${producto}%`];

        const [rows] = await connection.execute(query, queryParams);
        connection.release();

        res.status(200).json(rows);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ error: 'Error al obtener productos' });
    }
});

router.post("/productos", async (req, res) => {
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

        // Insertar el precio para el producto insertado usando parámetros
        const fechaHora = new Date(); // Obtener la fecha y hora actual
        const query2 = 'INSERT INTO precios (idProducto, fechaHora, monto) VALUES (?, ?, ?)';
        await connection.execute(query2, [idProducto, fechaHora, monto]);

        // Consulta para obtener el producto con su precio
        const query3 = `
            SELECT prod.idProducto, prod.articulo, prod.descripcion, prod.cantidad, 
                   pre.monto
            FROM productos prod
            LEFT JOIN precios pre ON prod.idProducto = pre.idProducto
            WHERE prod.idProducto = ?
        `;
        const [rows] = await connection.execute(query3, [idProducto]);

        await connection.commit(); // Confirmar la transacción
        res.status(200).json(rows[0]); // Enviar el producto insertado
    } catch (error) {
        console.error('Error al ingresar el producto:', error);

        if (connection) {
            await connection.rollback();
        }

        res.status(500).json({ error: 'Error al ingresar el producto' });
    } finally {
        if (connection) {
            connection.release();
        }
    }
});

module.exports = router;
