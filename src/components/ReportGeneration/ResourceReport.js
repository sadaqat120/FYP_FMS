import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ResourceReport = () => {
  const resourceData = {
    storeName: "Main Resource Store",
    humanResources: [
      {
        id: "HR01",
        name: "John Doe",
        role: "Field Worker",
        joiningDate: "2024-01-15",
        notes: "Good at maintaining crops.",
        payments: [
          {
            startDate: "2024-02-01",
            endDate: "2024-02-28",
            paymentDate: "2024-03-01",
            amount: "1000",
            notes: "Monthly salary.",
          },
        ],
      },
    ],
    unitResources: [
      {
        id: "UR01",
        type: "Fertilizer",
        name: "Nitrogen",
        quantity: "50 kg",
        costPerUnit: "5",
        totalCost: "250",
        dateAdded: "2024-01-10",
        notes: "For spring planting.",
        usage: [
          {
            date: "2024-02-01",
            quantityUsed: "10 kg",
            remainingQuantity: "40 kg",
            purpose: "Planting.",
            notes: "Used for winter crops.",
          },
        ],
      },
    ],
    itemResources: [
      {
        id: "IT01",
        type: "Tractor",
        name: "John Deere 5050",
        quantity: 1,
        costPerUnit: "25000",
        totalCost: "25000",
        dateAdded: "2024-01-05",
        notes: "Purchased for plowing fields.",
        maintenance: [
          {
            date: "2024-02-01",
            type: "Repair",
            cost: "500",
            notes: "Oil change.",
          },
        ],
        sales: [
          {
            date: "2024-03-01",
            itemsSold: 1,
            pricePerUnit: "30000",
            total: "30000",
            notes: "Sold at a profit.",
          },
        ],
      },
    ],
  };

  const handleGeneratePDF = () => {
    const doc = new jsPDF();

    doc.setFont("times", "bold");
    doc.setFontSize(16);
    doc.text("Farm Management System", 105, 10, null, null, "center");
    doc.setFontSize(14);
    doc.text(`Store Name: ${resourceData.storeName}`, 10, 20);
    doc.text(`Generated Date: ${new Date().toLocaleDateString()}`, 170, 20, null, null, "right");

    let yPosition = 30;

    // Human Resources Section
    doc.setFontSize(14);
    doc.text("Human Resources", 10, yPosition);
    yPosition += 10;

    resourceData.humanResources.forEach((hr) => {
      doc.setFontSize(12);
      doc.text(`ID: ${hr.id}`, 10, yPosition);
      doc.text(`Name: ${hr.name}`, 10, yPosition + 5);
      doc.text(`Role: ${hr.role}`, 10, yPosition + 10);
      doc.text(`Joining Date: ${hr.joiningDate}`, 10, yPosition + 15);
      doc.text(`Notes: ${hr.notes}`, 10, yPosition + 20);
      yPosition += 30;

      doc.autoTable({
        startY: yPosition,
        head: [["Start Date", "End Date", "Payment Date", "Amount", "Notes"]],
        body: hr.payments.map((payment) => [
          payment.startDate,
          payment.endDate,
          payment.paymentDate,
          payment.amount,
          payment.notes,
        ]),
      });

      yPosition = doc.lastAutoTable.finalY + 10;
    });

    // Unit-Based Resources Section
    doc.setFontSize(14);
    doc.text("Unit-Based Resources", 10, yPosition);
    yPosition += 10;

    resourceData.unitResources.forEach((ur) => {
      doc.setFontSize(12);
      doc.text(`ID: ${ur.id}`, 10, yPosition);
      doc.text(`Type: ${ur.type}`, 10, yPosition + 5);
      doc.text(`Name: ${ur.name}`, 10, yPosition + 10);
      doc.text(`Quantity: ${ur.quantity}`, 10, yPosition + 15);
      doc.text(`Cost Per Unit: ${ur.costPerUnit}`, 10, yPosition + 20);
      doc.text(`Total Cost: ${ur.totalCost}`, 10, yPosition + 25);
      doc.text(`Date Added: ${ur.dateAdded}`, 10, yPosition + 30);
      doc.text(`Notes: ${ur.notes}`, 10, yPosition + 35);
      yPosition += 45;

      doc.autoTable({
        startY: yPosition,
        head: [["Date", "Quantity Used", "Remaining Quantity", "Purpose", "Notes"]],
        body: ur.usage.map((usage) => [
          usage.date,
          usage.quantityUsed,
          usage.remainingQuantity,
          usage.purpose,
          usage.notes,
        ]),
      });

      yPosition = doc.lastAutoTable.finalY + 10;
    });

    // Item-Based Resources Section
    doc.setFontSize(14);
    doc.text("Item-Based Resources", 10, yPosition);
    yPosition += 10;

    resourceData.itemResources.forEach((item) => {
      doc.setFontSize(12);
      doc.text(`ID: ${item.id}`, 10, yPosition);
      doc.text(`Type: ${item.type}`, 10, yPosition + 5);
      doc.text(`Name: ${item.name}`, 10, yPosition + 10);
      doc.text(`Quantity: ${item.quantity}`, 10, yPosition + 15);
      doc.text(`Cost Per Unit: ${item.costPerUnit}`, 10, yPosition + 20);
      doc.text(`Total Cost: ${item.totalCost}`, 10, yPosition + 25);
      doc.text(`Date Added: ${item.dateAdded}`, 10, yPosition + 30);
      doc.text(`Notes: ${item.notes}`, 10, yPosition + 35);
      yPosition += 45;

      doc.autoTable({
        startY: yPosition,
        head: [["Date", "Type", "Cost", "Notes"]],
        body: item.maintenance.map((maintain) => [
          maintain.date,
          maintain.type,
          maintain.cost,
          maintain.notes,
        ]),
      });

      yPosition = doc.lastAutoTable.finalY + 10;

      doc.autoTable({
        startY: yPosition,
        head: [["Date", "Items Sold", "Price Per Unit", "Total", "Notes"]],
        body: item.sales.map((sale) => [
          sale.date,
          sale.itemsSold,
          sale.pricePerUnit,
          sale.total,
          sale.notes,
        ]),
      });

      yPosition = doc.lastAutoTable.finalY + 10;
    });

    doc.save(`${resourceData.storeName}-Report.pdf`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Resource Report</h1>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">{resourceData.storeName}</h2>
        <p>Preview the data before downloading the report.</p>
      </div>
      <button
        onClick={handleGeneratePDF}
        className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
      >
        Download Report
      </button>
    </div>
  );
};

export default ResourceReport;
