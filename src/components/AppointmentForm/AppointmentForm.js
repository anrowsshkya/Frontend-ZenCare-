import React from "react";
import { useNavigate } from "react-router-dom";
import user from "../../assets/circle-user.png";
import "./AppointmentForm.css";

const AppointmentForm = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/");
    };

    return (
      <header className="navbar">
        <h1 className="logo">ZenCare</h1>
  
        <nav className="navigation">
            <a href="#">Home</a>
            <a href="#">Find Doctors</a>
        </nav>
  
        <div className="profile-button">
          <input
              type="image"
              src="/photos/profile_image.png"
              alt="Profile"
              onClick={handleClick}
              style={{ width: '50px', height: 'auto' }}
          />
        </div>
      </header>
            
    );
};

export default AppointmentForm;
