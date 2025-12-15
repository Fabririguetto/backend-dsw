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

    const fields = [];
    const values = [];

    for (const key in data) {
        fields.push(key);
        values.push(data[key]);
    }

    if (fields.length === 0) {
        throw new Error('No hay datos para insertar');
    }

    const placeholders = fields.map(() => '?').join(', ');
    const query = `
        INSERT INTO clientes (${fields.join(', ')})
        VALUES (${placeholders})
    `;

    const [result] = await connection.execute(query, values);
    connection.release();
    return result.insertId;
}

    async update(id, data) {
    const connection = await getConnection();

    const fields = [];
    const values = [];

    for (const key in data) {
        fields.push(`${key} = ?`);
        values.push(data[key]);
    }

    if (fields.length === 0) {
        throw new Error('No hay datos para actualizar');
    }

    values.push(id);

    const query = `
        UPDATE clientes
        SET ${fields.join(', ')}
        WHERE idCliente = ?
    `;

    const [result] = await connection.execute(query, values);
    connection.release();
    return result;
}
}

module.exports = new ClienteRepository();