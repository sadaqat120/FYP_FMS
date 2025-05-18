import React, { useState, useEffect } from "react";
import axios from "axios";

const ItemResourceForm = ({ storeId }) => {
  const [activeForm, setActiveForm] = useState("");
  const [formData, setFormData] = useState({});
  const [resources, setResources] = useState([]);
  const [errors, setErrors] = useState({}); // State to hold error messages
  const [successMessage, setSuccessMessage] = useState("");

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
      if (!formData.costPerItem)
        newErrors.costPerItem = "Cost Per Item is required.";
      if (!formData.condition) newErrors.condition = "Condition is required.";
      if (!formData.dateAdded) newErrors.dateAdded = "Date Added is required."; // Make date required
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

    if (activeForm === "addResource") {
      try {
        await axios.post(
          "http://localhost:5000/item-resources",
          {
            ...formData,
            totalCost: formData.quantity * formData.costPerItem,
            storeId,
          },
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setSuccessMessage("Resource Added Successfully!");
        setTimeout(() => setSuccessMessage(""), 2000); // <-- clear after 2 seconds
        setFormData({});
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setErrors((prev) => ({
            ...prev,
            uniqueId: error.response.data.message,
          }));
        } else {
          console.error("Error adding item-based resource:", error);
        }
      }
    } else if (activeForm === "trackRepair") {
      const resourceExists = resources.some(
        (resource) => resource.uniqueId === formData.resourceId
      );
      if (!resourceExists) {
        setErrors((prev) => ({
          ...prev,
          resourceId: "Resource ID does not exist.",
        }));
        return;
      }

      try {
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
        setSuccessMessage("Repair/Maintenance Recorded Successfully!");
        setTimeout(() => setSuccessMessage(""), 2000); // <-- clear after 2 seconds
        setFormData({});
      } catch (error) {
        console.error("Error recording repair:", error);
      }
    } else if (activeForm === "trackSale") {
      const resourceExists = resources.some(
        (resource) => resource.uniqueId === formData.resourceId
      );
      if (!resourceExists) {
        setErrors((prev) => ({
          ...prev,
          resourceId: "Resource ID does not exist.",
        }));
        return;
      }

      try {
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
        setTimeout(() => setSuccessMessage(""), 2000); // <-- clear after 2 seconds
        setFormData({});
      } catch (error) {
        console.error("Error recording sale:", error);
      }
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-green-600 mb-6 text-center">
        Item-Based Resource Management
      </h1>
      {successMessage && (
        <div className="mb-4 p-3 text-green-700 bg-green-100 border border-green-300 rounded-lg">
          {successMessage}
        </div>
      )}

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
          Track Repair/Maintenance
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

      {activeForm === "addResource" && (
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-blue-600 mb-4">
            Add New Item-Based Resource
          </h2>
          <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              <option value="Equipment">Equipment</option>
              <option value="Vehicle">Vehicle</option>
              <option value="Storage">Storage</option>
              <option value="Other">Other</option>
            </select>
            {errors.resourceType && (
              <p className="text-red-500">{errors.resourceType}</p>
            )}
            <input
              type="text"
              placeholder="Resource Name"
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
            <input
              type="text"
              placeholder="Unique ID"
              value={formData.uniqueId || ""}
              onChange={(e) => handleInputChange("uniqueId", e.target.value)}
              className="p-2 border rounded-lg"
              required
            />
            {errors.uniqueId && (
              <p className="text-red-500">{errors.uniqueId}</p>
            )}
            <input
              type="number"
              placeholder="Number of Items"
              value={formData.quantity || ""}
              onChange={(e) => handleInputChange("quantity", e.target.value)}
              className="p-2 border rounded-lg"
              required
            />
            {errors.quantity && (
              <p className="text-red-500">{errors.quantity}</p>
            )}
            <input
              type="number"
              placeholder="Cost Per Item"
              value={formData.costPerItem || ""}
              onChange={(e) => handleInputChange("costPerItem", e.target.value)}
              className="p-2 border rounded-lg"
              required
            />
            {errors.costPerItem && (
              <p
                className="text-red ```javascript
-500"
              >
                {errors.costPerItem}
              </p>
            )}
            <input
              type="number"
              placeholder="Total Cost"
              value={
                formData.quantity && formData.costPerItem
                  ? formData.quantity * formData.costPerItem
                  : ""
              }
              readOnly
              className="p-2 border rounded-lg bg-gray-200"
            />
            <select
              value={formData.condition || ""}
              onChange={(e) => handleInputChange("condition", e.target.value)}
              className="p-2 border rounded-lg"
              required
            >
              <option value="" disabled>
                Select Condition
              </option>
              <option value="New">New</option>
              <option value="Used">Used</option>
              <option value="Needs Repair">Needs Repair</option>
            </select>
            {errors.condition && (
              <p className="text-red-500">{errors.condition}</p>
            )}
            <textarea
              placeholder="Notes"
              value={formData.notes || ""}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              className="p-2 border rounded-lg col-span-2"
            />
            <input
              type="date"
              placeholder="Date Added"
              value={formData.dateAdded || ""}
              onChange={(e) => handleInputChange("dateAdded", e.target.value)}
              className="p-2 border rounded-lg"
              required
            />
            {errors.dateAdded && (
              <p className="text-red-500">{errors.dateAdded}</p>
            )}
            <button
              type="button"
              onClick={handleSave}
              className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 col-span-2"
            >
              Save
            </button>
          </form>
        </div>
      )}

      {activeForm === "trackRepair" && (
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-blue-600 mb-4">
            Track Repair/Maintenance
          </h2>
          <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Resource ID"
              value={formData.resourceId || ""}
              onChange={(e) => handleInputChange("resourceId", e.target.value)}
              className="p-2 border rounded-lg"
              required
            />
            {errors.resourceId && (
              <p className="text-red-500">{errors.resourceId}</p>
            )}
            <textarea
              placeholder="Maintenance Type"
              value={formData.maintenanceType || ""}
              onChange={(e) =>
                handleInputChange("maintenanceType", e.target.value)
              }
              className="p-2 border rounded-lg col-span-2"
              required
            />
            {errors.maintenanceType && (
              <p className="text-red-500">{errors.maintenanceType}</p>
            )}
            <input
              type="number"
              placeholder="Cost of Maintenance"
              value={formData.maintenanceCost || ""}
              onChange={(e) =>
                handleInputChange("maintenanceCost", e.target.value)
              }
              className="p-2 border rounded-lg"
              required
            />
            {errors.maintenanceCost && (
              <p className="text-red-500">{errors.maintenanceCost}</p>
            )}
            <input
              type="date"
              placeholder="Date of Maintenance"
              value={formData.dateOfMaintenance || ""}
              onChange={(e) =>
                handleInputChange("dateOfMaintenance", e.target.value)
              }
              className="p-2 border rounded-lg"
              required
            />
            {errors.dateOfMaintenance && (
              <p className="text-red-500">{errors.dateOfMaintenance}</p>
            )}
            <textarea
              placeholder="Notes"
              value={formData.notes || ""}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              className="p-2 border rounded-lg col-span-2"
            />
            <button
              type="button"
              onClick={handleSave}
              className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 col-span-2"
            >
              Save
            </button>
          </form>
        </div>
      )}

      {activeForm === "trackSale" && (
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-blue-600 mb-4">Record Sale</h2>
          <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Resource ID"
              value={formData.resourceId || ""}
              onChange={(e) => handleInputChange("resourceId", e.target.value)}
              className="p-2 border rounded-lg"
              required
            />
            {errors.resourceId && (
              <p className="text-red-500">{errors.resourceId}</p>
            )}
            <input
              type="number"
              placeholder="Number of Items Sold"
              value={formData.itemsSold || ""}
              onChange={(e) => handleInputChange("itemsSold", e.target.value)}
              className="p-2 border rounded-lg"
              required
            />
            {errors.itemsSold && (
              <p className="text-red-500">{errors.itemsSold}</p>
            )}
            <input
              type="number"
              placeholder="Sale Price Per Unit"
              value={formData.salePricePerUnit || ""}
              onChange={(e) =>
                handleInputChange("salePricePerUnit", e.target.value)
              }
              className="p-2 border rounded-lg"
              required
            />
            {errors.salePricePerUnit && (
              <p className="text-red-500">{errors.salePricePerUnit}</p>
            )}
            <input
              type="number"
              placeholder="Total Sale Price"
              value={
                formData.itemsSold && formData.salePricePerUnit
                  ? formData.itemsSold * formData.salePricePerUnit
                  : ""
              }
              readOnly
              className="p-2 border rounded-lg bg-gray-200"
            />
            <input
              type="date"
              placeholder="Date of Sale"
              value={formData.dateOfSale || ""}
              onChange={(e) => handleInputChange("dateOfSale", e.target.value)}
              className="p-2 border rounded-lg"
              required
            />
            {errors.dateOfSale && (
              <p className="text-red-500">{errors.dateOfSale}</p>
            )}
            <textarea
              placeholder="Notes"
              value={formData.notes || ""}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              className="p-2 border rounded-lg col-span-2"
            />
            <button
              type="button"
              onClick={handleSave}
              className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 col-span-2"
            >
              Save
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ItemResourceForm;
