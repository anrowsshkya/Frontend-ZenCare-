import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { findDoctor } from "../components/api";
import "./DoctorDashboard.css";

const DoctorDashboard = () => {
    const navigate = useNavigate();
    const [doctorList, setDoctorList] = useState([]);
    const [currentDoctor, setCurrentDoctor] = useState(null);
    const [loading, setLoading] = useState(true);

    const email = localStorage.getItem("email");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const doctorsResponse = await findDoctor();
                const allDoctors = doctorsResponse.data.results;
                setDoctorList(allDoctors);

                const matchedDoctor = allDoctors.find(doc => doc.email === email);
                setCurrentDoctor(matchedDoctor);
            } catch (error) {
                console.error("Failed to fetch doctor data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [email]);

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

                    <button className="nav-btn-logout" onClick={() => navigate("/login")}>Log out</button>

                </nav>
            </aside>

            <main className="main-content">
                <div className="welcome-section">
                    <h1>Welcome, {currentDoctor ? `Dr. ${currentDoctor.full_name}` : "Doctor"}</h1>
                    <p>You are logged in as <strong>{email}</strong></p>
                </div>

                <div className="content-section">
                    {loading ? (
                        <p>Loading doctor details...</p>
                    ) : (
                        <div>
                            {currentDoctor ? (
                                <div className="doctor-details-card">
                                    <h2>Doctor Profile</h2>
                                    <p><strong>Full Name:</strong> {currentDoctor.full_name}</p>
                                    <p><strong>Email:</strong> {currentDoctor.email}</p>
                                    <p><strong>Phone Number:</strong> {currentDoctor.phone_number}</p>
                                    <p><strong>Address:</strong> {currentDoctor.address}</p>
                                    <p><strong>Profession:</strong> {currentDoctor.profession}</p>
                                    <p><strong>Consultation Fee:</strong> ${currentDoctor.consultation_fee}</p>
                                    <p><strong>Experience:</strong> {currentDoctor.experience_years} years</p>
                                    <p><strong>Education:</strong> {currentDoctor.education}</p>
                                    <p><strong>Training:</strong> {currentDoctor.training}</p>
                                    <p><strong>Work Experience:</strong> {currentDoctor.work_experience}</p>
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
