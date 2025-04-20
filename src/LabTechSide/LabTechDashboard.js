import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./LabTechDashboard.css";

const LabTechDashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    console.log("Current location:", location.pathname); // Debugging line

    return (
        <div className="labtech-dashboard">
            <aside className="lb-sidebar">
                <div className="lb-logo">ZenCare</div>
                <nav>
                    <button
                        className={`lb-nav-btn ${location.pathname === "/lab-tech-dash" ? "active" : ""}`}
                        onClick={() => navigate("/lab-tech-dash")}
                    >
                        Dashboard
                    </button>
                    <button
                        className={`lb-nav-btn ${location.pathname === "/appointments-lab" ? "active" : ""}`}
                        onClick={() => navigate("/appointments-lab")}
                    >
                        Lab Reports
                    </button>                    
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
