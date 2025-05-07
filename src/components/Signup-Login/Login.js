import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./styles.css";
import { loginUser } from "../api";

const hardcodedUsers = {
  doctor: { email: "doctor@gmail.com", password: "doctor123456789" },
  labtech: { email: "labtech@gmail.com", password: "lab123456789" },
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log("Login button clicked");
    setError(""); // Clear previous error

    // Check hardcoded Doctor
    if (
      email === hardcodedUsers.doctor.email &&
      password === hardcodedUsers.doctor.password
    ) {
      localStorage.clear();
      localStorage.setItem("userRole", "doctor");
      alert("Doctor Login Successful!");
      navigate("/doc-dash");
      return;
    }

    // Check hardcoded Lab Tech
    if (
      email === hardcodedUsers.labtech.email &&
      password === hardcodedUsers.labtech.password
    ) {
      localStorage.clear();
      localStorage.setItem("userRole", "labtech");
      localStorage.setItem("email", email);
      alert("Lab Technician Login Successful!");
      navigate("/lab-tech-dash");
      return;
    }

    try {
      const response = await loginUser({ email, password });


      localStorage.setItem("access_token", response.data.access);
      // If login is successful (status 200), store tokens in localStorage

      console.log("Login Response:", response); // Debugging API response


      if (response.status === 200) {
        const data = response.data;

        // Store tokens and user info in localStorage
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
        localStorage.setItem("user_id", data.user_id);
        localStorage.setItem("user_type", data.user_type.toLowerCase());

        // Handle based on user_type
        const userType = data.user_type.toLowerCase();

        if (userType === "doctor") {
          localStorage.setItem("email", email);
          alert("Doctor Login Successful!");
          navigate("/doc-dash");
        } else if (userType === "lab_technician") {
          localStorage.setItem("email", email);
          alert("Lab technician Login Successful!");
          navigate("/lab-tech-dash");
        } else if (userType === "patient") {
          alert("Patient Login Successful!");

          // Profile completion logic
          if (data.is_profile_completed) {
            localStorage.setItem("userInfoSubmitted", "true");
            localStorage.removeItem("showUserInfoModal");
          } else {
            localStorage.setItem("showUserInfoModal", "true");
            localStorage.removeItem("userInfoSubmitted");
          }

          navigate("/PatientHome");
        } else {
          alert("Unknown user type!");
        }
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError(
        <span style={{ color: "red" }}>
          {err.response?.data?.error || "Invalid credentials"}
        </span>
      );
    }


    if (!localStorage.getItem("userInfoSubmitted")) {
      localStorage.setItem("showUserInfoModal", "true");
    }


  };

  return (
    <div className="container">
      <div className="login-section">
        <h2>Log in</h2>
        <p>Log in with your data that you entered during registration</p>

        {error && <p className="error-message">{error}</p>}

        <label htmlFor="email" className="email-label">
          Enter your email address
        </label>
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

        <Link to="/forgotPassword" className="forgot-password">
          Forget Password?
        </Link>

        <button className="login-btn" onClick={handleLogin}>
          Log in
        </button>

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
