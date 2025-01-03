import React from "react";
import "./Models.css";

const SignUpModal = ({ isOpen, onClose, onSignUpSuccess }) => {
  if (!isOpen) return null;

  const handleSignUp = (e) => {
    e.preventDefault();
    onSignUpSuccess(); // Notify App.js of successful sign-up
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Sign Up</h2>
        <form className="form" onSubmit={handleSignUp}>
          <input type="text" placeholder="First Name" required />
          <input type="text" placeholder="Last Name" required />
          <input type="email" placeholder="Email" required />
          <input type="tel" placeholder="Phone" required />
          <input type="password" placeholder="Password" required />
          <button type="submit" className="button">Sign Up</button>
        </form>
        <button onClick={onClose} className="close-button">Close</button>
      </div>
    </div>
  );
};

export default SignUpModal;
