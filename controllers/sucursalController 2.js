const sucursalRepository = require('../repositories/sucursalRepository');

class SucursalController {
    async getAll(req, res) {
        try {
            const sucursales = await sucursalRepository.findAll(req.query.filtro);
            res.json(sucursales);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener sucursales' });
        }
    }
}

module.exports = new SucursalController();