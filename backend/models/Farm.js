// models/Farm.js
const mongoose = require("mongoose");

const FarmSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User ", required: true }, // Reference to the user
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Farm", FarmSchema);