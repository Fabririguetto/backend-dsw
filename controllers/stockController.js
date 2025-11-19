const stockRepository = require('../repositories/stockRepository');

class StockController {
    
    async getAll(req, res) {
        try {
            const { producto = '', limite = 20, pagina = 0 } = req.query;
            const limitValue = parseInt(limite) || 20;
            const offsetValue = (parseInt(pagina) || 0) * limitValue;

            const [productos, total] = await Promise.all([
                stockRepository.findAll({ limit: limitValue, offset: offsetValue, search: producto }),
                stockRepository.countAll(producto)
            ]);

            res.json({
                productos,
                totalProductos: total,
                totalPages: Math.ceil(total / limitValue)
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener stock' });
        }
    }

    async create(req, res) {
        try {
            const id = await stockRepository.create(req.body);
            res.status(201).json({ message: 'Producto creado', id });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al crear producto' });
        }
    }

    async update(req, res) {
        try {
            await stockRepository.update(req.params.id, req.body);
            res.json({ message: 'Producto actualizado' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al actualizar producto' });
        }
    }

    async delete(req, res) {
        try {
            const nuevoEstado = req.body.estado === 'Alta' ? 'Baja' : 'Alta';
            const success = await stockRepository.updateEstado(req.params.id, nuevoEstado);
            if (success) res.json({ message: 'Estado actualizado', nuevoEstado });
            else res.status(404).json({ error: 'Producto no encontrado' });
        } catch (error) {
            res.status(500).json({ error: 'Error al cambiar estado' });
        }
    }
}

module.exports = new StockController();