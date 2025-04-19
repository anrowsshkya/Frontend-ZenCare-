import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { findDoctor } from "../components/api";
import "./TopDoctors.css";

const TopDoctors = () => {
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleViewProfile = (doctor) => {
        navigate(`/doctor/${doctor.id}`, { state: { doctor } });
    };

    const handleBookAppointment = (doctor) => {
        navigate("/Form", { state: { doctor } });
    };

    const fetchDoctors = async () => {
        setLoading(true);
        try {
            const response = await findDoctor();
            const fetchedDoctors = response.data.results;

            // Transform doctor data
            const enrichedDoctors = fetchedDoctors.map((doc) => ({
                ...doc,
                id: doc.id,
                name: `Dr. ${doc.full_name}`,
                title: doc.profession_display || doc.profession,
                phone: doc.phone_number,
                address: doc.address,
                profileImage: doc.profileImage || "/photos/profile_image.png",
                experience: doc.experience_years || "Not specified",
                consultationFee: doc.consultation_fee || 0,
                workExperience: doc.work_experience
                    ? doc.work_experience.split(",").map(item => item.trim())
                    : [],
                educationTraining: [
                    ...(doc.education ? doc.education.split(",").map(item => item.trim()) : []),
                    ...(doc.training ? doc.training.split(",").map(item => item.trim()) : [])
                ],
            }));

            // Sort by experience (descending)
            enrichedDoctors.sort((a, b) => {
                const expA = parseInt(a.experience) || 0;
                const expB = parseInt(b.experience) || 0;
                return expB - expA;
            });

            setDoctors(enrichedDoctors);
        } catch (error) {
            console.error("Error fetching doctors:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDoctors();
    }, []);

    return (
        <div className="container_home">
            <header className="navbar">
                <h1 className="logo">ZenCare</h1>
                <div className="profile-button">
                    <input
                        type="image"
                        src="/photos/profile_image.png"
                        alt="Profile"
                        onClick={() => navigate("/MyProfile")}
                        style={{ width: "50px", height: "auto" }}
                    />
                </div>
            </header>

            <nav className="navigation">
                <a onClick={() => navigate("/PatientHome")}>Home</a> |{" "}
                <a onClick={() => navigate("/find-doctor")}>Find Doctors</a>
            </nav>

            {loading ? (
                <p style={{ paddingLeft: "45px" }}>Loading top doctors...</p>
            ) : (
                <div className="doctor-grid">
                    {doctors.map((doc) => (
                        <div className="doctor-card" key={doc.id}>
                            <img
                                src={doc.profileImage}
                                alt={doc.name}
                                className="doctor-image"
                            />
                            <h3>{doc.name}</h3>
                            <p>Experience: {doc.experience} years</p>
                            <button className="book-btn" onClick={() => handleBookAppointment(doc)}>
                                Book Appointment
                            </button>
                            <button className="profile-btn" onClick={() => handleViewProfile(doc)}>
                                View Profile
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TopDoctors;
