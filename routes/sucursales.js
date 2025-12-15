const express = require('express');
const router = express.Router();
const sucursalController = require('../controllers/sucursalController');
const { verifyToken, verifyAdmin } = require('../middlewares/authMiddleware'); 

router.get('/', verifyToken, verifyAdmin, sucursalController.getAll);

module.exports = router;