import React, { useState } from "react";

const Dashboard = ({ storeName }) => {
  const [expandedSections, setExpandedSections] = useState({
    humanResource: false,
    unitResource: false,
    itemResource: false,
  });

  const resourceDetails = {
    humanResource: [
      {
        id: 1,
        name: "John Doe",
        position: "Field Worker",
        dateEnrolled: "2024-12-15",
        notes: "Excellent worker",
        payments: [
          {
            workerId: 1,
            name: "John Doe",
            startDate: "2024-12-15",
            endDate: "2025-01-10",
            payment: "$1000",
            paymentDate: "2025-01-11",
            notes: "On-time payment",
          },
        ],
      },
      {
        id: 2,
        name: "Jane Smith",
        position: "Veterinarian",
        dateEnrolled: "2023-02-15",
        notes: "Specialist in livestock health",
        payments: [
          {
            workerId: 2,
            name: "Jane Smith",
            startDate: "2024-01-01",
            endDate: "2024-01-31",
            payment: "$2000",
            paymentDate: "2024-02-01",
            notes: "Monthly consultation fee",
          },
        ],
      },
    ],
    unitResource: [
      {
        resourceId: 1,
        type: "Seed",
        name: "Corn Seeds",
        uniqueId: "U001",
        quantity: 50,
        unit: "kg",
        costPerUnit: 200,
        totalCost: 10000,
        notes: "For spring planting",
        dateAdded: "2024-01-05",
        usage: [
          {
            resourceId: 1,
            quantityUsed: 10,
            purpose: "Planting",
            date: "2024-02-01",
            notes: "Used for corn planting",
          },
        ],
      },
      {
        resourceId: 2,
        type: "Fertilizer",
        name: "Urea",
        uniqueId: "U002",
        quantity: 100,
        unit: "kg",
        costPerUnit: 50,
        totalCost: 5000,
        notes: "To boost crop yield",
        dateAdded: "2024-01-20",
        usage: [
          {
            resourceId: 2,
            quantityUsed: 20,
            purpose: "Fertilizing corn",
            date: "2024-02-15",
            notes: "For spring crops",
          },
        ],
      },
    ],
    itemResource: [
      {
        resourceId: 1,
        type: "Equipment",
        name: "Tractor",
        uniqueId: "I001",
        numberOfItems: 1,
        costPerItem: 500000,
        totalCost: 500000,
        condition: "New",
        dateAdded: "2024-01-01",
        notes: "Purchased for farm operations",
        maintenance: [
          {
            resourceId: 1,
            maintenanceType: "Servicing",
            cost: 5000,
            date: "2024-02-10",
            notes: "Routine servicing",
          },
        ],
        sales: [
          {
            resourceId: 1,
            itemsSold: 1,
            salePricePerUnit: 600000,
            totalSalePrice: 600000,
            date: "2024-03-01",
            notes: "Sold for profit",
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
      {/* <h1 className="text-3xl font-bold text-green-600 mb-6 text-center">
        {storeName} - Dashboard
      </h1> */}

      {/* Notifications Section */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-bold text-blue-600 mb-4">Notifications</h2>
        <ul className="list-disc ml-6">
          <li>Reminder: Update resource records.</li>
          <li>Alert: Scheduled maintenance for tractor on 2025-01-20.</li>
          <li> New hire: John Doe joined as Field Worker.</li>
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
            <div className="p-4">
              {resourceDetails[resourceType].map((resource) => (
                <div key={resource.id || resource.resourceId} className="mb-6 border-8 p-4 rounded-lg">
                  <h3 className="text-lg font-bold">
                    {resourceType === "humanResource" ? `ID #${resource.id}: ${resource.name}` : `ID #${resource.resourceId}: ${resource.name}`}
                  </h3>
                  <ul className="list-disc ml-6 mb-4">
                    {resourceType === "humanResource" ? (
                      <>
                        <li>Position: {resource.position}</li>
                        <li>Date Enrolled: {resource.dateEnrolled}</li>
                        <li>Notes: {resource.notes}</li>
                      </>
                    ) : (
                      <>
                        <li>Type: {resource.type}</li>
                        <li>Quantity: {resource.quantity} {resource.unit}</li>
                        <li>Cost per Unit: {resource.costPerUnit}</li>
                        <li>Total Cost: {resource.totalCost}</li>
                        <li>Notes: {resource.notes}</li>
                        <li>Date Added: {resource.dateAdded}</li>
                      </>
                    )}
                  </ul>
                  {resourceType === "humanResource" && (
                    <table className="table-auto w-full text-left border">
                      <thead className="bg-gray-200">
                        <tr>
                          <th className="p-2">Worker ID</th>
                          <th className="p-2">Name</th>
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
                            <td className="p-2">{payment.workerId}</td>
                            <td className="p-2">{payment.name}</td>
                            <td className="p-2">{payment.startDate}</td>
                            <td className="p-2">{payment.endDate}</td>
                            <td className="p-2">{payment.payment}</td>
                            <td className="p-2">{payment.paymentDate}</td>
                            <td className="p-2">{payment.notes}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                  {resourceType === "unitResource" && (
                    <table className="table-auto w-full text-left border">
                      <thead className="bg-gray-200">
                        <tr>
                          <th className="p-2">Resource ID</th>
                          <th className="p-2">Quantity Used</th>
                          <th className="p-2">Remaining Quantity</th>
                          <th className="p-2">Purpose</th>
                          <th className="p-2">Date</th>
                          <th className="p-2">Notes</th>
                        </tr>
                      </thead>
                      <tbody>
                        {resource.usage.map((use, idx) => (
                          <tr key={idx} className="border-t">
                            <td className="p-2">{use.resourceId}</td>
                            <td className="p-2">{use.quantityUsed} {resource.unit}</td>
                            <td className="p-2">{resource.quantity - use.quantityUsed} {resource.unit}</td>
                            <td className="p-2">{use.purpose}</td>
                            <td className="p-2">{ use.date}</td>
                            <td className="p-2">{use.notes}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                  {resourceType === "itemResource" && (
                    <>
                      <h4 className="font-bold mb-2">Maintenance Records</h4>
                      <table className="table-auto w-full text-left border">
                        <thead className="bg-gray-200">
                          <tr>
                            <th className="p-2">Resource ID</th>
                            <th className="p-2">Maintenance Type</th>
                            <th className="p-2">Cost</th>
                            <th className="p-2">Date</th>
                            <th className="p-2">Notes</th>
                          </tr>
                        </thead>
                        <tbody>
                          {resource.maintenance.map((maintain, idx) => (
                            <tr key={idx} className="border-t">
                              <td className="p-2">{maintain.resourceId}</td>
                              <td className="p-2">{maintain.maintenanceType}</td>
                              <td className="p-2">{maintain.cost}</td>
                              <td className="p-2">{maintain.date}</td>
                              <td className="p-2">{maintain.notes}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      <h4 className="font-bold mb-2 mt-4">Sales Records</h4>
                      <table className="table-auto w-full text-left border">
                        <thead className="bg-gray-200">
                          <tr>
                            <th className="p-2">Resource ID</th>
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
                              <td className="p-2">{sale.resourceId}</td>
                              <td className="p-2">{sale.itemsSold}</td>
                              <td className="p-2">{sale.salePricePerUnit}</td>
                              <td className="p-2">{sale.totalSalePrice}</td>
                              <td className="p-2">{sale.date}</td>
                              <td className="p-2">{sale.notes}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Dashboard;