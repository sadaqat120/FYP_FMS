import React, { useState } from "react";
import axios from "axios";

const ProductionForm = ({ farmId }) => {
  const [productionType, setProductionType] = useState("");
  const [soldAnimals, setSoldAnimals] = useState("");
  const [sellingRevenue, setSellingRevenue] = useState("");
  const [milkQuantity, setMilkQuantity] = useState("");
  const [milkRevenue, setMilkRevenue] = useState("");
  const [revenueType, setRevenueType] = useState("");
  const [revenueIncome, setRevenueIncome] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState({});

  const handleSave = async () => {
    // Reset errors
    setErrors({});

    // Validate required fields
    const newErrors = {};
    if (!productionType) newErrors.productionType = "Production type is required.";
    if (productionType === "sellingAnimal") {
      if (!soldAnimals) newErrors.soldAnimals = "Sold animals count is required.";
      if (!sellingRevenue) newErrors.sellingRevenue = "Selling revenue is required.";
    } else if (productionType === "milkSelling") {
      if (!milkQuantity) newErrors.milkQuantity = "Milk quantity is required.";
      if (!milkRevenue) newErrors.milkRevenue = "Milk revenue is required.";
    } else if (productionType === "otherRevenue") {
      if (!revenueType) newErrors.revenueType = "Revenue type is required.";
      if (!revenueIncome) newErrors.revenueIncome = "Revenue income is required.";
    } else if (productionType === "milkProduction") {
      if (!milkQuantity) newErrors.milkQuantity = "Milk quantity is required.";
    }
    if (!date) newErrors.date = "Date is required.";

    // Check if there are any errors
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Prepare data to save
    const productionData = {
      farmId,
      productionType,
      soldAnimals: productionType === "sellingAnimal" ? parseInt(soldAnimals) : null,
      sellingRevenue: productionType === "sellingAnimal" ? parseFloat(sellingRevenue) : null,
      milkQuantity: (productionType === "milkSelling" || productionType === "milkProduction") ? parseFloat(milkQuantity) : null,
      milkRevenue: productionType === "milkSelling" ? parseFloat(milkRevenue) : null,
      revenueType: productionType === "otherRevenue" ? revenueType : null,
      revenueIncome: productionType === "otherRevenue" ? parseFloat(revenueIncome) : null,
      date,
      notes: notes || null,
    };

    try {
      // Save data to the backend
      const response = await axios.post("http://localhost:5000/productions", productionData, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log("Production data saved:", response.data);
      alert("Data Saved Successfully!");
      // Optionally reset the form
      setProductionType("");
      setSoldAnimals("");
      setSellingRevenue("");
      setMilkQuantity("");
      setMilkRevenue("");
      setRevenueType("");
      setRevenueIncome("");
      setDate("");
      setNotes("");
    } catch (error) {
      console.error("Error saving production data:", error);
    }
 };

  const renderFields = () => {
    switch (productionType) {
      case "sellingAnimal":
        return (
          <>
            <input
              type="number"
              value={soldAnimals}
              onChange={(e) => setSoldAnimals(e.target.value)}
              placeholder="Sold Animals (Numbers)"
              className="w-full border rounded-lg p-2"
              required
            />
            {errors.soldAnimals && <p className="text-red-500 text-sm">{errors.soldAnimals}</p>}
            <input
              type="number"
              value={sellingRevenue}
              onChange={(e) => setSellingRevenue(e.target.value)}
              placeholder="Selling Revenue (PKR)"
              className="w-full border rounded-lg p-2"
              required
            />
            {errors.sellingRevenue && <p className="text-red-500 text-sm">{errors.sellingRevenue}</p>}
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border rounded-lg p-2"
              required
            />
            {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Notes"
              className="w-full border rounded-lg p-2"
              rows="2"
            />
          </>
        );
      case "milkSelling":
        return (
          <>
            <input
              type="number"
              value={milkQuantity}
              onChange={(e) => setMilkQuantity(e.target.value)}
              placeholder="Milk Quantity (Liters)"
              className="w-full border rounded-lg p-2"
              required
            />
            {errors.milkQuantity && <p className="text-red-500 text-sm">{errors.milkQuantity}</p>}
            <input
              type="number"
              value={milkRevenue}
              onChange={(e) => setMilkRevenue(e.target.value)}
              placeholder="Milk Revenue (PKR)"
              className="w-full border rounded-lg p-2"
              required
            />
            {errors.milkRevenue && <p className="text-red-500 text-sm">{errors.milkRevenue}</p>}
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border rounded-lg p-2"
              required
            />
            {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Notes"
              className="w-full border rounded-lg p-2"
              rows="2"
            />
          </>
        );
      case "otherRevenue":
        return (
          <>
            <input
              type="text"
              value={revenueType}
              onChange={(e) => setRevenueType(e.target.value)}
              placeholder="Revenue Name/Type"
              className="w-full border rounded-lg p-2"
              required
            />
            {errors.revenueType && <p className="text-red-500 text-sm">{errors.revenueType}</p>}
            <input
              type="number"
              value={revenueIncome}
              onChange={(e) => setRevenueIncome(e.target.value)}
              placeholder="Revenue Income/Money (PKR)"
              className="w-full border rounded-lg p-2"
              required
            />
            {errors.revenueIncome && <p className="text-red-500 text-sm">{errors.revenueIncome}</p>}
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border rounded-lg p-2"
              required
            />
            {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Notes"
              className="w-full border rounded-lg p-2"
              rows="2"
            />
          </>
        );
      case "milkProduction":
        return (
          <>
            <input
              type="number"
              value={milkQuantity}
              onChange={(e) => setMilkQuantity(e.target.value)}
              placeholder="Milk Quantity Produced (Liters)"
              className="w-full border rounded-lg p-2"
              required
            />
            {errors.milkQuantity && <p className="text-red-500 text-sm">{errors.milkQuantity}</p>}
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w full border rounded-lg p-2"
              required
            />
            {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Notes"
              className="w-full border rounded-lg p-2"
              rows="2"
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mt-4 border p-4 rounded-lg">
      <h3 className="text-lg font-bold text-green-600">Production</h3>
      <form className="space-y-4">
        <select
          name="productionType"
          value={productionType}
          onChange={(e) => setProductionType(e.target.value)}
          className="w-full border rounded-lg p-2"
          required
        >
          <option value="">Select Production Type</option>
          <option value="sellingAnimal">Selling Animal Revenue</option>
          <option value="milkSelling">Milk Selling Revenue</option>
          <option value="otherRevenue">Other Revenue</option>
          <option value="milkProduction">Milk Production</option>
        </select>
        {renderFields()}
        <button
          type="button"
          onClick={handleSave}
          className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default ProductionForm;
