const clienteRepository = require('../repositories/clienteRepository');

class ClienteController {

    async getAll(req, res) {
        try {
            const clientes = await clienteRepository.findAll(req.query.nombre);
            res.json(clientes);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener clientes' });
        }
    }

    async getByDni(req, res) {
        try {
            const cliente = await clienteRepository.findByDni(req.params.dni);
            if (cliente) res.json(cliente);
            else res.status(404).json({ error: 'Cliente no encontrado' });
        } catch (error) {
            res.status(500).json({ error: 'Error al buscar cliente' });
        }
    }

    async create(req, res) {
        try {
            const data = req.body.sanitizedInput;
            const id = await clienteRepository.create(data);
            res.status(201).json({ id, ...data });
        } catch (error) {
            console.error('ERROR CREATE CLIENTE:', error);
            res.status(500).json({ error: 'Error al crear cliente' });
        }
    }

    async update(req, res) {
        try {
            const data = req.body.sanitizedInput;
            await clienteRepository.update(req.params.id, data);
            res.json({ message: 'Cliente actualizado' });
        } catch (error) {
            console.error('ERROR UPDATE CLIENTE:', error);
            res.status(500).json({ error: 'Error al actualizar cliente' });
        }
    }
}

module.exports = new ClienteController();