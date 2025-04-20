import React, { useEffect, useState } from 'react';
import user from "../../assets/circle-user.png";
import { useNavigate, useLocation } from "react-router-dom";
import '../UserProfile/MyProfile.css';
import './Cancel.css'; // reuse same styling

const ViewReport = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    first_name: "Layla",
    last_name: "Smith"
  });

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctor_name: "Dr. Ayesha Khan",
      appointment_date: "2025-04-15",
      appointment_time: "10:00 AM",
    },
    {
      id: 2,
      doctor_name: "Dr. Ravi Mehra",
      appointment_date: "2025-04-18",
      appointment_time: "2:00 PM",
    }
  ]);

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

      {/* Main Content */}
      <div className='mp-main-content'>
        <h2 className='mp-myprofile-title'>Lab Reports</h2>

        <div className="appointment-header">
          <div>Doctor</div>
          <div>Date</div>
          <div>Time</div>
        </div>

        {appointments.map((appt) => (
          <div key={appt.id} className="appointment-row">
            <p>{appt.doctor_name}</p>
            <p>{appt.appointment_date}</p>
            <p>{appt.appointment_time}</p>
            <p>
              <button className="view-icon" onClick={() => navigate("/ShowReport", {
                state: { appointmentId: appt.id }
              })}>View</button>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewReport;
