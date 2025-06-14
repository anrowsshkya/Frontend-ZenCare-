import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./forgot.css";
import forgot from "../../assets/forgot.png";
import { requestPasswordReset } from "../api";


const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  // const handleNext = () => {
  //   // Basic email validation
  //   if (!email) {
  //     setError("Email is required.");
  //   } else if (!/^\S+@\S+\.\S+$/.test(email)) {
  //     setError("Enter a valid email address.");
  //   } else {
  //     setError("");
  //     navigate("/Verify");
  //   }
  // };

  const handleNext = async () => {
    // Basic email validation
    if (!email) {
      setError("Email is required.");
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Enter a valid email address.");
    } else {
      setError("");

      try {
        await requestPasswordReset(email); // Send the request to backend
        localStorage.setItem("reset_email", email); // store for Verify page if needed
        navigate("/login"); // Go to next step
      } catch (err) {
        setError("Failed to send reset email. Try again later.");
        console.error(err);
      }
    }
  };

  return (
    <div className="forgot-container">
      <h2 className="f-logo">ZenCare</h2>

      <div className="forgot-box-fp">
        <div className="forgot-icon-container-fp">
          <img src={forgot} alt="Forgot Icon" className="forgot-icon-fp" />
        </div>

        <h2>Forgot your Password??</h2>
        <p>Enter your valid email so we can send you a verification code</p>

        <label className="f-label">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {error && <p className="error-message-fp">{error}</p>}

        <button className="f-button" onClick={handleNext}>Next</button>

        <p className="back-link-fp" onClick={() => navigate("/login")}>
          &lt; Back to login
        </p>
      </div>
    </div>

  );
};

export default ForgotPassword;