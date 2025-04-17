import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// import google from "../../assets/google.png";
// import doctor from "/photos/about2.jpg";
import "./styles.css";
import { loginUser } from "../api";

const hardcodedUsers = {
  doctor: { email: "doctor@gmail.com", password: "doctor123456789" },
  labtech: { email: "labtech@gmail.com", password: "lab123456789" },
};


const Login = () => {
  // State to hold the email, password input value
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Function to handle login button click
  const handleLogin = async () => {

    // Clear previous errors before starting a new login attempt

    console.log("Login button clicked");

    setError("");


    // Check hardcoded users first
    if (
      email === hardcodedUsers.doctor.email &&
      password === hardcodedUsers.doctor.password
    ) {
      localStorage.setItem("userRole", "doctor");
      alert("Doctor Login Successful!");
      navigate("/doc-dash");
      return;
    }

    if (
      email === hardcodedUsers.labtech.email &&
      password === hardcodedUsers.labtech.password
    ) {
      localStorage.setItem("userRole", "labtech");
      alert("Lab Technician Login Successful!");
      navigate("/lab-tech-dash");
      return;
    }

    try {
      // Send login request with email and password
      const response = await loginUser({ email, password });


      // If login is successful (status 200), store tokens in localStorage

      console.log("Login Response:", response); // Debugging API response


      if (response.status === 200) {
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);

        if (!localStorage.getItem("userInfoSubmitted")) {
          localStorage.setItem("showUserInfoModal", "true");
        }
        navigate("/PatientHome");


        // Show success alert (Note: JSX in alert won't render as HTML)
        alert(<span style={{ color: 'green' }}>Login Successfull!</span>);

        // Redirect the user to the dashboard page
        navigate("/dashboard");

        // console.log("Navigating to PatientHome...");
        // navigate("/PatientHome"); // Redirect to dashboard

      }
    } catch (err) {
      // If something goes wrong, show the error message (from server or default)
      setError(<span style={{ color: 'red' }}>{err.response?.data?.error || "Invalid credentials"}</span>);
    }
    // finally {
    //   console.log("Navigating to PatientHome..."); // Always log this
    //   navigate("/PatientHome"); // Redirect to dashboard
    // }


  };

  return (
    // Main container wrapping the login form and the image section
    <div className="container">
      <div className="login-section">
        <h2>Log in</h2>
        <p>Log in with your data that you entered during registration</p>

        {/* Show error message if any */}
        {error && <p className="error-message">{error}</p>}

        {/* Email input field */}
        <label htmlFor="email">Enter your email address</label>
        <input type="email" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

        {/* Password input field */}
        <label htmlFor="password">Enter your password</label>
        <input type="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

        {/* Link to forgot password page */}
        <Link to="/forgotPassword" className="forgot-password">Forget Password?</Link>

        {/* Button to trigger login */}
        <button className="login-btn" onClick={handleLogin}>Log in</button>

        {/* Google login button (currently commented out) */}
        {/* <button className="google-btn"><img src={google} alt="Google Logo" />Sign in with Google</button> */}

        {/* Navigation link to sign-up page if the user doesn't have an account */}
        <p className="register-text">
          Don't have an account? <a href="/SignUp">Register</a>
        </p>
      </div>

      {/* Right side section with a welcome message and image */}
      <div className="image-section">
        <h3>Nice to see you again</h3>
        <h1>Welcome back</h1>
        <img src="/photos/Doctor.jpg" alt="Login" />
      </div>
    </div>
  );
};

export default Login;
