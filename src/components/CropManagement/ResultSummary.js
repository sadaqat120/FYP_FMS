import React, { useState, useEffect } from "react";
import "./CropLandCostTrckingResultSummaryFarm.css";

const ResultSummary = () => {
  const [formData, setFormData] = useState({
    totalYield: "",
    yieldGrade: "",
    expectedYield: "",
    unit: "",
    satisfaction: "",
    notes: "",
    totalCost: "",
    sellRevenue: "",
    netProfit: "", // Add netProfit to the state
    finalNotes: "",
  });

  // Calculate net profit whenever sellRevenue or totalCost changes
  useEffect(() => {
    const netProfit =
      parseFloat(formData.sellRevenue || 0) - parseFloat(formData.totalCost || 0);
    setFormData((prevData) => ({ ...prevData, netProfit: netProfit.toFixed(2) }));
  }, [formData.sellRevenue, formData.totalCost]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Result Summary Saved Successfully!");
  };

  return (
    <div className="form-container">
      <h2>Result Summary</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="totalYield"
          placeholder="Total Yield Quantity"
          value={formData.totalYield}
          onChange={handleChange}
          required
        />
        <select
          name="yieldGrade"
          value={formData.yieldGrade}
          onChange={handleChange}
          required
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
        />
        <select
          name="unit"
          value={formData.unit}
          onChange={handleChange}
          required
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
        ></textarea>
        <input
          type="number"
          name="totalCost"
          placeholder="Total Production Cost"
          value={formData.totalCost}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="sellRevenue"
          placeholder="Sell Revenue"
          value={formData.sellRevenue}
          onChange={handleChange}
          required
        />
        {/* Display net profit */}
        <input
          type="number"
          name="netProfit"
          placeholder="Net Profit"
          value={formData.netProfit}
          readOnly
        />
        <textarea
          name="finalNotes"
          placeholder="Final Notes"
          value={formData.finalNotes}
          onChange={handleChange}
        ></textarea>
        <button type="submit" className="button">
          Save
        </button>
      </form>
    </div>
  );
};

export default ResultSummary;
