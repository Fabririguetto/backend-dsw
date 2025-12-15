const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');
const { verifyToken, verifyAdmin } = require('../middlewares/authMiddleware'); 

router.get('/', verifyToken, stockController.getAll); 

router.post('/', verifyToken, verifyAdmin, stockController.create);
router.put('/:id', verifyToken, verifyAdmin, stockController.update); 
router.put('/:id', verifyToken, verifyAdmin, stockController.updateEstado); 

module.exports = router;