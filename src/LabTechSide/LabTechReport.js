// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import "../DoctorSide/DoctorDashboard.css";
// import "../DoctorSide/AppointmentsDoctorSide.css";
// import "../DoctorSide/ViewAppointmentDoctor.css";
// import { getPrescriptionById, submitLabDescription } from "../components/api"; // Ensure these functions exist

// const LabTechReport = () => {
//     const navigate = useNavigate();
//     const { id } = useParams(); // appointment/prescription ID from route
//     const [prescriptionData, setPrescriptionData] = useState(null);
//     const [description, setDescription] = useState("");
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchPrescription = async () => {
//             try {
//                 const data = await getPrescriptionById(id);
//                 setPrescriptionData(data);
//             } catch (error) {
//                 console.error("Error fetching prescription:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchPrescription();
//     }, [id]);

//     const handleSubmit = async () => {
//         try {
//             await submitLabDescription(id, description);
//             alert("Description submitted successfully!");
//             navigate("/appointments-lab");
//         } catch (error) {
//             console.error("Failed to submit description:", error);
//             alert("Submission failed.");
//         }
//     };

//     if (loading) return <p>Loading...</p>;

//     return (
//         <div className="doctor-dashboard">
//             <aside className="sidebar">
//                 <div className="logo">ZenCare</div>
//                 <nav>
//                     <button className="nav-btn" onClick={() => navigate("/lab-tech-dash")}>Dashboard</button>
//                     <button className="nav-btn" onClick={() => navigate("/appointments-lab")}>Lab Report</button>
//                     <button className="nav-btn">Patient Records</button>
//                     <button className="nav-btn-logout" onClick={() => navigate("/login")}>Log out</button>
//                 </nav>
//             </aside>

//             <main className="main-content">
//                 <div className="welcome-section">
//                     <h1>Appointment Details</h1>
//                 </div>

//                 {/* Check if prescription data is available */}
//                 {prescriptionData ? (
//                     <div className="patient-record-container">
//                         <p><strong>Patient Name:</strong> {prescriptionData.patientName}</p>
//                         <p><strong>Age:</strong> {prescriptionData.age}</p>
//                         <p><strong>Blood Type:</strong> {prescriptionData.bloodType}</p>
//                         <p><strong>Appointment Date:</strong> {prescriptionData.date}</p>
//                         <p><strong>Appointment Time:</strong> {prescriptionData.time}</p>
//                         <p><strong>Visit Reason:</strong> {prescriptionData.reason}</p>
//                         <p><strong>Prescriptions from Doctor:</strong> {prescriptionData.doctorPrescription}</p>

//                         <div>
//                             <label htmlFor="prescription"><strong>Lab Technician's Description</strong></label>
//                             <textarea
//                                 id="prescription"
//                                 value={description}
//                                 onChange={(e) => setDescription(e.target.value)}
//                                 placeholder="Write description here..."
//                             ></textarea>
//                         </div>

//                         <div className="button-row">
//                             <button className="action-button" onClick={handleSubmit}>Submit</button>
//                         </div>
//                     </div>
//                 ) : (
//                     <p style={{ padding: "1rem" }}>Prescription not found</p>
//                 )}
//             </main>
//         </div>
//     );
// };

// export default LabTechReport;
