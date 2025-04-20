import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../DoctorSide/DoctorDashboard.css";
import "../DoctorSide/AppointmentsDoctorSide.css";
import { getPrescriptionsNeedingLabTests } from "../components/api"; // Fixed path

const AppointmentsLab = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true); // To track loading state

    // Fetch appointments from API
    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const data = await getPrescriptionsNeedingLabTests();
                setAppointments(data);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            } finally {
                setLoading(false); // Set loading to false once the data is fetched
            }
        };

        fetchAppointments();
    }, []);

    return (
        <div className="doctor-dashboard">
            <aside className="sidebar">
                <div className="logo">ZenCare</div>
                <nav>
                <button
                        className={`nav-btn ${location.pathname === "/lab-tech-dash" ? "active" : ""}`}
                        onClick={() => navigate("/lab-tech-dash")}
                    >
                        Dashboard
                    </button>
                    <button
                        className={`nav-btn ${location.pathname === "/appointments-lab" ? "active" : ""}`}
                        onClick={() => navigate("/appointments-lab")}
                    >
                        Lab Reports
                    </button>
                    <button className="nav-btn-logout" onClick={() => navigate("/login")}>Log out</button>
                </nav>
            </aside>

            <main className="main-content">
                <div className="welcome-section">
                    <h1>Appointments</h1>
                </div>

                <div className="appointments-container">
                    {loading ? (
                        <p>Loading appointments...</p> // Show loading text while fetching data
                    ) : appointments.length === 0 ? (
                        <p>No appointments available.</p> // Show when no data is fetched
                    ) : (
                        <table className="appointments-table">
                            <thead>
                                <tr>
                                    <th>Patient's Name</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments.map((appt, index) => (
                                    <tr key={index}>
                                        <td>{appt.name}</td>
                                        <td>{appt.date}</td>
                                        <td>{appt.time}</td>
                                        <td>
                                            <span
                                                className="status confirmed"
                                                onClick={() => navigate(`/lab-tech-report/${appt.id}`)}
                                                style={{ cursor: "pointer" }}
                                            >
                                                view
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AppointmentsLab;
