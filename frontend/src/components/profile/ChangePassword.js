import React, { useState } from "react";
import axios from "axios";
import "./ChangePassword.css";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate fields
    if (!currentPassword || !newPassword) {
      setError("Both fields are required.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:5000/auth/change-password", {
        currentPassword,
        newPassword,
      }, {
        headers: {
          Authorization: token,
        },
      });

      alert(response.data.message); // Show success message
    } catch (error) {
      console.error("Error changing password:", error);
      setError(error.response?.data?.error || "Failed to change password.");
    }
  };

  return (
    <div className="change-password">
      <h2>Change Password</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default ChangePassword;
