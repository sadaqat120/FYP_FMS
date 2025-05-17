import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ResourceReport = () => {
  const [stores, setStores] = useState([]);
  const [selectedStoreId, setSelectedStoreId] = useState("");
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

  const handleStoreSelect = async (storeId) => {
    if (!storeId) {
      setSelectedStoreId("");
      setSelectedStoreName("");
      setResourceData(null);
      return;
    }

    const store = stores.find((s) => s._id === storeId);
    setSelectedStoreId(storeId);
    setSelectedStoreName(store?.name || "");

    try {
      const res = await axios.get(`http://localhost:5000/resource-dashboard/${storeId}`);
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
      doc.setTextColor(34, 139, 34);
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
      safeAddPage();
      doc.setDrawColor(200);
      doc.setLineWidth(0.5);
      doc.line(14, y, 195, y);
      y += 10;
    };

    // Build PDF
    addHeader();

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
            hr.payments.map((p) => [
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
            ur.usage.map((u) => [
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
            ir.maintenance.map((m) => [
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
            ir.sales.map((s) => [
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

    addFooter();

    doc.save(`${selectedStoreName.replaceAll(" ", "_")}_Resource_Report.pdf`);
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-green-50 to-white">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 border border-gray-200">
        <label className="block mb-2 font-semibold text-gray-700">
          Select a Store
        </label>
        <select
          onChange={(e) => handleStoreSelect(e.target.value)}
          value={selectedStoreId}
          className="w-full border rounded p-2 mb-6 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="">-- Select Store --</option>
          {stores.map((store) => (
            <option key={store._id} value={store._id}>
              {store.name}
            </option>
          ))}
        </select>

        {resourceData && (
          <div className="space-y-4">
            <div className="bg-emerald-50 p-4 rounded shadow">
              <h2 className="text-lg font-bold text-emerald-800 mb-2">
                Store Summary: {selectedStoreName}
              </h2>
              <p><strong>Total Human Resources:</strong> {resourceData.humanResources?.length || 0}</p>
              <p><strong>Total Unit Resources:</strong> {resourceData.unitResources?.length || 0}</p>
              <p><strong>Total Item Resources:</strong> {resourceData.itemResources?.length || 0}</p>
            </div>

            <div className="text-center mt-4">
              <button
                onClick={generatePDF}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition"
              >
                Download PDF
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourceReport;
