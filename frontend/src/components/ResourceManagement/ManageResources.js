import React, { useState } from "react";
import HumanResourceForm from "./HumanResourceForm";
import UnitResourceForm from "./UnitResourceForm";
import ItemResourceForm from "./ItemResourceForm";

const ManageResources = ({ storeId }) => {
  const [activeSection, setActiveSection] = useState("");

  const handleSectionClick = (section) => {
    setActiveSection((prevSection) => (prevSection === section ? "" : section));
  };

  return (
    <div className="p-4">
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
          <HumanResourceForm storeId={storeId} />
        </div>
      )}

      {activeSection === "unitResource" && (
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <UnitResourceForm storeId={storeId} />
        </div>
      )}

      {activeSection === "itemResource" && (
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <ItemResourceForm storeId={storeId} />
        </div>
      )}
    </div>
  );
};

export default ManageResources;
