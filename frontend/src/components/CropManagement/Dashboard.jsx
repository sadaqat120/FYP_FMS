// Updated Frontend Component
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    records: [],
    cropRecords: [],
    costTrackings: [],
    resultSummary: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Please login to view dashboard');
        }

        const response = await axios.get('http://localhost:5000/api/dashboard', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.data.success) {
          setDashboardData(response.data.data);
        }
      } catch (err) {
        console.error('Dashboard fetch error:', err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="dashboard-loading">Loading dashboard data...</div>;
  }

  if (error) {
    return <div className="dashboard-error">{error}</div>;
  }

  // Get the first record and crop record for the plot box
  const latestRecord = dashboardData.records[0] || {};
  console.log("record",latestRecord);
  const latestCropRecord = dashboardData.cropRecords[0] || {};
  console.log("latestCropRecord",latestCropRecord)
  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <div className="plot-box">
          <h3>{latestRecord.plotName || 'Plot Name Not Available'}</h3>
          <p><strong>Location:</strong> {latestRecord.location || 'N/A'}</p>
          <p><strong>Total Area:</strong> {latestRecord.area || 'N/A'}</p>
          <p><strong>Land Type:</strong> {latestRecord.landType || 'N/A'}</p>
          <p><strong>Crop Name:</strong> {latestCropRecord.cropName || 'N/A'}</p>
          <p><strong>Season:</strong> {latestCropRecord.season || 'N/A'}</p>
          <p><strong>Expected Duration:</strong> {latestCropRecord.expectedDuration || 'N/A'} days</p>
          <div className="progress-section">
            <p><strong>Crop Stage:</strong> {latestCropRecord.cropType || 'N/A'}</p>
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: "60%" }}></div>
            </div>
          </div>
        </div>

        <div className="cost-overview">
          <h3>Cost Overview</h3>
          <table className="cost-table">
            <thead>
              <tr>
                <th>Activity</th>
                <th>Date</th>
                <th>Total Cost</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.costTrackings.map((cost, index) => (
                <tr key={cost._id}>
                  <td>{cost.activity}</td>
                  <td>{new Date(cost.date).toLocaleDateString()}</td>
                  <td>
                    {(cost.equipmentCost + cost.materialCost + cost.laborCost + 
                      cost.transportCost + cost.miscellaneousCost).toFixed(2)}
                  </td>
                  <td>{cost.additionalNotes || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {dashboardData.resultSummary && (
          <>
            <div className="summary">
              <div className="yield-summary">
                <h3>Yield Breakdown</h3>
                <p><strong>Expected Yield:</strong> {dashboardData.resultSummary.expectedYield} {dashboardData.resultSummary.unit}</p>
                <p><strong>Total Achieved Yield:</strong> {dashboardData.resultSummary.totalYieldQuantity} {dashboardData.resultSummary.unit}</p>
                <p><strong>Yield Grade:</strong> {dashboardData.resultSummary.yieldGrade}</p>
                <p><strong>Notes:</strong> {dashboardData.resultSummary.notes || 'N/A'}</p>
              </div>
              <div className="financial-outcome">
                <h3>Financial Outcome</h3>
                <p><strong>Total Cost:</strong> PKR {dashboardData.resultSummary.totalProductionCost}</p>
                <p><strong>Sell Revenue:</strong> PKR {dashboardData.resultSummary.sellRevenue}</p>
                <p><strong>Net Profit:</strong> PKR {(dashboardData.resultSummary.sellRevenue - dashboardData.resultSummary.totalProductionCost).toFixed(2)}</p>
                <p><strong>Notes:</strong> {dashboardData.resultSummary.finalNotes || 'N/A'}</p>
              </div>
            </div>

            <div className="satisfaction">
              <h3>Your Satisfaction:</h3>
              <div className="rating">
                {Array(5).fill('⭐').map((star, index) => (
                  <span key={index} style={{ opacity: index < dashboardData.resultSummary.rateSatisfaction ? 1 : 0.3 }}>
                    {star}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;