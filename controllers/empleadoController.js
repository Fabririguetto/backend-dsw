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
        try {
            const {
                DNI_CUIL,
                nombre_apellidoEmp,
                contacto,
                sucursal,
                email,
                password,
                idrol
            } = req.body.sanitizedInput;

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
        try {
            const data = req.body.sanitizedInput;

            if (!data || Object.keys(data).length === 0) {
                return res.status(400).json({
                    error: 'No hay datos válidos para actualizar'
                });
            }

            await empleadoRepository.update(req.params.id, data);

            res.json({ message: 'Empleado actualizado' });

        } catch (error) {
            console.error('ERROR UPDATE EMPLEADO:', error);
            res.status(500).json({ error: 'Error al actualizar empleado' });
        }
    }
}

module.exports = new EmpleadoController();