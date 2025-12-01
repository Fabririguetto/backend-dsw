const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');

router.get('/articulos', stockController.getAll);

module.exports = router;