const { getConnection } = require('../config/db');

class StockRepository {

    async findAll({ limit, offset, search }) {
        const connection = await getConnection();
        let query = `
            SELECT prod.idProducto, prod.articulo, prod.descripcion, prod.cantidad, pre.monto, prod.estado
            FROM productos prod
            INNER JOIN precios pre ON prod.idProducto = pre.idProducto
            WHERE prod.estado = 'Disponible' 
            AND pre.fechaHora = (
                SELECT MAX(p2.fechaHora)
                FROM precios p2
                WHERE p2.idProducto = prod.idProducto
            )`;
        
        const params = [];
        if (search) {
            query += ' AND (prod.articulo LIKE ? OR prod.descripcion LIKE ?)';
            params.push(`%${search}%`, `%${search}%`);
        }

        query += ` LIMIT ${limit} OFFSET ${offset}`;
        
        const [rows] = await connection.execute(query, params);
        connection.release();
        return rows;
    }

    async countAll(search) {
        const connection = await getConnection();
        let query = "SELECT COUNT(*) AS total FROM productos prod WHERE prod.estado = 'Disponible'";
        const params = [];
        if (search) {
            query += ' AND (prod.articulo LIKE ? OR prod.descripcion LIKE ?)';
            params.push(`%${search}%`, `%${search}%`);
        }
        const [rows] = await connection.execute(query, params);
        connection.release();
        return rows[0].total;
    }


    async getStockActual(id, connection = null) {
        const conn = connection || await getConnection();
        const [rows] = await conn.execute('SELECT cantidad FROM productos WHERE idProducto = ?', [id]);
        if (!connection) conn.release();
        return rows[0] ? rows[0].cantidad : 0;
    }

    async descontarStock(id, cantidad, connection) {
        const query = 'UPDATE productos SET cantidad = cantidad - ? WHERE idProducto = ?';
        await connection.execute(query, [cantidad, id]);
    }

    async create(data) {
        const connection = await getConnection();
        try {
            await connection.beginTransaction();
            
            const queryProd = 'INSERT INTO productos (articulo, descripcion, cantidad, estado) VALUES (?, ?, ?, ?)';
            const [resProd] = await connection.execute(queryProd, [data.articulo, data.descripcion, data.cantidad, 'Disponible']);
            
            const queryPrecio = 'INSERT INTO precios (idProducto, fechaHora, monto) VALUES (?, ?, ?)';
            await connection.execute(queryPrecio, [resProd.insertId, new Date(), data.monto]);

            await connection.commit();
            return resProd.insertId;
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }

    async update(id, data) {
        const connection = await getConnection();
        try {
            await connection.beginTransaction();
            
            const queryProd = 'UPDATE productos SET articulo = ?, descripcion = ?, cantidad = ? WHERE idProducto = ?';
            await connection.execute(queryProd, [data.articulo, data.descripcion, data.cantidad, id]);
            
            const queryPrecio = 'INSERT INTO precios (idProducto, fechaHora, monto) VALUES (?, ?, ?)';
            await connection.execute(queryPrecio, [id, new Date(), data.monto]);

            await connection.commit();
            return true;
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }

    async updateEstado(id, nuevoEstado) {
        const connection = await getConnection();
        const estadoFinal = nuevoEstado === 'Alta' ? 'Disponible' : nuevoEstado;
        
        const [result] = await connection.execute('UPDATE productos SET estado = ? WHERE idProducto = ?', [estadoFinal, id]);
        connection.release();
        return result.affectedRows > 0;
    }
}

module.exports = new StockRepository();