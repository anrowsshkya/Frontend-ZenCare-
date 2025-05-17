import React from "react";

const LabCheck = () => {
  const imageUrl = "/user.jpg"; // Direct path from public folder

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Lab Report Image</h2>
      <img
        src={imageUrl}
        alt="Lab Report"
        style={{ maxWidth: "90%", height: "auto", border: "1px solid #ccc", borderRadius: "10px" }}
      />
    </div>
  );
};

export default LabCheck;
