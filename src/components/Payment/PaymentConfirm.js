import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './PaymentConfirm.css';
import doctorImage from "../../assets/Doctor.jpg"; // Default image if no doctor image is passed

function PaymentConfirm() {
  const navigate = useNavigate();
  const location = useLocation();

  const { paymentData } = location.state || {};
  const {
    doctorName = '[Name]',
    appointmentDate = '[Date]',
    appointmentSlot = '[Time]',
    amount = '[Amount]',
    doctorImageUrl = null
  } = paymentData || {};

  return (
    <div className='payment-confirm-wrapper'>
      <div className="payment-confirm-container">
        <div className="payment-confirm-back" onClick={() => navigate(-1)}>←</div>
        <h2 className="payment-confirm-title">Payment Confirmed</h2>
        <p className="payment-confirm-message">
          Your appointment with Dr. {doctorName} has been successfully booked.
        </p>

        <div className="payment-confirm-doctor-card">
          <img
            src={doctorImageUrl || doctorImage}
            alt="Doctor"
            className="payment-confirm-doctor-image"
          />
          <div className="payment-confirm-doctor-info">
            <h3>{doctorName}</h3>
            {/* <p>General Physician</p> */}
            <p>{appointmentDate}, {appointmentSlot}</p>
            <h6 className="payment-confirm-status">✅ Payment done of Rs. {amount}.</h6>
          </div>
        </div>

        <button className="payment-confirm-button" onClick={() => navigate("/Cancel")}>
          View Appointment
        </button>
        <button className="payment-confirm-link" onClick={() => navigate("/PatientHome")}>
          Back to home
        </button>
      </div>
    </div>
  );
}

export default PaymentConfirm;
