import React, { useState, useEffect } from "react";
import axios from "axios";

const HumanResourceForm = ({ storeId }) => {
  const [activeForm, setActiveForm] = useState("");
  const [formData, setFormData] = useState({});
  const [resources, setResources] = useState([]);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [generatedId, setGeneratedId] = useState("");

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/human-resources/${storeId}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setResources(response.data);
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    };

    fetchResources();
  }, [storeId, successMessage]);

  const handleFormSwitch = (form) => {
    setActiveForm(form === activeForm ? "" : form);
    setFormData({});
    setErrors({});
    setGeneratedId("");
    if (form === "add") {
      generateUniqueId();
    }
  };

  const generateUniqueId = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/human-resources/generate-id/${storeId}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setGeneratedId(res.data.id);
      setFormData((prev) => ({ ...prev, id: res.data.id }));
    } catch (error) {
      console.error("Error generating ID:", error);
      setErrors((prev) => ({
        ...prev,
        general: error.response?.data?.message || "Failed to generate ID"
      }));
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateFields = () => {
    const newErrors = {};
    if (activeForm === "payment") {
      if (!formData.workerId) newErrors.workerId = "Worker ID is required.";
      if (!formData.payment) newErrors.payment = "Payment Amount is required.";
      if (!formData.workStartDate)
        newErrors.workStartDate = "Work Start Date is required.";
      if (!formData.workEndDate)
        newErrors.workEndDate = "Work End Date is required.";
      if (!formData.paymentDate)
        newErrors.paymentDate = "Payment Date is required.";
    } else if (activeForm === "add") {
      if (!formData.workerName)
        newErrors.workerName = "Worker Name is required.";
      if (!formData.role) newErrors.role = "Role/Position is required.";
      if (!formData.dateEnrolled)
        newErrors.dateEnrolled = "Date Enrolled is required.";
    }
    return newErrors;
  };

  const handleSave = async () => {
    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (activeForm === "add") {
      try {
        await axios.post(
          "http://localhost:5000/human-resources",
          {
            ...formData,
            storeId,
          },
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setSuccessMessage("Human Resource Added Successfully!");
        setTimeout(() => setSuccessMessage(""), 2000);
        setFormData({});
        generateUniqueId();
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setErrors((prev) => ({ ...prev, id: error.response.data.message }));
        } else {
          console.error("Error adding human resource:", error);
        }
      }
    } else if (activeForm === "payment") {
      try {
        await axios.post(
          `http://localhost:5000/human-resources/${storeId}/${encodeURIComponent(
            formData.workerId
          )}/payments`,
          {
            paymentAmount: formData.payment,
            workStartDate: formData.workStartDate,
            workEndDate: formData.workEndDate,
            paymentDate: formData.paymentDate,
            notes: formData.notes,
          },
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setSuccessMessage("Payment Recorded Successfully!");
        setTimeout(() => setSuccessMessage(""), 2000);
        setFormData({});
      } catch (error) {
        console.error("Error recording payment:", error);
      }
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-green-600 mb-6 text-center">
        Human Resource Management
      </h1>

      {/* Form Selector */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => handleFormSwitch("add")}
          className={`py-2 px-4 rounded-lg ${
            activeForm === "add"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-800"
          } hover:bg-green-700`}
        >
          Add New Resource
        </button>
        <button
          onClick={() => handleFormSwitch("payment")}
          className={`py-2 px-4 rounded-lg ${
            activeForm === "payment"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-800"
          } hover:bg-green-700`}
        >
          Record Payment
        </button>
      </div>

      {errors.general && (
        <div className="bg-red-100 text-red-800 px-4 py-2 rounded mb-4 text-center shadow-md">
          {errors.general}
        </div>
      )}

      {/* Add New Resource Form */}
      {activeForm === "add" && (
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-blue-600 mb-4">
            Add New Human Resource
          </h2>
          {successMessage && (
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded mb-4 text-center shadow-md">
              {successMessage}
            </div>
          )}

          <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">ID (Auto-generated)</label>
              <input
                type="text"
                value={generatedId}
                disabled
                className="w-full p-2 border rounded-lg bg-gray-100 text-gray-600"
              />
              {errors.id && <p className="text-red-500 text-sm mt-1">{errors.id}</p>}
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Worker Name</label>
              <input
                type="text"
                placeholder="Worker Name"
                value={formData.workerName || ""}
                onChange={(e) =>
                  handleInputChange("workerName", e.target.value)
                }
                className="w-full p-2 border rounded-lg"
                required
              />
              {errors.workerName && (
                <p className="text-red-500 text-sm mt-1">{errors.workerName}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Role/Position</label>
              <input
                type="text"
                placeholder="Role/Position"
                value={formData.role || ""}
                onChange={(e) => handleInputChange("role", e.target.value)}
                className="w-full p-2 border rounded-lg"
                required
              />
              {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Date Enrolled</label>
              <input
                type="date"
                placeholder="Date Enrolled"
                value={formData.dateEnrolled || ""}
                onChange={(e) =>
                  handleInputChange("dateEnrolled", e.target.value)
                }
                className="w-full p-2 border rounded-lg"
                required
              />
              {errors.dateEnrolled && (
                <p className="text-red-500 text-sm mt-1">{errors.dateEnrolled}</p>
              )}
            </div>
            <div className="col-span-2">
              <label className="block text-gray-700 mb-1">Notes</label>
              <textarea
                placeholder="Notes"
                value={formData.notes || ""}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                className="w-full p-2 border rounded-lg"
                rows="3"
              />
            </div>
            <div className="col-span-2 flex justify-end">
              <button
                type="button"
                onClick={handleSave}
                className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition duration-200"
              >
                Save Resource
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Make Payment Form */}
      {activeForm === "payment" && (
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-blue-600 mb-4">
            Record Payment
          </h2>
          {successMessage && (
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded mb-4 text-center shadow-md">
              {successMessage}
            </div>
          )}
          <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Select Worker</label>
              <select
                value={formData.workerId || ""}
                onChange={(e) => handleInputChange("workerId", e.target.value)}
                className="w-full p-2 border rounded-lg"
                required
              >
                <option value="">-- Select Worker --</option>
                {resources.map((resource) => (
                  <option key={resource._id} value={resource.id}>
                    {resource.id} - {resource.workerName} ({resource.role})
                  </option>
                ))}
              </select>
              {errors.workerId && (
                <p className="text-red-500 text-sm mt-1">{errors.workerId}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Payment Amount</label>
              <input
                type="number"
                placeholder="0.00"
                value={formData.payment || ""}
                onChange={(e) => handleInputChange("payment", e.target.value)}
                className="w-full p-2 border rounded-lg"
                required
                min="0"
                step="0.01"
              />
              {errors.payment && (
                <p className="text-red-500 text-sm mt-1">{errors.payment}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Work Start Date</label>
              <input
                type="date"
                value={formData.workStartDate || ""}
                onChange={(e) =>
                  handleInputChange("workStartDate", e.target.value)
                }
                className="w-full p-2 border rounded-lg"
                required
              />
              {errors.workStartDate && (
                <p className="text-red-500 text-sm mt-1">{errors.workStartDate}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Work End Date</label>
              <input
                type="date"
                value={formData.workEndDate || ""}
                onChange={(e) =>
                  handleInputChange("workEndDate", e.target.value)
                }
                className="w-full p-2 border rounded-lg"
                required
              />
              {errors.workEndDate && (
                <p className="text-red-500 text-sm mt-1">{errors.workEndDate}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Payment Date</label>
              <input
                type="date"
                value={formData.paymentDate || ""}
                onChange={(e) =>
                  handleInputChange("paymentDate", e.target.value)
                }
                className="w-full p-2 border rounded-lg"
                required
              />
              {errors.paymentDate && (
                <p className="text-red-500 text-sm mt-1">{errors.paymentDate}</p>
              )}
            </div>
            <div className="col-span-2">
              <label className="block text-gray-700 mb-1">Payment Notes</label>
              <textarea
                placeholder="Additional payment details"
                value={formData.notes || ""}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                className="w-full p-2 border rounded-lg"
                rows="3"
              />
            </div>
            <div className="col-span-2 flex justify-end">
              <button
                type="button"
                onClick={handleSave}
                className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition duration-200"
              >
                Record Payment
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default HumanResourceForm;
