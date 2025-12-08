const empleadoRepository = require('../repositories/empleadoRepository');

class EmpleadoController {
    
    async getAll(req, res) {
        try {
            const empleados = await empleadoRepository.findAll(req.query.nombre);
            res.json(empleados);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener empleados' });
        }
    }

    async create(req, res) {
        const { 
            DNI_CUIL, 
            nombre_apellidoEmp, 
            contacto, 
            sucursal, 
            email, 
            password, 
            idrol
        } = req.body;

        if (!DNI_CUIL || !nombre_apellidoEmp || !contacto || !sucursal || !email || !password || !idrol) {
            return res.status(400).json({ error: 'Datos incompletos' });
        }

        try {
            await empleadoRepository.create({
                DNI_CUIL,
                nombre_apellidoEmp,
                contacto,
                sucursal,
                email,
                password,
                idrol
            });

            res.status(201).json({ message: 'Empleado creado' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al crear empleado' });
        }
    }

    async update(req, res) {
        const { id } = req.params;

        try {
            await empleadoRepository.update(id, req.body);
            res.json({ message: 'Empleado actualizado' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al actualizar empleado' });
        }
    }
}

module.exports = new EmpleadoController();
