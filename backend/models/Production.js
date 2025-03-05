const mongoose = require("mongoose");

const ProductionSchema = new mongoose.Schema({
  farmId: { type: mongoose.Schema.Types.ObjectId, ref: "Farm", required: true }, // Reference to the Farm model
  productionType: { type: String, required: true }, // Type of production (e.g., sellingAnimal, milkSelling, etc.)
  soldAnimals: { type: Number, default: null }, // Number of sold animals (only for sellingAnimal)
  sellingRevenue: { type: Number, default: null }, // Revenue from selling animals (only for sellingAnimal)
  milkQuantity: { type: Number, default: null }, // Milk quantity (only for milkSelling and milkProduction)
  milkRevenue: { type: Number, default: null }, // Revenue from selling milk (only for milkSelling)
  revenueType: { type: String, default: null }, // Type of other revenue (only for otherRevenue)
  revenueIncome: { type: Number, default: null }, // Income from other revenue (only for otherRevenue)
  date: { type: Date, required: true }, // Date of the production
  notes: { type: String, default: null }, // Optional notes
  createdAt: { type: Date, default: Date.now }, // Timestamp for when the production record was created
});

module.exports = mongoose.model("Production", ProductionSchema);
