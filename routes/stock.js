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


router.get('/stock', async (req, res) => {
    const { producto = '', limite = 20, pagina = 0 } = req.query;

    const limitValue = parseInt(limite, 10) || 20;
    const pageValue = Math.max(0, parseInt(pagina, 10));
    const offsetValue = pageValue * limitValue;

    console.log('Parámetros de entrada:');
    console.log(`producto: ${producto}, limite: ${limite}, pagina: ${pagina}`);
    console.log(`limitValue: ${limitValue}, pageValue: ${pageValue}, offsetValue: ${offsetValue}`);

    try {
        const connection = await getConnection();

        let query = `
            SELECT prod.idProducto, prod.articulo, prod.descripcion, prod.cantidad, pre.monto
            FROM productos prod
            INNER JOIN precios pre ON prod.idProducto = pre.idProducto
            WHERE prod.estado = 'Disponible'
            AND pre.fechaHora = (
                SELECT MAX(p2.fechaHora)
                FROM precios p2
                WHERE p2.idProducto = prod.idProducto
            )`;

        let queryParams = [];

        if (producto) {
            query += ' AND (prod.articulo LIKE ? OR prod.descripcion LIKE ?)';
            queryParams.push(`%${producto}%`, `%${producto}%`);
        }

        query += ` LIMIT ${limitValue} OFFSET ${offsetValue}`;

        const [rows] = await connection.execute(query, queryParams);

        let totalQuery = `
            SELECT COUNT(*) AS total
            FROM productos prod
            WHERE prod.estado = 'Disponible'`;

        let totalQueryParams = [];

        if (producto) {
            totalQuery += ' AND (prod.articulo LIKE ? OR prod.descripcion LIKE ?)';
            totalQueryParams.push(`%${producto}%`, `%${producto}%`);
        }

        const [totalRows] = await connection.execute(totalQuery, totalQueryParams);
        const totalProductos = totalRows[0].total;
        const totalPages = Math.ceil(totalProductos / limitValue);

        connection.release();

        console.log(`Total productos: ${totalProductos}, Total páginas: ${totalPages}`);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'No se encontraron productos' });
        }

        res.status(200).json({
            productos: rows,
            totalProductos,
            totalPages,
        });
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ error: 'Error al obtener productos' });
    }
});
  
router.get('/stockventa', async (req, res) => {
    const { producto, estado } = req.query;

    try {
        const connection = await getConnection();
        let query = `
            SELECT prod.idProducto, prod.articulo, prod.descripcion, prod.cantidad, pre.monto
            FROM productos prod
            INNER JOIN precios pre ON prod.idProducto = pre.idProducto
            WHERE prod.estado = ? AND cantidad > 0 AND pre.fechaHora = (
                SELECT MAX(fechaHora) 
                FROM precios 
                WHERE idProducto = prod.idProducto)
        `;

        let queryParams = [estado || 'Disponible'];

        if (producto) {
            query += ' AND (prod.articulo LIKE ? OR prod.descripcion LIKE ?)';
            queryParams.push(`%${producto}%`, `%${producto}%`);
        }

        queryParams = queryParams.map(param => (param === undefined ? null : param));

        const [rows] = await connection.execute(query, queryParams);
        connection.release();

        res.status(200).json(rows);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ error: 'Error al obtener productos' });
    }
});

router.post("/stock", async (req, res) => {
    const { articulo, descripcion, cantidad, monto } = req.body;

    if (!articulo || !descripcion || cantidad === undefined || monto === undefined) {
        return res.status(400).json({ error: 'Faltan datos necesarios para insertar el producto' });
    }

    let connection;

    try {
        connection = await getConnection();
        await connection.beginTransaction();
        const estado = 'Alta';
        const query1 = 'INSERT INTO productos (articulo, descripcion, cantidad, estado) VALUES (?, ?, ?, ?)';
        const [result1] = await connection.execute(query1, [articulo, descripcion, cantidad, estado]);

        const idProducto = result1.insertId;

        const fechaHora = new Date();
        const query2 = 'INSERT INTO precios (idProducto, fechaHora, monto) VALUES (?, ?, ?)';
        await connection.execute(query2, [idProducto, fechaHora, monto]);

        await connection.commit();
        res.status(200).json(rows[0]);
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

router.put('/stock/:id', async (req, res) => {
    const idProducto = req.params.id;
    const { articulo, descripcion, cantidad, monto } = req.body;

    if (!articulo || !descripcion || cantidad === undefined || monto === undefined) {
        return res.status(400).json({ error: 'Faltan datos necesarios para actualizar el producto' });
    }

    let connection;

    try {
        connection = await getConnection();
        await connection.beginTransaction();

        const query1 = 'UPDATE productos SET articulo = ?, descripcion = ?, cantidad = ? WHERE idProducto = ?';
        await connection.execute(query1, [articulo, descripcion, cantidad, idProducto]);

        const fechaHora = new Date();
        const query2 = 'INSERT INTO precios (idProducto, fechaHora, monto) VALUES (?, ?, ?)';
        await connection.execute(query2, [idProducto, fechaHora, monto]);

        await connection.commit();
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error('Error al actualizar el producto:', error);

        if (connection) {
            await connection.rollback();
        }

        res.status(500).json({ error: 'Error al actualizar el producto' });
    } finally {
        if (connection) {
            connection.release();
        }
    }
});

router.put('/stockelim/:id', async (req, res) => {
    const idProducto = req.params.id;
    const { estado } = req.body;

    let connection;

    try {
        connection = await getConnection();
        await connection.beginTransaction();

        const nuevoEstado = estado === 'Alta' ? 'Baja' : 'Alta';
        const query1 = 'UPDATE productos SET estado = ? WHERE idProducto = ?';
        const [result] = await connection.execute(query1, [nuevoEstado, idProducto]);

        await connection.commit();

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Estado actualizado correctamente', nuevoEstado });
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        console.error('Error al actualizar el estado del producto:', error);

        if (connection) {
            await connection.rollback();
        }

        res.status(500).json({ error: 'Error al actualizar el estado del producto' });
    } finally {
        if (connection) {
            connection.release();
        }
    }
});

module.exports = router;
