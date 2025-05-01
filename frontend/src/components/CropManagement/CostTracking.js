import React, { useState } from "react";
import axios from "axios";

const CostTracking = ({ cropFarmId }) => {
  const [selectedActivity, setSelectedActivity] = useState("");
  const [formData, setFormData] = useState({
    equipmentCost: "",
    materialCost: "",
    laborCost: "",
    transportCost: "",
    miscCost: "",
    date: "",
    notes: ""
  });

  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  const validate = () => {
    const newErrors = {};
    if (!selectedActivity) newErrors.activity = "Activity is required";
    if (!formData.equipmentCost || isNaN(formData.equipmentCost)) newErrors.equipmentCost = "Equipment cost is required";
    if (!formData.materialCost || isNaN(formData.materialCost)) newErrors.materialCost = "Material cost is required";
    if (!formData.laborCost || isNaN(formData.laborCost)) newErrors.laborCost = "Labor cost is required";
    if (!formData.transportCost || isNaN(formData.transportCost)) newErrors.transportCost = "Transport cost is required";
    if (!formData.miscCost || isNaN(formData.miscCost)) newErrors.miscCost = "Misc cost is required";
    if (!formData.date) newErrors.date = "Date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleActivityChange = (e) => {
    setSelectedActivity(e.target.value);
    setFormData({
      equipmentCost: "",
      materialCost: "",
      laborCost: "",
      transportCost: "",
      miscCost: "",
      date: "",
      notes: ""
    });
    setErrors({});
    setSuccessMsg("");
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
      await axios.post("http://localhost:5000/cost-tracking", {
        cropFarmId,
        activity: selectedActivity,
        equipmentCost: Number(formData.equipmentCost || 0),
        materialCost: Number(formData.materialCost || 0),
        laborCost: Number(formData.laborCost || 0),
        transportCost: Number(formData.transportCost || 0),
        miscCost: Number(formData.miscCost || 0),
        date: formData.date,
        notes: formData.notes
      }, {
        headers: { Authorization: token }
      });

      setSuccessMsg("Cost Tracking Saved Successfully!");
      setFormData({
        equipmentCost: "",
        materialCost: "",
        laborCost: "",
        transportCost: "",
        miscCost: "",
        date: "",
        notes: ""
      });
      setSelectedActivity("");
      setErrors({});
    } catch (err) {
      console.error(err);
      alert("Error saving cost tracking.");
    }
  };

  return (
    <div className="w-4/5 mx-auto my-5 p-5 border border-gray-300 rounded-lg bg-gray-50 shadow-md flex flex-col gap-4">
      <h2 className="text-center text-2xl text-green-700">Cost Tracking</h2>
      {successMsg && <p className="text-green-600 text-center">{successMsg}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <select
            name="activity"
            value={selectedActivity}
            onChange={handleActivityChange}
            className="w-full p-2 text-lg border border-gray-300 rounded-md"
            required
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
          {errors.activity && <p className="text-red-500 text-sm">{errors.activity}</p>}
        </div>

        {selectedActivity && (
          <>
            {[
              { name: "equipmentCost", label: "Equipment Cost" },
              { name: "materialCost", label: "Material Cost" },
              { name: "laborCost", label: "Labor Cost" },
              { name: "transportCost", label: "Transport Cost" },
              { name: "miscCost", label: "Miscellaneous Cost" }
            ].map(({ name, label }) => (
              <div key={name}>
                <input
                  type="number"
                  name={name}
                  placeholder={label}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full p-2 text-lg border border-gray-300 rounded-md"
                  required
                />
                {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
              </div>
            ))}

            <div>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-2 text-lg border border-gray-300 rounded-md"
                required
              />
              {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
            </div>

            <textarea
              name="notes"
              placeholder="Additional Notes (optional)"
              value={formData.notes}
              onChange={handleChange}
              className="w-full p-2 text-lg border border-gray-300 rounded-md resize-none h-20"
            />
          </>
        )}

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

export default CostTracking;
