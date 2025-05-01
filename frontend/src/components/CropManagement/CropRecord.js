import React, { useState } from "react";
import axios from "axios";

const CropRecord = ({ cropFarmId }) => {
  const [formData, setFormData] = useState({
    season: "",
    cropType: "",
    cropName: "",
    duration: "",
    notes: ""
  });

  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  const validate = () => {
    const newErrors = {};
    if (!formData.season.trim()) newErrors.season = "Season is required";
    if (!formData.cropType.trim()) newErrors.cropType = "Crop type is required";
    if (!formData.cropName.trim()) newErrors.cropName = "Crop name is required";
    if (!formData.duration.trim()) newErrors.duration = "Expected duration is required";
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
        "http://localhost:5000/crop-records",
        {
          ...formData,
          cropFarmId // Pass the farm ID
        },
        {
          headers: { Authorization: token }
        }
      );

      setSuccessMsg("Crop Record Saved Successfully!");
      setFormData({
        season: "",
        cropType: "",
        cropName: "",
        duration: "",
        notes: ""
      });
      setErrors({});
    } catch (err) {
      console.error(err);
      setSuccessMsg("");
      alert("Error saving crop record.");
    }
  };

  return (
    <div className="w-4/5 mx-auto my-5 p-5 border border-gray-300 rounded-lg bg-gray-50 shadow-md flex flex-col gap-4">
      <h2 className="text-center text-2xl text-green-700">Crop Record</h2>
      {successMsg && <p className="text-green-600 text-center">{successMsg}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Season */}
        <div>
          <select
            name="season"
            value={formData.season}
            onChange={handleChange}
            className="w-full p-2 text-base border border-gray-300 rounded"
            required
          >
            <option value="">Select Season</option>
            <option value="rabi">Rabi</option>
            <option value="kharif">Kharif</option>
          </select>
          {errors.season && <p className="text-red-500 text-sm">{errors.season}</p>}
        </div>

        {/* Crop Type */}
        <div>
          <input
            type="text"
            name="cropType"
            placeholder="Crop Type (e.g., Cereal)"
            value={formData.cropType}
            onChange={handleChange}
            className="w-full p-2 text-base border border-gray-300 rounded"
            required
          />
          {errors.cropType && <p className="text-red-500 text-sm">{errors.cropType}</p>}
        </div>

        {/* Crop Name */}
        <div>
          <input
            type="text"
            name="cropName"
            placeholder="Crop Name (e.g., Wheat)"
            value={formData.cropName}
            onChange={handleChange}
            className="w-full p-2 text-base border border-gray-300 rounded"
            required
          />
          {errors.cropName && <p className="text-red-500 text-sm">{errors.cropName}</p>}
        </div>

        {/* Duration */}
        <div>
          <input
            type="number"
            name="duration"
            placeholder="Expected Duration (e.g., 120 days)"
            value={formData.duration}
            onChange={handleChange}
            className="w-full p-2 text-base border border-gray-300 rounded"
            required
          />
          {errors.duration && <p className="text-red-500 text-sm">{errors.duration}</p>}
        </div>

        {/* Notes (Optional) */}
        <div>
          <textarea
            name="notes"
            placeholder="Additional Notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full p-2 text-base border border-gray-300 rounded resize-none h-20"
          />
        </div>

        {/* Submit Button */}
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
