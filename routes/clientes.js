const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/', verifyToken, clienteController.getAll);
router.get('/:dni', verifyToken, clienteController.getByDni);
router.post('/', verifyToken, clienteController.create);
router.put('/:id', verifyToken, clienteController.update);

module.exports = router;