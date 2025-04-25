import React, { useState } from "react";

const LandRecord = () => {
  const [formData, setFormData] = useState({
    plotName: "",
    area: "",
    location: "",
    soilType: "",
    landType: "",
    landSuitability: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Land Record Saved Successfully!");
  };

  return (
    <div className="w-4/5 mx-auto my-5 p-5 border border-gray-300 rounded-lg bg-gray-50 shadow-md flex flex-col gap-4">
      <h2 className="text-center text-2xl text-green-700">Land Record</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          name="area"
          placeholder="Area (Acres/Kanals)"
          value={formData.area}
          onChange={handleChange}
          required
          className="w-full p-2 text-lg border border-gray-300 rounded-md"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
          className="w-full p-2 text-lg border border-gray-300 rounded-md"
        />
        <input
          type="text"
          name="soilType"
          placeholder="Soil Type (e.g., Sandy, Clay)"
          value={formData.soilType}
          onChange={handleChange}
          required
          className="w-full p-2 text-lg border border-gray-300 rounded-md"
        />
        <select
          name="landType"
          value={formData.landType}
          onChange={handleChange}
          required
          className="w-full p-2 text-lg border border-gray-300 rounded-md"
        >
          <option value="">Select Land Type</option>
          <option value="irrigated">Irrigated</option>
          <option value="rainfed">Rainfed</option>
        </select>
        <textarea
          name="landSuitability"
          placeholder="Land Suitability (e.g., Suitable for wheat)"
          value={formData.landSuitability}
          onChange={handleChange}
          className="w-full p-2 text-lg border border-gray-300 rounded-md h-20"
        ></textarea>
        <textarea
          name="notes"
          placeholder="Additional Notes"
          value={formData.notes}
          onChange={handleChange}
          className="w-full p-2 text-lg border border-gray-300 rounded-md h-20"
        ></textarea>
        <button
          type="submit"
          className="p-3 text-lg text-white bg-green-500 rounded-md hover:bg-green-600 transition"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default LandRecord;
