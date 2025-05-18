import React, { useState } from "react";
import axios from "axios";

const ExpensesForm = ({ farmId }) => {
  const [expenseType, setExpenseType] = useState("");
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState("");
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");


  const handleSave = async () => {
    // Reset errors
    setErrors({});

    // Validate required fields
    const newErrors = {};
    if (!expenseType) newErrors.expenseType = "Expense type is required.";
    if (!amount) newErrors.amount = "Amount is required.";
    if (isNaN(amount) || amount <= 0) newErrors.amount = "Amount must be a positive number.";
    if (!date) newErrors.date = "Date is required.";

    // Check if there are any errors
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Prepare data to save
    const expenseData = {
      farmId,
      expenseType,
      amount: parseFloat(amount),
      notes: notes || null,
      date,
    };

    try {
      // Save data to the backend
      const response = await axios.post("http://localhost:5000/expenses", expenseData, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log("Expense data saved:", response.data);
      setSuccessMsg("Expense saved successfully!");
setTimeout(() => setSuccessMsg(""), 2000); // Optional auto-hide after 2s

      // Optionally reset the form
      setExpenseType("");
      setAmount("");
      setNotes("");
      setDate("");
    } catch (error) {
      console.error("Error saving expense data:", error);
    }
  };

  return (
    <div className="mt-4 border p-4 rounded-lg">
      {/* <h3 className="text-lg font-bold text-green-600">Expenses</h3> */}
      {successMsg && <p className="text-green-600 text-center font-medium">{successMsg}</p>}

      <form className="space-y-4">
        <select
          className="w-full border rounded-lg p-2"
          value={expenseType}
          onChange={(e) => setExpenseType(e.target.value)}
          required
        >
          <option value="">Select Expense Type</option>
          <option value="acquisition">Animal Acquisition Costs</option>
          <option value="veterinary">Health and Veterinary Costs</option>
          <option value="feeding">Feeding Costs</option>
          <option value="housing">Housing and Maintenance Costs</option>
          <option value="labor">Labor Costs</option>
          <option value="transportation">Transportation Costs</option>
          <option value="miscellaneous">Miscellaneous Costs</option>
        </select>
        {errors.expenseType && <p className="text-red-500 text-sm">{errors.expenseType}</p>}

        <textarea
          placeholder="Notes/Description"
          className="w-full border rounded-lg p-2"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>

        <input
          type="number"
          placeholder="Amount (PKR)"
          className="w-full border rounded-lg p-2"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        {errors.amount && <p className="text-red-500 text-sm">{errors.amount}</p>}

        <input
          type="date"
          className="w-full border rounded-lg p-2"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}

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

export default ExpensesForm;
