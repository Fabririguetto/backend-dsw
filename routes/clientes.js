const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

router.get('/', clienteController.getAll);
router.get('/:dni', clienteController.getByDni);
router.post('/', clienteController.create);
router.put('/:id', clienteController.update);

module.exports = router;