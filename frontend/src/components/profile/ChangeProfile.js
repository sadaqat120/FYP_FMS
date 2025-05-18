import React, { useState, useEffect } from "react";
import axios from "axios";

const ChangeProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState(""); // <-- added success state

  useEffect(() => {
    const fetchDetails = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const { data } = await axios.get("http://localhost:5000/auth/user", {
            headers: { Authorization: token },
          });
          setFirstName(data.firstName);
          setLastName(data.lastName);
          setEmail(data.email);
          setPhone(data.phone);
        } catch (err) {
          console.error("Fetch failed:", err);
        }
      }
    };
    fetchDetails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg(""); // clear previous success message on new submit

    if (!firstName || !lastName) {
      setError("First and last name are required.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:5000/auth/user",
        { firstName, lastName },
        { headers: { Authorization: token } }
      );
      setSuccessMsg("Profile updated!"); // <-- show success inline
      setTimeout(() => setSuccessMsg(""), 2000); // <-- clear after 2 seconds
    } catch {
      setError("Failed to update.");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4 text-green-700">Edit Profile</h2>

      {/* Inline messages */}
      {error && <p className="text-red-600">{error}</p>}
      {successMsg && <p className="text-green-600">{successMsg}</p>}

      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <input
          className="input input-bordered w-full"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          className="input input-bordered w-full"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          className="input input-bordered w-full bg-gray-100 text-gray-600 cursor-not-allowed"
          value={email}
          disabled
        />
        <input
          className="input input-bordered w-full bg-gray-100 text-gray-600 cursor-not-allowed"
          value={phone}
          disabled
        />
        <button className="btn w-full bg-green-600 text-white hover:bg-green-700">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ChangeProfile;
