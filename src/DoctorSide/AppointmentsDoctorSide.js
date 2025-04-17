import React, { useEffect, useState } from "react";
import "./DoctorDashboard.css";
import "./AppointmentsDoctorSide.css";

const AppointmentsDoctorSide = () => {
    // Placeholder for appointment data
    const [appointments, setAppointments] = useState([]);

    // ---------------------------
    // when API is ready:
    /*
    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await fetch("YOUR_API_ENDPOINT_HERE");
                const data = await response.json();
                setAppointments(data); // Adjust based on your API response structure
            } catch (error) {
                console.error("Error fetching appointments:", error);
            }
        };

        fetchAppointments();
    }, []);
    */
    // ---------------------------

    //Temporarily using hardcoded data for now:
    const dummyAppointments = [
        { name: "Sarada Pandey", date: "01/04/2025", time: "10:00 AM", status: "Confirmed" },
        { name: "Arpan Ghale", date: "01/09/2025", time: "1:30 PM", status: "Confirmed" },
        { name: "Aryan Adhikari", date: "12/04/2024", time: "3:00 PM", status: "Confirmed" },
        { name: "Divya Giri", date: "06/07/2023", time: "5 PM", status: "Confirmed" },
    ];

    //Comment out the below line once API is connected
    const displayData = appointments.length > 0 ? appointments : dummyAppointments;

    return (
        <div className="doctor-dashboard">
            <aside className="sidebar">
                <div className="logo">ZenCare</div>
                <nav>
                    <button className="nav-btn">Dashboard</button>
                    <button className="nav-btn">Appointments</button>
                    <button className="nav-btn">Patient Records</button>
                    <button className="nav-btn logout">Log out</button>
                </nav>
            </aside>

            <main className="main-content">
                <div className="welcome-section">
                    <h1>Appointments</h1>
                </div>

                <div className="appointments-container">
                    {/* <div className="search-bar">
                        <input type="text" placeholder="Search" />
                    </div> */}

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
                            {displayData.map((appt, index) => (
                                <tr key={index}>
                                    <td>{appt.name}</td>
                                    <td>{appt.date}</td>
                                    <td>{appt.time}</td>
                                    <td>
                                        <span className="status confirmed">{appt.status}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main >
        </div >
    );
};

export default AppointmentsDoctorSide;
