import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ChangeProfile.css";

const ChangeProfile = ({ onProfileUpdated }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get("http://localhost:5000/auth/user", {
            headers: {
              Authorization: token,
            },
          });
          const { firstName, lastName, email, phone } = response.data;
          setFirstName(firstName);
          setLastName(lastName);
          setEmail(email);
          setPhone(phone);
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    };

    fetchUserDetails();
  }, []);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10,15}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate fields
    if (!firstName || !lastName || !email || !phone) {
      setError("All fields are required.");
      return;
    }
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!phoneRegex.test(phone)) {
      setError("Phone number must be between 10 to 15 digits.");
      return;
    }

    // Update user details
    const token = localStorage.getItem("token");
    try {
      await axios.put("http://localhost:5000/auth/user", {
        firstName,
        lastName,
        email,
        phone,
      }, {
        headers: {
          Authorization: token,
        },
      });
      alert("Profile updated successfully!");
      // onProfileUpdated(); // Call the function to refresh the profile page
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="change-profile">
      <h2>Edit Profile</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default ChangeProfile;
