// import React, { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import "../DoctorSide/DoctorDashboard.css";
// import "../DoctorSide/AppointmentsDoctorSide.css";
// import { getPrescriptionsNeedingLabTests } from "../components/api";

// const AppointmentLab = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const [appointments, setAppointments] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchAppointments = async () => {
//             const token = localStorage.getItem("access_token");
//             if (!token) {
//                 console.error("Access token not found.");
//                 // navigate("/login");
//                 return;
//             }
    
//             try {
//                 const data = await getPrescriptionsNeedingLabTests();
//                 setAppointments(data);
//             } catch (error) {
//                 console.error("Error fetching appointments:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };
    
//         fetchAppointments();
//     }, [navigate]);
    

//     return (
//         <div className="doctor-dashboard">
//             <aside className="sidebar">
//                 <div className="logo">ZenCare</div>
//                 <nav>
//                     <button
//                         className={`nav-btn ${location.pathname === "/lab-tech-dash" ? "active" : ""}`}
//                         onClick={() => navigate("/lab-tech-dash")}
//                     >
//                         Dashboard
//                     </button>
//                     <button
//                         className={`nav-btn ${location.pathname === "/appointments-lab" ? "active" : ""}`}
//                         onClick={() => navigate("/appointments-lab")}
//                     >
//                         Lab Reports
//                     </button>
//                     <button className="nav-btn-logout" onClick={() => navigate("/login")}>
//                         Log out
//                     </button>
//                 </nav>
//             </aside>

//             <main className="main-content">
//                 <div className="welcome-section">
//                     <h1>Prescriptions for Lab Tests</h1>
//                 </div>

//                 <div className="appointments-container">
//                     {loading ? (
//                         <p>Loading prescriptions...</p>
//                     ) : appointments.length === 0 ? (
//                         <p>No prescriptions available for lab tests.</p>
//                     ) : (
//                         <table className="appointments-table">
//                             <thead>
//                                 <tr>
//                                     <th>Patient Name</th>
//                                     <th>Date</th>
//                                     <th>Time</th>
//                                     <th>Action</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {appointments.map((appt) => (
//                                     <tr key={appt.id}>
//                                         <td>{appt.patient_name || appt.name}</td>
//                                         <td>{appt.appointment_date || appt.date}</td>
//                                         <td>{appt.appointment_time || appt.time}</td>
//                                         <td>
//                                             <button
//                                                 className="view-btn"
//                                                 onClick={() => navigate(`/lab-tech-report/${appt.id}`)}
//                                             >
//                                                 View
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     )}
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default AppointmentLab;
