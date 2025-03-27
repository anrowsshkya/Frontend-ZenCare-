import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./forgot.css";
import verify from "../../assets/verify.png";

const Verify = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const handleChange = (index, event) => {
    const newCode = [...code];
    newCode[index] = event.target.value;
    setCode(newCode);

    // Move to the next input field automatically
    if (event.target.value && index < 5) {
      document.getElementById(`input-${index + 1}`).focus();
    }
  };

  const handleSubmit = () => {
    const enteredCode = code.join("");
    console.log("Entered Code:", enteredCode);
    navigate("/ResetPassword"); // Navigate to reset password page
  };

  return (
    <div className="forgot-container">
      <h2 className="logo">ZenCare</h2>
      <div className="forgot-box">
        <div className="forgot-icon-container">
          <img src={verify} alt="Verify Icon" className="forgot-icon" />
        </div>
        <h2>Please Verify Your Email</h2>
        <p>Please enter a verification code we sent to your email to complete the process.</p>
        
        <div style={{ display: "flex", justifyContent: "center", gap: "10px", margin: "15px 0" }}>
          {code.map((digit, index) => (
            <input
              key={index}
              id={`input-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(event) => handleChange(index, event)}
              style={{ width: "40px", height: "40px", textAlign: "center", fontSize: "18px" }}
            />
          ))}
        </div>

        <button onClick={handleSubmit}>Check</button>
        <p className="back-link" onClick={() => navigate("/ForgotPassword")}>
          &lt; Back to Forgot Password
        </p>
      </div>
    </div>
  );
};

export default Verify;
