import React from "react";
import "../Notification/Notification.css";

const Notification = ({ onClose, notifications }) => {
  // Defensive check to ensure notifications is always an array
  const validNotifications = Array.isArray(notifications) ? notifications : [];

  console.log("notifications:", notifications); // Debug log

  return (
    <div className="notification-overlay">
      <div className="notification-header">
        <h3>Notifications</h3>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>

      <ul className="notification-list">
        {validNotifications.length === 0 ? (
          <li className="notification-item">No notifications</li>
        ) : (
          validNotifications.map((note, index) => (
            <li key={index} className="notification-item">
              {note.message}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Notification;
