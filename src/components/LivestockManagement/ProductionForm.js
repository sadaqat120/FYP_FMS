import React from "react";

const ProductionForm = () => {
  const handleSave = () => {
    alert("Data Saved Successfully!");
  };

  return (
    <div className="mt-4 border p-4 rounded-lg">
      <h3 className="text-lg font-bold text-green-600">Production</h3>
      <form className="space-y-4">
        <select className="w-full border rounded-lg p-2" required>
          <option value="">Select Production Type</option>
          <option value="sellingAnimal">Selling Animal Revenue</option>
          <option value="milkSelling">Milk Selling Revenue</option>
          <option value="otherRevenue">Other Revenue</option>
          <option value="milkProduction">Milk Production</option>
        </select>
        <input type="text" placeholder="Details" className="w-full border rounded-lg p-2" required />
        <input type="number" placeholder="Amount (PKR)" className="w-full border rounded-lg p-2" required />
        <input type="date" className="w-full border rounded-lg p-2" required />
        <textarea placeholder="Notes" className="w-full border rounded-lg p-2" rows="2"></textarea>
        <button type="button" onClick={handleSave} className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
          Save
        </button>
      </form>
    </div>
  );
};

export default ProductionForm;
