const express = require('express');
const router = express.Router();
const ventaController = require('../controllers/ventaController');

router.get('/', ventaController.getAll);
router.get('/:idVenta/detalle', ventaController.getDetalle);

// Esta ruta maneja la creación completa (Cabecera + Productos)
router.post('/crearVenta', ventaController.create);

// Rutas legacy (si el front viejo las llama, las ignoramos o redirigimos)
// router.post('/ventas/agregarProductosVenta', ...) -> YA NO SE USA

module.exports = router;