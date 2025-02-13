import React from "react";
import "./ChangeProfile.css";

const ChangeProfile = () => {
  return (
    <div className="change-profile">
      <h2>Edit Profile</h2>
      <form>
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <input type="tel" placeholder="Phone" />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default ChangeProfile;
