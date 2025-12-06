const { getConnection } = require('../config/db');
const bcrypt = require('bcrypt');

class EmpleadoRepository {

    async findAll(search) {
        const connection = await getConnection();

        let query = `
            SELECT 
                emp.DNI_CUIL, 
                emp.nombre_apellidoEmp, 
                emp.contacto, 
                emp.email,
                r.rol,
                suc.nombreSucursal 
            FROM empleados emp
            INNER JOIN sucursales suc ON emp.idSucursal = suc.idSucursal
            INNER JOIN rol r ON emp.idrol = r.idrol
        `;

        const params = [];

        if (search) {
            query += ` WHERE (
                emp.DNI_CUIL LIKE ? 
                OR emp.nombre_apellidoEmp LIKE ?
            )`;
            params.push(`%${search}%`, `%${search}%`);
        }

        const [rows] = await connection.execute(query, params);
        connection.release();
        return rows;
    }

async create(data) {
    const connection = await getConnection();

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    const query = `
        INSERT INTO empleados 
            (DNI_CUIL, nombre_apellidoEmp, contacto, idSucursal, email, password, idrol)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await connection.execute(query, [
        data.DNI_CUIL,
        data.nombre_apellidoEmp,
        data.contacto,
        data.sucursal,
        data.email,
        hashedPassword,
        data.rol
    ]);

    connection.release();
    return result;
}

async update(id, data) {
    const connection = await getConnection();

    let query = `
        UPDATE empleados 
        SET 
            nombre_apellidoEmp = ?, 
            contacto = ?, 
            idSucursal = ?,
            email = ?,
            idrol = ?
    `;
    
    const params = [
        data.nombre_apellidoEmp,
        data.contacto,
        data.sucursal,
        data.email,
        data.rol
    ];

    if (data.password) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        query += `, password = ?`;
        params.push(hashedPassword);
    }

    query += ` WHERE DNI_CUIL = ?`;
    params.push(id);

    const [result] = await connection.execute(query, params);
    connection.release();
    return result;
}

}

module.exports = new EmpleadoRepository();
