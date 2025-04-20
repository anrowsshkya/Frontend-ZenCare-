// src/components/ViewReport.js

import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../api";
import "../../DoctorSide/DoctorDashboard.css";
import "../../DoctorSide/AppointmentsDoctorSide.css";
import "../../DoctorSide/ViewAppointmentDoctor.css";
import user from "../../assets/circle-user.png";

const ViewReport = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [appointments, setAppointments] = useState([]);
  const [profileData] = useState({
    first_name: "Layla",
    last_name: "Smith",
  });

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axiosInstance.get("/patient/reports");
        if (Array.isArray(response.data)) {
          setAppointments(response.data);
        } else {
          console.error("Expected array but got:", response.data);
          setAppointments([]);
        }
      } catch (error) {
        console.error("Error fetching reports:", error);
        setAppointments([]);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="MyProfile">
      {/* Topbar */}
      <div className="mp-topbar">
        <div className="ZenCare">
          <h1>ZenCare</h1>
        </div>
        <div className="mp-nav-buttons">
          <button className="top-btn" onClick={() => navigate("/PatientHome")}>
            Home
          </button>
          <button
            className="top-btn2"
            onClick={() => navigate("/find-doctor")}
          >
            Find Doctors
          </button>
        </div>
        <div className="mp-profile">
          <img src={user} alt="Profile" />
          <span className="profile-name">
            {profileData
              ? `${profileData.first_name} ${profileData.last_name}`
              : "User"}
          </span>
        </div>
      </div>

      {/* Sidebar */}
      <div className="profile-sidebar">
        <button className="mp-button">Dashboard</button>
        <button
          className={`mp-button ${
            location.pathname === "/MyProfile" ? "active" : ""
          }`}
          onClick={() => navigate("/MyProfile")}
        >
          My Profile
        </button>
        <button
          className={`mp-button ${
            location.pathname === "/ViewReport" ? "active" : ""
          }`}
        >
          Lab Reports
        </button>
        <button className="mp-button">Change Password</button>
        <button
          className="mp-button2"
          onClick={() => {
            localStorage.removeItem("access_token");
            navigate("/login");
          }}
        >
          Log Out
        </button>
      </div>

      {/* Content */}
      <main className="sr-main-content">
        <div className="sr-welcome-section">
          <h1>My Lab Reports</h1>
        </div>

        {appointments.length === 0 ? (
          <p style={{ padding: "1rem" }}>No lab reports available.</p>
        ) : (
          <div className="appointments-list">
            {appointments.map((report, index) => (
              <div key={index} className="sr-patient-record-container">
                <p>
                  <strong>Doctor:</strong> {report.doctor_name || "Unknown"}
                </p>
                <p>
                  <strong>Visit Reason:</strong> {report.visit_reason || "N/A"}
                </p>
                <p>
                  <strong>Date:</strong> {report.appointment_date || "N/A"}
                </p>
                <button
                  className="view-btn"
                  onClick={() =>
                    navigate("/ShowReport", { state: { report } })
                  }
                >
                  View Full Report
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ViewReport;
