import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PaymentOption.css';
import doctor from "../../assets/Doctor.jpg";
import bell from "../../assets/bell.png";
import user from "../../assets/circle-user.png";
import esewa from "../../assets/esewa.png";
import khalti from "../../assets/khalti.png";

function PaymentOption() {
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
      <div className="payment-container">
        <div className="payment-back-button" onClick={() => navigate(-1)}>←</div>
        <h2>Select Payment Method</h2>
        <p>Complete your appointment with Dr. [Name]</p>

        <div className="payment-doctor-card">
          <img src={doctor} alt="Doctor" />
          <div>
            <h3>Dr. [Name]</h3>
            <p>General Physician</p>
            <p>Apr 30, 10:00 AM</p>
          </div>
          <div>₹ 500</div>
        </div>

        <div className="payment-options">
          <label><input type="radio" name="method" defaultChecked /> Esewa <img src={esewa} alt='esewa' style={{height: "34px", width:"34px"}}/></label>
          <label><input type="radio" name="method" /> Khalti <img src={khalti} alt='khalti' style={{height: "34px", width:"34px"}}/></label>
          {/* <label><input type="radio" name="method" /> FonePay</label> */}
        </div>

        {/* <div className="promo">
          <input type="text" placeholder="Enter promo code" />
          <button>Apply</button>
        </div> */}

        <div className="summary">
          <p>Consult Fee</p>
          <p>₹500</p>
        </div>
        <div className="summary total">
          <p>Total</p>
          <p>₹450</p>
        </div>

        <button className="payment-proceed-button">Proceed to Pay</button>
        <a href="#" onClick={() => navigate("/appointment-details")}>Back to Appointment Details</a>
      </div>
    </div>
  );
}

export default PaymentOption;
