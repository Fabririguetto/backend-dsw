const { getConnection } = require('../config/db');
const ventaRepository = require('../repositories/ventaRepository');
const stockRepository = require('../repositories/stockRepository');

class VentaService {

    async obtenerVentas(filtro) {
        return await ventaRepository.findAll(filtro);
    }

    async obtenerDetalle(idVenta) {
        return await ventaRepository.findDetalle(idVenta);
    }

    async crearNuevaVenta(ventaData) {
        const { montoTotal, DNIEmpleado, idCliente, productos } = ventaData;
        
        if (!productos || productos.length === 0) {
            throw new Error('La venta debe tener al menos un producto');
        }

        const connection = await getConnection();

        try {
            await connection.beginTransaction();

            const idVenta = await ventaRepository.createVenta({
                montoTotal,
                DNIEmpleado,
                idCliente
            }, connection);

            for (const prod of productos) {
                const { idProducto, cantidadVendida, subtotal } = prod;

                const stockActual = await stockRepository.getStockActual(idProducto, connection);
                if (stockActual < cantidadVendida) {
                    throw new Error(`Stock insuficiente para el producto ID ${idProducto}. Disponible: ${stockActual}`);
                }

                await stockRepository.descontarStock(idProducto, cantidadVendida, connection);

                await ventaRepository.createDetalle({
                    idVenta,
                    idProducto,
                    cantidadVendida,
                    subtotal
                }, connection);
            }

            await connection.commit();
            return idVenta;

        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }
}

module.exports = new VentaService();