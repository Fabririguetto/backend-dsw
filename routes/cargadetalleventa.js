const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');

// Reutilizamos el controlador de stock para listar artículos disponibles
router.get('/articulos', stockController.getAll);

module.exports = router;