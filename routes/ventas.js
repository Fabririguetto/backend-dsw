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

// Route to fetch ventas with optional filter
router.get('/ventas', async (req, res) => {
    const { filtro } = req.query; // Captura el filtro único

    // Base de la consulta sin filtro
    let query = `
        SELECT ven.idVenta, ven.montoTotal, emp.nombre_apellidoEmp, cli.nombre_apellidoCli, 
            DATE_FORMAT(ven.fechaHoraVenta, '%Y-%m-%d %H:%i:%s') AS fechaHoraVenta
        FROM ventas ven
        INNER JOIN empleados emp ON ven.DNIEmpleado = emp.DNI_CUIL
        INNER JOIN clientes cli ON ven.idCliente = cli.idCliente
    `;
    
    const params = [];
    
    // Si hay filtro, agregar condición WHERE
    if (filtro) {
        query += ` WHERE emp.nombre_apellidoEmp LIKE ? OR cli.nombre_apellidoCli LIKE ?`;
        params.push(`%${filtro}%`, `%${filtro}%`);
    }

    query += ` ORDER BY ven.fechaHoraVenta DESC`; // Ordenar los resultados

    try {
        const connection = await getConnection();
        const [rows] = await connection.query(query, params); // Ejecutar consulta con parámetros
        connection.release();
        res.json(rows);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Error en la consulta.' });
    }
});


// Route to fetch detalle de ventas by idVenta
router.get('/detalle_ventas/:idVenta', async (req, res) => {
    const { idVenta } = req.params;
    const query = `
        SELECT dven.idVenta, sto.articulo, sto.descripcion, dven.cantidadVendida, dven.subtotal
        FROM productoventa dven
        INNER JOIN productos sto ON dven.idProducto = sto.idProducto
        WHERE dven.idVenta = ?
    `;

    try {
        const connection = await getConnection();
        const [rows] = await connection.query(query, [idVenta]);
        connection.release();
        
        if (rows.length === 0) {
            res.status(404).json({ message: 'No se encontraron detalles para esta venta.' });
        } else {
            res.json(rows);
        }
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Error en la consulta.' });
    }
});

// Route to create a new venta
router.post('/ventas/crearVenta', async (req, res) => {
    const { montoTotal, DNIEmpleado, idCliente, fechaHoraVenta } = req.body;

    // Validate required fields
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

// Route to get stock for ventas (with estado filter)
router.get('/stockventa', async (req, res) => {
    const { estado } = req.query;
    const query = 'SELECT idProducto, articulo, descripcion, monto FROM productos WHERE estado = ?';

    try {
        const connection = await getConnection();
        const [rows] = await connection.query(query, [estado]);
        connection.release();
        res.json(rows);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Error en la consulta.' });
    }
});

// Route to add products to a venta
router.post('/ventas/agregarProductosVenta', async (req, res) => {
    const { idVenta, productos } = req.body; // productos es un array de objetos

    if (!idVenta || !productos || productos.length === 0) {
        return res.status(400).json({ error: 'Venta y productos son obligatorios.' });
    }

    // Empezamos la transacción para agregar todos los productos
    const connection = await getConnection();
    try {
        await connection.beginTransaction();

        for (let producto of productos) {
            const { idProducto, cantidadVendida, subtotal } = producto;

            // Agregar cada producto a la venta
            const query = 'INSERT INTO productoventa (idVenta, idProducto, cantidadVendida, subtotal) VALUES (?, ?, ?, ?)';
            await connection.query(query, [idVenta, idProducto, cantidadVendida, subtotal]);
        }

        await connection.commit();
        connection.release();
        res.json({ message: 'Productos agregados a la venta exitosamente.' });
    } catch (error) {
        await connection.rollback();
        connection.release();
        console.error('Error al agregar productos:', error);
        res.status(500).json({ error: 'Error al agregar productos.' });
    }
});

// Route to update the total amount of a venta
router.put('/ventas/:idVenta', async (req, res) => {
    const { idVenta } = req.params;
    const { totalVenta } = req.body;
  
    try {
        const connection = await getConnection();
        const result = await connection.query('UPDATE ventas SET montoTotal = ? WHERE idVenta = ?', [totalVenta, idVenta]);
        connection.release();
  
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Venta actualizada con éxito' });
        } else {
            res.status(404).json({ message: 'Venta no encontrada' });
        }
    } catch (error) {
        console.error('Error al actualizar la venta:', error);
        res.status(500).json({ message: 'Error al actualizar la venta' });
    }
});

module.exports = router;
