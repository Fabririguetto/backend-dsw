const { getConnection } = require('../config/db');

class VentaRepository {

    async findAll(filtro) {
        const connection = await getConnection();
        let query = `
            SELECT ven.idVenta, ven.montoTotal, emp.nombre_apellidoEmp, cli.nombre_apellidoCli, 
                DATE_FORMAT(ven.fechaHoraVenta, '%Y-%m-%d %H:%i:%s') AS fechaHoraVenta
            FROM ventas ven
            INNER JOIN empleados emp ON ven.DNIEmpleado = emp.DNI_CUIL
            INNER JOIN clientes cli ON ven.idCliente = cli.idCliente
        `;
        const params = [];

        if (filtro) {
            query += ` WHERE emp.nombre_apellidoEmp LIKE ? OR cli.nombre_apellidoCli LIKE ?`;
            params.push(`%${filtro}%`, `%${filtro}%`);
        }

        query += ` ORDER BY ven.fechaHoraVenta DESC`;

        const [rows] = await connection.execute(query, params);
        connection.release();
        return rows;
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

    // Recibe la conexión de la transacción para insertar la cabecera
    async createVenta(data, connection) {
        const query = 'INSERT INTO ventas (montoTotal, DNIEmpleado, idCliente, fechaHoraVenta) VALUES (?, ?, ?, ?)';
        const [result] = await connection.execute(query, [data.montoTotal, data.DNIEmpleado, data.idCliente, new Date()]);
        return result.insertId;
    }

    // Recibe la conexión de la transacción para insertar un detalle
    async createDetalle(data, connection) {
        const query = 'INSERT INTO productoventa (idVenta, idProducto, cantidadVendida, subtotal) VALUES (?, ?, ?, ?)';
        await connection.execute(query, [data.idVenta, data.idProducto, data.cantidadVendida, data.subtotal]);
    }
}

module.exports = new VentaRepository();