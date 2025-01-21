const express = require('express');
const dashboardController = require('../controllers/dashboard.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/summary', authMiddleware, dashboardController.getSummary);

module.exports = router;
