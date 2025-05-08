import React, { useEffect, useState } from 'react';
import user from "../../assets/circle-user.png";
import { useNavigate, useLocation } from "react-router-dom";
import { userProfile, getAppointments } from "../api";
import '../UserProfile/MyProfile.css';
import './Cancel.css';
import axios from 'axios';

const Cancel = () => {
  const API_BASE_URL = "https://zencare-backend-2.onrender.com/api/v1";
  const location = useLocation();
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showPopup, setShowPopup] = useState(false);
  const [selectedApptId, setSelectedApptId] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // success popup state

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

  const confirmCancel = (id) => {
    setSelectedApptId(id);
    setShowPopup(true);
  };

  const handleConfirmDelete = async () => {
    const token = localStorage.getItem('access_token');
    if (!token || !selectedApptId) return;

    try {
      await axios.delete(`${API_BASE_URL}/appointment/${selectedApptId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAppointments((prev) => prev.filter((appt) => appt.id !== selectedApptId));
      setShowPopup(false);
      setSelectedApptId(null);
      setShowSuccessPopup(true); // show success popup
      setTimeout(() => {
        setShowSuccessPopup(false);
      }, 2500);
    } catch (error) {
      console.error("Failed to delete appointment:", error);
      alert("Could not cancel the appointment.");
      setShowPopup(false);
    }
  };

  if (loading) return (
    <div style={{
      textAlign: 'center',
      marginTop: '50px',
      fontSize: '18px',
      color: '#333',
    }}>
      Loading...
    </div>
  );

  if (error) return (
    <div style={{
      color: 'red',
      textAlign: 'center',
      fontWeight: 'bold',
      marginTop: '30px',
      fontSize: '18px',
    }}>
      {error}
    </div>
  );

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
        <button className={`mp-button ${location.pathname === "/ViewReport" ? "active" : ""}`} onClick={() => navigate("/ViewReport")}>Lab Reports</button>
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
        </div>

        {Array.isArray(appointments) && appointments.length > 0 ? (
          appointments.map((appt) => (
            <div key={appt.id} className="appointment-row">
              <p>{appt.doctor_name || "Dr. Unknown"}</p>
              <p>{appt.appointment_date}</p>
              <p>{appt.appointment_time}</p>
              <p>
                <button className="delete-icon" onClick={() => confirmCancel(appt.id)}>Cancel</button>
              </p>
            </div>
          ))
        ) : (
          <p>No appointments booked yet.</p>
        )}
      </div>

      {/* Cancel Confirmation Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Are you sure you want to cancel this appointment?</h3>
            <div className="popup-actions">
              <button className="popup-confirm" onClick={handleConfirmDelete}>Yes, Cancel</button>
              <button className="popup-cancel" onClick={() => setShowPopup(false)}>No, Go Back</button>
            </div>
          </div>
        </div>
      )}

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="success-popup-overlay">
          <div className="success-popup-content">
            <h3>Appointment cancelled successfully!</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cancel;
