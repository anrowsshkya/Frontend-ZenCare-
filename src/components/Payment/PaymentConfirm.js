import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PaymentConfirm.css';
import doctor from "../../assets/Doctor.jpg";

function PaymentConfirm() {
  const navigate = useNavigate();

  return (
    <div className='payment-confirm-wrapper'>
      <div className="payment-confirm-container">
        <div className="payment-confirm-back" onClick={() => navigate(-1)}>←</div>
        <h2 className="payment-confirm-title">Payment Confirmed</h2>
        <p className="payment-confirm-message">
          Your appointment with Dr. [Name] has been successfully booked.
        </p>

        <div className="payment-confirm-doctor-card">
          <img src={doctor} alt="Doctor" className="payment-confirm-doctor-image" />
          <div className="payment-confirm-doctor-info">
            <h3>Dr. [Name]</h3>
            <p>General Physician</p>
            <p>Apr 30, 10:00 AM</p>
            <h6 className="payment-confirm-status">✅ Payment done of Rs. 500.</h6>
          </div>
        </div>

        <button className="payment-confirm-button" onClick={() => navigate("/my-appointments")}>
          View Appointment
        </button>
        <button className="payment-confirm-link" onClick={() => navigate("/appointment-details")}>
          Back to home
        </button>
      </div>
    </div>
  );
}

export default PaymentConfirm;
