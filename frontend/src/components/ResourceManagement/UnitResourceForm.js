import React, { useState, useEffect } from "react";
import axios from "axios";

const UnitResourceForm = ({ storeId }) => {
  const [activeForm, setActiveForm] = useState("");
  const [formData, setFormData] = useState({
    quantity: 1,
    costPerUnit: 0,
    totalCost: 0,
  });
  const [resources, setResources] = useState([]);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [generatedId, setGeneratedId] = useState("");

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/unit-resources/${storeId}`,
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

  useEffect(() => {
    // Calculate total cost whenever quantity or costPerUnit changes
    if (activeForm === "addResource") {
      const quantity = parseFloat(formData.quantity) || 0;
      const costPerUnit = parseFloat(formData.costPerUnit) || 0;
      const totalCost = quantity * costPerUnit;
      setFormData((prev) => ({
        ...prev,
        totalCost: totalCost.toFixed(2),
      }));
    }
  }, [formData.quantity, formData.costPerUnit, activeForm]);

  const handleFormSwitch = (form) => {
    setActiveForm(form === activeForm ? "" : form);
    setFormData({
      quantity: 1,
      costPerUnit: 0,
      totalCost: 0,
    });
    setErrors({});
    setSuccessMessage("");
    setGeneratedId("");
    if (form === "addResource") generateUniqueId();
  };

  const generateUniqueId = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/unit-resources/generate-id/${storeId}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setGeneratedId(response.data.id);
      setFormData((prev) => ({ ...prev, uniqueId: response.data.id }));
    } catch (error) {
      console.error("Error generating ID:", error);
      setErrors((prev) => ({
        ...prev,
        general: error.response?.data?.message || "Failed to generate ID",
      }));
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateFields = () => {
    const newErrors = {};
    if (activeForm === "addResource") {
      if (!formData.resourceType)
        newErrors.resourceType = "Resource Type is required.";
      if (!formData.resourceName)
        newErrors.resourceName = "Resource Name is required.";
      if (!formData.quantity) newErrors.quantity = "Quantity is required.";
      if (!formData.unit) newErrors.unit = "Unit is required.";
      if (!formData.costPerUnit)
        newErrors.costPerUnit = "Cost Per Unit is required.";
      if (!formData.dateAdded) newErrors.dateAdded = "Date Added is required.";
    } else if (activeForm === "usageTracking") {
      if (!formData.resourceId)
        newErrors.resourceId = "Resource ID is required.";
      if (!formData.quantityUsed)
        newErrors.quantityUsed = "Quantity Used is required.";
      if (!formData.usagePurpose)
        newErrors.usagePurpose = "Usage Purpose is required.";
      if (!formData.dateOfUsage)
        newErrors.dateOfUsage = "Date of Usage is required.";
    }
    return newErrors;
  };

  const handleSave = async () => {
    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      if (activeForm === "addResource") {
        await axios.post(
          "http://localhost:5000/unit-resources",
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
        setSuccessMessage("Unit-Based Resource Added Successfully!");
      } else if (activeForm === "usageTracking") {
        await axios.post(
          "http://localhost:5000/unit-resources/usage",
          {
            storeId,
            ...formData,
          },
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setSuccessMessage("Usage Recorded Successfully!");
      }

      setTimeout(() => {
        setSuccessMessage("");
        if (activeForm === "addResource") {
          setFormData({
            quantity: 1,
            costPerUnit: 0,
            totalCost: 0,
          });
          generateUniqueId();
        } else {
          setFormData({});
        }
      }, 2000);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors((prev) => ({
          ...prev,
          uniqueId: error.response.data.message,
        }));
      } else {
        console.error("Error saving data:", error);
        setErrors((prev) => ({
          ...prev,
          general: error.response?.data?.message || "An error occurred",
        }));
      }
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-green-600 mb-6 text-center">
        Unit-Based Resource Management
      </h1>

      {/* Form Selector */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => handleFormSwitch("addResource")}
          className={`py-2 px-4 rounded-lg ${
            activeForm === "addResource"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-800"
          } hover:bg-green-700`}
        >
          Add New Resource
        </button>
        <button
          onClick={() => handleFormSwitch("usageTracking")}
          className={`py-2 px-4 rounded-lg ${
            activeForm === "usageTracking"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-800"
          } hover:bg-green-700`}
        >
          Usage Tracking
        </button>
      </div>

      {errors.general && (
        <div className="bg-red-100 text-red-800 px-4 py-2 rounded mb-4 text-center shadow-md">
          {errors.general}
        </div>
      )}

      {/* Add New Resource Form */}
      {activeForm === "addResource" && (
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-blue-600 mb-4">
            Add New Unit-Based Resource
          </h2>
          {successMessage && (
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded mb-4 text-center shadow-md">
              {successMessage}
            </div>
          )}

          <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Unique ID</label>
              <input
                type="text"
                value={generatedId}
                disabled
                className="w-full p-2 border rounded-lg bg-gray-100 text-gray-600"
              />
              {errors.uniqueId && (
                <p className="text-red-500 text-sm mt-1">{errors.uniqueId}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Resource Type</label>
              <select
                value={formData.resourceType || ""}
                onChange={(e) =>
                  handleInputChange("resourceType", e.target.value)
                }
                className="w-full p-2 border rounded-lg"
                required
              >
                <option value="">Select Resource Type</option>
                <option value="Seeds">Seeds</option>
                <option value="Fertilizer">Fertilizer</option>
                <option value="Feeds">Feeds</option>
                <option value="Others">Others</option>
              </select>
              {errors.resourceType && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.resourceType}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Resource Name</label>
              <input
                type="text"
                value={formData.resourceName || ""}
                onChange={(e) =>
                  handleInputChange("resourceName", e.target.value)
                }
                className="w-full p-2 border rounded-lg"
                required
              />
              {errors.resourceName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.resourceName}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Quantity</label>
              <input
                type="number"
                min="1"
                step="0.01"
                value={formData.quantity || ""}
                onChange={(e) => handleInputChange("quantity", e.target.value)}
                className="w-full p-2 border rounded-lg"
                required
              />
              {errors.quantity && (
                <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Unit</label>
              <select
                value={formData.unit || ""}
                onChange={(e) => handleInputChange("unit", e.target.value)}
                className="w-full p-2 border rounded-lg"
                required
              >
                <option value="">Select Unit</option>
                <option value="kg">Kilograms (kg)</option>
                <option value="g">Grams (g)</option>
                <option value="liters">Liters</option>
                <option value="units">Units</option>
              </select>
              {errors.unit && (
                <p className="text-red-500 text-sm mt-1">{errors.unit}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Cost Per Unit</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.costPerUnit || ""}
                onChange={(e) =>
                  handleInputChange("costPerUnit", e.target.value)
                }
                className="w-full p-2 border rounded-lg"
                required
              />
              {errors.costPerUnit && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.costPerUnit}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Total Cost</label>
              <input
                type="number"
                value={formData.totalCost || ""}
                disabled
                className="w-full p-2 border rounded-lg bg-gray-100 text-gray-600"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Date Added</label>
              <input
                type="date"
                value={formData.dateAdded || ""}
                onChange={(e) => handleInputChange("dateAdded", e.target.value)}
                className="w-full p-2 border rounded-lg"
                required
              />
              {errors.dateAdded && (
                <p className="text-red-500 text-sm mt-1">{errors.dateAdded}</p>
              )}
            </div>
            <div className="col-span-2">
              <label className="block text-gray-700 mb-1">Notes</label>
              <textarea
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

      {/* Usage Tracking Form */}
      {activeForm === "usageTracking" && (
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-blue-600 mb-4">
            Track Resource Usage
          </h2>
          {successMessage && (
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded mb-4 text-center shadow-md">
              {successMessage}
            </div>
          )}
          <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Resource</label>
              <select
                value={formData.resourceId || ""}
                onChange={(e) =>
                  handleInputChange("resourceId", e.target.value)
                }
                className="w-full p-2 border rounded-lg"
                required
              >
                <option value="">Select Resource</option>
                {resources.map((resource) => (
                  <option key={resource._id} value={resource.uniqueId}>
                    {resource.uniqueId} - {resource.resourceName}
                  </option>
                ))}
              </select>
              {errors.resourceId && (
                <p className="text-red-500 text-sm mt-1">{errors.resourceId}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Quantity Used</label>
              <input
                type="number"
                min="0.01"
                step="0.01"
                value={formData.quantityUsed || ""}
                onChange={(e) =>
                  handleInputChange("quantityUsed", e.target.value)
                }
                className="w-full p-2 border rounded-lg"
                required
              />
              {errors.quantityUsed && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.quantityUsed}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Usage Purpose</label>
              <input
                type="text"
                value={formData.usagePurpose || ""}
                onChange={(e) =>
                  handleInputChange("usagePurpose", e.target.value)
                }
                className="w-full p-2 border rounded-lg"
                required
              />
              {errors.usagePurpose && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.usagePurpose}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Date of Usage</label>
              <input
                type="date"
                value={formData.dateOfUsage || ""}
                onChange={(e) =>
                  handleInputChange("dateOfUsage", e.target.value)
                }
                className="w-full p-2 border rounded-lg"
                required
              />
              {errors.dateOfUsage && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.dateOfUsage}
                </p>
              )}
            </div>
            <div className="col-span-2">
              <label className="block text-gray-700 mb-1">Notes</label>
              <textarea
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
                Save Usage
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UnitResourceForm;
