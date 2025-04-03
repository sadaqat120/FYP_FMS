import React, { useState } from "react";
import axios from "axios";
import "./Models.css";

const API_URL = "http://localhost:5000/api";

// Configure axios defaults
axios.defaults.withCredentials = true;

const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("Attempting login with:", formData.email);
      const response = await axios.post(`${API_URL}/auth/login`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log("Login response:", response.data);
      
      if (response.data.success) {
        // Store token in localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setLoading(false);
        onLoginSuccess(response.data.user);
        onClose();
      } else {
        setError(response.data.message || "Login failed. Please try again.");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error("Login error details:", error);
      
      setError(
        error.response?.data?.message || 
        error.message ||
        "An error occurred during login. Please try again."
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <form className="form" onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
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
          <button 
            type="submit" 
            className="button"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <button onClick={onClose} className="close-button">
          Close
        </button>
      </div>
    </div>
  );
};

export default LoginModal;