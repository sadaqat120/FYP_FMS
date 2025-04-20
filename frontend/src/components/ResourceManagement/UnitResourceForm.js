import React, { useState, useEffect } from "react";
import axios from "axios";

const UnitResourceForm = ({ storeId }) => {
  const [activeForm, setActiveForm] = useState("");
  const [formData, setFormData] = useState({});
  const [resources, setResources] = useState([]);
  const [errors, setErrors] = useState({}); // State to hold error messages

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
  }, [storeId]);

  const handleFormSwitch = (form) => {
    setActiveForm(form === activeForm ? "" : form);
    setFormData({});
    setErrors({}); // Reset errors when switching forms
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" })); // Clear error for the field being edited
  };

  const validateFields = () => {
    const newErrors = {};
    if (activeForm === "addResource") {
      if (!formData.resourceType)
        newErrors.resourceType = "Resource Type is required.";
      if (!formData.resourceName)
        newErrors.resourceName = "Resource Name is required.";
      if (!formData.uniqueId) newErrors.uniqueId = "Unique ID is required.";
      if (!formData.quantity) newErrors.quantity = "Quantity is required.";
      if (!formData.unit) newErrors.unit = "Unit is required.";
      if (!formData.costPerUnit)
        newErrors.costPerUnit = "Cost Per Unit is required.";
      if (!formData.totalCost) newErrors.totalCost = "Total Cost is required.";
      if (!formData.dateAdded) newErrors.dateAdded = "Date Added is required."; // Make date required
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
  
    if (activeForm === "addResource") {
      try {
        await axios.post("http://localhost:5000/unit-resources", {
          ...formData,
          storeId,
        }, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        alert("Unit-Based Resource Added Successfully!");
        setFormData({});
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setErrors((prev) => ({ ...prev, uniqueId: error.response.data.message }));
        } else {
          console.error("Error adding unit-based resource:", error);
        }
      }
    } else if (activeForm === "usageTracking") {
      const resourceExists = resources.some(resource => resource.uniqueId === formData.resourceId);
      if (!resourceExists) {
        setErrors((prev) => ({ ...prev, resourceId: "Resource ID does not exist." }));
        return;
      }
  
      try {
        await axios.post("http://localhost:5000/unit-resources/usage", {
          storeId,
          ...formData,
        }, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        alert("Usage Recorded Successfully!");
        setFormData({});
      } catch (error) {
        console.error("Error recording usage:", error);
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

      {/* Add New Resource Form */}
      {activeForm === "addResource" && (
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-blue-600 mb-4">
            Add New Unit-Based Resource
          </h2>
          <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label>Resource Type</label>
              <select
                value={formData.resourceType || ""}
                onChange={(e) =>
                  handleInputChange("resourceType", e.target.value)
                }
                className="p-2 border rounded-lg"
                required
              >
                <option value="" disabled>
                  Select Resource Type
                </option>
                <option value="Seeds">Seeds</option>
                <option value="Fertilizer">Fertilizer</option>
                <option value="Feeds">Feeds</option>
                <option value="Others">Others</option>
              </select>
              {errors.resourceType && (
                <p className="text-red-500">{errors.resourceType}</p>
              )}
            </div>
            <div>
              <label>Resource Name</label>
              <input
                type="text"
                value={formData.resourceName || ""}
                onChange={(e) =>
                  handleInputChange("resourceName", e.target.value)
                }
                className="p-2 border rounded-lg"
                required
              />
              {errors.resourceName && (
                <p className="text-red-500">{errors.resourceName}</p>
              )}
            </div>
            <div>
              <label>Unique ID</label>
              <input
                type="text"
                value={formData.uniqueId || ""}
                onChange={(e) => handleInputChange("uniqueId", e.target.value)}
                className="p-2 border rounded-lg"
                required
              />
              {errors.uniqueId && (
                <p className="text-red-500">{errors.uniqueId}</p>
              )}
            </div>
            <div>
              <label>Quantity</label>
              <input
                type="number"
                value={formData.quantity || ""}
                onChange={(e) => handleInputChange("quantity", e.target.value)}
                className="p-2 border rounded-lg"
                required
              />
              {errors.quantity && (
                <p className="text-red-500">{errors.quantity}</p>
              )}
            </div>
            <div>
              <label>Unit</label>
              <select
                value={formData.unit || ""}
                onChange={(e) => handleInputChange("unit", e.target.value)}
                className="p-2 border rounded-lg"
                required
              >
                <option value="" disabled>
                  Select Unit
                </option>
                <option value="kg">Kilograms (kg)</option>
                <option value="g">Grams (g)</option>
                <option value="liters">Liters</option>
                <option value="units">Units</option>
              </select>
              {errors.unit && <p className="text-red-500">{errors.unit}</p>}
            </div>
            <div>
              <label>Cost Per Unit</label>
              <input
                type="number"
                value={formData.costPerUnit || ""}
                onChange={(e) =>
                  handleInputChange("costPerUnit", e.target.value)
                }
                className="p-2 border rounded-lg"
                required
              />
              {errors.costPerUnit && (
                <p className="text-red-500">{errors.costPerUnit}</p>
              )}
            </div>
            <div>
              <label>Total Cost</label>
              <input
                type="number"
                value={formData.totalCost || ""}
                onChange={(e) => handleInputChange("totalCost", e.target.value)}
                className="p-2 border rounded-lg"
                required
              />
              {errors.totalCost && (
                <p className="text-red-500">{errors.totalCost}</p>
              )}
            </div>
            <div>
              <label>Date Added</label>
              <input
                type="date"
                value={formData.dateAdded || ""}
                onChange={(e) => handleInputChange("dateAdded", e.target.value)}
                className="p-2 border rounded-lg"
                required
              />
              {errors.dateAdded && (
                <p className="text-red-500">{errors.dateAdded}</p>
              )}
            </div>
            <div>
              <label>Notes (Optional)</label>
              <textarea
                value={formData.notes || ""}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                className="p-2 border rounded-lg"
              />
            </div>
            <button
              type="button"
              onClick={handleSave}
              className="mt-4 py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Save Resource
            </button>
          </form>
        </div>
      )}

      {/* Usage Tracking Form */}
      {activeForm === "usageTracking" && (
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-blue-600 mb-4">
            Track Resource Usage
          </h2>
          <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label>Resource ID</label>
              <input
                type="text"
                value={formData.resourceId || ""}
                onChange={(e) =>
                  handleInputChange("resourceId", e.target.value)
                }
                className="p-2 border rounded-lg"
                required
              />
              {errors.resourceId && (
                <p className="text-red-500">{errors.resourceId}</p>
              )}
            </div>
            <div>
              <label>Quantity Used</label>
              <input
                type="number"
                value={formData.quantityUsed || ""}
                onChange={(e) =>
                  handleInputChange("quantityUsed", e.target.value)
                }
                className="p-2 border rounded-lg"
                required
              />
              {errors.quantityUsed && (
                <p className="text-red-500">{errors.quantityUsed}</p>
              )}
            </div>
            <div>
              <label>Usage Purpose</label>
              <input
                type="text"
                value={formData.usagePurpose || ""}
                onChange={(e) =>
                  handleInputChange("usagePurpose", e.target.value)
                }
                className="p-2 border rounded-lg"
                required
              />
              {errors.usagePurpose && (
                <p className="text-red-500">{errors.usagePurpose}</p>
              )}
            </div>
            <div>
              <label>Date of Usage</label>
              <input
                type="date"
                value={formData.dateOfUsage || ""}
                onChange={(e) =>
                  handleInputChange("dateOfUsage", e.target.value)
                }
                className="p-2 border rounded-lg"
                required
              />
              {errors.dateOfUsage && (
                <p className="text-red-500">{errors.dateOfUsage}</p>
              )}
            </div>
            <div>
              <label>Notes (Optional)</label>
              <textarea
                value={formData.notes || ""}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                className="p-2 border rounded-lg"
              />
            </div>
            <button
              type="button"
              onClick={handleSave}
              className="mt-4 py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Save Usage
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UnitResourceForm;
