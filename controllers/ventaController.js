const ventaService = require('../services/ventaService');

class VentaController {

async getAll(req, res) {
        try {
            const { filtro = '', limite = 20, pagina = 0 } = req.query;
            
            const limitValue = parseInt(limite) || 20;
            const offsetValue = (parseInt(pagina) || 0) * limitValue;

            const resultado = await ventaService.obtenerVentas({
                filtro, 
                limit: limitValue, 
                offset: offsetValue
            });

            res.json({
                ventas: resultado.rows, 
                totalVentas: resultado.count, 
                totalPages: Math.ceil(resultado.count / limitValue) 
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener ventas' });
        }
    }

    async getDetalle(req, res) {
        try {
            const detalles = await ventaService.obtenerDetalle(req.params.idVenta);
            if (detalles.length === 0) {
                return res.status(404).json({ message: 'Venta no encontrada' });
            }
            res.json(detalles);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener detalles' });
        }
    }

    async create(req, res) {
        try {
            // Llamamos al servicio que contiene la transacción
            const idVenta = await ventaService.crearNuevaVenta(req.body);
            res.json({ message: 'Venta registrada con éxito', id_venta: idVenta });
        } catch (error) {
            console.error('Error en venta:', error.message);
            // Respondemos 400 si es error de validación (ej: sin stock)
            res.status(400).json({ error: error.message || 'Error al procesar la venta' });
        }
    }
}

module.exports = new VentaController();