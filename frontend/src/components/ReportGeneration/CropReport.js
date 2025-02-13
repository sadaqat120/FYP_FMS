import React, { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const CropReport = () => {
  const [selectedPlot, setSelectedPlot] = useState("");
  const [plotData, setPlotData] = useState(null);

  const plotOptions = {
    "Sadaqat Plot": {
      cropName: "Wheat",
      landType: "Irrigated",
      totalArea: "10 acres",
      cropStage: "Harvested",
      expectedYield: "40 quintals",
      actualYield: "38 quintals",
      seedSelection: "Hybrid Wheat Seed",
      fertilizerUsed: "Urea, DAP",
      pestDiseases: "None reported",
      financialSummary: {
        cost: "$500",
        revenue: "$1000",
        profitLoss: "$500",
        satisfactionRating: 4.5,
        notes: "Good season, optimal weather.",
      },
    },
    "Namal Plot": {
      cropName: "Corn",
      landType: "Rainfed",
      totalArea: "15 acres",
      cropStage: "Growing",
      expectedYield: "50 quintals",
      actualYield: "N/A",
      seedSelection: "Pioneer Corn Seed",
      fertilizerUsed: "Compost",
      pestDiseases: "Mild aphid infestation",
      financialSummary: {
        cost: "$800",
        revenue: "$0",
        profitLoss: "-$800",
        satisfactionRating: 3,
        notes: "Aphid infestation delayed growth.",
      },
    },
    "Mianwali": {
      cropName: "Rice",
      landType: "Irrigated",
      totalArea: "20 acres",
      cropStage: "Sowed",
      expectedYield: "80 quintals",
      actualYield: "N/A",
      seedSelection: "High-Yield Rice Seed",
      fertilizerUsed: "NPK Mix",
      pestDiseases: "None reported",
      financialSummary: {
        cost: "$1000",
        revenue: "$0",
        profitLoss: "-$1000",
        satisfactionRating: 4,
        notes: "Awaiting favorable weather conditions.",
      },
    },
  };

  const handleGenerateReport = () => {
    const doc = new jsPDF();
    doc.setFont("times", "normal");
    doc.setFontSize(16);
    doc.text("Farm Management System", 105, 20, { align: "center" });
    doc.setFontSize(12);
    doc.text(`Plot Name: ${selectedPlot}`, 20, 40);
    doc.text(`Season/Year: Winter 2024`, 105, 40, { align: "center" });
    doc.text(`Generated Date: ${new Date().toLocaleDateString()}`, 190, 40, {
      align: "right",
    });

    const { cropName, landType, totalArea, cropStage, expectedYield, actualYield, seedSelection, fertilizerUsed, pestDiseases, financialSummary } = plotData;

    doc.setFontSize(14);
    doc.text("Crop Overview", 20, 60);
    doc.autoTable({
      startY: 65,
      body: [
        ["Crop Name", cropName],
        ["Land Type", landType],
        ["Total Area", totalArea],
        ["Crop Stage", cropStage],
        ["Expected Yield", expectedYield],
        ["Actual Yield", actualYield],
      ],
      theme: "grid",
    });

    doc.text("Details", 20, doc.previousAutoTable.finalY + 10);
    doc.autoTable({
      startY: doc.previousAutoTable.finalY + 15,
      body: [
        ["Seed Selection", seedSelection],
        ["Fertilizer Used", fertilizerUsed],
        ["Pest/Diseases", pestDiseases],
      ],
      theme: "grid",
    });

    doc.text("Financial Summary", 20, doc.previousAutoTable.finalY + 10);
    doc.autoTable({
      startY: doc.previousAutoTable.finalY + 15,
      body: [
        ["Cost", financialSummary.cost],
        ["Revenue", financialSummary.revenue],
        ["Profit/Loss", financialSummary.profitLoss],
        [
          "Satisfaction Rating",
          "★".repeat(Math.floor(financialSummary.satisfactionRating)) +
            "☆".repeat(5 - Math.floor(financialSummary.satisfactionRating)),
        ],
        ["Notes", financialSummary.notes],
      ],
      theme: "grid",
    });

    doc.save(`${selectedPlot}-CropReport.pdf`);
  };

  const handlePlotChange = (e) => {
    const plot = e.target.value;
    setSelectedPlot(plot);
    setPlotData(plotOptions[plot]);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-green-600 mb-6 text-center">
        Crop Management Report
      </h1>
      <div className="mb-6">
        <select
          value={selectedPlot}
          onChange={handlePlotChange}
          className="p-2 border rounded-lg w-full"
        >
          <option value="" disabled>
            Select a Plot
          </option>
          {Object.keys(plotOptions).map((plotName) => (
            <option key={plotName} value={plotName}>
              {plotName}
            </option>
          ))}
        </select>
      </div>
      {plotData && (
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-blue-600 mb-4">
            {selectedPlot} - Report Overview
          </h2>
          <p className="font-semibold mb-2">Crop Overview:</p>
          <ul className="list-disc ml-6 mb-4">
            <li>Crop Name: {plotData.cropName}</li>
            <li>Land Type: {plotData.landType}</li>
            <li>Total Area: {plotData.totalArea}</li>
            <li>Crop Stage: {plotData.cropStage}</li>
            <li>Expected Yield: {plotData.expectedYield}</li>
            <li>Actual Yield: {plotData.actualYield}</li>
          </ul>
          <p className="font-semibold mb-2">Details:</p>
          <ul className="list-disc ml-6 mb-4">
            <li>Seed Selection: {plotData.seedSelection}</li>
            <li>Fertilizer Used: {plotData.fertilizerUsed}</li>
            <li>Pest/Diseases: {plotData.pestDiseases}</li>
          </ul>
          <p className="font-semibold mb-2">Financial Summary:</p>
          <ul className="list-disc ml-6 mb-4">
            <li>Cost: {plotData.financialSummary.cost}</li>
            <li>Revenue: {plotData.financialSummary.revenue}</li>
            <li>Profit/Loss: {plotData.financialSummary.profitLoss}</li>
            <li>
              Satisfaction Rating:{" "}
              {"★".repeat(Math.floor(plotData.financialSummary.satisfactionRating)) +
                "☆".repeat(5 - Math.floor(plotData.financialSummary.satisfactionRating))}
            </li>
            <li>Notes: {plotData.financialSummary.notes}</li>
          </ul>
          <button
            onClick={handleGenerateReport}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Download Report
          </button>
        </div>
      )}
    </div>
  );
};

export default CropReport;
