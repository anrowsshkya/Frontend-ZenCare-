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
import TopDoctors from "./TopDoc/TopDoctors";
import DoctorDashboard from "./DoctorSide/DoctorDashboard";
import LabTechDashboard from "./LabTechSide/LabTechDashboard";
// import AdminDashboard from "./AdminSide/AdminDashboard"
import AppointmentsDoctorSide from "./DoctorSide/AppointmentsDoctorSide";
import ViewAppointmentDoctor from "./DoctorSide/ViewAppointmentDoctor";
import AppointmentForm from "./components/AppointmentForms/AppointmentForm";
import Cancel from "./components/CancelAppointment/Cancel";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";

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
          <Route path="/topdoc" element={<TopDoctors />} />
          <Route path="/doc-dash" element={<DoctorDashboard />} />
          <Route path="/lab-tech-dash" element={<LabTechDashboard />} />
          {/* <Route path="/admin-dash" element={<AdminDashboard />} /> */}
          <Route path="/appointments-doctor" element={<AppointmentsDoctorSide />} />
          <Route path="/view-appointment-doctor" element={<ViewAppointmentDoctor />} />
          <Route path="/Form" element={<AppointmentForm />} />
          <Route path="/Cancel" element={<Cancel />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
