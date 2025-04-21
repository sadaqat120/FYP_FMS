// models/CropFarm.js
const mongoose = require("mongoose");

const CropFarmSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User ", required: true },
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("CropFarm", CropFarmSchema);
