import React from "react";
import "../Notification/Notification.css";

const Notification = ({ notifications, onClose }) => {
  return (
    <div className="notification-overlay">
      <div className="notification-header">
        <h3>Notifications</h3>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>
      <ul className="notification-list">
        {notifications.length === 0 ? (
          <li className="notification-item">No notifications</li>
        ) : (
          notifications.map((note, index) => (
            <li key={index} className="notification-item">
              {note}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Notification;
