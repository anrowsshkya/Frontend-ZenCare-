import React from "react";
import { useNavigate } from "react-router-dom";
import "./LabTechDashboard.css";

const LabTechDashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="labtech-dashboard">
            <aside className="sidebar">
                <div className="logo">ZenCare</div>
                <nav>
                    <button className="nav-btn">Dashboard</button>
                    <button className="nav-btn">Lab Reports</button>
                    <button className="nav-btn logout" onClick={() => navigate("/login")}>Log out</button>
                </nav>
            </aside>

            <main className="main-content">
                <div className="welcome-section">
                    <h1>Welcome, Anrows Sakya</h1>
                    <p>You are logged in as a Lab Technician</p>
                </div>

                {/* You can add charts, tables or other components below */}
                <div className="content-placeholder">
                    <p>Lab Dashboard content will go here.</p>
                </div>
            </main>
        </div>
    );
};

export default LabTechDashboard;
