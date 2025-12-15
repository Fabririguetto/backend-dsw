const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const { verifyToken } = require('../middlewares/authMiddleware');
const sanitizeClienteInput = require('../middlewares/sanitizeClienteInput');
const validateClienteInput = require('../middlewares/validateClienteInput');

router.get('/', verifyToken, clienteController.getAll);
router.get('/:dni', verifyToken, clienteController.getByDni);
router.post('/', verifyToken, sanitizeClienteInput, validateClienteInput,clienteController.create);
router.put('/:id', verifyToken, sanitizeClienteInput, validateClienteInput,clienteController.update);

module.exports = router;