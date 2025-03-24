import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = ({ storeId }) => {
  const [expandedSections, setExpandedSections] = useState({
    humanResource: false,
    unitResource: false,
    itemResource: false,
  });
  const [data, setData] = useState({
    humanResources: [],
    unitResources: [],
    itemResources: [],
  });
  const [searchId, setSearchId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/resource-dashboard/${storeId}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [storeId]);

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleSearch = (resourceType) => {
    setError("");
    const resourceList = resourceType === "humanResource" ? data.humanResources : resourceType === "unitResource" ? data.unitResources : data.itemResources;
    const foundResource = resourceList.find((resource) => resource.id === searchId || resource.uniqueId === searchId);
    
    if (!foundResource) {
      setError("Resource not found.");
    } else {
      console.log("Found Resource:", foundResource);
    }
  };

  return (
    <div className="p-4">
      {/* <h1 className="text-3xl font-bold text-green-600 mb-6 text-center">
        Store ID: {storeId} - Dashboard
      </h1> */}

      <div className="bg-gray-100 p-4 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-bold text-blue-600 mb-4">Notifications</h2>
        <ul className="list-disc ml-6">
          <li>Reminder: Update resource records.</li>
          <li>Alert: Scheduled maintenance for tractor on 2025-01-20.</li>
          <li>New hire: John Doe joined as Field Worker.</li>
        </ul>
      </div>

      {/* Human Resources Section */}
      <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Human Resources</h2>
          <button onClick={() => toggleSection("humanResource")} className="text-blue-600 hover:underline">
            {expandedSections.humanResource ? "Hide Details" : "Show Details"}
          </button>
        </div>
        {expandedSections.humanResource && (
          <div className="p-4">
            <input
              type="text"
              placeholder="Search by ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="border p-2 mb-2"
            />
            <button onClick={() => handleSearch("humanResource")} className="bg-blue-500 text-white p-2 rounded">
              Search
            </button>
            {error && <p className="text-red-500">{error}</p>}
            {data.humanResources.map((resource) => (
              <div key={resource.id} className="mb-6 border-8 p-4 rounded-lg">
                <h3 className="text-lg font-bold">ID #{resource.id}: {resource.workerName}</h3>
                <ul className="list-disc ml-6 mb-4">
                  <li>Position: {resource.role}</li>
                  <li>Date Enrolled: {new Date(resource.dateEnrolled).toLocaleDateString()}</li>
                  <li>Notes: {resource.notes}</li>
                </ul>
                <table className="table-auto w-full text-left border">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="p-2">#</th>
                      <th className="p-2">Start Date</th>
                      <th className="p-2">End Date</th>
                      <th className="p-2">Payment</th>
                      <th className="p-2">Payment Date</th>
                      <th className="p-2">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resource.payments.map((payment, idx) => (
                      <tr key={idx} className="border-t">
                        <td className="p-2">{idx + 1}</td>
                        <td className="p-2">{new Date(payment.workStartDate).toLocaleDateString()}</td>
                        <td className="p-2">{new Date(payment.workEndDate).toLocaleDateString()}</td>
                        <td className="p-2">${payment.paymentAmount}</td>
                        <td className="p-2">{new Date(payment.paymentDate).toLocaleDateString()}</td>
                        <td className="p-2">{payment.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Unit Resources Section */}
      <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Unit Resources</h2>
          <button onClick={() => toggleSection("unitResource")} className="text-blue-600 hover:underline">
            {expandedSections.unitResource ? "Hide Details" : "Show Details"}
          </button>
        </div>
        {expandedSections.unitResource && (
          <div className="p-4">
            <input
              type="text"
              placeholder="Search by Unique ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="border p-2 mb-2"
            />
            <button onClick={() => handleSearch("unitResource")} className="bg-blue-500 text-white p-2 rounded">
              Search
            </button>
            {error && <p className="text-red-500">{error}</p>}
            {data.unitResources.map((resource) => (
              <div key={resource.uniqueId} className="mb-6 border-8 p-4 rounded-lg">
                <h3 className="text-lg font-bold">ID #{resource.uniqueId}: {resource.resourceName}</h3>
                <ul className="list-disc ml-6 mb-4">
                  <li>Type: {resource.resourceType}</li>
                  <li>Quantity: {resource.quantity} {resource.unit}</li>
                  <li>Cost per Unit: ${resource.costPerUnit}</li>
                  <li>Total Cost: ${resource.totalCost}</li>
                  <li>Notes: {resource.notes}</li>
                  <li>Date Added: {new Date(resource.dateAdded).toLocaleDateString()}</li>
                </ul>
                <table className="table-auto w-full text-left border">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="p-2">#</th>
                      <th className="p-2">Quantity Used</th>
                      <th className="p-2">Purpose</th>
                      <th className="p-2">Date</th>
                      <th className="p-2">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resource.usage.map((use, idx) => (
                      <tr key={idx} className="border-t">
                        <td className="p-2">{idx + 1}</td>
                        <td className="p-2">{use.quantityUsed} {resource.unit}</td>
                        <td className="p-2">{use.usagePurpose}</td>
                        <td className="p-2">{new Date(use.dateOfUsage).toLocaleDateString()}</td>
                        <td className="p-2">{use.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Item Resources Section */}
      <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Item Resources</h2>
          <button onClick={() => toggleSection("itemResource")} className="text-blue-600 hover:underline">
            {expandedSections.itemResource ? "Hide Details" : "Show Details"}
          </button>
        </div>
        {expandedSections.itemResource && (
          <div className="p-4">
            <input
              type="text"
              placeholder="Search by Unique ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="border p-2 mb-2"
            />
            <button onClick={() => handleSearch("itemResource")} className="bg-blue-500 text-white p-2 rounded">
              Search
            </button>
            {error && <p className="text-red-500">{error}</p>}
            {data.itemResources.map((resource) => (
              <div key={resource.uniqueId} className="mb-6 border-8 p-4 rounded-lg">
                <h3 className="text-lg font-bold">ID #{resource.uniqueId}: {resource.resourceName}</h3>
                <ul className="list-disc ml-6 mb-4">
                  <li>Type: {resource.resourceType}</li>
                  <li>Quantity: {resource.quantity}</li>
                  <li>Cost per Item: ${resource.costPerItem}</li>
                  <li>Total Cost: ${resource.totalCost}</li>
                  <li>Condition: {resource.condition}</li>
                  <li>Notes: {resource.notes}</li>
                  <li>Date Added: {new Date(resource.dateAdded).toLocaleDateString()}</li>
                </ul>
                <h4 className="font-bold mb-2">Maintenance Records</h4>
                <table className="table-auto w-full text-left border">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="p-2">#</th>
                      <th className="p-2">Maintenance Type</th>
                      <th className="p-2">Cost</th>
                      <th className="p-2">Date</th>
                      <th className="p-2">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resource.maintenance.map((maintain, idx) => (
                      <tr key={idx} className="border-t">
                        <td className="p-2">{idx + 1}</td>
                        <td className="p-2">{maintain.maintenanceType}</td>
                        <td className="p-2">${maintain.maintenanceCost}</td>
                        <td className="p-2">{new Date(maintain.dateOfMaintenance).toLocaleDateString()}</td>
                        <td className="p-2">{maintain.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <h4 className="font-bold mb-2 mt-4">Sales Records</h4>
                <table className="table-auto w-full text-left border">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="p-2">#</th>
                      <th className="p-2">Items Sold</th>
                      <th className="p-2">Sale Price per Unit</th>
                      <th className="p-2">Total Sale Price</th>
                      <th className="p-2">Date</th>
                      <th className="p-2">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resource.sales.map((sale, idx) => (
                      <tr key={idx} className="border-t">
                        <td className="p-2">{idx + 1}</td>
                        <td className="p-2">{sale.itemsSold}</td>
                        <td className="p-2">${sale.salePricePerUnit}</td>
                        <td className="p-2">${sale.totalSalePrice}</td>
                        <td className="p-2">{new Date(sale.dateOfSale).toLocaleDateString()}</td>
                        <td className="p-2">{sale.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
