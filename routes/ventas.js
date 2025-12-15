const express = require('express');
const router = express.Router();
const ventaController = require('../controllers/ventaController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/', verifyToken, ventaController.getAll);
router.get('/:idVenta/detalle', verifyToken, ventaController.getDetalle);

router.post('/crearVenta', verifyToken, ventaController.create);


module.exports = router;