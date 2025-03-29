import React from "react";
import { useNavigate } from "react-router-dom";
import "./forgot.css";
import forgot from "../../assets/forgot.png";
import Verify from "./Verify";

const ForgotPassword = () => {
  const navigate = useNavigate();

  return (
    <div className="forgot-container">
      <h2 className="logo">ZenCare</h2>
      <div className="forgot-box">
        <div className="forgot-icon-container">
          <img src={forgot} alt="Forgot Icon" className="forgot-icon" />
        </div>
        <h2>Forgot your Password??</h2>
        <p>Enter your valid email so we can send you a verification code</p>
        <label>Email</label>
        <input type="email" placeholder="Enter your email" />
        <button onClick={() => navigate("/Verify")}>Next</button>
        <p className="back-link" onClick={() => navigate("/login")}>
          &lt; Back to login
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
