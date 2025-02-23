// Updated SignUpModal.js (Auto-login after Sign-up)
import React, { useState } from "react";
import axios from "axios";
import "./Models.css";

const SignUpModal = ({ isOpen, onClose, onSignUpSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Decode JWT token (helper function)
  const decodeToken = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload;
    } catch (err) {
      console.error("Invalid token format:", err);
      return null;
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/auth/signup", formData);
      if (response.status === 201) {
        const { token } = response.data;

        // Store the token in localStorage
        localStorage.setItem("token", token);

        // Decode token and auto-login
        const payload = decodeToken(token);
        if (payload?.firstName && payload?.lastName && payload?.email) {
          onSignUpSuccess();
          alert("User Registered Successfully!");
          onClose();
        } else {
          setError("Failed to retrieve user information.");
        }
      }
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Sign Up</h2>
        {error && <p className="error-message">{error}</p>}
        <form className="form" onSubmit={handleSignUp}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="button">Sign Up</button>
        </form>
        <button onClick={onClose} className="close-button">Close</button>
      </div>
    </div>
  );
};

export default SignUpModal;
