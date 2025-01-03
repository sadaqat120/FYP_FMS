import React, { useState } from "react";

const CropForm = ({ goBack }) => {
  const [formData, setFormData] = useState({
    plotId: "",
    plotName: "",
    activityType: "land preparation",
    date: "",
    time: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Crop Reminder Saved Successfully!");
    goBack();
  };

  return (
    <div className="form-container">
      <h2>Crop Management Reminder</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="plotId" placeholder="Plot ID" value={formData.plotId} onChange={handleChange} required />
        <input type="text" name="plotName" placeholder="Plot Name" value={formData.plotName} onChange={handleChange} required />
        <select name="activityType" value={formData.activityType} onChange={handleChange}>
          <option value="land preparation">Land Preparation</option>
          <option value="seed sowing">Seed Sowing</option>
          <option value="irrigation">Irrigation</option>
          <option value="fertilization">Fertilization</option>
          <option value="weed monitoring">Weed Monitoring</option>
          <option value="pest management">Pest Management</option>
          <option value="harvesting">Harvesting</option>
          <option value="post harvesting">Post Harvesting</option>
        </select>
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        <input type="time" name="time" value={formData.time} onChange={handleChange} required />
        <textarea name="notes" placeholder="Notes" value={formData.notes} onChange={handleChange}></textarea>
        <button type="submit" className="button">Save</button>
        <button type="button" onClick={goBack} className="button-secondary">Back</button>
      </form>
    </div>
  );
};

export default CropForm;
