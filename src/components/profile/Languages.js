import React from "react";
import "./Languages.css";

const Languages = () => {
  return (
    <div className="languages">
      <h2>Select Language</h2>
      <select>
        <option>English</option>
        <option>Urdu</option>
      </select>
      <button>Save</button>
    </div>
  );
};

export default Languages;
