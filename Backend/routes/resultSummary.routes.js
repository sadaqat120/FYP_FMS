// routes/resultSummary.routes.js
const express = require('express');
const router = express.Router();
const { authenticate } = require('../controllers/auth.controller');
const { createResultSummary } = require('../controllers/resultSummary.controller');

// Add console.log for debugging
router.post('/', (req, res, next) => {
    console.log('Route hit: POST /api/result-summaries');
    console.log('Request body:', req.body);
    next();
  }, authenticate, createResultSummary);
module.exports = router;