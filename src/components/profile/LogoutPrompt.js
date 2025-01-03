import React from "react";
import "./LogoutPrompt.css";

const LogoutPrompt = ({ onClose }) => {
  const handleLogout = () => {
    window.location.reload(); // Simulate logging out by reloading
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
