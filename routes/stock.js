const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');
const { verifyToken, verifyAdmin } = require('../middlewares/authMiddleware');
const sanitizeStockInput = require('../middlewares/sanitizeStockInput');
const validateStockInput = require('../middlewares/validateStockInput');

router.get('/', verifyToken, stockController.getAll); 

router.post('/', verifyToken, verifyAdmin,sanitizeStockInput, validateStockInput, stockController.create);
router.put('/:id', verifyToken, verifyAdmin,sanitizeStockInput, validateStockInput, stockController.update);
router.put('/:id/estado', verifyToken, verifyAdmin,sanitizeStockInput, validateStockInput, stockController.updateEstado);
module.exports = router;