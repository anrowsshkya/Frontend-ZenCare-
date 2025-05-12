import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { findDoctor, getNotifications } from "../components/api"; // imported getNotifications
import bell from "../assets/bell.png";
import user from "../assets/circle-user.png";
import Notification from "../components/Notification/Notification"; // assumed same as MyProfile
import "./DoctorDashboard.css";

const DoctorDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [doctorList, setDoctorList] = useState([]);
  const [currentDoctor, setCurrentDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationsData, setNotificationsData] = useState([]);

  const email = localStorage.getItem("email");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const doctorsResponse = await findDoctor();
        const allDoctors = doctorsResponse.data.results;
        setDoctorList(allDoctors);

        const matchedDoctor = allDoctors.find((doc) => doc.email.toLowerCase() === email.toLowerCase());
        setCurrentDoctor(matchedDoctor);
      } catch (error) {
        console.error("Failed to fetch doctor data:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchNotifications = async () => {
      try {
        const data = await getNotifications();
        setNotificationsData(data.results || []);
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
        setNotificationsData([]);
      }
    };

    fetchData();
    fetchNotifications();
  }, [email]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

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

          <button className="top-btn2" onClick={() => navigate("/find-doctor")}>
            Find Doctors
          </button>
          <button
            className="iconbtn"
            onClick={() => setShowNotification(!showNotification)}
          >
            <img src={bell} alt="Notifications" width="24" height="24" />
          </button>
        </div>
        <div className="mp-profile">
          <img src={user} alt="Profile" />
          <span className="profile-name">
            {currentDoctor ? `${currentDoctor.full_name}` : "Loading..."}
          </span>
        </div>
      </div>

      {/* Notification Overlay */}
      {showNotification && (
        <Notification
          notifications={notificationsData}
          onClose={() => setShowNotification(false)}
        />
      )}

      {/* Sidebar */}
      <div className="profile-sidebar">
        <button className="mp-button">Dashboard</button>
        <button className="mp-button" onClick={() => navigate("/appointments-doctor")}>
          Appointments
        </button>
        <button
          className={`mp-button2 ${location.pathname === "/MyProfile" ? "active" : ""}`}
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>

      <main className="main-content">
        <div className="welcome-section">
          <h1>
            Welcome, {currentDoctor ? `Dr. ${currentDoctor.full_name}` : "Doctor"}
          </h1>
          <p>
            You are logged in as <strong>{email}</strong>
          </p>
        </div>

        <div className="content-section">
          {loading ? (
            <p>Loading doctor details...</p>
          ) : (
            <div>
              {currentDoctor ? (
                <div className="doctor-details-card">
                  <h2>Doctor Profile</h2>
                  <p><strong>Full Name:</strong> {currentDoctor.full_name}</p>
                  <p><strong>Email:</strong> {currentDoctor.email}</p>
                  <p><strong>Phone Number:</strong> {currentDoctor.phone_number}</p>
                  <p><strong>Address:</strong> {currentDoctor.address}</p>
                  <p><strong>Profession:</strong> {currentDoctor.profession}</p>
                  <p><strong>Consultation Fee:</strong> ${currentDoctor.consultation_fee}</p>
                  <p><strong>Experience:</strong> {currentDoctor.experience_years} years</p>
                  <p><strong>Education:</strong> {currentDoctor.education}</p>
                  <p><strong>Training:</strong> {currentDoctor.training}</p>
                  <p><strong>Work Experience:</strong> {currentDoctor.work_experience}</p>
                </div>
              ) : (
                <p>Doctor profile not available.</p>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboard;
