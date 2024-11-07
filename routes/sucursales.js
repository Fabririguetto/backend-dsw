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

router.get('/sucursales', async (req, res) => {
    const { filtro } = req.query;  // Recibiendo el filtro único

    let query = 'SELECT * FROM sucursales WHERE 1=1';  // Siempre devuelve algo (1=1 es una condición siempre verdadera)

    // Condicionalmente agregamos el filtro a la consulta
    if (filtro) {
        query += ` AND (nombreSucursal LIKE ? OR direccion LIKE ?)`;
    }

    try {
        const connection = await getConnection();

        const params = [];
        if (filtro) {
            params.push(`%${filtro}%`);
            params.push(`%${filtro}%`);
        }

        const [rows] = await connection.query(query, params);
        connection.release();  // Release the connection back to the pool
        res.json(rows);  // Return the query result (rows)
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Error en la consulta.' });
    }
});

module.exports = router;
