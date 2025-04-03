// routes/dashboard.routes.js
const express = require('express');
const router = express.Router();
const { authenticate } = require('../controllers/auth.controller');
const { getDashboardData } = require('../controllers/dashboard.controller');

router.get('/', authenticate, getDashboardData);

module.exports = router;