const express = require('express');
const router = express.Router();
const ventaController = require('../controllers/ventaController'); 
const { verifyToken } = require('../middlewares/authMiddleware'); 

router.get('/:idVenta',verifyToken, ventaController.getDetalle); 

module.exports = router;