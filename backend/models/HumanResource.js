// models/HumanResource.js
const mongoose = require("mongoose");

const HumanResourceSchema = new mongoose.Schema({
  storeId: { type: mongoose.Schema.Types.ObjectId, ref: "Store", required: true },
  id: { type: String, required: true, unique: true }, // Unique ID for the worker
  workerName: { type: String, required: true },
  role: { type: String, required: true },
  dateEnrolled: { type: Date, required: true },
  notes: { type: String, default: "" },
});

module.exports = mongoose.model("HumanResource", HumanResourceSchema);
