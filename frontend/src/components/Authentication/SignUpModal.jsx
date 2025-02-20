import React, { useState } from "react";
import axios from "axios";
import "./Models.css";

const API_URL = "http://localhost:5000/api";

const SignUpModal = ({ isOpen, onClose, onSignUpSuccess }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/auth/signup`, formData);
      
      // Store token in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      
      setLoading(false);
      onSignUpSuccess(response.data.user); // Pass user data to parent component
    } catch (error) {
      setLoading(false);
      setError(
        error.response?.data?.message || 
        "An error occurred during sign up. Please try again."
      );
      console.error("Signup error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Sign Up</h2>
        {error && <div className="error-message">{error}</div>}
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
          <input 
            type="password" 
            name="confirmPassword"
            placeholder="Confirm Password" 
            value={formData.confirmPassword}
            onChange={handleChange}
            required 
          />
          <button 
            type="submit" 
            className="button" 
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <button onClick={onClose} className="close-button">Close</button>
      </div>
    </div>
  );
};

export default SignUpModal;