import React, { useState } from "react";

const HumanResourceForm = () => {
  const [activeForm, setActiveForm] = useState("");
  const [formData, setFormData] = useState({});
  const [resources, setResources] = useState([]);
  const [payments, setPayments] = useState([]);

  const handleFormSwitch = (form) => {
    setActiveForm(form === activeForm ? "" : form);
    setFormData({});
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (activeForm === "add") {
      setResources((prev) => [...prev, formData]);
      alert("Human Resource Added Successfully!");
    } else if (activeForm === "payment") {
      setPayments((prev) => [...prev, formData]);
      alert("Payment Recorded Successfully!");
    }
    setFormData({});
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
          Add New
        </button>
        <button
          onClick={() => handleFormSwitch("payment")}
          className={`py-2 px-4 rounded-lg ${
            activeForm === "payment"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-800"
          } hover:bg-green-700`}
        >
          Make Payment
        </button>
      </div>

      {/* Add New Resource Form */}
      {activeForm === "add" && (
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-blue-600 mb-4">
            Add New Human Resource
          </h2>
          <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="ID"
              value={formData.id || ""}
              onChange={(e) => handleInputChange("id", e.target.value)}
              className="p-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Worker Name"
              value={formData.workerName || ""}
              onChange={(e) => handleInputChange("workerName", e.target.value)}
              className="p-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Role/Position"
              value={formData.role || ""}
              onChange={(e) => handleInputChange("role", e.target.value)}
              className="p-2 border rounded-lg"
            />
            <input
              type="date"
              placeholder="Date Enrolled"
              value={formData.dateEnrolled || ""}
              onChange={(e) =>
                handleInputChange("dateEnrolled", e.target.value)
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

      {/* Make Payment Form */}
      {activeForm === "payment" && (
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-blue-600 mb-4">
            Record Payment
          </h2>
          <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Worker ID"
              value={formData.workerId || ""}
              onChange={(e) => handleInputChange("workerId", e.target.value)}
              className="p-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Worker Name"
              value={formData.workerName || ""}
              onChange={(e) => handleInputChange("workerName", e.target.value)}
              className="p-2 border rounded-lg"
            />
            <input
              type="date"
              placeholder="Work Start Date"
              value={formData.workStartDate || ""}
              onChange={(e) =>
                handleInputChange("workStartDate", e.target.value)
              }
              className="p-2 border rounded-lg"
            />
            <input
              type="date"
              placeholder="Work End Date"
              value={formData.workEndDate || ""}
              onChange={(e) => handleInputChange("workEndDate", e.target.value)}
              className="p-2 border rounded-lg"
            />
            <input
              type="number"
              placeholder="Payment Amount"
              value={formData.payment || ""}
              onChange={(e) => handleInputChange("payment", e.target.value)}
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
              placeholder="Payment Date"
              value={formData.paymentDate || ""}
              onChange={(e) => handleInputChange("paymentDate", e.target.value)}
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

      {/* Displaying Data */}
      <div className="mt-6">
        <h3 className="text-xl font-bold text-gray-700 mb-4">Human Resources</h3>
        <ul className="list-disc pl-6">
          {resources.map((resource, index) => (
            <li key={index}>
              {resource.workerName} - {resource.role} (ID: {resource.id})
            </li>
          ))}
        </ul>

        <h3 className="text-xl font-bold text-gray-700 mt-6 mb-4">
          Payment Records
        </h3>
        <ul className="list-disc pl-6">
          {payments.map((payment, index) => (
            <li key={index}>
              {payment.workerName} - ${payment.payment} (Paid on:{" "}
              {payment.paymentDate})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HumanResourceForm;
