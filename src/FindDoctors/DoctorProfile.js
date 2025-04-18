import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./DoctorProfile.css";

const DoctorProfile = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const doctor = location.state?.doctor;

    const handleClick = () => {
        navigate("/"); // Back to home
    };

    if (!doctor) {
        return <div className="container_home">No doctor info available.</div>;
    }

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
                        onClick={() => navigate("/MyProfile")}
                        style={{ width: '50px', height: 'auto' }}
                    />
                </div>
            </header>

            {/* Navigation */}
            <nav className="navigation">
                <a onClick={() => navigate("/PatientHome")}>Home</a> | <a onClick={() => navigate("/find-doctor")}>Find Doctors</a>
            </nav>

            {/* Profile Content */}
            <div className="profile-container">
                <div className="profile-card">
                    <img src={doctor.profileImage} alt={doctor.name} className="profile-photo" />
                    <div className="profile-info">
                        <h2>PROFILE</h2>
                        <h3>{doctor.name}</h3>
                        <p><strong>{doctor.title}</strong></p>
                        <p>Experience: {doctor.experience}</p> {/* This now works */}
                        <p>Phone: {doctor.phone}</p>
                        <p>Address: {doctor.address}</p>
                        <p>Consultation Fee: ${doctor.consultationFee}</p>
                        <button className="book-appointment">BOOK AN APPOINTMENT</button>
                    </div>
                </div>

                <div className="journey-section">
                    <div className="work-experience">
                        <h3>PROFESSIONAL JOURNEY</h3>
                        <p><strong>WORK EXPERIENCE</strong></p>
                        <ul>
                            {(Array.isArray(doctor.workExperience) ? doctor.workExperience : []).map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="education-training">
                        <h3>EDUCATION & TRAINING</h3>
                        <ul>
                            <ul>
                                {(Array.isArray(doctor.educationTraining) ? doctor.educationTraining : []).map((item, index) => (
                                    <li key={index}><strong>{item}</strong></li>
                                ))}
                            </ul>
                        </ul>
                    </div>
                </div>
            </div>

            {/* --------------------------------------Footer Part----------------------------------------------- */}
            <footer className="footer">
                <h2>ZenCare</h2>
                <p>ZenCare is the largest growing website with 1000+ professional doctors.</p>
                <p>We provide you with utmost care and don't worry about your privacy. We have excellent security and privacy system.</p>
                <p>&copy; Copy Rights Reserved</p>
            </footer>
        </div>
    );
};

export default DoctorProfile;
