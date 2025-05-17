// src/components/ShowReport.js

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleLabReport } from "../api";
import { user } from "../../assets/circle-user.png"; // if this is not a named export, remove the {}

const ShowReport = () => {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleViewReport = () => {
    navigate("/lab-check");
  };

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const data = await getSingleLabReport(id);
        setReport(data);
      } catch (error) {
        console.error("Error loading report", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [id]);

  if (loading) return <p>Loading report...</p>;
  if (!report) return <p>Report not found.</p>;

  return (
    <div className="report-details">
      <h2>Lab Report Details</h2>
      <p><strong>Doctor:</strong> {report.doctor_name}</p>
      <p><strong>Lab Technician:</strong> {report.lab_technician_name}</p>
      <p><strong>Report Type:</strong> {report.report_type_display}</p>
      <p><strong>Description:</strong> {report.description}</p>
      <button
        onClick={handleViewReport}
        className="download-link"
        style={{
          padding: "10px 20px",
          borderRadius: "6px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          cursor: "pointer"
        }}
      >
        View Report
      </button>
    </div>
  );
};

export default ShowReport;
