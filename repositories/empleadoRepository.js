const { getConnection } = require('../config/db');

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
            data.password, 
            data.idrol
        ]);

        connection.release();
        return result;
    }

    async update(id, data) {
        const connection = await getConnection();

        const query = `
            UPDATE empleados 
            SET 
                nombre_apellidoEmp = ?, 
                contacto = ?, 
                idSucursal = ?,
                email = ?,
                idrol = ?
            WHERE DNI_CUIL = ?
        `;

        const [result] = await connection.execute(query, [
            data.nombre_apellidoEmp,
            data.contacto,
            data.sucursal,
            data.email,
            data.idrol,
            id
        ]);

        connection.release();
        return result;
    }
}

module.exports = new EmpleadoRepository();
