const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Updated Sign-up Route (Generates JWT Token)
router.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, profilePicture = null, location = null } = req.body; // Allow profilePicture to be null

    // Check if either email or phone already exists
    const existingUser  = await User.findOne({
      $or: [{ email: email }, { phone: phone }],
    });

    if (existingUser ) {
      if (existingUser .email === email) {
        return res.status(400).json({ message: "Email already exists!" });
      }
      if (existingUser .phone === phone) {
        return res.status(400).json({ message: "Phone number already exists!" });
      }
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser  = new User({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      profilePicture, // Store the profile picture (null or path)
      location,
    });

    await newUser .save();

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser ._id, firstName, lastName, email, profilePicture }, // Include profile picture in the token
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Return token and user info
    res.status(201).json({
      message: "User  registered successfully!",
      token: `Bearer ${token}`,
      user: { firstName, lastName, email, profilePicture }, // Include profile picture in the response
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error!" });
  }
});

// Login Route (Supports Email & Phone)
router.post("/login", async (req, res) => {
  const { emailOrPhone, password } = req.body;

  try {
    // Find user by email OR phone
    const user = await User.findOne({
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }]
    });

    if (!user) return res.status(400).json({ message: "Invalid email or password." });

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password." });

    const token = jwt.sign(
      { id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email, profilePicture: user.profilePicture }, // Include profile picture in the token
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    
    res.json({
      token: `Bearer ${token}`,
      user: { id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email, profilePicture: user.profilePicture } // Include profile picture in the response
    });
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
});

// Fetch user details route
router.get("/user", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from the token
    const user = await User.findById(userId).select("firstName lastName email phone profilePicture location"); // Select only necessary fields
    res.json(user);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ error: "Failed to fetch user details" });
  }
});

// Update user details route
router.put("/user", authMiddleware, async (req, res) => {
  const { firstName, lastName, email, phone } = req.body;

  try {
    const userId = req.user.id; // Get user ID from the token
    await User.findByIdAndUpdate(userId, { firstName, lastName, email, phone });
    res.json({ message: "User  details updated successfully." });
  } catch (error) {
    console.error("Error updating user details:", error);
    res.status(500).json({ error: "Failed to update user details" });
  }
});

// Change password route
router.post("/change-password", authMiddleware, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const userId = req.user.id; // Get user ID from the token
    const user = await User.findById(userId);

    // Check if the current password matches
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Current password is incorrect." });
    }

    // Hash the new password and update it
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(userId, { password: hashedNewPassword });

    res.json({ message: "Password changed successfully." });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ error: "Failed to change password." });
  }
});

// Update user location route
router.put("/user/location", authMiddleware, async (req, res) => {
  const { location } = req.body;

  try {
    const userId = req.user.id; // Get user ID from the token
    await User.findByIdAndUpdate(userId, { location });
    res.json({ message: "Location updated successfully." });
  } catch (error) {
    console.error("Error updating location:", error);
    res.status(500).json({ error: "Failed to update location." });
  }
});

module.exports = router;
