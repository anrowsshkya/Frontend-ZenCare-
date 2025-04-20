import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./forgot.css";
import forgot from "../../assets/forgot.png";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleNext = () => {
    // Basic email validation
    if (!email) {
      setError("Email is required.");
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Enter a valid email address.");
    } else {
      setError("");
      navigate("/Verify");
    }
  };

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
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {error && <p className="error-message">{error}</p>}

        <button onClick={handleNext}>Next</button>

        <p className="back-link" onClick={() => navigate("/login")}>
          &lt; Back to login
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;