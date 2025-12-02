const { getConnection } = require('../config/db');

class VentaRepository {

    async findAll({ limit, offset, filtro }) {
        const connection = await getConnection();
        
        let query = `
            SELECT ven.idVenta, ven.montoTotal, emp.nombre_apellidoEmp, cli.nombre_apellidoCli,
            DATE_FORMAT(ven.fechaHoraVenta, '%Y-%m-%d %H:%i:%s') AS fechaHoraVenta
            FROM ventas ven
            INNER JOIN empleados emp ON ven.DNIEmpleado = emp.DNI_CUIL
            INNER JOIN clientes cli ON ven.idCliente = cli.idCliente`;
        const params = [];

        if (filtro && filtro !== 'undefined') {
            query += ` WHERE emp.nombre_apellidoEmp LIKE ? OR cli.nombre_apellidoCli LIKE ?`;
            params.push(`%${filtro}%`, `%${filtro}%`);
        }

        query += ` ORDER BY ven.idVenta DESC`;
        
        const safeLimit = Number(limit) || 20;
        const safeOffset = Number(offset) || 0;
        query += ` LIMIT ${safeLimit} OFFSET ${safeOffset}`;

        const [rows] = await connection.execute(query, params);
        
        const [countRows] = await connection.execute("SELECT COUNT(*) as total FROM ventas");
        const total = countRows[0].total;

        connection.release();
        
        return { ventas: rows, total };
    }

    async findDetalle(idVenta) {
        const connection = await getConnection();
        const query = `
            SELECT dven.idVenta, sto.articulo, sto.descripcion, dven.cantidadVendida, dven.subtotal
            FROM productoventa dven
            INNER JOIN productos sto ON dven.idProducto = sto.idProducto
            WHERE dven.idVenta = ?
        `;
        const [rows] = await connection.execute(query, [idVenta]);
        connection.release();
        return rows;
    }

    async createVenta(data, connection) {
        const query = 'INSERT INTO ventas (montoTotal, DNIEmpleado, idCliente, fechaHoraVenta) VALUES (?, ?, ?, ?)';
        const [result] = await connection.execute(query, [data.montoTotal, data.DNIEmpleado, data.idCliente, new Date()]);
        return result.insertId;
    }

    async createDetalle(data, connection) {
        const query = 'INSERT INTO productoventa (idVenta, idProducto, cantidadVendida, subtotal) VALUES (?, ?, ?, ?)';
        await connection.execute(query, [data.idVenta, data.idProducto, data.cantidadVendida, data.subtotal]);
    }
}

module.exports = new VentaRepository();