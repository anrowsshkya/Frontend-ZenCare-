import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { findDoctor } from "../components/api";
import "./DoctorDashboard.css";

const DoctorDashboard = () => {
    const navigate = useNavigate();
    const [doctorList, setDoctorList] = useState([]);
    const [loading, setLoading] = useState(true);

    const email = localStorage.getItem("email");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const doctorsResponse = await findDoctor();
                setDoctorList(doctorsResponse.data.results);
            } catch (error) {
                console.error("Failed to fetch doctor data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <div className="doctor-dashboard">
            <aside className="sidebar">
                <div className="logo">ZenCare</div>
                <nav>
                    <button className="nav-btn">Dashboard</button>
                    <button className="nav-btn" onClick={() => navigate("/appointments-doctor")}>Appointments</button>
                    <button className="nav-btn">Patient Records</button>
                    <button className="nav-btn logout" onClick={handleLogout}>Log out</button>
                </nav>
            </aside>

            <main className="main-content">
                <div className="welcome-section">
                    <h1>Welcome, {doctorList.length > 0 ? `Dr. ${doctorList[0]?.full_name}` : "Doctor"}</h1>
                    <p>You are logged in as <strong>{email}</strong></p> {/* 👈 Show email here */}
                </div>

                <div className="content-section">
                    {loading ? (
                        <p>Loading doctor details...</p>
                    ) : (
                        <div>
                            {doctorList.length > 0 ? (
                                <div className="doctor-details-card">
                                    <h2>Doctor Profile</h2>
                                    <p><strong>Full Name:</strong> {doctorList[0]?.full_name}</p>
                                    <p><strong>Email:</strong> {doctorList[0]?.email}</p>
                                    <p><strong>Phone Number:</strong> {doctorList[0]?.phone_number}</p>
                                    <p><strong>Address:</strong> {doctorList[0]?.address}</p>
                                    <p><strong>Profession:</strong> {doctorList[0]?.profession}</p>
                                    <p><strong>Consultation Fee:</strong> ${doctorList[0]?.consultation_fee}</p>
                                    <p><strong>Experience:</strong> {doctorList[0]?.experience_years} years</p>
                                    <p><strong>Education:</strong> {doctorList[0]?.education}</p>
                                    <p><strong>Training:</strong> {doctorList[0]?.training}</p>
                                    <p><strong>Work Experience:</strong> {doctorList[0]?.work_experience}</p>
                                </div>
                            ) : (
                                <p>Doctor profile not available.</p>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default DoctorDashboard;
