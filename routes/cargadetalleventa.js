const express = require('express');
const router = express.Router();
const ventaController = require('../controllers/ventaController'); 

router.get('/:idVenta', ventaController.getDetalle); 

module.exports = router;