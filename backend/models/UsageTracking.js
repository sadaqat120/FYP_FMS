const mongoose = require("mongoose");

const UsageTrackingSchema = new mongoose.Schema({
  storeId: { type: mongoose.Schema.Types.ObjectId, ref: "Store", required: true },
  resourceId: { type: String, required: true },
  quantityUsed: { type: Number, required: true },
  usagePurpose: { type: String, required: true },
  dateOfUsage: { type: Date, default: Date.now },
  notes: { type: String, default: "" },
});

module.exports = mongoose.model("UsageTracking", UsageTrackingSchema);
