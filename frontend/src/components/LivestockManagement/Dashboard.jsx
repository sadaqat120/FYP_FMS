import React, { useState } from "react";
import AnimalCategoryDetails from "./AnimalCategoryDetails";

const Dashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const notifications = [
    "Vaccination due for cows on 01-05-2025",
    "Goat feed stock running low, replenish by 01-07-2025",
    "Health checkup scheduled for 03-05-2025",
  ];

  const costOverview = [
    {
      id: 1,
      type: "Feed",
      cost: "5000 PKR",
      date: "01-04-2025",
      notes: "Purchased bulk feed for goats.",
    },
    {
      id: 2,
      type: "Veterinary",
      cost: "3000 PKR",
      date: "02-04-2025",
      notes: "Health checkup for cows.",
    },
    {
      id: 3,
      type: "Maintenance",
      cost: "4000 PKR",
      date: "03-04-2025",
      notes: "Fixed barn roof.",
    },
  ];

  const categories = [
    { name: "Cows", total: 55 },
    { name: "Goats", total: 40 },
  ];

  return (
    <div className="p-6 bg-gray-100">
      {/* Overview Section */}
      <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-lg mb-6">
        <div>
          <h3 className="text-2xl font-bold text-green-600">Farm Location: Mianwali</h3>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-green-600">Total Animals: 400</h3>
        </div>
      </div>

      {/* Date-to-Date Overview */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h3 className="text-xl font-bold text-green-600 mb-4">Overview (31-11-2024 to 05-01-2025)</h3>
        <div className="flex justify-between">
          <ul className="list-disc ml-6">
            <li>Milk Production: 120 Liters</li>
            <li>Milk Selling Revenue: 12,000 PKR</li>
            <li>Sold Animals: 10</li>
            <li>Selling Animal Revenue: 30,000 PKR</li>
            <li>Other Revenue: 5,000 PKR</li>
            <li>Feed of Livestock: Hay, Grains</li>
          </ul>
          <div>
            <h3 className="text-xl font-bold text-red-600">Total Cost: 15,000 PKR</h3>
            <h3 className="text-xl font-bold text-green-600">Total Revenue: 47,000 PKR</h3>
          </div>
        </div>
      </div>

      {/* Cost Overview Table */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h3 className="text-xl font-bold text-green-600 mb-4">Cost Overview</h3>
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-green-100">
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Type</th>
              <th className="border border-gray-300 px-4 py-2">Cost</th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">Notes</th>
            </tr>
          </thead>
          <tbody>
            {costOverview.map((cost) => (
              <tr key={cost.id} className="odd:bg-white even:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{cost.id}</td>
                <td className="border border-gray-300 px-4 py-2">{cost.type}</td>
                <td className="border border-gray-300 px-4 py-2">{cost.cost}</td>
                <td className="border border-gray-300 px-4 py-2">{cost.date}</td>
                <td className="border border-gray-300 px-4 py-2">{cost.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Notifications Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h3 className="text-xl font-bold text-green-600 mb-4">Upcoming Notifications (7 Days)</h3>
        <ul className="list-disc ml-6">
          {notifications.map((notification, index) => (
            <li key={index}>{notification}</li>
          ))}
        </ul>
      </div>

      {/* Livestock Details */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-green-600 mb-4">Livestock Details</h3>
        {categories.map((category) => (
          <div key={category.name} className="mb-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">{category.name}</span>
              <button
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                onClick={() =>
                  setSelectedCategory(selectedCategory === category.name ? "" : category.name)
                }
              >
                {selectedCategory === category.name ? "Hide Details" : "Show Details"}
              </button>
            </div>
            {selectedCategory === category.name && (
              <AnimalCategoryDetails category={category.name} total={category.total} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
