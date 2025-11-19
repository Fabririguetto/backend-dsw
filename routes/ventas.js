const express = require('express');
const router = express.Router();

// IMPORTANTE: Conexión centralizada
const { getConnection } = require('../config/db');

router.get('/ventas', async (req, res) => {
    const { filtro } = req.query; 

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

    try {
        const connection = await getConnection();
        const [rows] = await connection.query(query, params); 
        connection.release();
        res.json(rows);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Error en la consulta.' });
    }
});


router.get('/detalle_ventas/:idVenta', async (req, res) => {
    const { idVenta } = req.params;
    const query = `
        SELECT dven.idVenta, sto.articulo, sto.descripcion, dven.cantidadVendida, dven.subtotal
        FROM productoventa dven
        INNER JOIN productos sto ON dven.idProducto = sto.idProducto
        WHERE dven.idVenta = ?
    `;

    try {
        const connection = await getConnection();
        const [rows] = await connection.query(query, [idVenta]);
        connection.release();
        
        if (rows.length === 0) {
            res.status(404).json({ message: 'No se encontraron detalles para esta venta.' });
        } else {
            res.json(rows);
        }
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Error en la consulta.' });
    }
});

router.post('/ventas/crearVenta', async (req, res) => {
    const { montoTotal, DNIEmpleado, idCliente, fechaHoraVenta } = req.body;

    if (!montoTotal || !DNIEmpleado || !idCliente || !fechaHoraVenta) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    const query = 'INSERT INTO ventas (montoTotal, DNIEmpleado, idCliente, fechaHoraVenta) VALUES (?, ?, ?, ?)';
    try {
        const connection = await getConnection();
        const [result] = await connection.query(query, [montoTotal, DNIEmpleado, idCliente, fechaHoraVenta]);

        const newVentaId = result.insertId;
        connection.release();

        res.json({ id_venta: newVentaId });
    } catch (error) {
        console.error('Error al crear la venta:', error);
        res.status(500).json({ error: 'Error al crear la venta.' });
    }
});

// Nota: Esta ruta parece duplicada en stock.js, pero la mantenemos por compatibilidad
router.get('/stockventa', async (req, res) => {
    const { estado } = req.query;
    // FIXME: Aquí hay un riesgo si 'precioVenta' no existe en la tabla productos (parece que está en tabla precios)
    // Por ahora solo arreglamos la conexión.
    const query = 'SELECT idProducto, articulo, descripcion, cantidad, estado FROM productos WHERE estado = ?';

    try {
        const connection = await getConnection();
        const [rows] = await connection.query(query, [estado || 'Disponible']);
        connection.release();
        res.json(rows);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Error en la consulta.' });
    }
});

router.post('/ventas/agregarProductosVenta', async (req, res) => {
    const { idVenta, productos } = req.body; 

    if (!idVenta || !productos || productos.length === 0) {
        return res.status(400).json({ error: 'Venta y productos son obligatorios.' });
    }

    const connection = await getConnection();
    try {
        await connection.beginTransaction();

        for (let producto of productos) {
            const { idProducto, cantidadVendida, subtotal } = producto;

            const [stockResult] = await connection.query('SELECT cantidad FROM productos WHERE idProducto = ?', [idProducto]);
            
            if (stockResult.length === 0) {
                throw new Error(`El producto con ID ${idProducto} no existe.`);
            }

            const cantidadDisponible = stockResult[0].cantidad;

            if (cantidadVendida > cantidadDisponible) {
                throw new Error(`No hay suficiente stock para el producto ${idProducto}. Disponible: ${cantidadDisponible}, solicitado: ${cantidadVendida}.`);
            }

            const queryInsertVenta = 'INSERT INTO productoventa (idVenta, idProducto, cantidadVendida, subtotal) VALUES (?, ?, ?, ?)';
            await connection.query(queryInsertVenta, [idVenta, idProducto, cantidadVendida, subtotal]);

            const queryActualizarStock = 'UPDATE productos SET cantidad = cantidad - ? WHERE idProducto = ?';
            await connection.query(queryActualizarStock, [cantidadVendida, idProducto]);
        }

        await connection.commit();
        connection.release();
        res.json({ message: 'Productos agregados a la venta y stock actualizado exitosamente.' });
    } catch (error) {
        if (connection) await connection.rollback();
        if (connection) connection.release();
        console.error('Error al agregar productos o actualizar stock:', error);
        res.status(500).json({ error: 'Error al agregar productos o actualizar stock.' });
    }
});

router.put('/ventas/:idVenta', async (req, res) => {
    const { idVenta } = req.params;
    const { totalVenta } = req.body;
  
    try {
      const connection = await getConnection();
      const result = await connection.query('UPDATE ventas SET montoTotal = ? WHERE idVenta = ?', [totalVenta, idVenta]);
      connection.release();
  
      if (result.affectedRows > 0) {
        res.status(200).json({ message: 'Venta actualizada con éxito' });
      } else {
        res.status(404).json({ message: 'Venta no encontrada' });
      }
    } catch (error) {
      console.error('Error al actualizar la venta:', error);
      res.status(500).json({ message: 'Error al actualizar la venta' });
    }
});
  
module.exports = router;