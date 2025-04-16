import React from "react";
import { useNavigate } from "react-router-dom";
import "./forgot.css";
import forgot from "../../assets/forgot.png";
import Verify from "./Verify";

const ForgotPassword = () => {
  // Hook to navigate between routes programmatically
  const navigate = useNavigate();

  return (
    <div className="forgot-container">
      <h2 className="logo">ZenCare</h2>

      {/* Main box that contains the forgot password form */}
      <div className="forgot-box">
        <div className="forgot-icon-container">
          <img src={forgot} alt="Forgot Icon" className="forgot-icon" />
        </div>

        <h2>Forgot your Password??</h2>
        <p>Enter your valid email so we can send you a verification code</p>

        <label>Email</label>
        <input type="email" placeholder="Enter your email" />

        {/* Button to proceed to the verification step */}
        <button onClick={() => navigate("/Verify")}>Next</button>

        {/* Link to go back to the login page */}
        <p className="back-link" onClick={() => navigate("/login")}>
          &lt; Back to login
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
