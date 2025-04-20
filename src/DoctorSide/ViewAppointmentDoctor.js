import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAppointments, savePrescription } from "../components/api";
import "./DoctorDashboard.css";
import "./AppointmentsDoctorSide.css";
import "./ViewAppointmentDoctor.css";

const ViewAppointmentDoctor = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { appointmentId } = location.state || {};

    const [appointment, setAppointment] = useState(null);
    const [prescription, setPrescription] = useState("");

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
            <aside className="sidebar">
                <div className="logo">ZenCare</div>
                <nav>
                    <button className="nav-btn" onClick={() => navigate("/doc-dash")}>Dashboard</button>
                    <button className="nav-btn" onClick={() => navigate("/appointments-doctor")}>Appointments</button>
                    <button className="nav-btn logout" onClick={() => navigate("/login")}>Log out</button>
                </nav>
            </aside>

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
