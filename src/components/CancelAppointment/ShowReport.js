import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../DoctorSide/DoctorDashboard.css";
import "../../DoctorSide/AppointmentsDoctorSide.css";
import "../../DoctorSide/ViewAppointmentDoctor.css";
import user from "../../assets/circle-user.png";

const ShowReport = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const appointmentId = location.state?.appointmentId;
    const [profileData, setProfileData] = useState({
        first_name: "Layla",
        last_name: "Smith"
      });

    // Dummy appointment patient data
    const patient = {
        name: "Layla",
        age: 20,
        bloodType: "A+",
        date: "01/04/2025",
        time: "10:00 AM",
        reason: "Chest Pain",
    };

    const [prescription, setPrescription] = useState("");

    return (
        <div className='MyProfile'>
        {/* Topbar */}
        <div className='mp-topbar'>
          <div className='ZenCare'><h1>ZenCare</h1></div>
          <div className='mp-nav-buttons'>
            <button className='top-btn' onClick={() => navigate("/PatientHome")}>Home</button>
            <button className='top-btn2' onClick={() => navigate("/find-doctor")}>Find Doctors</button>
          </div>
          <div className='mp-profile'>
            <img src={user} alt='Profile' />
            <span className='profile-name'>
              {profileData ? `${profileData.first_name} ${profileData.last_name}` : 'User'}
            </span>
          </div>
        </div>
  
        {/* Sidebar */}
        <div className='profile-sidebar'>
          <button className='mp-button'>Dashboard</button>
          <button className={`mp-button ${location.pathname === "/MyProfile" ? "active" : ""}`} onClick={() => navigate("/MyProfile")}>My Profile</button>
          <button className={`mp-button ${location.pathname === "/ViewReport" ? "active" : ""}`} onClick={() => navigate("/ViewReport")}>Reports</button>
          <button className='mp-button'>Lab Reports</button>
          <button className='mp-button'>Change Password</button>
          <button className='mp-button2' onClick={() => {
            localStorage.removeItem('access_token');
            navigate("/login");
          }}>Log Out</button>
        </div>

        {/* The css for below content is in AppointmentsDoctorSide */}
            <main className="sr-main-content">
                <div className="sr-welcome-section">
                    <h1>Appointment Details</h1>
                </div>

                <div className="sr-patient-record-container">
                    <p><strong>Patient Name:</strong> {patient.name}</p>
                    <p><strong>Age:</strong> {patient.age}</p>
                    <p><strong>Blood Type:</strong> {patient.bloodType}</p>
                    <p><strong>Appointment Date:</strong> {patient.date}</p>
                    <p><strong>Appointment Time:</strong> {patient.time}</p>
                    <p><strong>Visit Reason:</strong> {patient.reason}</p>
                    {/* fetch an prescription from doctor */}
                    <p><strong>Prescriptions:</strong> Here goes prescription</p>
                    <p><strong>Description:</strong> Here goes description</p>
                </div>
            </main>
        </div>
    );
};

export default ShowReport;