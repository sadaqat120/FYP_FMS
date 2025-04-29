const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const User = require("../models/User");
const PendingUser = require("../models/PendingUser");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Sign-up Route (with Email Verification)
router.post("/signup", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      profilePicture = null,
      location = null,
    } = req.body;

    // Check if email or phone already exists in User
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({ message: "Email already exists!" });
      }
      if (existingUser.phone === phone) {
        return res
          .status(400)
          .json({ message: "Phone number already exists!" });
      }
    }

    // Remove previous pending user if any
    await PendingUser.deleteOne({ email });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString(); // 6-digit code

    const pendingUser = new PendingUser({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      verificationCode,
      profilePicture,
      location,
    });

    await pendingUser.save();

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"FMS Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Confirm Your Registration - Farm Management System",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
          <h2>FMS - Email Verification</h2>
          <p>Hello ${firstName},</p>
          <p>We received a request to register your email with our Farm Management System (FMS).</p>
          <p>If this was you, please confirm your registration by enter the code:</p>
          <p>Your verification code is:</p>
          <h1 style="letter-spacing: 2px;">${verificationCode}</h1>
          <p>This code is valid for <strong>1 minutes</strong>.</p>
          <p>If you did not request this, you can safely ignore this message.</p>
          <p>Regards,<br>FMS Support Team</p>
        </div>
      `,
    });

    res
      .status(200)
      .json({ message: "Verification email sent. Please check your email." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error!" });
  }
});

router.post("/verify-code", async (req, res) => {
  try {
    const { email, code } = req.body;

    const pendingUser = await PendingUser.findOne({
      email,
      verificationCode: code,
    });
    if (!pendingUser) {
      return res
        .status(400)
        .json({ message: "Invalid or expired verification code." });
    }

    const newUser = new User({
      firstName: pendingUser.firstName,
      lastName: pendingUser.lastName,
      email: pendingUser.email,
      phone: pendingUser.phone,
      password: pendingUser.password,
      profilePicture: pendingUser.profilePicture,
      location: pendingUser.location,
    });

    await newUser.save();
    await PendingUser.deleteOne({ _id: pendingUser._id });

    // Generate JWT token (like original code)
    const token = jwt.sign(
      {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        profilePicture: newUser.profilePicture,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Return token and user info to frontend
    res.status(201).json({
      message: "User verified and registered successfully.",
      token: `Bearer ${token}`,
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        profilePicture: newUser.profilePicture,
      },
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
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
    });

    if (!user)
      return res.status(400).json({ message: "Invalid email or password." });

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password." });

    const token = jwt.sign(
      {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        profilePicture: user.profilePicture,
      }, // Include profile picture in the token
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token: `Bearer ${token}`,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        profilePicture: user.profilePicture,
      }, // Include profile picture in the response
    });
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
});

// Fetch user details route
router.get("/user", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from the token
    const user = await User.findById(userId).select(
      "firstName lastName email phone profilePicture location"
    ); // Select only necessary fields
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
