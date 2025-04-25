import React, { useState } from "react";

const CostTracking = () => {
  const [selectedActivity, setSelectedActivity] = useState("");
  const [formData, setFormData] = useState({
    plotName: "", // Added Plot Name/ID field
    equipmentCost: "",
    materialCost: "",
    laborCost: "",
    transportCost: "",
    miscCost: "",
    date: "",
    notes: "",
  });

  const handleActivityChange = (e) => {
    setSelectedActivity(e.target.value);
    setFormData({
      ...formData, // Keep the plot name when changing activity
      equipmentCost: "",
      materialCost: "",
      laborCost: "",
      transportCost: "",
      miscCost: "",
      date: "",
      notes: "",
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Cost Tracking Saved Successfully!");
  };

  return (
    <div className="w-4/5 mx-auto my-5 p-5 border border-gray-300 rounded-lg bg-gray-50 shadow-md flex flex-col gap-4">
      <h2 className="text-center text-2xl text-green-700">Cost Tracking</h2>
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

        {/* Activity Selection */}
        <select
          name="activity"
          value={selectedActivity}
          onChange={handleActivityChange}
          required
          className="w-full p-2 text-lg border border-gray-300 rounded-md"
        >
          <option value="">Select Activity</option>
          <option value="landPreparation">Land Preparation</option>
          <option value="seedSelection">Seed Selection and Sowing</option>
          <option value="irrigation">Irrigation</option>
          <option value="fertilization">Fertilization</option>
          <option value="weedControl">Weed Control</option>
          <option value="pestManagement">Pest Management</option>
          <option value="harvesting">Harvesting</option>
          <option value="postHarvesting">Post-Harvesting</option>
        </select>

        {/* Conditional Fields Based on Activity Selection */}
        {selectedActivity && (
          <>
            <input
              type="number"
              name="equipmentCost"
              placeholder="Equipment Cost"
              value={formData.equipmentCost}
              onChange={handleChange}
              required
              className="w-full p-2 text-lg border border-gray-300 rounded-md"
            />
            <input
              type="number"
              name="materialCost"
              placeholder="Material Cost"
              value={formData.materialCost}
              onChange={handleChange}
              className="w-full p-2 text-lg border border-gray-300 rounded-md"
            />
            <input
              type="number"
              name="laborCost"
              placeholder="Labor Cost"
              value={formData.laborCost}
              onChange={handleChange}
              className="w-full p-2 text-lg border border-gray-300 rounded-md"
            />
            <input
              type="number"
              name="transportCost"
              placeholder="Transport Cost"
              value={formData.transportCost}
              onChange={handleChange}
              className="w-full p-2 text-lg border border-gray-300 rounded-md"
            />
            <input
              type="number"
              name="miscCost"
              placeholder="Miscellaneous Cost"
              value={formData.miscCost}
              onChange={handleChange}
              className="w-full p-2 text-lg border border-gray-300 rounded-md"
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full p-2 text-lg border border-gray-300 rounded-md"
            />
            <textarea
              name="notes"
              placeholder="Additional Notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full p-2 text-lg border border-gray-300 rounded-md resize-none h-20"
            ></textarea>
          </>
        )}
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

export default CostTracking;
