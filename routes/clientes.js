const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

router.get('/clientes', clienteController.getAll);
router.get('/clientesventa/:dni', clienteController.getByDni);
router.post('/clientes', clienteController.create);
router.put('/clientes/:id', clienteController.update);

module.exports = router;