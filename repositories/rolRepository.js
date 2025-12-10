const { getConnection } = require('../config/db');

class RolRepository {

    async findAll() {
        const connection = await getConnection();
        
        const query = `
            SELECT idrol, rol
            FROM rol
            ORDER BY idrol
        `;

        const [rows] = await connection.execute(query);
        connection.release();
        return rows;
    }

    async findById(id) {
        const connection = await getConnection();
        
        const query = `
            SELECT idrol, rol
            FROM rol
            WHERE idrol = ?
        `;

        const [rows] = await connection.execute(query, [id]); 
        connection.release();
        
        return rows.length > 0 ? rows[0] : null; 
    }

}

module.exports = new RolRepository();