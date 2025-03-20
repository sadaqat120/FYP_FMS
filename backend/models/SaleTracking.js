const mongoose = require("mongoose");

const SaleTrackingSchema = new mongoose.Schema({
  storeId: { type: mongoose.Schema.Types.ObjectId, ref: "Store", required: true },
  resourceId: { type: String, required: true }, // Ensure this is a string
  itemsSold: { type: Number, required: true },
  salePricePerUnit: { type: Number, required: true },
  totalSalePrice: { type: Number, required: true }, // Store total sale price
  dateOfSale: { type: Date, required: true }, // Make date required
  notes: { type: String, default: "" },
});

module.exports = mongoose.model("SaleTracking", SaleTrackingSchema);
