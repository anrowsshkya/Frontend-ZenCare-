import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FindDoctor.css";
import { findDoctor } from "../components/api";

const FindDoctor = () => {
    const navigate = useNavigate();

    const handleViewProfile = (doctor) => {
        navigate(`/doctor/${doctor.id}`, { state: { doctor } });
    };

    const [specialty, setSpecialty] = useState("");
    const [doctorGroups, setDoctorGroups] = useState({});
    const [loading, setLoading] = useState(false);
    const [availableSpecialties, setAvailableSpecialties] = useState([]);

    // Fetch doctors (placeholder for API)
    const fetchDoctors = async () => {
        setLoading(true);
        try {
            const response = await findDoctor(); // Actual API call
            const doctors = response.data.results;

            // Group doctors by profession
            const grouped = doctors.reduce((acc, doc) => {
                const profession = doc.profession?.toLowerCase() || "other";
                if (!acc[profession]) {
                    acc[profession] = [];
                }

                acc[profession].push({
                    id: doc.id,
                    name: `Dr. ${doc.full_name}`,
                    title: doc.profession,
                    phone: doc.phone_number,
                    address: doc.address,
                    profileImage: "/photos/profile_image.png", // Placeholder image
                });

                return acc;
            }, {});

            setDoctorGroups(grouped);

            const specialties = Object.keys(grouped);
            setAvailableSpecialties(specialties);
            if (specialties.length > 0) {
                setSpecialty(specialties[0]); // Default to the first available
            }
        } catch (error) {
            console.error("Error fetching doctors:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDoctors();
    }, []);

    const handleClick = () => {
        console.log("Profile image clicked!");
        // navigate("/PatientHome");
    };

    return (
        <div className="container_home">

            {/* ------------------------------------------Header Part------------------------------------------ */}
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

            {/* ------------------------Navigation--------------------- */}
            <nav className="navigation">
                <a onClick={() => navigate("/PatientHome")}>Home</a> | <a href="#">Find Doctors</a>
            </nav>

            {/* -------------------- Filter by Specialty -------------------- */}
            <div className="filter-section">
                <label htmlFor="specialty">Find By Specialty:</label>
                <select
                    id="specialty"
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                >
                    {availableSpecialties.map((spec) => (
                        <option key={spec} value={spec}>
                            {spec.charAt(0).toUpperCase() + spec.slice(1)}
                        </option>
                    ))}
                </select>
            </div>

            {/* --------------------- Doctor Cards --------------------- */}
            {loading ? (
                <p style={{ paddingLeft: "45px" }}>Loading doctors...</p>
            ) : (
                <div className="doctor-grid">
                    {(doctorGroups[specialty] || []).map((doc) => (
                        <div className="doctor-card" key={doc.id}>
                            <img
                                src={doc.profileImage}
                                alt={doc.name}
                                className="doctor-image"
                            />
                            <h3>{doc.name}</h3>
                            <p>{doc.title}</p>
                            <p>Phone: {doc.phone}</p>
                            <p>Address: {doc.address}</p>
                            <button className="book-btn">Book Appointment</button>
                            <button className="profile-btn" onClick={() => handleViewProfile(doc)}>View Profile</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FindDoctor;
