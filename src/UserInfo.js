import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./UserInfo.css";
import { userInfo } from "./components/api";

const UserInfo = ({ onClose }) => {
    const navigate = useNavigate();

    // Initial state for the form fields, matching the API payload
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        phone_number: "",
        phone2: "",
        date_of_birth: "",
        email: "",
        address: "",
        city: "",
        state: "",
        country: "",
        gender: ""
    });

    // Check if it's the first login
    useEffect(() => {
        const userInfoSubmitted = localStorage.getItem("userInfoSubmitted");
        if (userInfoSubmitted === "true") {
            // If the user info has been submitted, navigate directly to the PatientHome page
            navigate("/PatientHome");
        }
    }, [navigate]);

    // Handle input changes and update formData state
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Retrieve the token from localStorage
            const token = localStorage.getItem("access_token");

            // Send formData to the API using the userInfo function
            await userInfo(formData, token);

            // Optionally store in localStorage
            localStorage.setItem("userInfo", JSON.stringify(formData));
            localStorage.setItem("userInfoSubmitted", "true");
            localStorage.removeItem("showUserInfoModal");

            console.log("User Info sent to API:", formData);

            // Close the modal if the onClose callback exists
            if (onClose) {
                onClose(); // Close the modal
            }

            // Navigate to the PatientHome page after closing the modal
            navigate("/PatientHome");

        } catch (error) {
            // Handle errors
            console.error("Error submitting user info:", error);
        }
    };

    return (
        <div className="userinfo-overlay">
            <div className="userinfo-modal">
                <h2>User Information</h2>
                <form onSubmit={handleSubmit}>
                    {/* First Name and Last Name */}
                    <div className="userinfo-row">
                        <input
                            name="first_name"
                            required
                            placeholder="First Name"
                            value={formData.first_name}
                            onChange={handleChange}
                        />
                        <input
                            name="last_name"
                            required
                            placeholder="Last Name"
                            value={formData.last_name}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Phone Numbers */}
                    <div className="userinfo-row">
                        <input
                            name="phone_number"
                            required
                            placeholder="Phone Number"
                            value={formData.phone_number}
                            onChange={handleChange}
                        />
                        <input
                            name="phone2"
                            placeholder="Phone Number 2"
                            value={formData.phone2}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Date of Birth and Email */}
                    <div className="userinfo-row">
                        <input
                            name="date_of_birth"
                            required
                            type="date"
                            value={formData.date_of_birth}
                            onChange={handleChange}
                        />
                        <input
                            name="email"
                            required
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Address */}
                    <input
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                    />

                    {/* City, State, and Country */}
                    <div className="userinfo-row">
                        <input
                            name="city"
                            placeholder="City"
                            value={formData.city}
                            onChange={handleChange}
                        />
                        <input
                            name="state"
                            placeholder="State"
                            value={formData.state}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="userinfo-row">
                        <input
                            name="country"
                            placeholder="Country"
                            value={formData.country}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="userinfo-row">
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                        >
                            <option value="">Select Gender</option>
                            <option value="M">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                            <option value="prefer_not_to_say">Prefer not to say</option>
                        </select>
                    </div>


                    {/* Submit Button */}
                    <button type="submit" className="userinfo-submit-btn">
                        Finish
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UserInfo;
