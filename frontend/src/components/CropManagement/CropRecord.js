import React, { useState } from "react";

const CropRecord = () => {
  const [formData, setFormData] = useState({
    season: "",
    cropType: "",
    cropName: "",
    duration: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Crop Record Saved Successfully!");
  };

  return (
    <div className="w-4/5 mx-auto my-5 p-5 border border-gray-300 rounded-lg bg-gray-50 shadow-md flex flex-col gap-4">
      <h2 className="text-center text-2xl text-green-700">Crop Record</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <select
          name="season"
          value={formData.season}
          onChange={handleChange}
          required
          className="w-full p-2 text-base border border-gray-300 rounded"
        >
          <option value="">Select Season</option>
          <option value="rabi">Rabi</option>
          <option value="kharif">Kharif</option>
        </select>
        <input
          type="text"
          name="cropType"
          placeholder="Crop Type (e.g., Cereal)"
          value={formData.cropType}
          onChange={handleChange}
          required
          className="w-full p-2 text-base border border-gray-300 rounded"
        />
        <input
          type="text"
          name="cropName"
          placeholder="Crop Name (e.g., Wheat)"
          value={formData.cropName}
          onChange={handleChange}
          required
          className="w-full p-2 text-base border border-gray-300 rounded"
        />
        <input
          type="text"
          name="duration"
          placeholder="Expected Duration (e.g., 120 days)"
          value={formData.duration}
          onChange={handleChange}
          required
          className="w-full p-2 text-base border border-gray-300 rounded"
        />
        <textarea
          name="notes"
          placeholder="Additional Notes"
          value={formData.notes}
          onChange={handleChange}
          className="w-full p-2 text-base border border-gray-300 rounded resize-none h-20"
        ></textarea>
        <button
          type="submit"
          className="px-5 py-3 text-white text-base bg-green-600 rounded hover:bg-green-700 transition"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default CropRecord;
