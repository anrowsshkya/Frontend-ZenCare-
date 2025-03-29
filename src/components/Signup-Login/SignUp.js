import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Redirect after signup
// import google from "../../assets/google.png";
// import doctor1 from "../../assets/doctor1.jpg";
import "./styles.css";
import { registerUser } from "../api"; // Import API function

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
      setError(<span style={{ color: 'red' }}>Password does not match</span>);
      return;
    }

    setLoading(true); // Start loading
    try {
      const response = await registerUser({ email, password, password2: confirmPassword }); // Call API function

      if (response.status === 201) {
        alert(<span style={{ color: 'green' }}>Account created successfully!</span>);
        navigate("/login"); // Redirect to login page
      }
    } catch (err) {
      setError(<span style={{ color: 'red' }}>{err.response?.data?.error || "Registration failed. Try again."}</span>);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="container">
      <div className="signup-section">
        <h2>Sign Up</h2>
        <p id="instructions">Create an account by entering your details</p>

        {error && <p className="error-message">{error}</p>} {/* Display error */}

        <label htmlFor="email">Enter your email</label>
        <input type="email" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label htmlFor="password">Enter your password</label>
        <input type="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <label htmlFor="confirm-password">Confirm your password</label>
        <input type="password" id="confirm-password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

        <button className="signup-btn" onClick={handleSignUp} disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </button>

        {/* To sign up with google */}
        {/* <button className="google-btn"><img src={google} alt="Google Logo" />Sign up with Google</button> */}

        <p className="login-text">
          Already have an account? <a href="/Login">Log in</a>
        </p>
      </div>

      <div className="image-section">
        <h3>Join us today</h3>
        <h1>Welcome Aboard</h1>
        <img src="/photos/about2.jpg" alt="About" className="about-img" />
      </div>
    </div>
  );
};

export default SignUp;
