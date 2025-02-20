import React from "react";
import "./Location.css";

const Location = () => {
  return (
    <div className="location">
      <h2>Edit Location</h2>
      <form>
        <input
          type="text"
          placeholder="Current Location"
          value="Namal University, Mianwali, Punjab"
          readOnly
        />
        <input type="text" placeholder="New Location" />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default Location;

