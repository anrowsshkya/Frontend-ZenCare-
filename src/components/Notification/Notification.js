import React, { useState, useEffect } from "react";
import { getNotifications } from "../api"; // Import the API function
import "../Notification/Notification.css";

const Notification = ({ onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await getNotifications();
        setNotifications(response); // Set the notifications data
        setLoading(false); // Set loading to false once the data is fetched
      } catch (error) {
        setError("Failed to fetch notifications.");
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="notification-overlay">
      <div className="notification-header">
        <h3>Notifications</h3>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>
      {loading ? (
        <div className="notification-loading">Loading notifications...</div>
      ) : error ? (
        <div className="notification-error">{error}</div>
      ) : (
        <ul className="notification-list">
          {notifications.length === 0 ? (
            <li className="notification-item">No notifications</li>
          ) : (
            notifications.map((note, index) => (
              <li key={index} className="notification-item">
                {note.message} {/* Adjust based on the actual notification data */}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default Notification;
