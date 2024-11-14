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

router.get('/clientes', async (req, res) => {
    const { nombre } = req.query;

    try {
        const connection = await getConnection();
        let query = 'SELECT * FROM clientes';
        let queryParams = [];

        if (nombre) {
            query += ' WHERE (dni LIKE ? OR nombre_apellidoCli LIKE ?)';
            queryParams.push(`%${nombre}%`, `%${nombre}%`);
        }

        queryParams = queryParams.map(param => (param === undefined ? null : param));

        const [rows] = await connection.execute(query, queryParams);
        connection.release();

        res.status(200).json(rows);
    } catch (error) {
        console.error('Error al obtener clientes:', error);
        res.status(500).json({ error: 'Error al obtener clientes' });
    }
});

router.get('/clientesventa/:dni', async (req, res) => {
    const { dni } = req.params;
  
    if (!dni) {
      return res.status(400).json({ error: 'DNI no proporcionado' });
    }
  
    try {
      const query = `
        SELECT idCliente
        FROM clientes
        WHERE DNI = ?`; 
  
      const connection = await getConnection();
      const [rows] = await connection.query(query, [dni]);
      connection.release();
  
      if (rows.length > 0) {
        res.json(rows[0]); 
      } else {
        res.status(404).json({ error: 'Cliente no encontrado' });
      }
    } catch (error) {
      console.error('Error al obtener cliente:', error);
      res.status(500).json({ error: 'Error en la consulta' });
    }
  });


router.post("/clientes", async (req, res) => {
    const { dni, nombre_apellidoCli, direccion, contacto } = req.body;

    if (!dni || !nombre_apellidoCli || !direccion || !contacto) {
        return res.status(400).json({ error: 'Faltan datos necesarios para insertar el cliente' });
    }

    let connection;

    try {
        connection = await getConnection();
        await connection.beginTransaction();

        const query1 = 'INSERT INTO clientes (dni, nombre_apellidoCli, direccion, contacto) VALUES (?, ?, ?, ?)';
        const [result1] = await connection.execute(query1, [dni, nombre_apellidoCli, direccion, contacto]);

        const idCliente = result1.insertId;

        const query2 = `
            SELECT cli.idCliente, cli.dni, cli.nombre_apellidoCli, cli.direccion, cli.contacto
            FROM clientes cli
            WHERE cli.idCliente = ?
        `;
        const [rows] = await connection.execute(query2, [idCliente]);

        await connection.commit();
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error('Error al ingresar el cliente:', error);

        if (connection) {
            await connection.rollback();
        }

        res.status(500).json({ error: 'Error al ingresar el cliente' });
    } finally {
        if (connection) {
            connection.release();
        }
    }
});

router.put('/clientes/:id', async (req, res) => {
    const idCliente = req.params.id;
    const { dni, nombre_apellidoCli, direccion, contacto } = req.body;

    if (!dni || !nombre_apellidoCli || !direccion || !contacto) {
        return res.status(400).json({ error: 'Faltan datos necesarios para actualizar el cliente' });
    }

    let connection;

    try {
        connection = await getConnection();
        await connection.beginTransaction();

        const query1 = 'UPDATE clientes SET dni = ?, nombre_apellidoCli = ?, direccion = ?, contacto = ? WHERE idCliente = ?';
        await connection.execute(query1, [dni, nombre_apellidoCli, direccion, contacto, idCliente]);

        const query2 = `
            SELECT cli.idCliente, cli.dni, cli.nombre_apellidoCli, cli.direccion, cli.contacto
            FROM clientes cli
            WHERE cli.idCliente = ?
        `;
        const [rows] = await connection.execute(query2, [idCliente]);

        await connection.commit();
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error('Error al actualizar el cliente:', error);

        if (connection) {
            await connection.rollback();
        }

        res.status(500).json({ error: 'Error al actualizar el cliente' });
    } finally {
        if (connection) {
            connection.release();
        }
    }
});


module.exports = router;