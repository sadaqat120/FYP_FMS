// auth.js
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
      const { firstName, lastName, email, phone, password } = req.body;

      // Check if either email or phone already exists
      const existingUser = await User.findOne({
          $or: [{ email: email }, { phone: phone }]
      });

      if (existingUser) {
          if (existingUser.email === email) {
              return res.status(400).json({ message: "Email already exists!" });
          }
          if (existingUser.phone === phone) {
              return res.status(400).json({ message: "Phone number already exists!" });
          }
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create new user
      const newUser = new User({
          firstName,
          lastName,
          email,
          phone,
          password: hashedPassword
      });

      await newUser.save();
      res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error!" });
  }
});


// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token: `Bearer ${token}`, user: { id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
});

module.exports = router;

