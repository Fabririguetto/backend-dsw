const express = require('express');
const router = express.Router();
const ventaController = require('../controllers/ventaController');
const { verifyToken } = require('../middlewares/authMiddleware');
const sanitizeVentaInput = require('../middlewares/sanitizeVentaInput');
const validateVentaInput = require('../middlewares/validateVentaInput');

router.get('/', verifyToken, ventaController.getAll);
router.get('/:idVenta/detalle', verifyToken, ventaController.getDetalle);

router.post('/crearVenta', verifyToken,sanitizeVentaInput, validateVentaInput, ventaController.create);


module.exports = router;