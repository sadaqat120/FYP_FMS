import React, { useState } from "react";

const ItemResourceForm = () => {
  const [activeForm, setActiveForm] = useState("");
  const [formData, setFormData] = useState({});
  const [resources, setResources] = useState([]);
  const [repairRecords, setRepairRecords] = useState([]);
  const [salesRecords, setSalesRecords] = useState([]);

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
    } else if (activeForm === "trackRepair") {
      setRepairRecords((prev) => [...prev, formData]);
      alert("Repair/Maintenance Recorded Successfully!");
    } else if (activeForm === "trackSale") {
      setSalesRecords((prev) => [...prev, formData]);
      alert("Sale Recorded Successfully!");
    }
    setFormData({});
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

      {/* Add New Resource Form */}
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
            >
              <option value="" disabled>
                Select Resource Type
              </option>
              <option value="Equipment">Equipment</option>
              <option value="Vehicle">Vehicle</option>
              <option value="Storage">Storage</option>
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
              placeholder="Number of Items"
              value={formData.numberOfItems || ""}
              onChange={(e) =>
                handleInputChange("numberOfItems", e.target.value)
              }
              className="p-2 border rounded-lg"
            />
            <input
              type="number"
              placeholder="Cost Per Item"
              value={formData.costPerItem || ""}
              onChange={(e) => handleInputChange("costPerItem", e.target.value)}
              className="p-2 border rounded-lg"
            />
            <input
              type="number"
              placeholder="Total Cost"
              value={
                formData.numberOfItems && formData.costPerItem
                  ? formData.numberOfItems * formData.costPerItem
                  : ""
              }
              readOnly
              className="p-2 border rounded-lg bg-gray-200"
            />
            <select
              value={formData.condition || ""}
              onChange={(e) => handleInputChange("condition", e.target.value)}
              className="p-2 border rounded-lg"
            >
              <option value="" disabled>
                Select Condition
              </option>
              <option value="New">New</option>
              <option value="Used">Used</option>
              <option value="Needs Repair">Needs Repair</option>
            </select>
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

      {/* Track Repair/Maintenance Form */}
      {activeForm === "trackRepair" && (
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-blue-600 mb-4">
            Track Repair/Maintenance
          </h2>
          <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Resource ID"
              value={formData.resourceId || ""}
              onChange={(e) => handleInputChange("resourceId", e.target.value)}
              className="p-2 border rounded-lg"
            />
            <textarea
              placeholder="Maintenance Type"
              value={formData.maintenanceType || ""}
              onChange={(e) =>
                handleInputChange("maintenanceType", e.target.value)
              }
              className="p-2 border rounded-lg col-span-2"
            />
            <input
              type="number"
              placeholder="Cost of Maintenance"
              value={formData.maintenanceCost || ""}
              onChange={(e) =>
                handleInputChange("maintenanceCost", e.target.value)
              }
              className="p-2 border rounded-lg"
            />
            <input
              type="date"
              placeholder="Date of Maintenance"
              value={formData.dateOfMaintenance || ""}
              onChange={(e) =>
                handleInputChange("dateOfMaintenance", e.target.value)
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

      {/* Track Sale Form */}
      {activeForm === "trackSale" && (
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-blue-600 mb-4">Record Sale</h2>
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
              placeholder="Number of Items Sold"
              value={formData.itemsSold || ""}
              onChange={(e) => handleInputChange("itemsSold", e.target.value)}
              className="p-2 border rounded-lg"
            />
            <input
              type="number"
              placeholder="Sale Price Per Unit"
              value={formData.salePricePerUnit || ""}
              onChange={(e) =>
                handleInputChange("salePricePerUnit", e.target.value)
              }
              className="p-2 border rounded-lg"
            />
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
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-blue-600 mb-4">
          Added Resources
        </h2>
        {resources.length === 0 ? (
          <p>No resources added yet.</p>
        ) : (
          <ul>
            {resources.map((resource, index) => (
              <li key={index} className="mb-2">
                {resource.resourceName} - {resource.resourceType}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-blue-600 mb-4">Repair Records</h2>
        {repairRecords.length === 0 ? (
          <p>No repairs recorded yet.</p>
        ) : (
          <ul>
            {repairRecords.map((record, index) => (
              <li key={index} className="mb-2">
                Resource ID: {record.resourceId}, Maintenance:{" "}
                {record.maintenanceType}, Cost: {record.maintenanceCost}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-blue-600 mb-4">Sales Records</h2>
        {salesRecords.length === 0 ? (
          <p>No sales recorded yet.</p>
        ) : (
          <ul>
            {salesRecords.map((sale, index) => (
              <li key={index} className="mb-2">
                Resource ID: {sale.resourceId}, Items Sold: {sale.itemsSold},
                Total Sale Price: {sale.itemsSold * sale.salePricePerUnit}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ItemResourceForm;
