const express = require('express');
const router = express.Router();
const ventaController = require('../controllers/ventaController');

router.get('/', ventaController.getAll);
router.get('/:idVenta/detalle', ventaController.getDetalle);

router.post('/crearVenta', ventaController.create);


module.exports = router;