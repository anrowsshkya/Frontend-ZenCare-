import React, { useEffect, useState } from "react";
import { getSingleLabReport } from "../api";
import "./NotificationProfile.css";

const NotificationProfile = ({ messages = [], onClose }) => {
    const [reports, setReports] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReports = async () => {
            setLoading(true);
            const fetchedReports = {};

            // Extract all lab_report_ids from messages that have it
            const reportIds = messages
                .map((n) => n.lab_report_id)
                .filter((id) => id !== undefined && id !== null);

            await Promise.all(
                reportIds.map(async (id) => {
                    try {
                        const report = await getSingleLabReport(id);
                        fetchedReports[id] = report;
                    } catch (error) {
                        console.error(`Failed to fetch report ID ${id}:`, error);
                    }
                })
            );

            setReports(fetchedReports);
            setLoading(false);
        };

        if (messages.length > 0) fetchReports();
        else setLoading(false);
    }, [messages]);

    return (
        <div className="notification-content">
            <div className="notification-header">
                <h3>Notifications</h3>
                <button className="close-btn" onClick={onClose}>×</button>
            </div>

            {loading ? (
                <p style={{ padding: "1rem" }}>Loading reports...</p>
            ) : messages.length === 0 ? (
                <p style={{ padding: "1rem" }}>No notifications available.</p>
            ) : (
                <ul className="notification-list">
                    {messages.map((notification) => {
                        const report = notification.lab_report_id ? reports[notification.lab_report_id] : null;
                        return (
                            <li key={notification.id} className="notification-item">
                                <p><strong></strong> {notification.message}</p>
                                {report ? (
                                    <div className="lab-report-details">
                                        <p><strong>Doctor:</strong> {report.doctor_name}</p>
                                        <p><strong>Technician:</strong> {report.lab_technician_name}</p>
                                        <p><strong>Type:</strong> {report.report_type_display}</p>
                                        <p><strong>Description:</strong> {report.description}</p>
                                    </div>
                                ) : (
                                    notification.lab_report_id ? (
                                        <p style={{ fontStyle: "italic" }}>Lab report not found.</p>
                                    ) : null
                                )}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default NotificationProfile;
