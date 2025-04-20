// models/HumanResource.js
const mongoose = require("mongoose");

const HumanResourceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  storeId: { type: mongoose.Schema.Types.ObjectId, ref: "Store", required: true },
  id: { type: String, required: true },
  workerName: { type: String, required: true },
  role: { type: String, required: true },
  dateEnrolled: { type: Date, required: true },
  notes: { type: String, default: "" },
});

module.exports = mongoose.model("HumanResource", HumanResourceSchema);
