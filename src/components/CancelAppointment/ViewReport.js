import React, { useEffect, useState } from "react";
import user from "../../assets/circle-user.png";
import { useNavigate, useLocation } from "react-router-dom";
import "../UserProfile/MyProfile.css";
import "./Cancel.css";
import { getPrescriptionsNeedingLabTests } from "../api";

const ViewReport = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [profileData] = useState({
    first_name: "Layla",
    last_name: "Smith",
  });

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        console.error("Access token not found.");
        return;
      }

      try {
        const data = await getPrescriptionsNeedingLabTests();
        console.log("Fetched prescriptions data:", data);

        if (Array.isArray(data)) {
          setAppointments(data);
        } else {
          console.warn("Unexpected response structure:", data);
          setAppointments([]);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [navigate]);

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
          <button className="top-btn2" onClick={() => navigate("/find-doctor")}>
            Find Doctors
          </button>
        </div>
        <div className="mp-profile">
          <img src={user} alt="Profile" />
          <span className="profile-name">
            {profileData ? `${profileData.first_name} ${profileData.last_name}` : "User"}
          </span>
        </div>
      </div>

      {/* Sidebar */}
      <div className="profile-sidebar">
        <button className="mp-button">Dashboard</button>
        <button
          className={`mp-button ${location.pathname === "/MyProfile" ? "active" : ""}`}
          onClick={() => navigate("/MyProfile")}
        >
          My Profile
        </button>
        <button
          className={`mp-button ${location.pathname === "/ViewReport" ? "active" : ""}`}
          onClick={() => navigate("/ViewReport")}
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

      {/* Main Content */}
      <div className="mp-main-content">
        <h2 className="mp-myprofile-title">Lab Reports</h2>

        <div className="appointment-header">
          {loading ? (
            <p>Loading prescriptions...</p>
          ) : appointments.length === 0 ? (
            <p>No prescriptions available for lab tests.</p>
          ) : (
            <table className="appointments-table">
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt) => (
                  <tr key={appt.id || appt.appointment_id}>
                    <td>{appt.patient_name || appt.name || "N/A"}</td>
                    <td>{appt.appointment_date || appt.date || "N/A"}</td>
                    <td>{appt.appointment_time || appt.time || "N/A"}</td>
                    <td>
                      <button
                        className="view-btn"
                        onClick={() =>
                          navigate(`/ShowReport/${appt.id || appt.appointment_id}`)
                        }
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewReport;
