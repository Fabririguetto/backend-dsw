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

// Route to fetch ventas
router.get('/ventas', async (req, res) => {
    const query = 'SELECT ven.idVenta, ven.montoTotal, emp.nombre_apellidoEmp, cli.nombre_apellidoCli  FROM ventas ven INNER JOIN empleados emp ON ven.DNIEmpleado = emp.DNI_CUIL INNER JOIN clientes cli ON ven.idCliente = cli.idCliente';
    try {
        const connection = await getConnection();
        const [rows] = await connection.query(query);
        connection.release();
        res.json(rows);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Error en la consulta.' });
    }
});

router.get('/detalle_ventas/:idVenta', async (req, res) => {
    const { idVenta } = req.params; // Captura el parámetro idVenta de la URL
    const query = 'SELECT dven.idVenta, sto.articulo, sto.descripcion, dven.cantidadVendida, dven.subtotal  FROM productoventa dven INNER JOIN productos sto ON dven.idProducto = sto.idProducto WHERE dven.idVenta = ?'; // Filtro por idVenta
    
    try {
        const connection = await getConnection();
        const [rows] = await connection.query(query, [idVenta]); // Pasa el idVenta como parámetro a la consulta
        connection.release();
        
        if (rows.length === 0) {
            res.status(404).json({ message: 'No se encontraron detalles para esta venta.' });
        } else {
            res.json(rows); // Retorna los resultados si existen
        }
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Error en la consulta.' });
    }
});

// Route to create a new venta
router.post('/crearVenta', async (req, res) => {
    const { montoTotal, DNIEmpleado, idCliente, fechaHoraVenta } = req.body;

    // Validación de campos
    if (!montoTotal || !DNIEmpleado || !idCliente || !fechaHoraVenta) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    const query = 'INSERT INTO ventas (montoTotal, DNIEmpleado, idCliente, fechaHoraVenta) VALUES (?, ?, ?, ?)';
    try {
        const connection = await getConnection();
        const [result] = await connection.query(query, [montoTotal, DNIEmpleado, idCliente, fechaHoraVenta]);

        const newVentaId = result.insertId;
        connection.release();

        res.json({ id_venta: newVentaId });
    } catch (error) {
        console.error('Error al crear la venta:', error);
        res.status(500).json({ error: 'Error al crear la venta.' });
    }
});

module.exports = router;
