// routes/record.routes.js
const express = require('express');
const router = express.Router();
const { authenticate } = require('../controllers/auth.controller');
const { createRecord } = require('../controllers/record.controller');

router.post('/create', authenticate, createRecord);

module.exports = router;