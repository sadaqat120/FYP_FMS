const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  farmId: { type: mongoose.Schema.Types.ObjectId, ref: "Farm", required: true },
  expenseType: { type: String, required: true },
  amount: { type: Number, required: true },
  notes: { type: String, default: null }, // Optional notes
  date: { type: Date, required: true }, // Date of the expense
});

module.exports = mongoose.model("Expense", ExpenseSchema);
