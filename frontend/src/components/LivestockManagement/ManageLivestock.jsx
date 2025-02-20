import React, { useState } from "react";
import FarmRecordForm from "./FarmRecordForm";
import AnimalRegistrationForm from "./AnimalRegistrationForm";
import ExpensesForm from "./ExpensesForm";
import ProductionForm from "./ProductionForm";

const ManageLivestock = () => {
  const [activeSection, setActiveSection] = useState("");
  const [sex, setSex] = useState("");

  const renderActiveSection = () => {
    switch (activeSection) {
      case "farmRecord":
        return <FarmRecordForm />;
      case "registration":
        return <AnimalRegistrationForm sex={sex} setSex={setSex} />;
      case "expenses":
        return <ExpensesForm />;
      case "production":
        return <ProductionForm />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-green-600 mb-6">Manage Livestock</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          onClick={() => setActiveSection("registration")}
          className={`py-2 px-4 rounded-lg ${activeSection === "registration" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-800"}`}
        >
          Animal Registration
        </button>
        <button
          onClick={() => setActiveSection("farmRecord")}
          className={`py-2 px-4 rounded-lg ${activeSection === "farmRecord" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-800"}`}
        >
          Farm Record
        </button>
        <button
          onClick={() => setActiveSection("expenses")}
          className={`py-2 px-4 rounded-lg ${activeSection === "expenses" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-800"}`}
        >
          Expenses
        </button>
        <button
          onClick={() => setActiveSection("production")}
          className={`py-2 px-4 rounded-lg ${activeSection === "production" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-800"}`}
        >
          Production
        </button>
      </div>
      {renderActiveSection()}
    </div>
  );
};

export default ManageLivestock;
