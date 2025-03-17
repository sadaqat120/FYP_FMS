import React, { useState, useEffect } from "react";
import axios from "axios";

const HumanResourceForm = ({ storeId }) => {
  const [activeForm, setActiveForm] = useState("");
  const [formData, setFormData] = useState({});
  const [resources, setResources] = useState([]);
  const [errors, setErrors] = useState({}); // State to hold error messages

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/human-resources/${storeId}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
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
    if (activeForm === "payment") {
      if (!formData.workerId) newErrors.workerId = "Worker ID is required.";
      if (!formData.payment) newErrors.payment = "Payment Amount is required.";
      if (!formData.workStartDate) newErrors.workStartDate = "Work Start Date is required.";
      if (!formData.workEndDate) newErrors.workEndDate = "Work End Date is required.";
      if (!formData.paymentDate) newErrors.paymentDate = "Payment Date is required.";
    } else if (activeForm === "add") {
      if (!formData.id) newErrors.id = "ID is required.";
      if (!formData.workerName) newErrors.workerName = "Worker Name is required.";
      if (!formData.role) newErrors.role = "Role/Position is required.";
      if (!formData.dateEnrolled) newErrors.dateEnrolled = "Date Enrolled is required.";
    }
    return newErrors;
  };

  const handleSave = async () => {
    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // Stop execution if there are validation errors
    }

    if (activeForm === "add") {
      // Check for unique ID
      const existingResource = resources.find(resource => resource.id === formData.id);
      if (existingResource) {
        setErrors((prev) => ({ ...prev, id: "Worker ID already exists. Please use a unique ID." }));
        return;
      }

      try {
        const response = await axios.post("http://localhost:5000/human-resources", {
          ...formData,
          storeId,
        }, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        alert("Human Resource Added Successfully!");
      } catch (error) {
        console.error("Error adding human resource:", error);
      }
    } else if (activeForm === "payment") {
      // Check if worker exists
      const workerExists = resources.some(resource => resource.id === formData.workerId);
      if (!workerExists) {
        setErrors((prev) => ({ ...prev, workerId: "Worker ID does not exist." }));
        return;
      }

      try {
        const response = await axios.post(`http://localhost:5000/human-resources/${storeId}/${formData.workerId}/payments`, {
          paymentAmount: formData.payment,
          workStartDate: formData.workStartDate,
          workEndDate: formData.workEndDate,
          paymentDate: formData.paymentDate,
          notes: formData.notes,
        }, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        alert("Payment Recorded Successfully!");
      } catch (error) {
        console.error("Error recording payment:", error);
      }
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
        <button onClick={() => handleFormSwitch("add")}
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
            <div>
              <label>ID (Unique)</label>
              <input
                type="text"
                placeholder="ID (Unique)"
                value={formData.id || ""}
                onChange={(e) => handleInputChange("id", e.target.value)}
                className="p-2 border rounded-lg"
                required
              />
              {errors.id && <p className="text-red-500">{errors.id}</p>}
            </div>
            <div>
              <label>Worker Name</label>
              <input
                type="text"
                placeholder="Worker Name"
                value={formData.workerName || ""}
                onChange={(e) => handleInputChange("workerName", e.target.value)}
                className="p-2 border rounded-lg"
                required
              />
              {errors.workerName && <p className="text-red-500">{errors.workerName}</p>}
            </div>
            <div>
              <label>Role/Position</label>
              <input
                type="text"
                placeholder="Role/Position"
                value={formData.role || ""}
                onChange={(e) => handleInputChange("role", e.target.value)}
                className="p-2 border rounded-lg"
                required
              />
              {errors.role && <p className="text-red-500">{errors.role}</p>}
            </div>
            <div>
              <label>Date Enrolled</label>
              <input
                type="date"
                placeholder="Date Enrolled"
                value={formData.dateEnrolled || ""}
                onChange={(e) => handleInputChange("dateEnrolled", e.target.value)}
                className="p-2 border rounded-lg"
                required
              />
              {errors.dateEnrolled && <p className="text-red-500">{errors.dateEnrolled}</p>}
            </div>
            <div className="col-span-2">
              <label>Notes</label>
              <textarea
                placeholder="Notes"
                value={formData.notes || ""}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                className="p-2 border rounded-lg col-span-2"
              />
            </div>
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
            <div>
              <label>Worker ID</label>
              <input
                type="text"
                placeholder="Worker ID"
                value={formData.workerId || ""}
                onChange={(e) => handleInputChange("workerId", e.target.value)}
                className="p-2 border rounded-lg"
                required
              />
              {errors.workerId && <p className="text-red-500">{errors.workerId}</p>}
            </div>
            <div>
              <label>Payment Amount</label>
              <input
                type="number"
                placeholder="Payment Amount"
                value={formData.payment || ""}
                onChange={(e) => handleInputChange("payment", e.target.value)}
                className="p-2 border rounded-lg"
                required
              />
              {errors.payment && <p className="text-red-500">{errors.payment}</p>}
            </div>
            <div>
              <label>Work Start Date</label>
              <input
                type="date"
                placeholder="Work Start Date"
                value={formData.workStartDate || ""}
                onChange={(e) => handleInputChange("workStartDate", e.target.value)}
                className="p-2 border rounded-lg"
                required
              />
              {errors.workStartDate && <p className="text-red-500">{errors.workStartDate}</p>}
            </div>
            <div>
              <label>Work End Date</label>
              <input
                type="date"
                placeholder="Work End Date"
                value={formData.workEndDate || ""}
                onChange={(e) => handleInputChange("workEndDate", e.target.value)}
                className="p-2 border rounded-lg"
                required
              />
              {errors.workEndDate && <p className="text-red-500">{errors.workEndDate}</p>}
            </div>
            <div>
              <label>Payment Date</label>
              <input
                type="date"
                placeholder="Payment Date"
                value={formData.paymentDate || ""}
                onChange={(e) => handleInputChange("paymentDate", e.target.value)}
                className="p-2 border rounded-lg"
                required
              />
              {errors.paymentDate && <p className="text-red-500">{errors.paymentDate}</p>}
            </div>
            <div className="col-span-2">
              <label>Notes</label>
              <textarea
                placeholder="Notes"
                value={formData.notes || ""}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                className="p-2 border rounded-lg col-span-2"
              />
            </div>
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

export default HumanResourceForm;
