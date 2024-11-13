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
                     INNER JOIN sucursales suc ON emp.idSucursal = suc.idSucursal`;
        let queryParams = [];

        if (nombre) {
            query += ' WHERE (emp.DNI_CUIL LIKE ? OR emp.nombre_apellidoEmp LIKE ?)';
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
router.post('/empleados', async (req, res) => {
    const { DNI_CUIL, nombre_apellidoEmp, contacto, sucursal } = req.body;

    if (!DNI_CUIL || !nombre_apellidoEmp || !contacto || !sucursal) {
        return res.status(400).json({ error: 'Faltan datos necesarios para insertar el empleado' });
    }

    try {
        const connection = await getConnection();
        await connection.execute(
            'INSERT INTO empleados (DNI_CUIL, nombre_apellidoEmp, contacto, idSucursal) VALUES (?, ?, ?, ?)',
            [DNI_CUIL, nombre_apellidoEmp, contacto, sucursal]
        );
        connection.release();

        res.status(201).json({ message: 'Empleado ingresado correctamente' });
    } catch (error) {
        console.error('Error al ingresar el empleado:', error);
        res.status(500).json({ error: 'Error al ingresar el empleado' });
    }
});

// Ruta para actualizar un empleado
router.put('/empleados/:id', async (req, res) => {
    const idEmpleado = req.params.id;
    const { nombre_apellidoEmp, contacto, sucursal } = req.body;

    if (!idEmpleado || !nombre_apellidoEmp || !contacto) {
        return res.status(400).json({ error: 'Faltan datos necesarios para actualizar el empleado' });
    }

    try {
        const connection = await getConnection();
        await connection.execute(
            'UPDATE empleados SET nombre_apellidoEmp = ?, contacto = ?, idSucursal = ? WHERE DNI_CUIL = ?',
            [nombre_apellidoEmp, contacto, sucursal, idEmpleado]
        );
        connection.release();

        res.status(200).json({ message: 'Empleado actualizado correctamente' });
    } catch (error) {
        console.error('Error al actualizar el empleado:', error);
        res.status(500).json({ error: 'Error al actualizar el empleado' });
    }
});

module.exports = router;