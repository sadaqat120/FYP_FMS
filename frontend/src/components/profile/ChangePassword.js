import React from "react";
import "./ChangePassword.css";

const ChangePassword = () => {
  return (
    <div className="change-password">
      <h2>Change Password</h2>
      <form>
        <input type="password" placeholder="Current Password" />
        <input type="password" placeholder="New Password" />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default ChangePassword;

