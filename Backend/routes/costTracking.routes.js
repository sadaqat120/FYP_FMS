// routes/costTracking.routes.js
const express = require('express');
const router = express.Router();
const { authenticate } = require('../controllers/auth.controller');
const { createCostTracking, getCostTrackingRecords } = require('../controllers/costTracking.controller');

router.post('/create', authenticate, createCostTracking);
router.get('/list', authenticate, getCostTrackingRecords);

module.exports = router;