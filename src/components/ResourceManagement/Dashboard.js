import React, { useState } from "react";
import ResourceDetails from "./ResourceDetails"; // Now integrated into the component

const Dashboard = ({ storeName }) => {
  const [expandedSections, setExpandedSections] = useState({
    humanResource: false,
    unitResource: false,
    itemResource: false,
  });

  const resourceDetails = {
    humanResource: [
      {
        id: "01",
        workerName: "John Doe",
        role: "Field Worker",
        dateEnrolled: "2024-12-15",
        notes: "Excellent worker",
        payouts: [
          {
            workerId: "01",
            workerName: "John Doe",
            startDate: "2024-12-15",
            endDate: "2025-01-10",
            payment: "$1000",
            notes: "On-time payment",
            paymentDate: "2025-01-11",
          },
        ],
      },
    ],
    unitResource: [
      {
        resourceId: "101",
        type: "Fertilizer",
        name: "Nitrogen Fertilizer",
        uniqueId: "101",
        quantity: "50 kg",
        costPerUnit: "$5",
        totalCost: "$250",
        dateAdded: "2024-12-10",
        notes: "Use for winter crops",
        usage: [
          {
            resourceId: "101",
            quantityUsed: "10 kg",
            remainingQuantity: "40 kg",
            usagePurpose: "Planting",
            usageDate: "2025-01-01",
            notes: "Winter crop sowing",
          },
        ],
      },
    ],
    itemResource: [
      {
        resourceId: "201",
        type: "Tractor",
        name: "John Deere 5050",
        uniqueId: "201",
        numberOfItems: "1",
        costPerItem: "$25,000",
        totalCost: "$25,000",
        condition: "New",
        dateAdded: "2024-11-20",
        notes: "Used for field plowing",
        repairs: [
          {
            resourceId: "201",
            maintenanceType: "Repair",
            cost: "$500",
            date: "2025-01-05",
            notes: "Oil leakage repair",
          },
        ],
      },
    ],
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-green-600 mb-6 text-center">
        {storeName} - Dashboard
      </h1>

      {/* Notifications Section */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-bold text-blue-600 mb-4">Notifications</h2>
        <ul className="list-disc ml-6">
          <li>Reminder: Update resource records.</li>
          <li>Alert: Scheduled maintenance for tractor on 2025-01-20.</li>
          <li>New hire: John Doe joined as Field Worker.</li>
        </ul>
      </div>

      {/* Resource Sections */}
      {["humanResource", "unitResource", "itemResource"].map((resourceType) => (
        <div key={resourceType} className="bg-white p-4 rounded-lg shadow-lg mb-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800 capitalize">
              {resourceType.replace(/([A-Z])/g, " $1")}s
            </h2>
            <button
              onClick={() => toggleSection(resourceType)}
              className="text-blue-600 hover:underline"
            >
              {expandedSections[resourceType] ? "Hide Details" : "Show Details"}
            </button>
          </div>
          {expandedSections[resourceType] && (
            <ResourceDetails
              resourceType={resourceType}
              resourceData={resourceDetails[resourceType]}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
