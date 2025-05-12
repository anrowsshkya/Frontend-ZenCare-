// src/components/ShowReport.js

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleLabReport } from "../api";

const ShowReport = () => {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

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
      <a
        href={report.report_file}
        target="_blank"
        rel="noopener noreferrer"
        className="download-link"
      >
        View Report PDF
      </a>
    </div>
  );
};

export default ShowReport;
