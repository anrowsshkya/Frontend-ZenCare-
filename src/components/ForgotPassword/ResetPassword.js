import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./forgot.css";
import reset from "../../assets/reset.png";

const ResetPassword = () => {
  const navigate = useNavigate();

  // State to store the new password input
  const [password, setPassword] = useState("");

  // State to store the confirm password input
  const [confirmPassword, setConfirmPassword] = useState("");

  // State to hold any validation or submission error messages
  const [error, setError] = useState("");

  // Function to handle the form submission
  const handleSubmit = () => {
    // Check password length
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    // Check for at least one special character
    if (!/[!@#]/.test(password)) {
      setError("Password must include a special character (@,!,#).");
      return;
    }

    // Ensure both passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // If all checks pass, simulate password reset success
    console.log("Password successfully reset!");

    // Navigate back to the login page
    navigate("/login");
  };

  return (
    <div className="forgot-container">
      <h2 className="logo">ZenCare</h2>

      {/* Main reset box container */}
      <div className="forgot-box">
        {/* Reset password image */}
        <div className="forgot-icon-container">
          <img src={reset} alt="Reset Icon" className="forgot-icon" />
        </div>
        <h2>Reset Password</h2>

        {/* Input fields for password and confirm password */}
        <div className="password-fields">
          <label>Enter new password</label>
          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label>Confirm password</label>
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {/* Display error message if there's any validation issue */}
        {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}

        {/* Button to confirm password reset */}
        <button onClick={handleSubmit}>Confirm</button>
      </div>
    </div>
  );
};

export default ResetPassword;
