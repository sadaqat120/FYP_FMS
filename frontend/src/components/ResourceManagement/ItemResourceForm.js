import React, { useState, useEffect } from "react";
import axios from "axios";

const ItemResourceForm = ({ storeId }) => {
  const [activeForm, setActiveForm] = useState("");
  const [formData, setFormData] = useState({
    quantity: 1,
    costPerItem: 0,
    totalCost: 0
  });
  const [resources, setResources] = useState([]);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [generatedId, setGeneratedId] = useState("");

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/item-resources/${storeId}`,
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
    // Calculate total cost whenever quantity or costPerItem changes
    if (activeForm === "addResource") {
      const quantity = parseFloat(formData.quantity) || 0;
      const costPerItem = parseFloat(formData.costPerItem) || 0;
      const totalCost = quantity * costPerItem;
      setFormData(prev => ({
        ...prev,
        totalCost: totalCost.toFixed(2)
      }));
    }
  }, [formData.quantity, formData.costPerItem, activeForm]);

  const handleFormSwitch = (form) => {
    setActiveForm(form === activeForm ? "" : form);
    setFormData({
      quantity: 1,
      costPerItem: 0,
      totalCost: 0
    });
    setErrors({});
    setSuccessMessage("");
    setGeneratedId("");
    if (form === "addResource") generateUniqueId();
  };

  const generateUniqueId = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/item-resources/generate-id/${storeId}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setGeneratedId(response.data.id);
      setFormData(prev => ({ ...prev, uniqueId: response.data.id }));
    } catch (error) {
      console.error("Error generating ID:", error);
      setErrors(prev => ({
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
    if (activeForm === "addResource") {
      if (!formData.resourceType)
        newErrors.resourceType = "Resource Type is required.";
      if (!formData.resourceName)
        newErrors.resourceName = "Resource Name is required.";
      if (!formData.quantity) newErrors.quantity = "Quantity is required.";
      if (!formData.costPerItem)
        newErrors.costPerItem = "Cost Per Item is required.";
      if (!formData.condition) newErrors.condition = "Condition is required.";
      if (!formData.dateAdded) newErrors.dateAdded = "Date Added is required.";
    } else if (activeForm === "trackRepair") {
      if (!formData.resourceId)
        newErrors.resourceId = "Resource ID is required.";
      if (!formData.maintenanceType)
        newErrors.maintenanceType = "Maintenance Type is required.";
      if (!formData.maintenanceCost)
        newErrors.maintenanceCost = "Cost of Maintenance is required.";
      if (!formData.dateOfMaintenance)
        newErrors.dateOfMaintenance = "Date of Maintenance is required.";
    } else if (activeForm === "trackSale") {
      if (!formData.resourceId)
        newErrors.resourceId = "Resource ID is required.";
      if (!formData.itemsSold)
        newErrors.itemsSold = "Number of Items Sold is required.";
      if (!formData.salePricePerUnit)
        newErrors.salePricePerUnit = "Sale Price Per Unit is required.";
      if (!formData.dateOfSale)
        newErrors.dateOfSale = "Date of Sale is required.";
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
          "http://localhost:5000/item-resources",
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
        setSuccessMessage("Item Resource Added Successfully!");
      } else if (activeForm === "trackRepair") {
        await axios.post(
          "http://localhost:5000/item-resources/repair",
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
        setSuccessMessage("Repair Recorded Successfully!");
      } else if (activeForm === "trackSale") {
        await axios.post(
          "http://localhost:5000/item-resources/sale",
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
        setSuccessMessage("Sale Recorded Successfully!");
      }
      
      setTimeout(() => {
        setSuccessMessage("");
        if (activeForm === "addResource") {
          setFormData({
            quantity: 1,
            costPerItem: 0,
            totalCost: 0
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
        setErrors(prev => ({
          ...prev,
          general: error.response?.data?.message || "An error occurred"
        }));
      }
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-green-600 mb-6 text-center">
        Item-Based Resource Management
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
          onClick={() => handleFormSwitch("trackRepair")}
          className={`py-2 px-4 rounded-lg ${
            activeForm === "trackRepair"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-800"
          } hover:bg-green-700`}
        >
          Track Repair
        </button>
        <button
          onClick={() => handleFormSwitch("trackSale")}
          className={`py-2 px-4 rounded-lg ${
            activeForm === "trackSale"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-800"
          } hover:bg-green-700`}
        >
          Record Sale
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
            Add New Item-Based Resource
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
              {errors.uniqueId && <p className="text-red-500 text-sm mt-1">{errors.uniqueId}</p>}
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
                <option value="Equipment">Equipment</option>
                <option value="Vehicle">Vehicle</option>
                <option value="Storage">Storage</option>
                <option value="Other">Other</option>
              </select>
              {errors.resourceType && (
                <p className="text-red-500 text-sm mt-1">{errors.resourceType}</p>
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
                <p className="text-red-500 text-sm mt-1">{errors.resourceName}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Quantity</label>
              <input
                type="number"
                min="1"
                step="1"
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
              <label className="block text-gray-700 mb-1">Cost Per Item</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.costPerItem || ""}
                onChange={(e) =>
                  handleInputChange("costPerItem", e.target.value)
                }
                className="w-full p-2 border rounded-lg"
                required
              />
              {errors.costPerItem && (
                <p className="text-red-500 text-sm mt-1">{errors.costPerItem}</p>
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
              <label className="block text-gray-700 mb-1">Condition</label>
              <select
                value={formData.condition || ""}
                onChange={(e) => handleInputChange("condition", e.target.value)}
                className="w-full p-2 border rounded-lg"
                required
              >
                <option value="">Select Condition</option>
                <option value="New">New</option>
                <option value="Used">Used</option>
                <option value="Needs Repair">Needs Repair</option>
              </select>
              {errors.condition && (
                <p className="text-red-500 text-sm mt-1">{errors.condition}</p>
              )}
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

      {/* Track Repair Form */}
      {activeForm === "trackRepair" && (
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-blue-600 mb-4">
            Track Repair/Maintenance
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
              <label className="block text-gray-700 mb-1">Maintenance Type</label>
              <input
                type="text"
                value={formData.maintenanceType || ""}
                onChange={(e) =>
                  handleInputChange("maintenanceType", e.target.value)
                }
                className="w-full p-2 border rounded-lg"
                required
              />
              {errors.maintenanceType && (
                <p className="text-red-500 text-sm mt-1">{errors.maintenanceType}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Maintenance Cost</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.maintenanceCost || ""}
                onChange={(e) =>
                  handleInputChange("maintenanceCost", e.target.value)
                }
                className="w-full p-2 border rounded-lg"
                required
              />
              {errors.maintenanceCost && (
                <p className="text-red-500 text-sm mt-1">{errors.maintenanceCost}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Date of Maintenance</label>
              <input
                type="date"
                value={formData.dateOfMaintenance || ""}
                onChange={(e) =>
                  handleInputChange("dateOfMaintenance", e.target.value)
                }
                className="w-full p-2 border rounded-lg"
                required
              />
              {errors.dateOfMaintenance && (
                <p className="text-red-500 text-sm mt-1">{errors.dateOfMaintenance}</p>
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
                Record Repair
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Track Sale Form */}
      {activeForm === "trackSale" && (
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-blue-600 mb-4">
            Record Sale
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
              <label className="block text-gray-700 mb-1">Items Sold</label>
              <input
                type="number"
                min="1"
                step="1"
                value={formData.itemsSold || ""}
                onChange={(e) => handleInputChange("itemsSold", e.target.value)}
                className="w-full p-2 border rounded-lg"
                required
              />
              {errors.itemsSold && (
                <p className="text-red-500 text-sm mt-1">{errors.itemsSold}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Sale Price Per Unit</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.salePricePerUnit || ""}
                onChange={(e) =>
                  handleInputChange("salePricePerUnit", e.target.value)
                }
                className="w-full p-2 border rounded-lg"
                required
              />
              {errors.salePricePerUnit && (
                <p className="text-red-500 text-sm mt-1">{errors.salePricePerUnit}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Total Sale Price</label>
              <input
                type="number"
                value={
                  formData.itemsSold && formData.salePricePerUnit
                    ? (formData.itemsSold * formData.salePricePerUnit).toFixed(2)
                    : ""
                }
                disabled
                className="w-full p-2 border rounded-lg bg-gray-100 text-gray-600"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Date of Sale</label>
              <input
                type="date"
                value={formData.dateOfSale || ""}
                onChange={(e) =>
                  handleInputChange("dateOfSale", e.target.value)
                }
                className="w-full p-2 border rounded-lg"
                required
              />
              {errors.dateOfSale && (
                <p className="text-red-500 text-sm mt-1">{errors.dateOfSale}</p>
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
                Record Sale
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ItemResourceForm;
