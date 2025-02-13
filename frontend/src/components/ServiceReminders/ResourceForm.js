import React, { useState } from "react";

const ResourceForm = ({ goBack }) => {
  const [alertType, setAlertType] = useState(""); // Track selected alert type
  const [formData, setFormData] = useState({
    resourceType: "",
    threshold: "",
    timeframe: "",
    time: "",
    date: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Resource Reminder Saved Successfully!");
    goBack();
  };

  return (
    <div className="form-container">
      <h2>Resource Management Reminder</h2>
      <form onSubmit={handleSubmit}>
        {/* Resource Type */}
        <label>Resource Type:</label>
        <select
          name="resourceType"
          value={formData.resourceType}
          onChange={handleChange}
          required
        >
          <option value="">Select Resource Type</option>
          <option value="Seeds">Seeds</option>
          <option value="Fertilizer">Fertilizer</option>
          <option value="Water">Water</option>
          <option value="Feeds">Feeds</option>
          <option value="Equipment">Equipment</option>
          <option value="Vehicles">Vehicles</option>
          <option value="Money">Money</option>
          <option value="Others">Others</option>
        </select>

        {/* Alert Type */}
        <label>Alert Type:</label>
        <select
          name="alertType"
          value={alertType}
          onChange={(e) => setAlertType(e.target.value)}
          required
        >
          <option value="">Select Alert Type</option>
          <option value="Low Inventory">Low Inventory</option>
          <option value="Repair Needed">Repair Needed</option>
          <option value="Expiry Alert">Expiry Alert</option>
        </select>

        {/* Dynamic Fields Based on Alert Type */}
        {alertType === "Low Inventory" && (
          <>
            <label>Number (Threshold):</label>
            <input
              type="number"
              name="threshold"
              placeholder="Threshold Value (e.g., 10 kg)"
              value={formData.threshold}
              onChange={handleChange}
              required
            />
            <label>Notes:</label>
            <textarea
              name="notes"
              placeholder="Add any notes here..."
              value={formData.notes}
              onChange={handleChange}
            ></textarea>
          </>
        )}

        {alertType === "Repair Needed" && (
          <>
            <label>Date:</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
            <label>Time:</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
            <label>Notes:</label>
            <textarea
              name="notes"
              placeholder="Add any notes here..."
              value={formData.notes}
              onChange={handleChange}
            ></textarea>
          </>
        )}

        {alertType === "Expiry Alert" && (
          <>
            <label>Alert Timeframe (Days in Advance):</label>
            <input
              type="number"
              name="timeframe"
              placeholder="Enter days (e.g., 15)"
              value={formData.timeframe}
              onChange={handleChange}
              required
            />
            <label>Date:</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
            <label>Time:</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
            <label>Notes:</label>
            <textarea
              name="notes"
              placeholder="Add any notes here..."
              value={formData.notes}
              onChange={handleChange}
            ></textarea>
          </>
        )}

        {/* Buttons */}
        <button type="submit" className="button">
          Save
        </button>
        <button type="button" onClick={goBack} className="button-secondary">
          Back
        </button>
      </form>
    </div>
  );
};

export default ResourceForm;
