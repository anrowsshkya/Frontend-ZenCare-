import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ZenCare from "./HomePage"; // Assuming HomePage is actually ZenCare
import Login from "./components/Signup-Login/Login";
import SignUp from "./components/Signup-Login/SignUp";
import PatientHome from "./PatientHome";
import About from "./About"; // ✅ Import About Component
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ZenCare />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/PatientHome" element={<PatientHome />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
