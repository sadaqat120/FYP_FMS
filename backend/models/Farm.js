// models/Farm.js
const mongoose = require("mongoose");

const FarmSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User ", required: true },
  name: { type: String, required: true },
  location: { type: String, default: "" }, // New field for location
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Farm", FarmSchema);