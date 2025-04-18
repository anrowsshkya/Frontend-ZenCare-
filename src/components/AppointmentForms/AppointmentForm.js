import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import user from "../../assets/circle-user.png";
import axios from "axios"; // You can use fetch if you prefer
import "./AppointmentForm.css";
import { book } from "../api";

const AppointmentForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const doctor = location.state?.doctor;
  const [description, setDescription] = useState("");
  
  // Get today's date in YYYY-MM-DD format
  const today = new Date();
  const formattedToday = today.toISOString().split('T')[0];
  
  const [selectedDate, setSelectedDate] = useState(formattedToday);
  const [bookedSlot, setBookedSlot] = useState(null);
  const userId = 2; // Replace this with the actual logged-in user's ID (probably from context or localStorage)

  // Function to handle booking the appointment
  const handleBookAppointment = async () => {
    if (!bookedSlot) {
      alert("Please select a time slot.");
      return;
    }
  
    try {
      // Ensure date is in YYYY-MM-DD format
      const formattedDate = selectedDate;
      
      // Ensure time is in hh:mm format
      const formattedTime = bookedSlot;
      
      // Log the doctor object to see its structure
      console.log("Doctor object:", doctor);
      console.log("Doctor ID:", doctor?.id);
      console.log("Doctor ID type:", typeof doctor?.id);
      
      // Ensure doctor ID is available
      if (!doctor || !doctor.id) {
        alert("Doctor information is missing. Please try again.");
        return;
      }
      
      console.log("Sending appointment data:", {
        doctorId: doctor.id,
        doctorName: doctor.name,
        userId: userId,
        date: formattedDate,
        time: formattedTime,
        description: description,
      });
      
      const response = await book({
        doctorId: doctor.id,
        doctorName: doctor.name,
        userId: userId,
        date: formattedDate,
        time: formattedTime,
        description: description,
      });
  
      if (response.status === 200 || response.status === 201) {
        alert("Appointment booked successfully!");
        navigate("/"); // Redirect to home or appointment confirmation page
      } else {
        alert("Failed to book appointment.");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      
      // Provide more detailed error message to the user
      let errorMessage = "There was an error booking the appointment.";
      
      if (error.response && error.response.data) {
        // Try to extract a meaningful error message
        const errorData = error.response.data;
        if (typeof errorData === 'object') {
          const errorKeys = Object.keys(errorData);
          if (errorKeys.length > 0) {
            errorMessage = `Error: ${errorKeys.join(', ')}`;
          }
        }
      }
      
      alert(errorMessage);
    }
  };

  // Generate dates for the next 7 days
  const getNextSevenDays = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      // Format date as YYYY-MM-DD
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      
      // Format display date as MM/DD
      const displayDate = `${month}/${day}`;
      
      dates.push({
        date: formattedDate,
        day: date.toLocaleDateString('en-US', { weekday: 'long' }),
        displayDate: displayDate
      });
    }
    return dates;
  };

  const availableDates = getNextSevenDays();

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

      {/* Time Selector */}
      <div className="ap-contain">
        {/* Day Selector */}
      <div className="selector-section">
        <h3>Choose a day for an appointment</h3>
        <div className="day-selector">
          {availableDates.map((dateObj) => (
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
        <div className="time-selector">
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
      </div>
  );
};

export default AppointmentForm;
