import React, { useState } from "react";
import axios from "axios";

const LandRecord = ({ cropFarmId }) => {
  const [formData, setFormData] = useState({
    plotId: "", // This acts as the identifier for the plot
    area: "",
    location: "",
    soilType: "",
    landType: "",
    landSuitability: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  const validate = () => {
    const newErrors = {};
    if (!formData.plotId.trim()) newErrors.plotId = "Plot ID is required";
    if (!formData.area || isNaN(formData.area))
      newErrors.area = "Valid area is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.soilType.trim()) newErrors.soilType = "Soil type is required";
    if (!formData.landType.trim()) newErrors.landType = "Land type is required";

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
      await axios.post(
        "http://localhost:5000/land-records",
        {
          ...formData,
          cropFarmId, // Include CropFarm reference
        },
        {
          headers: { Authorization: token },
        }
      );

      setSuccessMsg("Land Record Saved Successfully!");
      setFormData({
        plotId: "",
        area: "",
        location: "",
        soilType: "",
        landType: "",
        landSuitability: "",
        notes: "",
      });
      setErrors({});
    } catch (err) {
      console.error(err);
      setSuccessMsg("");
      alert("Error saving land record. Please try again.");
    }
  };

  return (
    <div className="w-4/5 mx-auto my-5 p-5 border border-gray-300 rounded-lg bg-gray-50 shadow-md flex flex-col gap-4">
      <h2 className="text-center text-2xl text-green-700">Land Record</h2>
      {successMsg && <p className="text-green-600 text-center">{successMsg}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Plot ID */}
        <div>
          <input
            type="text"
            name="plotId"
            placeholder="Plot ID (e.g., PLOT123)"
            value={formData.plotId}
            onChange={handleChange}
            className="w-full p-2 text-lg border border-gray-300 rounded-md"
            required
          />
          {errors.plotId && (
            <p className="text-red-500 text-sm">{errors.plotId}</p>
          )}
        </div>

        {/* Area */}
        <div>
          <input
            type="number"
            name="area"
            placeholder="Area (Acres/Kanals)"
            value={formData.area}
            onChange={handleChange}
            className="w-full p-2 text-lg border border-gray-300 rounded-md"
            required
          />
          {errors.area && <p className="text-red-500 text-sm">{errors.area}</p>}
        </div>

        {/* Location */}
        <div>
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 text-lg border border-gray-300 rounded-md"
            required
          />
          {errors.location && (
            <p className="text-red-500 text-sm">{errors.location}</p>
          )}
        </div>

        {/* Soil Type */}
        <div>
          <input
            type="text"
            name="soilType"
            placeholder="Soil Type (e.g., Sandy, Clay)"
            value={formData.soilType}
            onChange={handleChange}
            className="w-full p-2 text-lg border border-gray-300 rounded-md"
            required
          />
          {errors.soilType && (
            <p className="text-red-500 text-sm">{errors.soilType}</p>
          )}
        </div>

        {/* Land Type */}
        <div>
          <select
            name="landType"
            value={formData.landType}
            onChange={handleChange}
            className="w-full p-2 text-lg border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Land Type</option>
            <option value="irrigated">Irrigated</option>
            <option value="rainfed">Rainfed</option>
          </select>
          {errors.landType && (
            <p className="text-red-500 text-sm">{errors.landType}</p>
          )}
        </div>

        {/* Land Suitability */}
        <textarea
          name="landSuitability"
          placeholder="Land Suitability (e.g., Suitable for wheat)"
          value={formData.landSuitability}
          onChange={handleChange}
          className="w-full p-2 text-lg border border-gray-300 rounded-md h-20"
        />

        {/* Notes (optional) */}
        <textarea
          name="notes"
          placeholder="Additional Notes"
          value={formData.notes}
          onChange={handleChange}
          className="w-full p-2 text-lg border border-gray-300 rounded-md h-20"
        />

        {/* Submit Button */}
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
