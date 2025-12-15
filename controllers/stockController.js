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
            res.status(500).json({ error: 'Error al obtener stock' });
        }
    }

    async create(req, res) {
        try {
            await stockRepository.create(req.body.sanitizedInput);
            res.status(201).json({ message: 'Producto creado' });
        } catch (error) {
            res.status(500).json({ error: 'Error al crear producto' });
        }
    }

    async update(req, res) {
        try {
            await stockRepository.update(req.params.id, req.body.sanitizedInput);
            res.json({ message: 'Producto actualizado' });
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar producto' });
        }
    }

    async updateEstado(req, res) {
        const { estado } = req.body.sanitizedInput;

        if (!estado) {
            return res.status(400).json({ error: 'El estado es obligatorio' });
        }

        try {
            await stockRepository.updateEstado(req.params.id, estado);
            res.json({ message: 'Estado actualizado' });
        } catch (error) {
            res.status(500).json({ error: 'Error al cambiar estado' });
        }
    }
}

module.exports = new StockController();