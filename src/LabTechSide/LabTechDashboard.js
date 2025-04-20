import React from "react";
import { useNavigate } from "react-router-dom";
import "./LabTechDashboard.css";

const LabTechDashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="labtech-dashboard">
            <aside className="lb-sidebar">
                <div className="lb-logo">ZenCare</div>
                <nav>
                    <button className="lb-nav-btn">Dashboard</button>
                    <button className="lb-nav-btn" onClick={() => navigate("/appointments-lab")}>Lab Reports</button>
                    <button className="lb-nav-btn">Patient Records</button>
                    <button className="lb-nav-btn-logout" onClick={() => navigate("/login")}>Log out</button>
                </nav>
            </aside>

            <main className="lb-main-content">
                <div className="lb-welcome-section">
                    <h1>Welcome, Anrows Sakya</h1>
                    <p>You are logged in as a Lab Technician</p>
                </div>

                {/* You can add charts, tables or other components below */}
                <div className="lb-content-placeholder">
                    <p>Lab Dashboard content will go here.</p>
                </div>
            </main>
        </div>
    );
};

export default LabTechDashboard;
