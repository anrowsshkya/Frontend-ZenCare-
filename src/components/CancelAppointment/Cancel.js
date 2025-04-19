import React, { useEffect, useState } from 'react';
import user from "../../assets/circle-user.png";
import { useNavigate, useLocation } from "react-router-dom";
import { userProfile, getAppointments } from "../api";
import '../UserProfile/MyProfile.css';
import './Cancel.css';
import axios from 'axios';

const Cancel = () => {
  const API_BASE_URL = "https://zencare-backend-2.onrender.com";
  const location = useLocation();
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setError("You are not logged in.");
        setLoading(false);
        return;
      }

      try {
        const profileRes = await userProfile(token);
        setProfileData(profileRes.data);

        const appointmentsData = await getAppointments(token);
        console.log("Fetched appointments:", appointmentsData);

        // Check if the data is an array or an object
        if (Array.isArray(appointmentsData)) {
          setAppointments(appointmentsData);
        } else if (appointmentsData && appointmentsData.results) {
          setAppointments(appointmentsData.results);
        } else {
          setAppointments([]);
        }

        setError(null);
      } catch (err) {
        console.error("Error loading data:", err);
        setError("Failed to load appointments.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('access_token');
    if (!token) return;

    if (!window.confirm("Are you sure you want to cancel this appointment?")) return;

    try {
      await axios.delete(`${API_BASE_URL}/appointment/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAppointments((prev) => prev.filter((appt) => appt.id !== id));
      alert("Appointment cancelled.");
    } catch (error) {
      console.error("Failed to delete appointment:", error);
      alert("Could not cancel the appointment.");
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

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
        <button className={`mp-button ${location.pathname === "/Cancel" ? "active" : ""}`} onClick={() => navigate("/Cancel")}>Appointments</button>
        <button className='mp-button'>Lab Reports</button>
        <button className='mp-button'>Change Password</button>
        <button className='mp-button2' onClick={() => {
          localStorage.removeItem('access_token');
          navigate("/login");
        }}>Log Out</button>
      </div>

      {/* Main Content */}
      <div className='mp-main-content'>
        <h2 className='mp-myprofile-title'>Appointments</h2>

        <div className="appointment-header">
          <div>Doctor</div>
          <div>Date</div>
          <div>Time</div>
          {/* <div>Action</div> */}
        </div>

        {Array.isArray(appointments) && appointments.length > 0 ? (
          appointments.map((appt) => (
            <div key={appt.id} className="appointment-row">
              <p>{appt.doctor_name || "Dr. Unknown"}</p>
              <p>{appt.appointment_date}</p>
              <p>{appt.appointment_time}</p>
              <p>
                <button className="delete-icon" onClick={() => handleDelete(appt.id)}>Cancel</button>
              </p>
            </div>
          ))
        ) : (
          <p>No appointments booked yet.</p>
        )}
      </div>
    </div>
  );
};

export default Cancel;
