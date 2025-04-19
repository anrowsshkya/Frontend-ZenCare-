import React, { useEffect, useState } from 'react';
import user from "../../assets/circle-user.png";
import user1 from "../../assets/content-user.png";
import { useNavigate } from "react-router-dom";
import './MyProfile.css';
import { userProfile } from "../api";

const MyProfile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);

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


  return (
    <div className='MyProfile'>
      {/* Topbar */}
      <div className='mp-topbar'>
        <div className='ZenCare'><h1>ZenCare</h1></div>
        <div className='nav-buttons'>
          <button className='top-btn' onClick={() => navigate("/PatientHome")}>Home</button>
          <button className='top-btn2' onClick={() => navigate("/find-doctor")}>Find Doctors</button>
        </div>
        <div className='mp-profile'>
          <img src={user} alt='Profile' />
          <span className='profile-name'>
            {profileData ? `${profileData.first_name} ${profileData.last_name}` : 'Loading...'}
          </span>
        </div>
      </div>

      {/* Sidebar */}
      <div className='sidebar'>
        <button className='button'>Dashboard</button>
        <button className='button'>My Profile</button>
        <button className='button'>Appointments</button>
        <button className='button'>Lab Reports</button>
        <button className='button'>Change Password</button>
        <button className='button2' onClick={() => navigate("/login")}>Log Out</button>
      </div>

      {/* Main Content */}
      <div className='main-content'>
        <h2 className='myprofile-title'>My Profile</h2>

        <div className='profile-card'>
          <img src={user1} alt='content-profile' />
          <div className='profile-text'>
            <h3>{profileData ? `${profileData.first_name} ${profileData.last_name}` : 'Loading...'}</h3>
            <p>Email: {profileData?.email || 'Loading...'}</p>
            <p>Phone: {profileData?.phone_number || 'Loading...'}</p>
            <p>Phone (Alt): {profileData?.phone_number_2 || '-'}</p>
          </div>
          {/* <button className='content-button'>Edit</button> */}
        </div>

        <div className='info-section'>
          <h3>Personal Information</h3>
          <div className='info-grid'>
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