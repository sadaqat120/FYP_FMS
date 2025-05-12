// Updated LoginModal.js (Fixed Infinite Loop)
import React, { useState, useEffect, useRef } from "react";
import "./Models.css";

const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const hasCheckedToken = useRef(false); // Prevent infinite loop

  // Decode JWT token function (safer version)
  const decodeToken = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload;
    } catch (err) {
      console.error("Invalid token format:", err);
      return null;
    }
  };

  // Auto-login from token on page load (only once)
  useEffect(() => {
    if (hasCheckedToken.current) return; // Avoid duplicate runs

    const token = localStorage.getItem("token");
    if (token) {
      const payload = decodeToken(token);
      if (payload?.firstName && payload?.lastName && payload?.email) {
        onLoginSuccess();
      } else {
        localStorage.removeItem("token"); // Clean up invalid token
      }
    }

    hasCheckedToken.current = true; // Mark as processed
  }, [onLoginSuccess]);

  // Validate input (email or phone)
  const validateInput = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10,15}$/;
    return emailRegex.test(input) || phoneRegex.test(input);
  };

  // Handle login submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateInput(emailOrPhone) || !password) {
      setError("Please enter a valid email or phone number and password.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailOrPhone, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid email or password.");
        return;
      }

      // Store token and update state
      localStorage.setItem("token", data.token);
      setSuccess("Login successful!");

      // Decode and extract user data
      const payload = decodeToken(data.token);
      if (payload?.firstName && payload?.lastName && payload?.email) {
        setTimeout(() => {
          onLoginSuccess(payload.firstName, payload.lastName, payload.email);
          onClose();
        }, 1000);
      } else {
        setError("Failed to retrieve user information.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <form className="form" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email or Phone"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="button">Login</button>
        </form>
        <button onClick={onClose} className="close-button">×</button>
      </div>
    </div>
  );
};

export default LoginModal;
