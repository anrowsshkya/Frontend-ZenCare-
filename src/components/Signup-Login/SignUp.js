import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { registerUser } from "../api";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(""); // For error messages
  const [loading, setLoading] = useState(false); // Prevent multiple requests
  const navigate = useNavigate(); // For navigation after signup

  const handleSignUp = async () => {
    setError(""); // Clear previous errors

    if (password !== confirmPassword) {
      setError("Password does not match");
      return;
    }

    setLoading(true); // Start loading
    try {
      const response = await registerUser({
        email,
        password,
        password2: confirmPassword,
        user_type: "patient", // ✅ Required by backend
      });

      if (response.status === 201) {
        console.log("Registration Successful:", response.data);
        navigate("/login"); // Redirect to login page
      }
    } catch (err) {
      const errorData = err.response?.data;
      // Combine multiple field errors if available
      if (typeof errorData === "object") {
        const messages = Object.values(errorData).flat().join(" ");
        setError(messages || "Registration failed. Try again.");
      } else {
        setError("Registration failed. Try again.");
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="container">
      <div className="signup-section">
        <h2>Sign Up</h2>
        <p id="instructions">Create an account by entering your details</p>

        {error && <p className="error-message">{error}</p>}

        <label htmlFor="email">Enter your email</label>
        <input
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Enter your password</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label htmlFor="confirm-password">Confirm your password</label>
        <input
          type="password"
          id="confirm-password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button className="signup-btn" onClick={handleSignUp} disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </button>

        <p className="login-text">
          Already have an account? <a href="/Login">Log in</a>
        </p>
      </div>

      <div className="image-section">
        <h3>Join us today</h3>
        <h1>Welcome Aboard</h1>
        <img src="/photos/doctor1.jpg" alt="signUP" />
      </div>
    </div>
  );
};

export default SignUp;
