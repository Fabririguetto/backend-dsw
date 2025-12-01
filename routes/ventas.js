const express = require('express');
const router = express.Router();
const ventaController = require('../controllers/ventaController');

router.get('/ventas', ventaController.getAll);
router.get('/detalle_ventas/:idVenta', ventaController.getDetalle);

router.post('/ventas/crearVenta', ventaController.create);

module.exports = router;