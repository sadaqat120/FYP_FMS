const mongoose = require("mongoose");

const PendingUserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  phone: String,
  password: String,
  profilePicture: String,
  location: String,
  verificationCode: String, // 6-digit numeric
  createdAt: { type: Date, default: Date.now, expires: 60 } // 1 min expiry
});

module.exports = mongoose.model("PendingUser", PendingUserSchema);
