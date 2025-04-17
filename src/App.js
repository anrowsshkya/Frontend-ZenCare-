import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ZenCare from "./HomePage"; // Assuming HomePage is actually ZenCare
import Login from "./components/Signup-Login/Login";
import SignUp from "./components/Signup-Login/SignUp";
import MyProfile from "./components/UserProfile/MyProfile";
import AppointmentForm from "./components/AppointmentForm/AppointmentForm";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ZenCare />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/MyProfile" element={<MyProfile/>}/>
          <Route path="/AppointmentForm" element={<AppointmentForm/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
