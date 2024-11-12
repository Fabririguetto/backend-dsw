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

// Ruta para obtener empleados con filtro opcional por nombre
router.get('/empleados', async (req, res) => {
    const { nombre } = req.query;

    try {
        const connection = await getConnection();
        let query = `SELECT emp.DNI_CUIL, emp.nombre_apellidoEmp, emp.contacto, suc.nombreSucursal, suc.idSucursal 
                    FROM empleados emp 
                    INNER JOIN sucursales suc ON emp.idSucursal = suc.idSucursal
                    `
                    let queryParams = [];

        if (nombre) {
            query += ' WHERE (DNI_CUIL LIKE ? OR nombre_apellidoEmp LIKE ?)';
            queryParams.push(`%${nombre}%`, `%${nombre}%`);
        }

        const [rows] = await connection.execute(query, queryParams);
        connection.release();

        res.status(200).json(rows);
    } catch (error) {
        console.error('Error al obtener empleados:', error);
        res.status(500).json({ error: 'Error al obtener empleados' });
    }
});

// Ruta para agregar un empleado
router.post("/empleados", async (req, res) => {
    const { dni, nombre_apellidoEmp, contacto, sucursal } = req.body;

    if (!dni || !nombre_apellidoEmp || !contacto || !sucursal) {
        return res.status(400).json({ error: 'Faltan datos necesarios para insertar el empleado' });
    }

    let connection;

    try {
        connection = await getConnection();
        await connection.beginTransaction();

        const query1 = 'INSERT INTO empleados (DNI_CUIL, nombre_apellidoEmp, contacto, idSucursal) VALUES (?, ?, ?, ?)';
        //const [result1] = await connection.execute(query1, [dni, nombre_apellidoEmp, contacto, sucursal]);
        await connection.execute(query1, [dni, nombre_apellidoEmp, contacto, sucursal]);


        await connection.commit();
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error('Error al ingresar el empleado:', error);

        if (connection) {
            await connection.rollback();
        }

        res.status(500).json({ error: 'Error al ingresar el empleado' });
    } finally {
        if (connection) {
            connection.release();
        }
    }
});

// Ruta para actualizar un empleado
router.put('/empleados/:id', async (req, res) => {
    const idEmpleado = req.params.id;
    const { dni, nombre_apellidoEmp, contacto } = req.body;

    if (!dni || !nombre_apellidoEmp || !contacto) {
        return res.status(400).json({ error: 'Faltan datos necesarios para actualizar el empleado' });
    }

    let connection;

    try {
        connection = await getConnection();
        await connection.beginTransaction();

        const query1 = 'UPDATE empleados SET nombre_apellidoEmp = ?, contacto = ? WHERE DNI_CUIL = ?';
        await connection.execute(query1, [nombre_apellidoEmp, contacto, dni]);

        await connection.commit();
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error('Error al actualizar el empleado:', error);

        if (connection) {
            await connection.rollback();
        }

        res.status(500).json({ error: 'Error al actualizar el empleado' });
    } finally {
        if (connection) {
            connection.release();
        }
    }
});

module.exports = router;
