const express = require("express");
const router = express.Router();
const User = require("../models/user"); // Ensure this path is correct

// Example route (adjust according to your project needs)
router.post("/signup", async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      // Check for missing fields
      if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required." });
      }
  
      // Check if the username or email already exists
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        return res
          .status(409)
          .json({ message: "Username or email already exists." });
      }
  
      // Create a new user
      const newUser = new User({ username, email, password });
      await newUser.save();
      res.status(201).json({ message: "User registered successfully!" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  });
  

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check password (you can add hashed password verification if needed)
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Successful login
    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;