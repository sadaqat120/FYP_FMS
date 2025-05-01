import React, { useState, useEffect } from "react";
import axios from "axios";

const ResultSummary = ({ cropFarmId }) => {
  const [formData, setFormData] = useState({
    totalYield: "",
    yieldGrade: "",
    expectedYield: "",
    unit: "",
    satisfaction: "",
    yieldNotes: "",
    totalCost: "",
    sellRevenue: "",
    netProfit: "",
    revenueNotes: ""
  });

  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const profit = parseFloat(formData.sellRevenue || 0) - parseFloat(formData.totalCost || 0);
    setFormData((prev) => ({ ...prev, netProfit: profit.toFixed(2) }));
  }, [formData.sellRevenue, formData.totalCost]);

  const validate = () => {
    const newErrors = {};
    const required = [
      "totalYield",
      "yieldGrade",
      "expectedYield",
      "unit",
      "satisfaction",
      "totalCost",
      "sellRevenue"
    ];
    required.forEach((field) => {
      if (!formData[field] || formData[field].toString().trim() === "") {
        newErrors[field] = "This field is required";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/result-summary", {
        cropFarmId,
        ...formData,
        totalYield: Number(formData.totalYield),
        expectedYield: Number(formData.expectedYield),
        totalCost: Number(formData.totalCost),
        sellRevenue: Number(formData.sellRevenue),
        netProfit: Number(formData.netProfit)
      }, {
        headers: { Authorization: token }
      });

      setSuccessMsg("Result Summary Saved Successfully!");
      setFormData({
        totalYield: "",
        yieldGrade: "",
        expectedYield: "",
        unit: "",
        satisfaction: "",
        yieldNotes: "",
        totalCost: "",
        sellRevenue: "",
        netProfit: "",
        revenueNotes: ""
      });
    } catch (err) {
      console.error("Error saving result summary:", err);
      alert("Error saving result summary.");
    }
  };

  return (
    <div className="w-4/5 mx-auto my-5 p-5 border border-gray-300 rounded-lg bg-gray-50 shadow-md flex flex-col gap-4">
      <h2 className="text-center text-2xl text-green-700">Result Summary</h2>
      {successMsg && <p className="text-green-600 text-center">{successMsg}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="number"
          name="totalYield"
          placeholder="Total Yield"
          value={formData.totalYield}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-md"
        />
        {errors.totalYield && <p className="text-red-500 text-sm">{errors.totalYield}</p>}

        <select
          name="yieldGrade"
          value={formData.yieldGrade}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-md"
        >
          <option value="">Select Yield Grade</option>
          <option value="excellent">Excellent</option>
          <option value="good">Good</option>
          <option value="average">Average</option>
          <option value="poor">Poor</option>
        </select>
        {errors.yieldGrade && <p className="text-red-500 text-sm">{errors.yieldGrade}</p>}

        <input
          type="number"
          name="expectedYield"
          placeholder="Expected Yield"
          value={formData.expectedYield}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-md"
        />
        {errors.expectedYield && <p className="text-red-500 text-sm">{errors.expectedYield}</p>}

        <select
          name="unit"
          value={formData.unit}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-md"
        >
          <option value="">Select Unit</option>
          <option value="kg">Kg</option>
          <option value="tons">Tons</option>
        </select>
        {errors.unit && <p className="text-red-500 text-sm">{errors.unit}</p>}

        <select
          name="satisfaction"
          value={formData.satisfaction}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-md"
        >
          <option value="">Satisfaction (1-5)</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        {errors.satisfaction && <p className="text-red-500 text-sm">{errors.satisfaction}</p>}

        <textarea
          name="yieldNotes"
          placeholder="Yield Notes (optional)"
          value={formData.yieldNotes}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        />

        <input
          type="number"
          name="totalCost"
          placeholder="Total Cost"
          value={formData.totalCost}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-md"
        />
        {errors.totalCost && <p className="text-red-500 text-sm">{errors.totalCost}</p>}

        <input
          type="number"
          name="sellRevenue"
          placeholder="Sell Revenue"
          value={formData.sellRevenue}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-md"
        />
        {errors.sellRevenue && <p className="text-red-500 text-sm">{errors.sellRevenue}</p>}

        <input
          type="number"
          name="netProfit"
          placeholder="Net Profit"
          value={formData.netProfit}
          readOnly
          className="w-full p-2 border rounded-md bg-gray-100"
        />

        <textarea
          name="revenueNotes"
          placeholder="Revenue Notes (optional)"
          value={formData.revenueNotes}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        />

        <button
          type="submit"
          className="p-3 text-white bg-green-600 rounded hover:bg-green-700"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default ResultSummary;
