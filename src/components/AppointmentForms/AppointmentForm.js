import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import user from "../../assets/circle-user.png";
import axios from "axios"; // You can use fetch if you prefer
import "./AppointmentForm.css";

const AppointmentForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const doctor = location.state?.doctor;
  const [description, setDescription] = useState("");
  const [selectedDay, setSelectedDay] = useState("Monday"); // default day for now
  const [bookedSlot, setBookedSlot] = useState(null);
  const userId = 456; // Replace this with the actual logged-in user's ID (probably from context or localStorage)

  // Function to handle booking the appointment
  const handleBookAppointment = async () => {
    if (!bookedSlot) {
      alert("Please select a time slot.");
      return;
    }

    try {
      const response = await axios.post("/api/appointments", {
        doctorId: doctor.id,
        userId: userId,
        date: selectedDay,  // Use the selected day
        time: bookedSlot,   // Use the selected time slot
        description: description,
      });

      if (response.status === 200) {
        alert("Appointment booked successfully!");
        navigate("/"); // Redirect to home or appointment confirmation page
      } else {
        alert("Failed to book appointment.");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("There was an error booking the appointment.");
    }
  };

  const allDays = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  ];
  const todayIndex = new Date().getDay();
  const orderedDays = [
    ...allDays.slice(todayIndex),
    ...allDays.slice(0, todayIndex)
  ];

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
        <a href="#">Home</a> | <a href="#">Find Doctors</a>
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

      {/* Day Selector */}
      <div className="selector-section">
        <h3>Choose a day for an appointment</h3>
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
        <h3>Choose a time for an appointment</h3>
        <div className="time-selector">
          {["09:00 AM", "09:45 AM", "10:25 AM", "11:00 AM", "11:45 PM", "01:30 PM", "03:00 PM", "03:45 PM"].map((slot, index) => (
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
        <button className="lastbutton" onClick={handleBookAppointment}>Book Appointment</button>
      </div>
    </div>
  );
};

export default AppointmentForm;
