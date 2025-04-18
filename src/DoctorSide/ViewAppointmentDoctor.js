import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DoctorDashboard.css";
import "./AppointmentsDoctorSide.css";
import "./ViewAppointmentDoctor.css";

const ViewAppointmentDoctor = () => {
    const navigate = useNavigate();

    // Dummy appointment patient data
    const patient = {
        name: "Layla",
        age: 20,
        bloodType: "A+",
        date: "01/04/2025",
        time: "10:00 AM",
        reason: "Chest Pain",
    };

    const [prescription, setPrescription] = useState("");

    return (
        <div className="doctor-dashboard">
            <aside className="sidebar">
                <div className="logo">ZenCare</div>
                <nav>
                    <button className="nav-btn" onClick={() => navigate("/doc-dash")}>Dashboard</button>
                    <button className="nav-btn" onClick={() => navigate("/appointments-doctor")}>Appointments</button>
                    <button className="nav-btn">Patient Records</button>
                    <button className="nav-btn logout" onClick={() => navigate("/login")}>Log out</button>
                </nav>
            </aside>

            <main className="main-content">
                <div className="welcome-section">
                    <h1>Appointment Details</h1>
                </div>

                <div className="patient-record-container">
                    <p><strong>Patient Name:</strong> {patient.name}</p>
                    <p><strong>Age:</strong> {patient.age}</p>
                    <p><strong>Blood Type:</strong> {patient.bloodType}</p>
                    <p><strong>Appointment Date:</strong> {patient.date}</p>
                    <p><strong>Appointment Time:</strong> {patient.time}</p>
                    <p><strong>Visit Reason:</strong> {patient.reason}</p>

                    <div>
                        <label htmlFor="prescription"><strong>Doctor's Prescriptions</strong></label>
                        <textarea
                            id="prescription"
                            value={prescription}
                            onChange={(e) => setPrescription(e.target.value)}
                            placeholder="Write prescription here..."
                        ></textarea>
                    </div>

                    <div className="button-row">
                        <button className="action-button">Confirm</button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ViewAppointmentDoctor;
