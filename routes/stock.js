const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');

router.get('/stock', stockController.getAll);

router.get('/stockventa', stockController.getAll); 

router.post('/stock', stockController.create);
router.put('/stock/:id', stockController.update);
router.put('/stockelim/:id', stockController.delete); 

module.exports = router;