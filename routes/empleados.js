const express = require('express');
const router = express.Router();
const empleadoController = require('../controllers/empleadoController');

router.get('/empleados', empleadoController.getAll);
router.post('/empleados', empleadoController.create);
router.put('/empleados/:id', empleadoController.update);

module.exports = router;