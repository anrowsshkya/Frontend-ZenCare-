import React from 'react';
import user from "../../assets/circle-user.png";
import user1 from "../../assets/content-user.png";
import './MyProfile.css';

const MyProfile = () => {
  return (
    <div className='MyProfile'>
      
      {/* Top Navigation Bar */}
      <div className='mp-topbar'>
        {/* Brand Name */}
        <div className='ZenCare'><h1>ZenCare</h1></div>

        {/* Navigation Buttons */}
        <button className='top-btn'>Find Doctors</button>
        <button className='top-btn2'>Book Appointment</button>

        {/* User Profile Icon and Name */}
        <div className='mp-profile'>
          <img src={user} alt='Profile'/>
          <span className='profile-name'>Pratik Karki</span>
        </div>
      </div>

      {/* Sidebar Menu */}
      <div className='sidebar'>
        <button className='button'>Dashboard</button>
        <button className='button'>My Profile</button>
        <button className='button'>Appointments</button>
        <button className='button'>Lab Reports</button>
        <button className='button'>Change Password</button>
        <button className='button2'>Log Out</button>
      </div>

      {/* Main Profile Content Area */}
      <div className='bdy-container'>

        {/* Title */}
        <span className='myprofile'>My Profile</span>

        {/* Profile Picture and Name Section */}
        <div className='content-user'>
          <img src={user1} alt='content-profile'></img>
          <span className='content-name'>Name</span>
          <span className='content-name'>Pratik Karki</span>
          <button className='content-button'>Edit</button>
        </div>

        {/* Personal Information Section */}
        <div className='bdy2-container'>
          <span className='persona-info'>Personal Information</span>

          {/* User Info */}
          <div className='user-info'>
            <h3>Email:</h3><span>Karkipratik063@gmail.com</span>
            <h3>Phone Number:</h3><span>+977 9823077575</span>
            <h3>Address:</h3><span>Kageshwori Manohara-08</span>
            <h3>Region:</h3><span>Nepal</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
