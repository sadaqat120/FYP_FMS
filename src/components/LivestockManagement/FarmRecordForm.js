import React from "react";

const FarmRecordForm = () => {
  const handleSave = () => {
    alert("Data Saved Successfully!");
  };

  return (
    <div className="mt-4 border p-4 rounded-lg">
      <h3 className="text-lg font-bold text-green-600">Farm Record</h3>
      <form className="space-y-4">
        <input type="text" placeholder="Farm Name" className="w-full border rounded-lg p-2" required />
        <input type="text" placeholder="Location" className="w-full border rounded-lg p-2" required />
        <input type="number" placeholder="Total Livestock Count" className="w-full border rounded-lg p-2" required />
        <button type="button" onClick={handleSave} className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
          Save
        </button>
      </form>
    </div>
  );
};

export default FarmRecordForm;
