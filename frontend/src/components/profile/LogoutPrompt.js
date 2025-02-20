// Updated LogoutPrompt.js
import React from "react";
import "./LogoutPrompt.css";

const LogoutPrompt = ({ onClose }) => {
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the stored token
    window.location.reload(); // Reload to reset application state
  };

  return (
    <div className="logout-prompt">
      <h2>Are you sure you want to log out?</h2>
      <div className="logout-buttons">
        <button onClick={onClose}>Cancel</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default LogoutPrompt;
