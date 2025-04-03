// routes/farm.routes.js
const express = require('express');
const router = express.Router();
const farmController = require('../controllers/farm.controller');
const jwt = require('jsonwebtoken');

// Use the same JWT secret as auth controller
const JWT_SECRET = "farm_management_secret_key_2025";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No token provided.'
    });
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(403).json({
      success: false,
      message: 'Invalid token',
      error: error.message
    });
  }
};

router.post('/create', authenticateToken, farmController.createOrGetFarm);
router.get('/user-farms', authenticateToken, farmController.getUserFarms);

module.exports = router;