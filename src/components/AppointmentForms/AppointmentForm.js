import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import user from "../../assets/circle-user.png";
import "./AppointmentForm.css";

const AppointmentForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const doctor = location.state?.doctor;
  const [description, setDescription] = useState("");

  const handleClick = () => {
    navigate("/");
  };

  const allDays = [
    "Sunday", "Monday", "Tuesday", "Wednesday",
    "Thursday", "Friday", "Saturday"
  ];
  const todayIndex = new Date().getDay();
  const orderedDays = [
    ...allDays.slice(todayIndex),
    ...allDays.slice(0, todayIndex)
  ];
  const [selectedDay, setSelectedDay] = useState(orderedDays[0]);

  const timeSlots = [
    "09:00 AM", "09:45 AM", "10:25 AM", "11:00 AM",
    "11:45 PM", "01:30 PM", "03:00 PM", "03:45 PM"
  ];
  const [bookedSlot, setBookedSlot] = useState(null);

  const handleTimeClick = (slot) => {
    setBookedSlot(bookedSlot === slot ? null : slot);
  };

  return (
    <div className="container_home">
      {/* Header */}
      <header className="navbar">
        <h1 className="logo">ZenCare</h1>
        <div className="profile-button">
          <input
            type="image"
            src="/photos/profile_image.png"
            alt="Profile"
            onClick={handleClick}
            style={{ width: "50px", height: "auto" }}
          />
        </div>
      </header>

      {/* Navigation */}
      <nav className="navigation">
        <a href="#">Home</a> | <a href="#">Find Doctors</a>
      </nav>

      {/* Profile Content */}
      <div className="profile-container">
        <div className="profile-card">
          <img src={user} alt="Doctor" className="profile-photo" />
          <div className="profile-info">
            <h2>PROFILE</h2>
            <h3>Susma Giri</h3>
            <p><strong>Cardiology</strong></p>
            <p>Experience: 9 years</p>
            <span className="price">Rs. 700</span>
          </div>
        </div>
      </div>

      {/* Day Selector */}
      <div className="selector-section">
        <h3 className="section-heading">Choose a day for an appointment</h3>
        <div className="day-selector">
          {orderedDays.map((day) => (
            <button
              key={day}
              className={`day-button ${selectedDay === day ? "selected" : ""}`}
              onClick={() => setSelectedDay(day)}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* Time Selector */}
      <div className="selector-section">
        <h3 className="section-heading">Choose a time for an appointment</h3>
        <div className="time-selector">
          {timeSlots.map((slot, index) => (
            <button
              key={index}
              className={`time-button ${bookedSlot === slot ? "booked" : ""}`}
              onClick={() => handleTimeClick(slot)}
              disabled={bookedSlot !== null && bookedSlot !== slot}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="description-section">
        <h3>Reason for Appointment</h3>
        <textarea
          className="description-box"
          placeholder="Write a short description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        ></textarea>
      </div>
      <div className="last">
        <button className="lastbutton">Book Appointment</button>
      </div>
    </div>
  );
};

export default AppointmentForm;
