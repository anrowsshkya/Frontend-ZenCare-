import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ZenCare from "./HomePage"; // Assuming HomePage is actually ZenCare
import Login from "./components/Signup-Login/Login";
import SignUp from "./components/Signup-Login/SignUp";
import MyProfile from "./components/UserProfile/MyProfile";
import PatientHome from "./PatientHome";
import About from "./About";
import About_Patient from "./About_Patient";
import FindDoctor from "./FindDoctors/FindDoctor";
import DoctorProfile from "./FindDoctors/DoctorProfile";
import PopUp from "./PopUpHomepage/PopUp";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ZenCare />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/MyProfile" element={<MyProfile />} />
          <Route path="/PatientHome" element={<PatientHome />} />
          <Route path="/about" element={<About />} />
          <Route path="/about_patient" element={<About_Patient />} />
          <Route path="/find-doctor" element={<FindDoctor />} />
          <Route path="/doctor/:id" element={<DoctorProfile />} />
          <Route path="/pop-up" element={<PopUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
