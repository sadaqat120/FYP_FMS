import React, { useState } from "react";
import axios from "axios";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!currentPassword || !newPassword) {
      setError("Both fields are required.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/auth/change-password",
        { currentPassword, newPassword },
        { headers: { Authorization: token } }
      );
      setSuccessMsg(res.data.message);
setTimeout(() => setSuccessMsg(""), 2000);

    } catch (err) {
      setError(err.response?.data?.error || "Error changing password.");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4 text-green-700">Change Password</h2>
      {error && <p className="text-red-600">{error}</p>}
      {successMsg && <p className="text-green-600">{successMsg}</p>}
      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="input input-bordered w-full"
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="input input-bordered w-full"
        />
        <button className="btn w-full bg-green-600 text-white hover:bg-green-700">
          Save Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
