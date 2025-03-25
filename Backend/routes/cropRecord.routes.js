// routes/cropRecord.routes.js
const express = require('express');
const router = express.Router();
const { authenticate } = require('../controllers/auth.controller');
const { createCropRecord, getCropRecords } = require('../controllers/cropRecord.controller');

router.post('/create', authenticate, createCropRecord);
router.get('/list', authenticate, getCropRecords);

module.exports = router;