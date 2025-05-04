import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./forgot.css";
import verify from "../../assets/verify.png";

const Verify = () => {
  // Hook to navigate between pages
  const navigate = useNavigate();

  // State to store each digit of the 6-digit verification code
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  // Handles changes in the input boxes
  const handleChange = (index, event) => {
    const newCode = [...code];
    newCode[index] = event.target.value;
    setCode(newCode);

    // Automatically move focus to the next input box when a digit is entered
    if (event.target.value && index < 5) {
      document.getElementById(`input-${index + 1}`).focus();
    }
  };

  // Handles submission of the verification code
  const handleSubmit = () => {
    const enteredCode = code.join(""); // Combine all digits into one string
    console.log("Entered Code:", enteredCode); // Simulate verification check
    navigate("/ResetPassword"); // Navigate to the reset password screen
  };

  return (
    <div className="forgot-container">
      <h2 className="f-logo">ZenCare</h2>

      {/* Main box */}
      <div className="forgot-box">
        {/* Verification icon */}
        <div className="forgot-icon-container">
          <img src={verify} alt="Verify Icon" className="forgot-icon" />
        </div>

        {/* Heading and instructions */}
        <h2>Please Verify Your Email</h2>
        <p>Please enter a verification code we sent to your email to complete the process.</p>

        {/* Input boxes for 6-digit verification code */}
        <div style={{ display: "flex", justifyContent: "center", gap: "10px", margin: "15px 0" }}>
          {code.map((digit, index) => (
            <input
              key={index}
              id={`input-${index}`} // ID to target for focus
              type="text"
              maxLength="1" // Allow only one character per box
              value={digit}
              onChange={(event) => handleChange(index, event)} // Update state on change
              style={{
                width: "40px",
                height: "40px",
                textAlign: "center",
                fontSize: "18px"
              }}
            />
          ))}
        </div>

        {/* Submit button */}
        <button className="f-button" onClick={handleSubmit}>Check</button>

        {/* Back navigation link */}
        <p className="back-link" onClick={() => navigate("/ForgotPassword")}>
          &lt; Back to Forgot Password
        </p>
      </div>
    </div>
  );
};

export default Verify;
