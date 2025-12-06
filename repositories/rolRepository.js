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

    async create(data) {
        const connection = await getConnection();

        const query = `
            INSERT INTO rol 
                (idrol, rol)
            VALUES (?, ?)
        `;

        const [result] = await connection.execute(query, [
            data.idrol,
            data.rol,
        ]);

        connection.release();
        return result;
    }

    async update(id, data) {
        const connection = await getConnection();

        const query = `
            UPDATE rol 
            SET 
                rol = ?
            WHERE idrol = ?
        `;

        const [result] = await connection.execute(query, [
            data.rol,
            id
        ]);

        connection.release();
        return result;
    }

    async remove(id) {
        const connection = await getConnection();

        const query = `
            DELETE FROM rol 
            WHERE idrol = ?
        `;

        const [result] = await connection.execute(query, [id]);

        connection.release();
        return result;
    }
}

module.exports = new RolRepository();