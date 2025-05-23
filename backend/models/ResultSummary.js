const mongoose = require("mongoose");

const ResultSummarySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  cropFarmId: { type: mongoose.Schema.Types.ObjectId, ref: "CropFarm", required: true },

  totalYield: { type: Number, required: true },
  yieldGrade: { type: String, enum: ["excellent", "good", "average", "poor"], required: true },
  expectedYield: { type: Number, required: true },
  unit: { type: String, enum: ["kg", "tons"], required: true },
  satisfaction: { type: Number, enum: [1, 2, 3, 4, 5], required: true },
  yieldNotes: { type: String },
  sellRevenue: { type: Number, required: true },
  revenueNotes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("ResultSummary", ResultSummarySchema);
