const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');

router.get('/', stockController.getAll);
router.post('/', stockController.create);

router.put('/:id', stockController.update); 
router.put('/:id', stockController.updateEstado); 

module.exports = router;