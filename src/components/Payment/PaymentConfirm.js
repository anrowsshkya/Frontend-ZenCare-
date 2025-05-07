import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PaymentOption.css';
import doctor from "../../assets/Doctor.jpg";
import bell from "../../assets/bell.png";
import user from "../../assets/circle-user.png";
import './PaymentConfirm.css';


function PaymentConfirm() {
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  const [profileData, setProfileData] = useState({
    first_name: 'Pratik',
    last_name: 'Karki'
  });

  return (
    <div className='payment-option'>
      {/* Top Navigation Bar */}
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

      {/* Payment Container */}
      <div className="payment-Confirm-container">
        <div className="payment-back-button" onClick={() => navigate(-1)}>←</div>
        <h2>Payment Confirmed</h2>
        <p>Your appointment with Dr. [Name] has been sucessfully booked.</p>

        <div className="payment-doctor-card">
          <img src={doctor} alt="Doctor" />
          <div>
            <h3>Dr. [Name]</h3>
            <p>General Physician</p>
            <p>Apr 30, 10:00 AM</p>
            <h6> ✅ Payment done of Rs. 500.</h6>
          </div>
        </div>

        <button className="payment-confirm-button">View Appointment</button>
        <a href="#" onClick={() => navigate("/appointment-details")}>Back to home</a>
      </div>
    </div>
  );
}

export default PaymentConfirm;
