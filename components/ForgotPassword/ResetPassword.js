import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./forgot.css";
import reset from "../../assets/reset.png";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (!/[!@#]/.test(password)) {
      setError("Password must include a special character (@,!,#).");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    console.log("Password successfully reset!");
    navigate("/login");
  };

  return (
    <div className="forgot-container">
      <h2 className="logo">ZenCare</h2>
      <div className="forgot-box">
        <div className="forgot-icon-container">
          <img src={reset} alt="Reset Icon" className="forgot-icon" />
        </div>
        <h2>Reset Password</h2>

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

        {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}

        <button onClick={handleSubmit}>Confirm</button>
      </div>
    </div>
  );
};

export default ResetPassword;
