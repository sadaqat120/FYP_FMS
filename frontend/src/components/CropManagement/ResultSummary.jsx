import React, { useState, useEffect } from "react";
import "./CropLandCostTrckingResultSummaryFarm.css";
import axios from "axios";

const ResultSummary = ({ farmId, plotId, disabled }) => {
  // Define API URL at the component level
  const API_URL = 'http://localhost:5000/api/result-summaries';

  const [formData, setFormData] = useState({
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
    farmId: "", // Will store the farmId
    plotId: ""  // Will store the plotId
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Update formData when farmId prop changes
  useEffect(() => {
    setFormData(prevData => ({
      ...prevData,
      farmId: farmId || "",
      plotId: plotId || ""
    }));
  }, [farmId, plotId]);

  // Calculate net profit whenever totalCost or sellRevenue changes
  useEffect(() => {
    const netProfit =
      parseFloat(formData.sellRevenue || 0) - parseFloat(formData.totalCost || 0);
    setFormData((prevData) => ({ ...prevData, netProfit: netProfit.toFixed(2) }));
  }, [formData.sellRevenue, formData.totalCost]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate farmId
    if (!farmId) {
      setError("Farm ID is missing. Please ensure you're in a valid farm context.");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      console.log('Token:', token ? 'Present' : 'Missing');
      
      if (!token) {
        throw new Error('Please login to save result summary');
      }

      // Ensure farmId is included in the submission
      const dataToSubmit = {
        ...formData,
        farmId: farmId,
        plotId: plotId
      };

      console.log('Sending request to:', API_URL);
      console.log('Request payload:', dataToSubmit);

      const response = await axios.post(
        API_URL,
        dataToSubmit,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Response:', response);

      if (response.data.success) {
        alert('Result Summary Saved Successfully!');
        // Reset form but keep farmId
        setFormData({
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
          farmId: farmId,
          plotId: plotId
        });
      }
    } catch (err) {
      console.error('Full error:', err);
      console.error('Error response:', err.response);
      
      // More detailed error handling
      let errorMessage = 'An error occurred while saving the result summary.';
      if (err.response) {
        // Server responded with an error
        errorMessage = err.response.data?.message || errorMessage;
      } else if (err.request) {
        // Request was made but no response received
        errorMessage = 'No response received from server. Please check your connection.';
      } else {
        // Error in request setup
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Result Summary</h2>
      {error && <div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
      {!farmId && <div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>No farm selected. Please select a farm first.</div>}
      
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="totalYield"
          placeholder="Total Yield Quantity"
          value={formData.totalYield}
          onChange={handleChange}
          required
          disabled={!farmId}
        />
        <select
          name="yieldGrade"
          value={formData.yieldGrade}
          onChange={handleChange}
          required
          disabled={!farmId}
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
          disabled={!farmId}
        />
        <select
          name="unit"
          value={formData.unit}
          onChange={handleChange}
          required
          disabled={!farmId}
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
          disabled={!farmId}
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
          disabled={!farmId}
        ></textarea>
        <input
          type="number"
          name="totalCost"
          placeholder="Total Production Cost"
          value={formData.totalCost}
          onChange={handleChange}
          required
          disabled={!farmId}
        />
        <input
          type="number"
          name="sellRevenue"
          placeholder="Sell Revenue"
          value={formData.sellRevenue}
          onChange={handleChange}
          required
          disabled={!farmId}
        />
        <input
          type="number"
          name="netProfit"
          placeholder="Net Profit"
          value={formData.netProfit}
          readOnly
          disabled={!farmId}
        />
        <textarea
          name="finalNotes"
          placeholder="Final Notes"
          value={formData.finalNotes}
          onChange={handleChange}
          disabled={!farmId}
        ></textarea>
        <button 
          type="submit" 
          className="button" 
          disabled={loading || !farmId}
          style={{ opacity: loading ? 0.7 : 1 }}
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  );
};

export default ResultSummary;