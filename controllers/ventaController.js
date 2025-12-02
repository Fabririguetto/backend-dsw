const ventaService = require('../services/ventaService');

class VentaController {

    async getAll(req, res) {
        try {
            const { filtro = '', pagina = 0, limite = 20 } = req.query;
            
            const limitValue = parseInt(limite, 10) || 20;
            const pageValue = Math.max(0, parseInt(pagina, 10));
            const offsetValue = pageValue * limitValue;

            // Obtenemos datos + total
            const resultado = await ventaService.obtenerVentas({ 
                limit: limitValue, 
                offset: offsetValue, 
                filtro 
            });

            // Enviamos el objeto completo { ventas: [...], total: 150 }
            // para que el frontend pueda calcular las páginas.
            res.json(resultado);

        } catch (error) {
            console.error('Error en getAll Ventas:', error);
            res.status(500).json({ error: 'Error al obtener ventas' });
        }
    }
    
    // ... (El resto de los métodos getDetalle y create quedan igual)
    async getDetalle(req, res) {
        try {
            const detalles = await ventaService.obtenerDetalle(req.params.idVenta);
            if (detalles.length === 0) return res.status(404).json({ message: 'Venta no encontrada' });
            res.json(detalles);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener detalles' });
        }
    }

    async create(req, res) {
        try {
            const idVenta = await ventaService.crearNuevaVenta(req.body);
            res.json({ message: 'Venta registrada', id_venta: idVenta });
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new VentaController();