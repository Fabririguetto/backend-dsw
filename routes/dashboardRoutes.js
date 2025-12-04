const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

router.get('/estadisticas', dashboardController.getEstadisticas);

module.exports = router;