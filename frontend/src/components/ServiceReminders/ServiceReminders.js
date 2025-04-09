import React, { useEffect, useState } from "react";
import axios from "axios";

const RemindersDashboard = () => {
  const [reminders, setReminders] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(initialFormState());
  const [editId, setEditId] = useState(null);
  const [errors, setErrors] = useState({});

  function initialFormState() {
    return {
      storeId: "",
      managementType: "",
      locationName: "",
      purpose: "",
      date: "",
      time: "",
      notes: "",
    };
  }

  const fetchReminders = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(`http://localhost:5000/reminders`, {
        headers: { Authorization: token },
      });
      setReminders(data);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  const validate = () => {
    const newErrors = {};
    ["managementType", "locationName", "purpose", "date", "time"].forEach(
      (field) => {
        if (!formData[field]) newErrors[field] = "This field is required";
      }
    );
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!validate()) return;
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: token } };

      if (editId) {
        await axios.put(
          `http://localhost:5000/reminders/${editId}`,
          formData,
          config
        );
      } else {
        await axios.post("http://localhost:5000/reminders", formData, config);
      }

      fetchReminders();
      cancelForm();
    } catch (err) {
      console.error("Save Error:", err);
    }
  };

  const cancelForm = () => {
    setFormData(initialFormState());
    setShowForm(false);
    setEditId(null);
    setErrors({});
  };

  const handleEdit = (reminder) => {
    setFormData(reminder);
    setEditId(reminder._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this reminder?"))
      return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/reminders/${id}`, {
        headers: { Authorization: token },
      });
      fetchReminders();
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  const renderPurposeOptions = () => {
    switch (formData.managementType) {
      case "Crop":
        return [
          "land preparation",
          "seed sowing",
          "irrigation",
          "fertilization",
          "weed monitoring",
          "pest management",
          "harvesting",
          "post harvesting",
          "others",
        ];
      case "Livestock":
        return [
          "health check",
          "vaccination",
          "feeding",
          "milking",
          "cleaning",
          "maintenance",
          "others",
        ];
      case "Resource":
        return ["Low Inventory", "Repair Needed", "Expiry Alert", "others"];
      default:
        return [];
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
        FMS Reminders Service
      </h1>

      <div className="flex justify-between items-center mb-4">
        {!showForm && (
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={() => setShowForm(true)}
          >
            Reminder Creation
          </button>
        )}
        {showForm && (
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={cancelForm}
          >
            Back
          </button>
        )}
      </div>

      {showForm && (
        <div className="bg-white p-4 rounded shadow-md mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold">Management Type</label>
              <select
                name="managementType"
                value={formData.managementType}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Select...</option>
                <option value="Crop">Crop Management</option>
                <option value="Livestock">Livestock Management</option>
                <option value="Resource">Resource Management</option>
              </select>
              {errors.managementType && (
                <p className="text-red-500 text-sm">{errors.managementType}</p>
              )}
            </div>

            <div>
              <label className="font-semibold">
                {formData.managementType === "Crop"
                  ? "Plot Name"
                  : formData.managementType === "Livestock"
                  ? "Farm Name"
                  : formData.managementType === "Resource"
                  ? "Store Name"
                  : "Name"}
              </label>
              <input
                type="text"
                name="locationName"
                placeholder="Enter name"
                value={formData.locationName}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              {errors.locationName && (
                <p className="text-red-500 text-sm">{errors.locationName}</p>
              )}
            </div>

            <div>
              <label className="font-semibold">Purpose</label>
              <select
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Purpose</option>
                {renderPurposeOptions().map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {errors.purpose && (
                <p className="text-red-500 text-sm">{errors.purpose}</p>
              )}
            </div>

            <div>
              <label className="font-semibold">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              {errors.date && (
                <p className="text-red-500 text-sm">{errors.date}</p>
              )}
            </div>

            <div>
              <label className="font-semibold">Time</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              {errors.time && (
                <p className="text-red-500 text-sm">{errors.time}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="font-semibold">Notes (Optional)</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          <div className="mt-4">
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
            >
              {editId ? "Update" : "Save"}
            </button>
            <button
              onClick={cancelForm}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded">
          <thead>
            <tr className="bg-green-600 text-white">
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Management</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Purpose</th>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Time</th>
              <th className="py-2 px-4 max-w-xs">Notes</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reminders.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  No reminders found
                </td>
              </tr>
            ) : (
              reminders.map((r, idx) => (
                <tr key={r._id} className="border-t">
                  <td className="py-2 px-4 text-center">{idx + 1}</td>
                  <td className="py-2 px-4">{r.managementType}</td>
                  <td className="py-2 px-4">{r.locationName}</td>
                  <td className="py-2 px-4">{r.purpose}</td>
                  <td className="py-2 px-4">{r.date}</td>
                  <td className="py-2 px-4">{r.time}</td>
                  {/* <td className="py-2 px-4 max-w-xs truncate" title={r.notes}>{r.notes}</td> */}
                  <td className="py-2 px-4 max-w-xs whitespace-pre-wrap break-words align-top">
                    {r.notes}
                  </td>

                  <td className="py-2 px-4 space-x-2">
                    <button
                      onClick={() => handleEdit(r)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(r._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RemindersDashboard;
