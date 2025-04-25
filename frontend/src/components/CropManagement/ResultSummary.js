import React, { useState, useEffect } from "react";

const ResultSummary = () => {
  const [formData, setFormData] = useState({
    plotName: "", // Added Plot Name/ID field
    totalYield: "",
    yieldGrade: "",
    expectedYield: "",
    unit: "",
    satisfaction: "",
    notes: "",
    totalCost: "",
    sellRevenue: "",
    netProfit: "",
    finalNotes: "",
  });

  // Calculate net profit whenever sellRevenue or totalCost changes
  useEffect(() => {
    const netProfit =
      parseFloat(formData.sellRevenue || 0) -
      parseFloat(formData.totalCost || 0);
    setFormData((prevData) => ({
      ...prevData,
      netProfit: netProfit.toFixed(2),
    }));
  }, [formData.sellRevenue, formData.totalCost]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Result Summary Saved Successfully!");
  };

  return (
    <div className="w-4/5 mx-auto my-5 p-5 border border-gray-300 rounded-lg bg-gray-50 shadow-md flex flex-col gap-4">
      <h2 className="text-center text-2xl text-green-700">Result Summary</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* New Plot Name/ID Field */}
        <input
          type="text"
          name="plotName"
          placeholder="Plot Name/ID"
          value={formData.plotName}
          onChange={handleChange}
          required
          className="w-full p-2 text-lg border border-gray-300 rounded-md"
        />

        <input
          type="number"
          name="totalYield"
          placeholder="Total Yield Quantity"
          value={formData.totalYield}
          onChange={handleChange}
          required
          className="w-full p-2 text-lg border border-gray-300 rounded-md"
        />
        <select
          name="yieldGrade"
          value={formData.yieldGrade}
          onChange={handleChange}
          required
          className="w-full p-2 text-lg border border-gray-300 rounded-md"
        >
          <option value="">Select Yield Grade</option>
          <option value="excellent">Excellent</option>
          <option value="good">Good</option>
          <option value="average">Average</option>
          <option value="poor">Poor</option>
        </select>
        <input
          type="number"
          name="expectedYield"
          placeholder="Expected Yield"
          value={formData.expectedYield}
          onChange={handleChange}
          required
          className="w-full p-2 text-lg border border-gray-300 rounded-md"
        />
        <select
          name="unit"
          value={formData.unit}
          onChange={handleChange}
          required
          className="w-full p-2 text-lg border border-gray-300 rounded-md"
        >
          <option value="">Select Unit</option>
          <option value="kg">Kg</option>
          <option value="tons">Tons</option>
        </select>
        <select
          name="satisfaction"
          value={formData.satisfaction}
          onChange={handleChange}
          required
          className="w-full p-2 text-lg border border-gray-300 rounded-md"
        >
          <option value="">Rate Satisfaction (1-5)</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <textarea
          name="notes"
          placeholder="Notes"
          value={formData.notes}
          onChange={handleChange}
          className="w-full p-2 text-lg border border-gray-300 rounded-md"
        ></textarea>
        <input
          type="number"
          name="totalCost"
          placeholder="Total Production Cost"
          value={formData.totalCost}
          onChange={handleChange}
          required
          className="w-full p-2 text-lg border border-gray-300 rounded-md"
        />
        <input
          type="number"
          name="sellRevenue"
          placeholder="Sell Revenue"
          value={formData.sellRevenue}
          onChange={handleChange}
          required
          className="w-full p-2 text-lg border border-gray-300 rounded-md"
        />
        {/* Display net profit */}
        <input
          type="number"
          name="netProfit"
          placeholder="Net Profit"
          value={formData.netProfit}
          readOnly
          className="w-full p-2 text-lg border border-gray-300 rounded-md"
        />
        <textarea
          name="finalNotes"
          placeholder="Final Notes"
          value={formData.finalNotes}
          onChange={handleChange}
          className="w-full p-2 text-lg border border-gray-300 rounded-md"
        ></textarea>
        <button
          type="submit"
          className="p-3 text-lg text-white bg-green-500 rounded-md hover:bg-green-600"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default ResultSummary;