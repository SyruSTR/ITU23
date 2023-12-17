//Authors: Nikita Vetluzhskikh

import "../App";
import "../App.css";
import React, { useState} from "react";
import {Link} from "react-router-dom";

function Settings() {
    const [userInfo, setUserInfo] = useState({
        username: 'exampleUser',
        email: 'user@example.com',
        firstName: 'John',
        lastName: 'Doe',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({
            ...userInfo,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission, e.g., update user profile data on the server.
        console.log(userInfo);
    };

    return (
        <div className="profile-settings">
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

                <button className="settings-button" type="submit">Save Changes</button>
            </form>
            <Link to="/">Back to Main Page</Link>
        </div>
    );
}

export default Settings;