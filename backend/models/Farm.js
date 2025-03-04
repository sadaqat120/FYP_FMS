// models/Farm.js
const mongoose = require("mongoose");

const FarmSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User ", required: true },
  name: { type: String, required: true },
  location: { type: String, default: "" }, // New field for location
  totalLivestockCount: { type: Number, default: 0 }, // New field for total livestock count
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Farm", FarmSchema);