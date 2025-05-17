import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../DoctorSide/DoctorDashboard.css";
import "../DoctorSide/AppointmentsDoctorSide.css";
import "../DoctorSide/ViewAppointmentDoctor.css";
import { getPrescriptionById, submitLabDescription } from "../components/api";

const LabTechReport = () => {
    const navigate = useNavigate();
    const { id } = useParams(); 
    const [prescriptionData, setPrescriptionData] = useState(null);
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("access_token");

    useEffect(() => {
        const fetchPrescription = async () => {
            try {
                const data = await getPrescriptionById(id, token);
                console.log("Fetched prescription data:", data);
                setPrescriptionData(data);
            } catch (error) {
                console.error("Error fetching prescription:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPrescription();
    }, [id, token]);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async () => {
        try {
            if (!prescriptionData || !file || !description) {
                alert("Please fill all fields and attach a file.");
                return;
            }

            // Get the lab technician's name from localStorage
            const labTechName = "Jane Doe";
            console.log("Lab Technician Name from localStorage:", labTechName);

            const formData = new FormData();
            // Use ID values directly
            formData.append("appointment", prescriptionData.appointment);
            formData.append("patient", prescriptionData.patient);
            formData.append("doctor", prescriptionData.doctor);
            formData.append("description", description);
            formData.append("report_type", "blood_test"); // Adjust if dynamic
            formData.append("report_file", file);
            formData.append("lab_tech_name", labTechName); // Add lab tech name to form data

            for (let [key, value] of formData.entries()) {
                console.log(`${key}:`, value);
            }

            await submitLabDescription(formData, token);
            alert("Report submitted successfully!");
            navigate("/appointments-lab");
        } catch (error) {
            console.error("Failed to submit description and file:", error);
            alert("Submission failed.");
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="doctor-dashboard">
            <aside className="sidebar">
                <div className="logo">ZenCare</div>
                <nav>
                    <button className="nav-btn" onClick={() => navigate("/lab-tech-dash")}>Dashboard</button>
                    <button className="nav-btn" onClick={() => navigate("/appointments-lab")}>Lab Report</button>
                    <button className="nav-btn-logout" onClick={() => navigate("/login")}>Log out</button>
                </nav>
            </aside>

            <main className="main-content">
                <div className="welcome-section">
                    <h1>Appointment Details</h1>
                </div>

                {prescriptionData ? (
                    <div className="patient-record-container">
                        <p><strong>Patient Name:</strong> {prescriptionData.patient_name || "N/A"}</p>
                        <p><strong>Appointment Date:</strong> {prescriptionData.appointment_date || "N/A"}</p>
                        <p><strong>Appointment Time:</strong> {prescriptionData.appointment_time || "N/A"}</p>
                        <p><strong>Visit Reason:</strong> {prescriptionData.symptoms}</p>
                        <p><strong>Prescriptions from Doctor:</strong> {prescriptionData.prescription_text}</p>

                        <div>
                            <label htmlFor="prescription"><strong>Lab Technician's Description</strong></label>
                            <textarea
                                id="prescription"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Write description here..."
                            />
                        </div>

                        <div>
                            <label htmlFor="file"><strong>Upload Lab Report</strong></label>
                            <input type="file" id="file" onChange={handleFileChange} />
                        </div>

                        <div className="button-row">
                            <button className="action-button" onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
                ) : (
                    <p style={{ padding: "1rem" }}>Prescription not found</p>
                )}
            </main>
        </div>
    );
};

export default LabTechReport;
