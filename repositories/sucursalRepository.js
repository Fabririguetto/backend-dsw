const { getConnection } = require('../config/db');

class SucursalRepository {
    async findAll(search) {
        const connection = await getConnection();
        let query = 'SELECT * FROM sucursales WHERE 1=1';
        const params = [];

        if (search) {
            query += ' AND (nombreSucursal LIKE ? OR direccion LIKE ?)';
            params.push(`%${search}%`, `%${search}%`);
        }

        const [rows] = await connection.execute(query, params);
        connection.release();
        return rows;
    }
}

module.exports = new SucursalRepository();