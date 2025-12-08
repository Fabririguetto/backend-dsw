const express = require('express');
const router = express.Router();
const sucursalController = require('../controllers/sucursalController');

router.get('/', sucursalController.getAll);

module.exports = router;