const express = require('express');
const router = express.Router();
const rolController = require('../controllers/rolController');

router.get('/', rolController.getAll); 

router.get('/:id', rolController.getById);

router.post('/', rolController.create); 

router.put('/:id', rolController.update); 

router.delete('/:id', rolController.remove); 

module.exports = router;