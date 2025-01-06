import React from "react";

const AnimalRegistrationForm = ({ sex, setSex }) => {
  const handleSave = () => {
    alert("Data Saved Successfully!");
  };

  return (
    <div className="mt-4 border p-4 rounded-lg">
      <h3 className="text-lg font-bold text-green-600">Animal Registration</h3>
      <form className="space-y-4">
        <input type="text" placeholder="Animal ID" className="w-full border rounded-lg p-2" required />
        <select className="w-full border rounded-lg p-2" value={sex} onChange={(e) => setSex(e.target.value)} required>
          <option value="">Select Sex</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <input type="number" placeholder="Weight (kg)" className="w-full border rounded-lg p-2" required />
        <input type="text" placeholder="Breed" className="w-full border rounded-lg p-2" required />
        <input type="number" placeholder="Age (years)" className="w-full border rounded-lg p-2" required />
        <textarea placeholder="Health Status" className="w-full border rounded-lg p-2" rows="2"></textarea>
        <textarea placeholder="Symptoms" className="w-full border rounded-lg p-2" rows="2"></textarea>
        <textarea placeholder="Medicine Prescribed" className="w-full border rounded-lg p-2" rows="2"></textarea>
        <textarea placeholder="Feed Type" className="w-full border rounded-lg p-2" rows="2" required></textarea>
        <input type="number" placeholder="Feed Quantity" className="w-full border rounded-lg p-2" required />
        <div>
          <input type="number" placeholder="Milking Quantity" className="w-full border rounded-lg p-2" disabled={sex === "male"} defaultValue={sex === "male" ? "0" : ""}/>
          <input type="text" placeholder="Milking Quantity Unit (e.g., Liters)" className="w-full border rounded-lg p-2" disabled={sex === "male"} defaultValue={sex === "male" ? "Liters" : ""}/>
        </div>
        <select className="w-full border rounded-lg p-2" required>
          <option value="">Status</option>
          <option value="alive">Alive</option>
          <option value="sold">Sold</option>
          <option value="dead">Dead</option>
        </select>
        <button type="button" onClick={handleSave} className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
          Save
        </button>
      </form>
    </div>
  );
};

export default AnimalRegistrationForm;
