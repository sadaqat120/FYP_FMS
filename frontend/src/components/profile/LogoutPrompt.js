import React from "react";

const LogoutPrompt = ({ onClose }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="text-center space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Log Out</h2>
      <p className="text-gray-600">Are you sure you want to log out?</p>
      <div className="flex justify-center gap-4">
        <button
          onClick={onClose}
          className="px-6 py-2 bg-gray-300 hover:bg-gray-400 rounded-md"
        >
          Cancel
        </button>
        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-red-600 text-white hover:bg-red-700 rounded-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default LogoutPrompt;
