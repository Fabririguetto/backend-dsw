const express = require('express');
const router = express.Router();
const empleadoController = require('../controllers/empleadoController');

// Rutas mapeadas al Controlador
router.get('/', empleadoController.getAll);
router.post('/', empleadoController.create);
router.put('/:id', empleadoController.update);

module.exports = router;