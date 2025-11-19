const { getConnection } = require('../config/db');

class ClienteRepository {
    
    async findAll(search) {
        const connection = await getConnection();
        let query = 'SELECT * FROM clientes';
        let params = [];

        if (search) {
            query += ' WHERE (dni LIKE ? OR nombre_apellidoCli LIKE ?)';
            params.push(`%${search}%`, `%${search}%`);
        }

        const [rows] = await connection.execute(query, params);
        connection.release();
        return rows;
    }

    async findByDni(dni) {
        const connection = await getConnection();
        const [rows] = await connection.execute('SELECT * FROM clientes WHERE dni = ?', [dni]);
        connection.release();
        return rows[0];
    }

    async create(data) {
        const connection = await getConnection();
        const query = 'INSERT INTO clientes (dni, nombre_apellidoCli, direccion, contacto) VALUES (?, ?, ?, ?)';
        const [result] = await connection.execute(query, [data.dni, data.nombre_apellidoCli, data.direccion, data.contacto]);
        connection.release();
        return result.insertId;
    }

    async update(id, data) {
        const connection = await getConnection();
        const query = 'UPDATE clientes SET dni = ?, nombre_apellidoCli = ?, direccion = ?, contacto = ? WHERE idCliente = ?';
        const [result] = await connection.execute(query, [data.dni, data.nombre_apellidoCli, data.direccion, data.contacto, id]);
        connection.release();
        return result;
    }
}

module.exports = new ClienteRepository();