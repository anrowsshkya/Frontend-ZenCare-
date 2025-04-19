import React, { useEffect, useState } from 'react';
import user from "../../assets/circle-user.png";
import { useNavigate, useLocation } from "react-router-dom";
import { userProfile, getAppointments } from "../api";
import axios from 'axios';

const Cancel = () => {
  const API_BASE_URL = "https://zencare-backend-2.onrender.com";
  const location = useLocation();
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setError("You are not logged in.");
        setLoading(false);
        return;
      }

      try {
        const profileRes = await userProfile(token);
        setProfileData(profileRes.data);

        const appointmentsData = await getAppointments(token);
        if (Array.isArray(appointmentsData)) {
          setAppointments(appointmentsData);
        } else if (appointmentsData?.results) {
          setAppointments(appointmentsData.results);
        } else {
          setAppointments([]);
        }

        setError(null);
      } catch (err) {
        console.error("Error loading data:", err);
        setError("Failed to load appointments.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('access_token');
    if (!token) return;

    if (!window.confirm("Are you sure you want to cancel this appointment?")) return;

    try {
      await axios.delete(`${API_BASE_URL}/appointment/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAppointments((prev) => prev.filter((appt) => appt.id !== id));
      alert("Appointment cancelled.");
    } catch (error) {
      console.error("Failed to delete appointment:", error);
      alert("Could not cancel the appointment.");
    }
  };

  if (loading) return <div style={{ textAlign: "center", marginTop: "50px" }}>Loading...</div>;
  if (error) return <div style={{ color: "red", textAlign: "center", marginTop: "20px" }}>{error}</div>;

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "sans-serif" }}>
      
      {/* Sidebar */}
      <div style={{
        width: "220px",
        backgroundColor: "#f0f4f8",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "15px"
      }}>
        <h1 style={{ color: "#0077cc", fontSize: "24px", marginBottom: "30px" }}>ZenCare</h1>
        <button style={buttonStyle}>Dashboard</button>
        <button
          style={location.pathname === "/MyProfile" ? activeButtonStyle : buttonStyle}
          onClick={() => navigate("/MyProfile")}
        >My Profile</button>
        <button
          style={location.pathname === "/Cancel" ? activeButtonStyle : buttonStyle}
          onClick={() => navigate("/Cancel")}
        >Appointments</button>
        <button style={buttonStyle}>Lab Reports</button>
        <button style={buttonStyle}>Change Password</button>
        <button
          style={{ ...buttonStyle, backgroundColor: "#ff4d4f", color: "#fff" }}
          onClick={() => {
            localStorage.removeItem('access_token');
            navigate("/login");
          }}
        >Log Out</button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        {/* Topbar */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #ddd",
          paddingBottom: "10px",
          marginBottom: "20px"
        }}>
          <div>
            <button style={navBtnStyle} onClick={() => navigate("/PatientHome")}>Home</button>
            <button style={navBtnStyle} onClick={() => navigate("/find-doctor")}>Find Doctors</button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img src={user} alt='Profile' style={{ width: "40px", borderRadius: "50%" }} />
            <span>{profileData ? `${profileData.first_name} ${profileData.last_name}` : 'User'}</span>
          </div>
        </div>

        <h2 style={{ marginBottom: "20px" }}>Appointments</h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr auto",
          fontWeight: "bold",
          paddingBottom: "10px",
          borderBottom: "2px solid #ccc",
          marginBottom: "10px"
        }}>
          <div>Doctor</div>
          <div>Date</div>
          <div>Time</div>
          <div>Action</div>
        </div>

        {appointments.length > 0 ? (
          appointments.map((appt) => (
            <div key={appt.id} style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr auto",
              padding: "10px 0",
              borderBottom: "1px solid #eee",
              alignItems: "center"
            }}>
              <div>{appt.doctor_name || "Dr. Unknown"}</div>
              <div>{appt.appointment_date}</div>
              <div>{appt.appointment_time}</div>
              <div>
                <button
                  style={{
                    backgroundColor: "#e63946",
                    color: "#fff",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: "6px",
                    cursor: "pointer"
                  }}
                  onClick={() => handleDelete(appt.id)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ))
        ) : (
          <p style={{ color: "#777", textAlign: "center" }}>No appointments booked yet.</p>
        )}
      </div>
    </div>
  );
};

export default Cancel;

// Styles
const buttonStyle = {
  padding: "10px",
  backgroundColor: "#e6e6e6",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  textAlign: "left"
};

const activeButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#0077cc",
  color: "#fff"
};

const navBtnStyle = {
  marginRight: "10px",
  padding: "8px 16px",
  backgroundColor: "#0077cc",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer"
};
