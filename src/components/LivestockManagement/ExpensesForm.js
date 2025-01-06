import React from "react";

const ExpensesForm = () => {
  const handleSave = () => {
    alert("Data Saved Successfully!");
  };

  return (
    <div className="mt-4 border p-4 rounded-lg">
      <h3 className="text-lg font-bold text-green-600">Expenses</h3>
      <form className="space-y-4">
        <select className="w-full border rounded-lg p-2" required>
          <option value="">Select Expense Type</option>
          <option value="acquisition">Animal Acquisition Costs</option>
          <option value="veterinary">Health and Veterinary Costs</option>
          <option value="feeding">Feeding Costs</option>
          <option value="housing">Housing and Maintenance Costs</option>
          <option value="labor">Labor Costs</option>
          <option value="transportation">Transportation Costs</option>
          <option value="miscellaneous">Miscellaneous Costs</option>
        </select>
        <textarea placeholder="Notes/Description" className="w-full border rounded-lg p-2"></textarea>
        <input type="number" placeholder="Amount (PKR)" className="w-full border rounded-lg p-2" required />
        <input type="date" className="w-full border rounded-lg p-2" required />
        <button type="button" onClick={handleSave} className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
          Save
        </button>
      </form>
    </div>
  );
};

export default ExpensesForm;
