import React, { useState, useEffect } from "react";
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

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [waitingVerification, setWaitingVerification] = useState(false);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    let countdown;
    if (waitingVerification) {
      countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(countdown);
            setWaitingVerification(false);
            setError("Verification timed out. Please try again.");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(countdown);
  }, [waitingVerification]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/signup",
        formData
      );
      if (response.status === 200) {
        setWaitingVerification(true);
        setTimer(60);
      }
    } catch (err) {
      setWaitingVerification(false);
      setTimer(60);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleCodeSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:5000/auth/verify-code", {
        email: formData.email,
        code,
      });

      if (res.status === 201 && res.data.token) {
        localStorage.setItem("token", res.data.token);

        const payload = decodeToken(res.data.token);
        if (payload?.firstName && payload?.email) {
          setSuccess("Sign up successful!");
          setError("");
          setWaitingVerification(false);
          setTimeout(() => {
            onSignUpSuccess();
            onClose();
          }, 1000);
        } else {
          setError("Verification succeeded, but user decoding failed.");
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Verification failed.");
    }
  };

  const decodeToken = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (err) {
      console.error("Invalid token format:", err);
      return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        {waitingVerification ? (
          <>
            <div className="verification-wait-box">
              <h2>🔒 Enter Verification Code</h2>
              <p>
                A 6-digit code has been sent to{" "}
                <strong>{formData.email}</strong>.
              </p>
              <input
                type="text"
                placeholder="Enter Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                maxLength="6"
              />
              <button className="button" onClick={handleCodeSubmit}>
                Verify Code
              </button>
              <p className="timer-text">
                ⏳ Time left: <strong>{timer} seconds</strong>
              </p>
              {success && <p className="success-message">{success}</p>}
              {error && <p className="error-message">{error}</p>}
            </div>
          </>
        ) : (
          <>
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
              <button type="submit" className="button">
                Sign Up
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default SignUpModal;
