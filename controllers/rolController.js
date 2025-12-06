const rolRepository = require('../repositories/rolRepository');

class RolController {
    
    async getAll(req, res) {
        try {
            const roles = await rolRepository.findAll();
            res.json(roles);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener roles' });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const rol = await rolRepository.findById(id);

            if (!rol) {
                return res.status(404).json({ error: 'Rol no encontrado' });
            }

            res.json(rol);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener el rol' });
        }
    }

    async create(req, res) {
        const { idrol, rol } = req.body;

        if (!idrol || !rol) {
            return res.status(400).json({ error: 'Datos incompletos. Se requiere idrol y rol.' });
        }

        try {
            await rolRepository.create({ idrol, rol });
            
            res.status(201).json({ message: 'Rol creado', id: idrol });
        } catch (error) {
            console.error(error);
            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ error: 'El ID de rol ya existe.' });
            }
            res.status(500).json({ error: 'Error al crear el rol' });
        }
    }

    async update(req, res) {
        const { id } = req.params;
        const { rol } = req.body;

        if (!rol) {
             return res.status(400).json({ error: 'Datos incompletos. Se requiere el nombre del rol.' });
        }

        try {
            const result = await rolRepository.update(id, { rol });

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Rol no encontrado para actualizar' });
            }
            
            res.json({ message: 'Rol actualizado' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al actualizar rol' });
        }
    }
    
    async remove(req, res) {
        const { id } = req.params;

        try {
            const result = await rolRepository.remove(id);

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Rol no encontrado para eliminar' });
            }
            
            res.json({ message: 'Rol eliminado' });
        } catch (error) {
            console.error(error);
            // Manejo de error por clave foránea (ER_ROW_IS_REFERENCED_2)
            if (error.code === 'ER_ROW_IS_REFERENCED_2') {
                return res.status(409).json({ error: 'No se puede eliminar el rol, ya que está asignado a empleados.' });
            }
            res.status(500).json({ error: 'Error al eliminar rol' });
        }
    }
}

module.exports = new RolController();