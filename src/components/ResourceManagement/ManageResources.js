import React, { useState } from "react";
import HumanResourceForm from "./HumanResourceForm";
import UnitResourceForm from "./UnitResourceForm";
import ItemResourceForm from "./ItemResourceForm";

const ManageResources = () => {
  const [activeSection, setActiveSection] = useState("");

  const handleSectionClick = (section) => {
    setActiveSection((prevSection) => (prevSection === section ? "" : section));
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-green-600 mb-6 text-center">
        Manage Resources
      </h1>

      {/* Section Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <button
          onClick={() => handleSectionClick("humanResource")}
          className={`py-4 px-6 rounded-lg ${
            activeSection === "humanResource"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-800"
          } hover:bg-green-700`}
        >
          Human Resource
        </button>
        <button
          onClick={() => handleSectionClick("unitResource")}
          className={`py-4 px-6 rounded-lg ${
            activeSection === "unitResource"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-800"
          } hover:bg-green-700`}
        >
          Unit-Based Resource
        </button>
        <button
          onClick={() => handleSectionClick("itemResource")}
          className={`py-4 px-6 rounded-lg ${
            activeSection === "itemResource"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-800"
          } hover:bg-green-700`}
        >
          Item-Based Resource
        </button>
      </div>

      {/* Render Sections Dynamically */}
      {activeSection === "humanResource" && (
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-blue-600 mb-4">
            Human Resource
          </h2>
          <HumanResourceForm />
        </div>
      )}

      {activeSection === "unitResource" && (
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-blue-600 mb-4">
            Unit-Based Resource
          </h2>
          <UnitResourceForm />
        </div>
      )}

      {activeSection === "itemResource" && (
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-blue-600 mb-4">
            Item-Based Resource
          </h2>
          <ItemResourceForm />
        </div>
      )}
    </div>
  );
};

export default ManageResources;
