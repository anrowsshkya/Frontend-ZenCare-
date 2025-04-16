import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserInfo.css";

const UserInfo = ({ onClose }) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone1: "",
        phone2: "",
        dob: "",
        email: "",
        address: "",
        city: "",
        state: "",
        country: "",
        gender: "Female",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Store user info in localStorage (can be replaced with API later)
            localStorage.setItem("userInfo", JSON.stringify(formData));
            localStorage.setItem("userInfoSubmitted", "true");
            localStorage.removeItem("showUserInfoModal"); // Optional cleanup

            console.log("User Info Stored:", formData);

            // Close modal if handler provided (to update ZenCare state)
            if (onClose) {
                onClose();
            }

            // Navigate to PatientHome
            navigate("/PatientHome");
        } catch (error) {
            console.error("Error submitting user info", error);
        }
    };

    return (
        <div className="userinfo-overlay">
            <div className="userinfo-modal">
                <h2>User Information</h2>
                <form onSubmit={handleSubmit}>
                    <div className="userinfo-row">
                        <input name="firstName" required placeholder="First Name" onChange={handleChange} />
                        <input name="lastName" required placeholder="Last Name" onChange={handleChange} />
                    </div>
                    <div className="userinfo-row">
                        <input name="phone1" required placeholder="Phone Number" onChange={handleChange} />
                        <input name="phone2" placeholder="Phone Number 2" onChange={handleChange} />
                    </div>
                    <div className="userinfo-row">
                        <input name="dob" required type="date" onChange={handleChange} />
                        <input name="email" required type="email" placeholder="Email" onChange={handleChange} />
                    </div>
                    <input name="address" placeholder="Address" onChange={handleChange} />
                    <div className="userinfo-row">
                        <input name="city" placeholder="City" onChange={handleChange} />
                        <input name="state" placeholder="State" onChange={handleChange} />
                    </div>
                    <div className="userinfo-row">
                        <input name="country" placeholder="Country" onChange={handleChange} />
                        <select name="gender" onChange={handleChange}>
                            <option>Female</option>
                            <option>Male</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <button type="submit" className="userinfo-submit-btn">Finish</button>
                </form>
            </div>
        </div>
    );
};

export default UserInfo;
