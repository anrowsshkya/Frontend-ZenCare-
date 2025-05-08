import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import user from "../../assets/circle-user.png";
import { book } from "../api";
import "./AppointmentForm.css";

const AppointmentForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const doctor = location.state?.doctor;

  const today = new Date();
  const formattedToday = today.toISOString().split('T')[0];

  const [selectedDate, setSelectedDate] = useState(formattedToday);
  const [bookedSlot, setBookedSlot] = useState(null);
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Success modal state

  const userId = 2; // Replace with actual user ID from context or localStorage

  const handleBookAppointment = async () => {
    setErrorMessage(""); // Clear any previous error

    if (!bookedSlot) {
      setErrorMessage("Please select a time slot.");
      return;
    }

    if (!description.trim()) {
      setErrorMessage("Please enter a reason for the appointment.");
      return;
    }

    const selected = new Date(selectedDate);
    if (selected < new Date(formattedToday)) {
      setErrorMessage("You cannot book an appointment in the past.");
      return;
    }

    try {
      setLoading(true);

      const response = await book({
        doctorId: doctor?.id,
        doctorName: doctor?.name,
        userId,
        date: selectedDate,
        time: bookedSlot,
        description,
      });

      if (response.status === 200 || response.status === 201) {
        setShowSuccessModal(true); // Show modal
      } else {
        setErrorMessage("Failed to book appointment.");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      let errorMsg = "There was an error booking the appointment.";
      if (error.response?.data) {
        const keys = Object.keys(error.response.data);
        if (keys.length > 0) errorMsg = `Error: ${keys.join(', ')}`;
      }
      setErrorMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const getNextSevenDays = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      const displayDate = `${month}/${day}`;
      dates.push({
        date: formattedDate,
        day: date.toLocaleDateString('en-US', { weekday: 'long' }),
        displayDate
      });
    }
    return dates;
  };

  const handleTimeClick = (slot) => {
    setBookedSlot(bookedSlot === slot ? null : slot);
  };

  return (
    <div className="container_home">
      <header className="navbar">
        <h1 className="logo">ZenCare</h1>
        <div className="profile-button">
          <input
            type="image"
            src="/photos/profile_image.png"
            alt="Profile"
            onClick={() => navigate("/")}
            style={{ width: "50px", height: "auto" }}
          />
        </div>
      </header>

      <nav className="navigation">
        <a href="/PatientHome">Home</a> | <a href="/find-doctor">Find Doctors</a>
      </nav>

      <div className="profile-container">
        <div className="profile-card">
          <img
            src={doctor?.profileImage || user}
            alt="Doctor"
            className="profile-photo"
          />
          <div className="profile-info">
            <h2>PROFILE</h2>
            <h3>{doctor?.name || "Doctor Name"}</h3>
            <p><strong>{doctor?.title || "Specialty"}</strong></p>
            <p>Experience: {doctor?.experience || "N/A"}</p>
            <span className="price">Rs. 700</span>
          </div>
        </div>
      </div>

      <div className="ap-contain">
        {errorMessage && (
          <div style={{
            color: "red",
            backgroundColor: "#ffe5e5",
            padding: "10px",
            borderRadius: "8px",
            marginBottom: "15px",
            textAlign: "center",
            fontWeight: "bold"
          }}>
            {errorMessage}
          </div>
        )}

        <div className="selector-section">
          <h3>Choose a day for an appointment</h3>
          <div className="day-selector">
            {getNextSevenDays().map((dateObj) => (
              <button
                key={dateObj.date}
                className={`day-button ${selectedDate === dateObj.date ? "selected" : ""}`}
                onClick={() => setSelectedDate(dateObj.date)}
              >
                <div className="day-name">{dateObj.day}</div>
                <div className="day-date">{dateObj.displayDate}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="selector-section">
          <h3>Choose a time for an appointment</h3>
          <div
            className="time-selector"
            style={{
              border: !bookedSlot ? "2px dashed red" : "none",
              padding: "10px",
              borderRadius: "10px"
            }}
          >
            {["09:00", "09:45", "10:25", "11:00", "11:45", "13:30", "15:00", "15:45"].map((slot, index) => (
              <button
                key={index}
                className={`time-button ${bookedSlot === slot ? "booked" : ""}`}
                onClick={() => handleTimeClick(slot)}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        <div className="description-section">
          <h3>Reason for Appointment</h3>
          <textarea
            className="description-box"
            placeholder="Write a short description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            style={{
              border: !description.trim() ? "2px solid red" : "1px solid #ccc",
              outline: "none",
              padding: "10px",
              borderRadius: "8px"
            }}
          ></textarea>
        </div>

        <div className="last">
          <button
            className="lastbutton"
            onClick={handleBookAppointment}
            disabled={loading}
            style={{
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "not-allowed" : "pointer"
            }}
          >
            {loading ? "Booking..." : "Book Appointment"}
          </button>
        </div>
      </div>

      {showSuccessModal && (
        <div className="success-modal">
          <div className="success-content">
            <h2>✅ Appointment Booked!</h2>
            <p>Your appointment has been successfully scheduled.</p>
            <button className="go-home" onClick={() => navigate("/PatientHome")}>
              Go to Home
            </button>

            <button className="view-appointment" onClick={() => navigate("/Cancel")}>
              View Appointment?
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentForm;
