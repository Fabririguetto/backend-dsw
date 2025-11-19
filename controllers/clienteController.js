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
            const id = await clienteRepository.create(req.body);
            res.json({ id, ...req.body });
        } catch (error) {
            res.status(500).json({ error: 'Error al crear cliente' });
        }
    }

    async update(req, res) {
        try {
            await clienteRepository.update(req.params.id, req.body);
            res.json({ message: 'Cliente actualizado' });
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar cliente' });
        }
    }
}

module.exports = new ClienteController();