import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = ({ farmId }) => {
  const [farm, setFarm] = useState(null);
  const [plotsData, setPlotsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Please login to view dashboard');
        }

        // Use farmId in the API request
        const response = await axios.get(`http://localhost:5000/api/dashboard?farmId=${farmId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.data.success) {
          setFarm(response.data.data.farm);
          // Use the plotsData array directly from the API response
          setPlotsData(response.data.data.plotsData);
        }
      } catch (err) {
        console.error('Dashboard fetch error:', err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    // Only fetch when farmId is available
    if (farmId) {
      fetchDashboardData();
    } else {
      setError("No farm ID provided");
      setLoading(false);
    }
  }, [farmId]);

  if (loading) {
    return <div className="dashboard-loading">Loading dashboard data...</div>;
  }

  if (error) {
    return <div className="dashboard-error">{error}</div>;
  }

  // If we have a farm but no related data
  if (farm && (!plotsData || plotsData.length === 0)) {
    return (
      <div className="dashboard">
        <div className="dashboard-content">
          <div className="farm-header">
            <h2>{farm.farmName || 'Farm Name Not Available'}</h2>
            <p>No records or crop data available for this farm yet.</p>
            <p>Start by adding land records and crop information to see detailed dashboard.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <div className="farm-header">
          <h2>{farm.farmName || 'Farm Name Not Available'}</h2>
          <p><strong>Total Plots:</strong> {plotsData.length}</p>
        </div>
        
        {plotsData.map((plot, index) => (
          <div key={plot.plotInfo._id} className="plot-section">
            <div className="plot-box">
              <h3>{plot.plotInfo.plotName || 'Plot Name Not Available'}</h3>
              <p><strong>Location:</strong> {plot.plotInfo.location || 'N/A'}</p>
              <p><strong>Total Area:</strong> {plot.plotInfo.area || 'N/A'}</p>
              <p><strong>Land Type:</strong> {plot.plotInfo.landType || 'N/A'}</p>
              <p><strong>Soil Type:</strong> {plot.plotInfo.soilType || 'N/A'}</p>
              
              {plot.crops && plot.crops.length > 0 && (
                <div className="crop-info">
                  <h4>Current Crop</h4>
                  <p><strong>Crop Name:</strong> {plot.crops[0].cropName || 'N/A'}</p>
                  <p><strong>Season:</strong> {plot.crops[0].season || 'N/A'}</p>
                  <p><strong>Expected Duration:</strong> {plot.crops[0].expectedDuration || 'N/A'} days</p>
                  <div className="progress-section">
                    <p><strong>Crop Stage:</strong> {plot.crops[0].cropType || 'N/A'}</p>
                    <div className="progress-bar-container">
                      <div className="progress-bar" style={{ width: "60%" }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="cost-overview">
              <h3>Cost Overview for {plot.plotInfo.plotName}</h3>
              {plot.costs && plot.costs.length > 0 ? (
                <table className="cost-table">
                  <thead>
                    <tr>
                      <th>Activity</th>
                      <th>Date</th>
                      <th>Total Cost</th>
                      <th>Type</th>
                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {plot.costs.map((cost) => (
                      <tr key={cost._id}>
                        <td>{cost.activity}</td>
                        <td>{new Date(cost.date).toLocaleDateString()}</td>
                        <td>
                          {(cost.equipmentCost + cost.materialCost + cost.laborCost + 
                            cost.transportCost + cost.miscellaneousCost).toFixed(2)}
                        </td>
                        <td>{cost.isShared ? 'Farm-level' : 'Plot-specific'}</td>
                        <td>{cost.additionalNotes || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No cost data available for this plot.</p>
              )}
            </div>

            {/* Financial outcome section */}
            <div className="summary">
              <div className="yield-summary">
                <h3>Yield Breakdown for {plot.plotInfo.plotName}</h3>
                {plot.results ? (
                  <>
                    <p><strong>Expected Yield:</strong> {plot.results.expectedYield} {plot.results.unit}</p>
                    <p><strong>Total Achieved Yield:</strong> {plot.results.totalYieldQuantity} {plot.results.unit}</p>
                    <p><strong>Yield Grade:</strong> {plot.results.yieldGrade}</p>
                    <p><strong>Notes:</strong> {plot.results.notes || 'N/A'}</p>
                  </>
                ) : (
                  <p>No yield data available for this plot yet.</p>
                )}
              </div>
              <div className="financial-outcome">
                <h3>Financial Outcome for {plot.plotInfo.plotName}</h3>
                {plot.results ? (
                  <>
                    <p><strong>Total Cost:</strong> PKR {plot.results.totalProductionCost}</p>
                    <p><strong>Sell Revenue:</strong> PKR {plot.results.sellRevenue}</p>
                    <p><strong>Net Profit:</strong> PKR {(plot.results.sellRevenue - plot.results.totalProductionCost).toFixed(2)}</p>
                    <p><strong>Notes:</strong> {plot.results.finalNotes || 'N/A'}</p>
                  </>
                ) : (
                  <p>No financial data available for this plot yet.</p>
                )}
              </div>
            </div>

            {/* Satisfaction rating section */}
            <div className="satisfaction">
              <h3>Your Satisfaction for {plot.plotInfo.plotName}:</h3>
              {plot.results ? (
                <div className="rating">
                  {Array(5).fill('⭐').map((star, idx) => (
                    <span key={idx} style={{ opacity: idx < plot.results.rateSatisfaction ? 1 : 0.3 }}>
                      {star}
                    </span>
                  ))}
                </div>
              ) : (
                <p>No satisfaction rating available for this plot yet.</p>
              )}
            </div>
            
            {index < plotsData.length - 1 && <hr className="plot-divider" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;