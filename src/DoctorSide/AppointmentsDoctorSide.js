import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAppointments } from "../components/api";
import { findDoctor } from "../components/api";
import bell from "../assets/bell.png";
import user from "../assets/circle-user.png";
import "./DoctorDashboard.css";
import "./AppointmentsDoctorSide.css";

const AppointmentsDoctorSide = () => {
    const location = useLocation();
    const [currentDoctor, setCurrentDoctor] = useState(null);
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const email = localStorage.getItem("email");
    const [loading, setLoading] = useState(true);
    const [doctorList, setDoctorList] = useState([]);


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

    useEffect(() => {
        const fetchData = async () => {
          try {
            const doctorsResponse = await findDoctor();
            const allDoctors = doctorsResponse.data.results;
            setDoctorList(allDoctors);
      
            const matchedDoctor = allDoctors.find((doc) => doc.email === email);
            setCurrentDoctor(matchedDoctor);
          } catch (error) {
            console.error("Failed to fetch doctor data:", error);
          } finally {
            setLoading(false);
          }
        };
      
        fetchData();
      }, [email]); // this now works
      

    return (
        <div className="doctor-dashboard">
            <div className="mp-topbar">
                <div className="ZenCare">
                <h1>ZenCare</h1>
                </div>
                <div className="mp-nav-buttons">
                <button className="top-btn" onClick={() => navigate("/PatientHome")}>
                    Home
                </button>
                <button className='top-btn2' onClick={() => navigate("/find-doctor")}>Find Doctors</button>
                <button className="iconbtn" onClick={() => navigate("/PatientHome")}>
                    <img src={bell} alt="Notifications" width="24" height="24" />
                </button>
                </div>
                <div className="mp-profile">
                <img src={user} alt="Profile" />
                <span className="profile-name">
                    {currentDoctor
                    ? `${currentDoctor.full_name}`
                    : "Loading..."}
                </span>
                </div>
            </div>

      {/* Sidebar */}
        <div className="profile-sidebar">
            <button className="mp-button">Dashboard</button>
            <button
            className={`mp-button ${
                location.pathname === "/MyProfile" ? "active" : ""
            }`}
            onClick={() => navigate("/MyProfile")}
            >
            My Profile
            </button>
            <button className="mp-button" onClick={() => navigate("/appointments-doctor")}>
            Appointments
            </button>
            <button
            className={`mp-button2 ${
                location.pathname === "/MyProfile" ? "active" : ""
            }`}
            onClick={() => navigate("/Login")}
            >
            Log Out
            </button>
        </div>

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
