import React, { useState } from "react";

const LivestockForm = ({ goBack }) => {
  const [formData, setFormData] = useState({
    eventType: "health check",
    date: "",
    time: "",
    assignedStaff: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Livestock Reminder Saved Successfully!");
    goBack();
  };

  return (
    <div className="form-container">
      <h2>Livestock Management Reminder</h2>
      <form onSubmit={handleSubmit}>
        <select name="eventType" value={formData.eventType} onChange={handleChange}>
          <option value="health check">Health Check</option>
          <option value="vaccination">Vaccination</option>
          <option value="feeding">Feeding</option>
          <option value="milking">Milking</option>
          <option value="cleaning">Cleaning</option>
          <option value="maintenance">Maintenance</option>
        </select>
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        <input type="time" name="time" value={formData.time} onChange={handleChange} required />
        <input type="text" name="assignedStaff" placeholder="Assigned Staff" value={formData.assignedStaff} onChange={handleChange} />
        <textarea name="notes" placeholder="Notes" value={formData.notes} onChange={handleChange}></textarea>
        <button type="submit" className="button">Save</button>
        <button type="button" onClick={goBack} className="button-secondary">Back</button>
      </form>
    </div>
  );
};

export default LivestockForm;
