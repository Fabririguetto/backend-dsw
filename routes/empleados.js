const express = require('express');
const router = express.Router();
const empleadoController = require('../controllers/empleadoController');
const { verifyToken, verifyAdmin } = require('../middlewares/authMiddleware');
const sanitizeEmpleadoInput = require('../middlewares/sanitizeEmpleadoInput');
const validateEmpleadoInput = require('../middlewares/validateEmpleadoInput');

router.get('/', verifyToken, verifyAdmin,  empleadoController.getAll)
router.post('/', verifyToken, verifyAdmin,sanitizeEmpleadoInput, validateEmpleadoInput, empleadoController.create);
router.put('/:id', verifyToken, verifyAdmin,sanitizeEmpleadoInput, empleadoController.update);

module.exports = router;