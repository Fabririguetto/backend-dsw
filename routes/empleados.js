const express = require('express');
const router = express.Router();
const empleadoController = require('../controllers/empleadoController');
const { verifyToken, verifyAdmin } = require('../middlewares/authMiddleware');

router.get('/', verifyToken, verifyAdmin, empleadoController.getAll)
router.post('/', verifyToken, verifyAdmin, empleadoController.create);
router.put('/:id', verifyToken, verifyAdmin, empleadoController.update);

module.exports = router;