import React, { useEffect, useState } from "react";
import axios from "axios";

const CropRecord = ({ cropFarmId }) => {
  const [formData, setFormData] = useState({
    season: "",
    cropType: "",
    cropName: "",
    duration: "",
    seedingDate: "",
    seedQuantity: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [recordId, setRecordId] = useState(null);

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:5000/crop-records/${cropFarmId}`,
          {
            headers: { Authorization: token },
          }
        );

        if (res.data && res.data.length > 0) {
          const existing = res.data[0];
          setFormData({
            season: existing.season || "",
            cropType: existing.cropType || "",
            cropName: existing.cropName || "",
            duration: existing.duration || "",
            seedingDate: existing.seedingDate?.substring(0, 10) || "",
            seedQuantity: existing.seedQuantity || "",
            notes: existing.notes || "",
          });
          setIsEditMode(true);
          setRecordId(existing._id);
        }
      } catch (err) {
        console.error("Error fetching crop record:", err);
      }
    };

    fetchRecord();
  }, [cropFarmId]);

  const validate = () => {
    const newErrors = {};

    if (!formData.season.trim()) newErrors.season = "Season is required";
    if (!formData.cropType.trim()) newErrors.cropType = "Crop type is required";
    if (!formData.cropName.trim()) newErrors.cropName = "Crop name is required";

    // ✅ duration: should be a number and not empty
    if (!formData.duration || isNaN(formData.duration)) {
      newErrors.duration = "Valid duration is required";
    }

    // ✅ seedQuantity: should be a number and not empty
    if (!formData.seedQuantity || isNaN(formData.seedQuantity)) {
      newErrors.seedQuantity = "Valid seed quantity is required";
    }

    // ✅ seedingDate: check as string
    if (!formData.seedingDate.trim()) {
      newErrors.seedingDate = "Seeding date is required";
    }

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

      if (isEditMode && recordId) {
        await axios.put(
          `http://localhost:5000/crop-records/${recordId}`,
          formData,
          { headers: { Authorization: token } }
        );
        setSuccessMsg("Crop Record Updated Successfully!");
      } else {
        await axios.post(
          "http://localhost:5000/crop-records",
          { ...formData, cropFarmId },
          { headers: { Authorization: token } }
        );
        setSuccessMsg("Crop Record Created Successfully!");
      }

      setErrors({});
    } catch (err) {
      console.error(err);
      setSuccessMsg("");
      setErrors({ general: "Error saving crop record." });
      setTimeout(() => setErrors({ general: "" }), 2000); // Optional: hide after 2s
    }
  };

  return (
    <div className="w-4/5 mx-auto my-5 p-5 border border-gray-300 rounded-lg bg-gray-50 shadow-md flex flex-col gap-4">
      <h2 className="text-center text-2xl text-green-700">
        {isEditMode ? "Edit Crop Record" : "Create Crop Record"}
      </h2>
      {successMsg && <p className="text-green-600 text-center">{successMsg}</p>}
      {errors.general && (
        <p className="text-red-600 text-center font-medium text-sm">
          {errors.general}
        </p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <select
          name="season"
          value={formData.season}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Season</option>
          <option value="rabi">Rabi</option>
          <option value="kharif">Kharif</option>
        </select>
        {errors.season && (
          <p className="text-red-500 text-sm">{errors.season}</p>
        )}

        <input
          type="text"
          name="cropType"
          placeholder="Crop Type"
          value={formData.cropType}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        {errors.cropType && (
          <p className="text-red-500 text-sm">{errors.cropType}</p>
        )}

        <input
          type="text"
          name="cropName"
          placeholder="Crop Name"
          value={formData.cropName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        {errors.cropName && (
          <p className="text-red-500 text-sm">{errors.cropName}</p>
        )}

        <input
          type="number"
          name="duration"
          placeholder="Duration (days)"
          value={formData.duration}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        {errors.duration && (
          <p className="text-red-500 text-sm">{errors.duration}</p>
        )}

        <input
          type="number"
          name="seedQuantity"
          placeholder="Seed Quantity (kg)"
          value={formData.seedQuantity}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        {errors.seedQuantity && (
          <p className="text-red-500 text-sm">{errors.seedQuantity}</p>
        )}
        <label htmlFor="seedingDate" className="font-medium text-gray-700">
          Seeding Date (Date when crop was planted 👇 )
        </label>

        <input
          type="date"
          name="seedingDate"
          value={formData.seedingDate}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        {errors.seedingDate && (
          <p className="text-red-500 text-sm">{errors.seedingDate}</p>
        )}

        <textarea
          name="notes"
          placeholder="Additional Notes"
          value={formData.notes}
          onChange={handleChange}
          className="w-full p-2 border rounded h-20"
        />

        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          {isEditMode ? "Update" : "Save"}
        </button>
      </form>
    </div>
  );
};

export default CropRecord;
