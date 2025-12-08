const rolRepository = require('../repositories/rolRepository'); 

class RolController {
    
    async getAll(req, res) {
        try {
            const roles = await rolRepository.findAll();
            res.json(roles);
        } catch (error) {
            console.error('Error en RolController.getAll:', error);
            res.status(500).json({ error: 'Error al obtener roles' });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const rol = await rolRepository.findById(id);

            if (!rol) {
                // Not Found (404) si no existe
                return res.status(404).json({ error: 'Rol no encontrado' });
            }

            res.json(rol);
        } catch (error) {
            console.error('Error en RolController.getById:', error);
            res.status(500).json({ error: 'Error al obtener el rol' });
        }
    }
}

module.exports = new RolController();