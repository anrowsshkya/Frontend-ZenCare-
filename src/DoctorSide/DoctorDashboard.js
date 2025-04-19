import React from "react";
import { useNavigate } from "react-router-dom";

import "./DoctorDashboard.css";

const DoctorDashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="doctor-dashboard">
            <aside className="sidebar">
                <div className="logo">ZenCare</div>
                <nav>
                    <button className="nav-btn">Dashboard</button>
                    <button className="nav-btn" onClick={() => navigate("/appointments-doctor")}>Appointments</button>
                    <button className="nav-btn">Patient Records</button>
                    <button className="nav-btn-logout" onClick={() => navigate("/login")}>Log out</button>
                </nav>
            </aside>

            <main className="main-content">
                <div className="welcome-section">
                    <h1>Welcome, Dr. Anrows Sakya</h1>
                    <p>You are logged in as a Doctor</p>
                </div>

                {/* You can add charts, tables or other components below */}
                <div className="content-placeholder">
                    <p>Doctor Dashboard content will go here.</p>
                </div>
            </main>
        </div>
    );
};

export default DoctorDashboard;
