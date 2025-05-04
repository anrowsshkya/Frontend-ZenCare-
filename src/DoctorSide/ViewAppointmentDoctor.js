import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAppointments, savePrescription } from "../components/api";
import { findDoctor } from "../components/api";
import bell from "../assets/bell.png";
import user from "../assets/circle-user.png";
import "./DoctorDashboard.css";
import "./AppointmentsDoctorSide.css";
import "./ViewAppointmentDoctor.css";

const ViewAppointmentDoctor = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { appointmentId } = location.state || {};
    const [loading, setLoading] = useState(true);
    const [doctorList, setDoctorList] = useState([]);
    const email = localStorage.getItem("email");
    const [appointment, setAppointment] = useState(null);
    const [prescription, setPrescription] = useState("");
    const [currentDoctor, setCurrentDoctor] = useState(null);

    useEffect(() => {
        const fetchAppointment = async () => {
            try {
                const token = localStorage.getItem("access_token");
                const appointments = await getAppointments(token);
                const selectedAppointment = appointments.find(appt => appt.id === appointmentId);
                setAppointment(selectedAppointment);

                // Optional: Save locally for logging or printing later
                localStorage.setItem("lastViewedAppointment", JSON.stringify(selectedAppointment));
            } catch (error) {
                console.error("Error fetching appointment details:", error);
            }
        };

        if (appointmentId) {
            fetchAppointment();
        }
    }, [appointmentId]);

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
      }, [email]);        

    const handleConfirm = async () => {
        if (!prescription.trim()) {
            alert("Please write a prescription before submitting.");
            return;
        }

        try {
            const dataToSend = {
                appointment: appointmentId,
                prescription_text: prescription,

                patient_name: appointment.patient_name,
                doctor_name: appointment.doctor_name,
                doctor_profession: appointment.doctor_profession,
                appointment_date: appointment.appointment_date,
                appointment_time: appointment.appointment_time,
                symptoms: appointment.symptoms,
            };

            console.log("Submitting Prescription Data:", dataToSend);

            await savePrescription(dataToSend);
            alert("Prescription successfully saved!");
            navigate("/appointments-doctor");
        } catch (error) {
            alert("Failed to save prescription. Try again.");
            console.error("Prescription save failed:", error);
        }
    };

    if (!appointment) {
        return <div style={{ padding: "2rem", color: "#1D4189" }}>Loading appointment details...</div>;
    }

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
                    <h1>Appointment Details</h1>
                </div>

                <div className="patient-record-container">
                    <p><strong>Patient Name:</strong> {appointment.patient_name}</p>
                    <p><strong>Doctor Name:</strong> {appointment.doctor_name}</p>
                    <p><strong>Doctor Profession:</strong> {appointment.doctor_profession}</p>
                    <p><strong>Appointment Date:</strong> {appointment.appointment_date}</p>
                    <p><strong>Appointment Time:</strong> {appointment.appointment_time}</p>
                    <p><strong>Symptoms:</strong> {appointment.symptoms}</p>

                    <div className="prescription-section">
                        <label htmlFor="prescription"><strong>Doctor's Prescription</strong></label>
                        <textarea
                            id="prescription"
                            value={prescription}
                            onChange={(e) => setPrescription(e.target.value)}
                            placeholder="Write prescription here..."
                        ></textarea>
                    </div>

                    <div className="button-row">
                        <button className="action-button" onClick={handleConfirm}>
                            Confirm
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ViewAppointmentDoctor;
