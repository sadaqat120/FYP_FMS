const mongoose = require("mongoose");

const AnimalSchema = new mongoose.Schema({
  farmId: { type: mongoose.Schema.Types.ObjectId, ref: "Farm", required: true },
  animalId: { type: String, required: true, unique: true }, // Ensure unique animal ID
  category: { type: String, required: true },
  sex: { type: String, required: true },
  weight: { type: Number, required: true },
  breed: { type: String, required: true },
  age: { type: Number, required: true },
  healthStatus: { type: String, required: true },
  symptoms: { type: String, default: "" },
  medicine: { type: String, default: "" },
  feedType: { type: String, required: true },
  milkingQuantity: { type: Number, default: null },
  status: { type: String, required: true }, // Animal status
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Animal", AnimalSchema);
