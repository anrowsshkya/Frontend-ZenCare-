import React, { useEffect, useState } from 'react';
import user from "../../assets/circle-user.png";
import user1 from "../../assets/content-user.png";
import bell from "../../assets/bell.png";
import { useNavigate, useLocation } from "react-router-dom";
import Notification from "../../components/Notification/Notification";
import './MyProfile.css';
import { userProfile } from "../api";

const MyProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('access_token');
      try {
        const response = await userProfile(token);
        setProfileData(response.data);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };
    fetchProfile();
  }, []);

  const notifications = [
    { id: 1, message: "Your appointment for 2025-05-10 at 11:00 AM has been successfully booked." },
    { id: 2, message: "Your appointment for 2025-05-05 at 03:30 PM has been canceled." }
  ];

  return (
    <div className='MyProfile'>
      {/* Topbar */}
      <div className='mp-topbar'>
        <div className='ZenCare'><h1>ZenCare</h1></div>
        <div className='mp-nav-buttons'>
          <button className='top-btn' onClick={() => navigate("/PatientHome")}>Home</button>
          <button className='top-btn2' onClick={() => navigate("/find-doctor")}>Find Doctors</button>
          <button
            onClick={() => setShowNotification(!showNotification)}
            className="da-notification"
            style={{
              backgroundColor: "#E0F2FE",
              cursor: "pointer"
            }}
          >
            <img src={bell} alt="Notifications" width="24" height="24" />
          </button>
        </div>
        <div className='mp-profile'>
          <img src={user} alt='Profile' />
          <span className='profile-name'>
            {profileData ? `${profileData.first_name} ${profileData.last_name}` : 'Loading...'}
          </span>
        </div>
      </div>

      {/* Notification Overlay */}
      {showNotification && (
        <Notification
          notifications={notifications}
          onClose={() => setShowNotification(false)}
        />
      )}

      {/* Sidebar */}
      <div className='profile-sidebar'>
        <button className='mp-button'>Dashboard</button>
        <button className={`mp-button ${location.pathname === "/MyProfile" ? "active" : ""}`} onClick={() => navigate("/MyProfile")}>My Profile</button>
        <button className='mp-button' onClick={() => navigate("/Cancel")}>Appointments</button>
        <button className='mp-button' onClick={() => navigate("/ViewReport")}>Lab Reports</button>
        <button className='mp-button' onClick={() => navigate("/changePassword")}>Change Password</button>
        <button className={`mp-button2 ${location.pathname === "/MyProfile" ? "active" : ""}`} onClick={() => navigate("/Login")}>Log Out</button>
      </div>

      {/* Main Content */}
      <div className='mp-main-content'>
        <h2 className='mp-myprofile-title'>My Profile</h2>

        <div className='mp-profile-card'>
          <img src={user1} alt='mp-content-profile' />
          <div className='mp-profile-text'>
            <h3>{profileData ? `${profileData.first_name} ${profileData.last_name}` : 'Loading...'}</h3>
          </div>
        </div>

        <div className='mp-info-section'>
          <h3>Personal Information</h3>
          <div className='mp-info-grid'>
            <div><strong>Email:</strong> {profileData?.email || 'Loading...'}</div>
            <div><strong>Phone: </strong> {profileData?.phone_number || 'Loading...'}</div>
            <div><strong>Date of Birth:</strong> {profileData?.date_of_birth || '-'}</div>
            <div><strong>Gender:</strong> {profileData?.gender_display || '-'}</div>
            <div><strong>City:</strong> {profileData?.city || '-'}</div>
            <div><strong>State:</strong> {profileData?.state || '-'}</div>
            <div><strong>Region:</strong> {profileData?.country || '-'}</div>
            <div><strong>Address:</strong> {profileData?.address || '-'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
