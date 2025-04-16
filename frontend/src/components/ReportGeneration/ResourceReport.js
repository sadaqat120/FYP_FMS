// src/components/ResourceReport.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ResourceReport = () => {
  const [stores, setStores] = useState([]);
  const [selectedStoreId, setSelectedStoreId] = useState(null);
  const [selectedStoreName, setSelectedStoreName] = useState("");
  const [resourceData, setResourceData] = useState(null);

  const token = localStorage.getItem("token")?.replace("Bearer ", "");

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await axios.get("http://localhost:5000/stores", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStores(res.data);
      } catch (error) {
        console.error("Error fetching stores:", error.message);
      }
    };
    fetchStores();
  }, [token]);

  const handleStoreSelect = async (store) => {
    setSelectedStoreId(store._id);
    setSelectedStoreName(store.name);
    try {
      const res = await axios.get(`http://localhost:5000/resource-dashboard/${store._id}`);
      setResourceData(res.data);
    } catch (err) {
      console.error("Error fetching resource data:", err.message);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;
    const bottomMargin = 20;
    let y = 15;
  
    const safeAddPage = () => {
      if (y > pageHeight - bottomMargin) {
        doc.addPage();
        y = 15;
        addHeader();
      }
    };
  
    const addHeader = () => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor(34, 139, 34); // green
      doc.text("Farm Management System", 105, y, { align: "center" });
  
      y += 8;
      doc.setFontSize(13);
      doc.text("Resource Management Report", 105, y, { align: "center" });
  
      y += 10;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor(0);
      doc.text(`Store: ${selectedStoreName}`, 14, y);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 195, y, { align: "right" });
      y += 10;
    };
  
    const sectionTitle = (title) => {
      safeAddPage();
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.setTextColor(22, 22, 22);
      doc.text(title, 105, y, { align: "center" });
      y += 6;
    };
    
  
    const resourceHeader = (label) => {
      safeAddPage();
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(0);
      doc.text(label, 16, y);
      y += 5;
    };
  
    const addNote = (label, value) => {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      const cleanText = `${label}: ${value || "-"}`;
      const lines = doc.splitTextToSize(cleanText, 180);
      doc.text(lines, 18, y);
      y += lines.length * 5;
    };
  
    const addTable = (head, body) => {
      safeAddPage();
      doc.autoTable({
        startY: y,
        head: [head],
        body,
        theme: "grid",
        styles: { fontSize: 10 },
        margin: { left: 14, right: 14 },
        headStyles: { fillColor: [72, 198, 115] },
        didDrawPage: (data) => {
          y = data.cursor.y + 10;
        },
      });
    };
  
    const addFooter = () => {
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(9);
        doc.text(`Page ${i} of ${pageCount}`, 105, pageHeight - 10, { align: "center" });
      }
    };

    const drawSeparatorLine = () => {
      safeAddPage(); // make sure we don't go off the page
      doc.setDrawColor(200); // light gray
      doc.setLineWidth(0.5);
      doc.line(14, y, 195, y); // horizontal line from left to right
      y += 10; // add space after line
    };
    
  
    // Generate Document
    addHeader();
  
    // Human Resources
    drawSeparatorLine();
    drawSeparatorLine();
    if (resourceData?.humanResources?.length) {
      sectionTitle("Human Resources");
      resourceData.humanResources.forEach((hr) => {
        resourceHeader(`Name: ${hr.workerName} | Role: ${hr.role}`);
        addNote("Date Joined", new Date(hr.dateEnrolled).toLocaleDateString());
        addNote("Notes", hr.notes);
  
        if (hr.payments?.length) {
          addTable(
            ["Start", "End", "Payment Date", "Amount (Rs)", "Notes"],
            hr.payments.map(p => [
              new Date(p.workStartDate).toLocaleDateString(),
              new Date(p.workEndDate).toLocaleDateString(),
              new Date(p.paymentDate).toLocaleDateString(),
              p.paymentAmount,
              p.notes
            ])
          );
        }
      });
    }
    
    drawSeparatorLine();
    drawSeparatorLine();
    // Unit Resources
    if (resourceData?.unitResources?.length) {
      sectionTitle("Unit-Based Resources");
      resourceData.unitResources.forEach((ur) => {
        resourceHeader(`Name: ${ur.resourceName} | Type: ${ur.resourceType}`);
        addNote("Quantity", `${ur.quantity} ${ur.unit}`);
        addNote("Cost Per Unit (Rs)", ur.costPerUnit);
        addNote("Total Cost (Rs)", ur.totalCost);
        addNote("Date Added", new Date(ur.dateAdded).toLocaleDateString());
        addNote("Notes", ur.notes);
  
        if (ur.usage?.length) {
          addTable(
            ["Date", "Qty Used", "Purpose", "Notes"],
            ur.usage.map(u => [
              new Date(u.dateOfUsage).toLocaleDateString(),
              u.quantityUsed,
              u.usagePurpose,
              u.notes
            ])
          );
        }
      });
    }
    drawSeparatorLine();
    drawSeparatorLine();
  
    // Item Resources
    if (resourceData?.itemResources?.length) {
      sectionTitle("Item-Based Resources");
      resourceData.itemResources.forEach((ir) => {
        resourceHeader(`Name: ${ir.resourceName} | Type: ${ir.resourceType}`);
        addNote("Quantity", ir.quantity);
        addNote("Cost Per Item (Rs)", ir.costPerItem);
        addNote("Total Cost (Rs)", ir.totalCost);
        addNote("Date Added", new Date(ir.dateAdded).toLocaleDateString());
        addNote("Condition", ir.condition);
        addNote("Notes", ir.notes);
  
        if (ir.maintenance?.length) {
          addTable(
            ["Date", "Type", "Cost (Rs)", "Notes"],
            ir.maintenance.map(m => [
              new Date(m.dateOfMaintenance).toLocaleDateString(),
              m.maintenanceType,
              m.maintenanceCost,
              m.notes
            ])
          );
        }
  
        if (ir.sales?.length) {
          addTable(
            ["Date", "Items Sold", "Price Per Unit (Rs)", "Total (Rs)", "Notes"],
            ir.sales.map(s => [
              new Date(s.dateOfSale).toLocaleDateString(),
              s.itemsSold,
              s.salePricePerUnit,
              s.totalSalePrice,
              s.notes
            ])
          );
        }
      });
    }
    drawSeparatorLine();
    drawSeparatorLine();
  
    addFooter();
    doc.save(`${selectedStoreName.replaceAll(" ", "_")}_Resource_Report.pdf`);
  };  

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-4">
        Farm Management System
      </h1>
      <h2 className="text-xl font-semibold text-center mb-6">Resource Management Reports</h2>

      <div className="flex gap-4 flex-wrap mb-6 justify-center">
        {stores.length ? stores.map((store) => (
          <button
            key={store._id}
            onClick={() => handleStoreSelect(store)}
            className={`py-2 px-4 rounded border ${selectedStoreId === store._id ? 'bg-green-700 text-white' : 'bg-gray-100 hover:bg-green-200'}`}
          >
            {store.name}
          </button>
        )) : (
          <p>No stores available.</p>
        )}
      </div>

      {resourceData && (
        <>
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-lg font-semibold mb-2">
              Store: {selectedStoreName}
            </h3>
            <p><strong>Total Human Resources:</strong> {resourceData.humanResources?.length || 0}</p>
            <p><strong>Total Unit Resources:</strong> {resourceData.unitResources?.length || 0}</p>
            <p><strong>Total Item Resources:</strong> {resourceData.itemResources?.length || 0}</p>
          </div>

          <button
            onClick={generatePDF}
            className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
          >
            Print Report as PDF
          </button>
        </>
      )}
    </div>
  );
};

export default ResourceReport;
