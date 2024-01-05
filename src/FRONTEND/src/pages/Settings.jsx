import "../App";
import "../App.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

function Settings() {
  const [userInfo, setUserInfo] = useState({
    username: "exampleUser",
    email: "user@example.com",
    firstName: "John",
    lastName: "Doe",
  });

    const userId = "";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/user-profile/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });

      if (response.ok) {
        console.log("User profile updated successfully");
      } else {
        console.error("Failed to update user profile");
      }
    } catch (error) {
      console.error("Error during update:", error);
    }
  };

  return (
    <div className="profile-settings">
      <Header />
      <h1>User Profile Settings</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={userInfo.username}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userInfo.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={userInfo.firstName}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={userInfo.lastName}
            onChange={handleInputChange}
          />
        </div>

        <button className="settings-button" type="submit">
          Save Changes
        </button>
      </form>

      <Link to="/">
        <button className="back-to-menu-button">Back to Main Page</button>
      </Link>
    </div>
  );
}

export default Settings;
