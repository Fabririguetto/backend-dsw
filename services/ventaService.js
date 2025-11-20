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

    // Lógica Transaccional: Venta + Detalles + Descuento Stock
    async crearNuevaVenta(ventaData) {
        const { montoTotal, DNIEmpleado, idCliente, productos } = ventaData;
        
        if (!productos || productos.length === 0) {
            throw new Error('La venta debe tener al menos un producto');
        }

        const connection = await getConnection();

        try {
            // 1. Iniciamos Transacción (Todo o nada)
            await connection.beginTransaction();

            // 2. Crear Cabecera de Venta
            const idVenta = await ventaRepository.createVenta({
                montoTotal,
                DNIEmpleado,
                idCliente
            }, connection);

            // 3. Procesar cada producto
            for (const prod of productos) {
                const { idProducto, cantidadVendida, subtotal } = prod;

                // a. Validar Stock
                const stockActual = await stockRepository.getStockActual(idProducto, connection);
                if (stockActual < cantidadVendida) {
                    throw new Error(`Stock insuficiente para el producto ID ${idProducto}. Disponible: ${stockActual}`);
                }

                // b. Descontar Stock
                await stockRepository.descontarStock(idProducto, cantidadVendida, connection);

                // c. Guardar Detalle
                await ventaRepository.createDetalle({
                    idVenta,
                    idProducto,
                    cantidadVendida,
                    subtotal
                }, connection);
            }

            // 4. Si todo salió bien, confirmamos cambios
            await connection.commit();
            return idVenta;

        } catch (error) {
            // 5. Si algo falló, deshacemos todo (Rollback)
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }
}

module.exports = new VentaService();