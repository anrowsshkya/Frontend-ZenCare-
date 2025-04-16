import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import doctorImage from '../../assets/doctor3.jpg';

const LoginOption = () => {
  // Hook to programmatically navigate between routes
  const navigate = useNavigate();

  // Function to handle login based on selected role
  const handleLogin = (role) => {
    // Redirects to the login page with role passed as a query parameter
    navigate(`/login?role=${role}`);
  };

  return (
    <div className="signup-container">
      {/* Left Section - Login role choices */}
      <div className="signup-left">
        <h2>Log In</h2>
        <p>Access your account by selecting your role</p>

        {/* Buttons for logging in with different roles */}
        <button className="button" onClick={() => handleLogin('Doctor')}>Log in as Doctor</button>
        <button className="button" onClick={() => handleLogin('Admin')}>Log in as Admin</button>
        <button className="button" onClick={() => handleLogin('Patient')}>Log in as Patient</button>
        <button className="button" onClick={() => handleLogin('LabTechnician')}>Log in as Lab Technician</button>

        {/* Link to sign-up page if user doesn’t have an account */}
        <p>Don't have an account? <a href="/SignUp">Sign up</a></p>
      </div>

      {/* Right Section - Visuals and welcoming text */}
      <div className="signup-right">
        <h3>Join us today</h3>
        <h2 className="welcome-text">Welcome Back</h2>

        {/* Doctor image on the right side */}
        <img src={doctorImage} alt="Doctor" className="doctor-image" />
      </div>
    </div>
  );
};

export default LoginOption;
