const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

// Auth routes
router.post("/signup", authController.signup);
router.post("/login", authController.login);

// Example of a protected route (for future use)
router.get("/profile", authController.authenticate, (req, res) => {
  res.status(200).json({
    success: true,
    user: {
      id: req.user._id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      phone: req.user.phone,
    },
  });
});

module.exports = router;