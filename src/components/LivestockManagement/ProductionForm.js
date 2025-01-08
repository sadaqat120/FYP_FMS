import React, { useState } from "react";

const ProductionForm = () => {
  const [productionType, setProductionType] = useState("");

  const handleSave = () => {
    alert("Data Saved Successfully!");
  };

  const renderFields = () => {
    switch (productionType) {
      case "sellingAnimal":
        return (
          <>
            <input
              type="number"
              name="soldAnimals"
              placeholder="Sold Animals (Numbers)"
              className="w-full border rounded-lg p-2"
              required
            />
            <input
              type="number"
              name="sellingRevenue"
              placeholder="Selling Revenue (PKR)"
              className="w-full border rounded-lg p-2"
              required
            />
            <input
              type="date"
              name="date"
              className="w-full border rounded-lg p-2"
              required
            />
            <textarea
              name="notes"
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
              name="milkQuantity"
              placeholder="Milk Quantity"
              className="w-full border rounded-lg p-2"
              required
            />
            <input
              type="text"
              name="milkUnit"
              placeholder="Unit of Quantity (e.g., Liters)"
              className="w-full border rounded-lg p-2"
              required
            />
            <input
              type="number"
              name="milkRevenue"
              placeholder="Milk Revenue (PKR)"
              className="w-full border rounded-lg p-2"
              required
            />
            <input
              type="date"
              name="date"
              className="w-full border rounded-lg p-2"
              required
            />
            <textarea
              name="notes"
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
              name="revenueType"
              placeholder="Revenue Name/Type"
              className="w-full border rounded-lg p-2"
              required
            />
            <input
              type="number"
              name="revenueIncome"
              placeholder="Revenue Income/Money (PKR)"
              className="w-full border rounded-lg p-2"
              required
            />
            <input
              type="date"
              name="date"
              className="w-full border rounded-lg p-2"
              required
            />
            <textarea
              name="notes"
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
              name="milkQuantityProduced"
              placeholder="Milk Quantity Produced"
              className="w-full border rounded-lg p-2"
              required
            />
            <input
              type="text"
              name="milkUnit"
              placeholder="Unit (e.g., Liters)"
              className="w-full border rounded-lg p-2"
              required
            />
            <input
              type="date"
              name="date"
              className="w-full border rounded-lg p-2"
              required
            />
            <textarea
              name="notes"
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
