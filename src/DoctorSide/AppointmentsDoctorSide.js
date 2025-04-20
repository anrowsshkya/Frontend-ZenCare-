import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAppointments } from "../components/api";
import "./DoctorDashboard.css";
import "./AppointmentsDoctorSide.css";

const AppointmentsDoctorSide = () => {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const token = localStorage.getItem("access_token");
                const data = await getAppointments(token);

                // Optional: Format data based on actual response structure
                const formattedAppointments = data.map(appt => ({
                    id: appt.id, // <-- add this
                    name: appt.patient_name,
                    date: appt.appointment_date,
                    time: appt.appointment_time,
                    status: "View",
                }));

                setAppointments(formattedAppointments);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            }
        };

        fetchAppointments();
    }, []);

    return (
        <div className="doctor-dashboard">
            <aside className="sidebar">
                <div className="logo">ZenCare</div>
                <nav>
                    <button className="nav-btn" onClick={() => navigate("/doc-dash")}>Dashboard</button>
                    <button className="nav-btn">Appointments</button>
                    <button className="nav-btn logout" onClick={() => navigate("/login")}>Log out</button>
                </nav>
            </aside>

            <main className="main-content">
                <div className="welcome-section">
                    <h1>Appointments</h1>
                </div>

                <div className="appointments-container">
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
                                            onClick={() =>
                                                navigate("/view-appointment-doctor", {
                                                    state: { appointmentId: appt.id }
                                                })
                                            }

                                        >
                                            {appt.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default AppointmentsDoctorSide;
