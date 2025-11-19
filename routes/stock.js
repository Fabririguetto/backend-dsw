const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');

// Rutas mapeadas al Controlador
router.get('/stock', stockController.getAll);

// Reutilizamos el método getAll para la venta, ya que filtra y busca igual
router.get('/stockventa', stockController.getAll); 

router.post('/stock', stockController.create);
router.put('/stock/:id', stockController.update);
router.put('/stockelim/:id', stockController.delete); // Eliminar lógico (cambio de estado)

module.exports = router;