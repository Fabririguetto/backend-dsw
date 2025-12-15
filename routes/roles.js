const express = require('express');
const router = express.Router();
const rolController = require('../controllers/rolController');
const { verifyToken, verifyAdmin } = require('../middlewares/authMiddleware');

router.get('/', verifyToken, verifyAdmin, rolController.getAll); 

router.get('/:id', verifyToken, verifyAdmin, rolController.getById);

module.exports = router;