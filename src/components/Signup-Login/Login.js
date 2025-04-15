import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// import google from "../../assets/google.png";
// import doctor from "/photos/about2.jpg";
import "./styles.css";
import { loginUser } from "../api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log("Login button clicked");
    setError("");

    try {
      const response = await loginUser({ email, password });

      console.log("Login Response:", response); // Debugging API response

      if (response.status === 200) {
        // Successful login: store tokens
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);
        alert(<span style={{ color: 'green' }}>Login Successfull!</span>);

        // console.log("Navigating to PatientHome...");
        // navigate("/PatientHome"); // Redirect to dashboard
      }
    } catch (err) {
      // Handle API errors
      setError(<span style={{ color: 'red' }}>{err.response?.data?.error || "Invalid credentials"}</span>);
    }
    // finally {
    //   console.log("Navigating to PatientHome..."); // Always log this
    //   navigate("/PatientHome"); // Redirect to dashboard
    // }

    if (!localStorage.getItem("userInfoSubmitted")) {
      localStorage.setItem("showUserInfoModal", "true");
    }
    navigate("/PatientHome");

  };

  return (
    <div className="container">
      <div className="login-section">
        <h2>Log in</h2>
        <p>Log in with your data that you entered during registration</p>

        {error && <p className="error-message">{error}</p>}

        <label htmlFor="email">Enter your email address</label>
        <input type="email" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label htmlFor="password">Enter your password</label>
        <input type="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <Link to="/forgotPassword" className="forgot-password">Forget Password?</Link>

        {/* Add a navigation toward home page after clicking Log in */}
        <button className="login-btn" onClick={handleLogin}>Log in</button>


        {/* Button to Sign in with google */}
        {/* <button className="google-btn"><img src={google} alt="Google Logo" />Sign in with Google</button> */}


        {/* Will be naviagted to signup  */}
        <p className="register-text">
          Don't have an account? <a href="/SignUp">Register</a>
        </p>
      </div>

      <div className="image-section">
        <h3>Nice to see you again</h3>
        <h1>Welcome back</h1>
        <img src="/photos/Doctor.jpg" alt="Login" />
      </div>
    </div>
  );
};

export default Login;
