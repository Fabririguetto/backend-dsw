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
            console.error('Error al obtener stock:', error);
            res.status(500).json({ error: 'Error al obtener stock' });
        }
    }

    async create(req, res) {
        const { articulo, descripcion, cantidad, monto } = req.body;

        if (!articulo || !descripcion || !cantidad || !monto) {
            return res.status(400).json({ error: 'Datos incompletos para crear producto' });
        }
        
        if (isNaN(Number(cantidad)) || isNaN(Number(monto))) {
            return res.status(400).json({ error: 'Cantidad y monto deben ser números válidos.' });
        }
        
        try {
            await stockRepository.create(req.body);
            res.status(201).json({ message: 'Producto creado' });
        } catch (error) {
            console.error('Error al crear producto:', error);
            res.status(500).json({ error: 'Error al crear producto' });
        }
    }

    async update(req, res) {
            const { id } = req.params;
            const dataToUpdate = req.body;

            if ('cantidad' in dataToUpdate && dataToUpdate.cantidad !== null && isNaN(Number(dataToUpdate.cantidad))) {
                return res.status(400).json({ error: 'El campo "cantidad" debe ser un número entero válido.' });
            }
            if ('monto' in dataToUpdate && dataToUpdate.monto !== null && isNaN(Number(dataToUpdate.monto))) {
                return res.status(400).json({ error: 'El campo "monto" debe ser un número válido.' });
            }

            const sanitizedData = Object.keys(dataToUpdate).reduce((acc, key) => {
                const value = dataToUpdate[key];
                if (value !== undefined) {
                    if ((key === 'cantidad' || key === 'monto') && (value === '' || value === null)) {
                        acc[key] = null;
                    } else {
                        acc[key] = value;
                    }
                }
                return acc;
            }, {});
            
            if (Object.keys(sanitizedData).length === 0) {
                return res.status(400).json({ error: 'No se proporcionaron datos válidos para actualizar.' });
            }

            try {
                await stockRepository.update(id, sanitizedData); 
                res.json({ message: 'Producto actualizado' });
            } catch (error) {
                console.error('Error al actualizar producto:', error);
                res.status(500).json({ error: 'Error al actualizar producto' });
            }
        }
    async updateEstado(req, res) {
        const { id } = req.params;
        const { estado } = req.body; 

        if (!estado) {
            return res.status(400).json({ error: 'El estado es obligatorio.' });
        }

        try {
            await stockRepository.updateEstado(id, estado);
            res.json({ message: `Estado del producto ${id} actualizado a ${estado}.` });
        } catch (error) {
            console.error('Error al cambiar el estado del producto:', error);
            res.status(500).json({ error: 'Error al cambiar el estado del producto.' });
        }
    }
}

module.exports = new StockController();