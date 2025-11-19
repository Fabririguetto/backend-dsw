const { getConnection } = require('../config/db');

class EmpleadoRepository {

    async findAll(search) {
        const connection = await getConnection();
        let query = `SELECT emp.DNI_CUIL, emp.nombre_apellidoEmp, emp.contacto, suc.nombreSucursal, suc.idSucursal 
                     FROM empleados emp 
                     INNER JOIN sucursales suc ON emp.idSucursal = suc.idSucursal`;
        const params = [];

        if (search) {
            query += ' WHERE (emp.DNI_CUIL LIKE ? OR emp.nombre_apellidoEmp LIKE ?)';
            params.push(`%${search}%`, `%${search}%`);
        }

        const [rows] = await connection.execute(query, params);
        connection.release();
        return rows;
    }

    async create(data) {
        const connection = await getConnection();
        // Se asume que la contraseña ya viene encriptada o se maneja por defecto
        const query = 'INSERT INTO empleados (DNI_CUIL, nombre_apellidoEmp, contacto, idSucursal, email, password, rol) VALUES (?, ?, ?, ?, ?, ?, ?)';
        // Valores por defecto si no vienen en data
        const passDefault = data.password || '$2b$10$P6Y/k3yqY9x.gL2.wQ.0.e5.0.0.0.0.0'; // Hash de '123456'
        const emailDefault = data.email || `user${data.DNI_CUIL}@test.com`;
        
        const [result] = await connection.execute(query, [
            data.DNI_CUIL, 
            data.nombre_apellidoEmp, 
            data.contacto, 
            data.sucursal,
            emailDefault,
            passDefault,
            'vendedor'
        ]);
        connection.release();
        return result;
    }

    async update(id, data) {
        const connection = await getConnection();
        const query = 'UPDATE empleados SET nombre_apellidoEmp = ?, contacto = ?, idSucursal = ? WHERE DNI_CUIL = ?';
        const [result] = await connection.execute(query, [data.nombre_apellidoEmp, data.contacto, data.sucursal, id]);
        connection.release();
        return result;
    }
}

module.exports = new EmpleadoRepository();