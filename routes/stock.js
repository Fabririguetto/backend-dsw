const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');
// const { verificarToken } = require('../middleware/authMiddleware'); // Asumiendo que esta línea existe

// Rutas de STOCK (prefijo: /stock)

// GET /stock: Listar productos con paginación/búsqueda
router.get('/', stockController.getAll);

// POST /stock: Crear nuevo producto
router.post('/', stockController.create);

// PUT /stock/:id: Actualizar un producto existente (Línea 13 de tu error)
router.put('/:id', stockController.update); 

// Rutas de STOCKELIM (prefijo: /stockelim)
// PUT /stockelim/:id: Cambiar estado (Borrado Lógico)
// NOTA: En index.js, esto se mapea con app.use('/stockelim', stockRoutes);
router.put('/:id', stockController.updateEstado); 

module.exports = router;