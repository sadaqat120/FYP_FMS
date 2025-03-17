// models/Payment.js
const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  workerId: { type: String, required: true },
  storeId: { type: mongoose.Schema.Types.ObjectId, ref: "Store", required: true },
  paymentAmount: { type: Number, required: true },
  workStartDate: { type: Date, required: true },
  workEndDate: { type: Date, required: true },
  paymentDate: { type: Date, required: true },
  notes: { type: String, default: "" },
});

module.exports = mongoose.model("Payment", PaymentSchema);