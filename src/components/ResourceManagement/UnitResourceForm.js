import React, { useState } from "react";

const UnitResourceForm = () => {
  const [activeForm, setActiveForm] = useState("");
  const [formData, setFormData] = useState({});
  const [resources, setResources] = useState([]);
  const [usageRecords, setUsageRecords] = useState([]);

  const handleFormSwitch = (form) => {
    setActiveForm(form === activeForm ? "" : form);
    setFormData({});
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (activeForm === "addResource") {
      setResources((prev) => [...prev, formData]);
      alert("Resource Added Successfully!");
    } else if (activeForm === "usageTracking") {
      setUsageRecords((prev) => [...prev, formData]);
      alert("Usage Recorded Successfully!");
    }
    setFormData({});
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
            <select
              value={formData.resourceType || ""}
              onChange={(e) => handleInputChange("resourceType", e.target.value)}
              className="p-2 border rounded-lg"
            >
              <option value="" disabled>
                Select Resource Type
              </option>
              <option value="Seeds">Seeds</option>
              <option value="Fertilizer">Fertilizer</option>
              <option value="Feeds">Feeds</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="text"
              placeholder="Resource Name"
              value={formData.resourceName || ""}
              onChange={(e) =>
                handleInputChange("resourceName", e.target.value)
              }
              className="p-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Unique ID"
              value={formData.uniqueId || ""}
              onChange={(e) => handleInputChange("uniqueId", e.target.value)}
              className="p-2 border rounded-lg"
            />
            <input
              type="number"
              placeholder="Quantity"
              value={formData.quantity || ""}
              onChange={(e) => handleInputChange("quantity", e.target.value)}
              className="p-2 border rounded-lg"
            />
            <select
              value={formData.unit || ""}
              onChange={(e) => handleInputChange("unit", e.target.value)}
              className="p-2 border rounded-lg"
            >
              <option value="" disabled>
                Select Unit
              </option>
              <option value="kg">Kilograms (kg)</option>
              <option value="g">Grams (g)</option>
              <option value="liters">Liters</option>
              <option value="units">Units</option>
            </select>
            <input
              type="number"
              placeholder="Cost Per Unit"
              value={formData.costPerUnit || ""}
              onChange={(e) =>
                handleInputChange("costPerUnit", e.target.value)
              }
              className="p-2 border rounded-lg"
            />
            <input
              type="number"
              placeholder="Total Cost"
              value={formData.totalCost || ""}
              onChange={(e) => handleInputChange("totalCost", e.target.value)}
              className="p-2 border rounded-lg"
            />
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

      {/* Usage Tracking Form */}
      {activeForm === "usageTracking" && (
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-blue-600 mb-4">
            Track Resource Usage
          </h2>
          <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Resource ID"
              value={formData.resourceId || ""}
              onChange={(e) => handleInputChange("resourceId", e.target.value)}
              className="p-2 border rounded-lg"
            />
            <input
              type="number"
              placeholder="Quantity Used"
              value={formData.quantityUsed || ""}
              onChange={(e) =>
                handleInputChange("quantityUsed", e.target.value)
              }
              className="p-2 border rounded-lg"
            />
            <textarea
              placeholder="Usage Purpose"
              value={formData.usagePurpose || ""}
              onChange={(e) => handleInputChange("usagePurpose", e.target.value)}
              className="p-2 border rounded-lg col-span-2"
            />
            <input
              type="date"
              placeholder="Date of Usage"
              value={formData.dateOfUsage || ""}
              onChange={(e) =>
                handleInputChange("dateOfUsage", e.target.value)
              }
              className="p-2 border rounded-lg"
            />
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

      {/* Displaying Data */}
      <div className="mt-6">
        <h3 className="text-xl font-bold text-gray-700 mb-4">Resources</h3>
        <ul className="list-disc pl-6">
          {resources.map((resource, index) => (
            <li key={index}>
              {resource.resourceName} - {resource.quantity} {resource.unit} (ID:
              {resource.uniqueId})
            </li>
          ))}
        </ul>

        <h3 className="text-xl font-bold text-gray-700 mt-6 mb-4">
          Usage Records
        </h3>
        <ul className="list-disc pl-6">
          {usageRecords.map((usage, index) => (
            <li key={index}>
              Resource ID: {usage.resourceId}, Used: {usage.quantityUsed} units,
              Purpose: {usage.usagePurpose}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UnitResourceForm;
