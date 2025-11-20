const express = require('express');
const router = express.Router();
const ventaController = require('../controllers/ventaController');

router.get('/ventas', ventaController.getAll);
router.get('/detalle_ventas/:idVenta', ventaController.getDetalle);

// Esta ruta maneja la creación completa (Cabecera + Productos)
router.post('/ventas/crearVenta', ventaController.create);

// Rutas legacy (si el front viejo las llama, las ignoramos o redirigimos)
// router.post('/ventas/agregarProductosVenta', ...) -> YA NO SE USA

module.exports = router;