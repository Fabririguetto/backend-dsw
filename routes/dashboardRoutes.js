const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { verifyToken, verifyAdmin } = require('../middlewares/authMiddleware');

router.get('/estadisticas', verifyToken, verifyAdmin, dashboardController.getEstadisticas);

module.exports = router;