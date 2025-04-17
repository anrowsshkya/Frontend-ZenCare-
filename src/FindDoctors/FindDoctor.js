import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FindDoctor.css";

const FindDoctor = () => {

    const navigate = useNavigate();

    const handleViewProfile = (doctor) => {
        navigate(`/doctor/${doctor.id}`, { state: { doctor } });
    };

    const handleBookAppointment = (doctor) => {
        navigate("/Form", { state: { doctor } }); // Navigate with doctor info
    };

    const [specialty, setSpecialty] = useState("PEDIATRICS");
    const [doctorGroups, setDoctorGroups] = useState({});
    const [loading, setLoading] = useState(false);

    // Dummy grouped data (simulate API structure)
    const dummyGroupedData = {
        "PEDIATRICS": [
            {
                id: 1,
                name: "Dr. Ayesha Khan",
                title: "Pediatrician",
                experience: "12 years",
                profileImage: "/photos/profile_image.png",
                workExperience: [
                    "Dr. Ayesha Khan",
                    "Senior Consultant, Rainbow Kids Hospital. (2020 - Present)",
                    "Pediatrician, City Health Center. (2015 - 2020)"
                ],
                educationTraining: [
                    "MBBS, LMN Medical College",
                    "PG Diploma in Child Health, UVW Hospital"
                ]
            },
            {
                id: 3,
                name: "Dr. Maya Das",
                title: "Pediatrician",
                experience: "9 years",
                profileImage: "/photos/profile_image.png",
                workExperience: [
                    "Dr. Maya Das",
                    "Senior Consultant, Rainbow Kids Hospital. (2020 - Present)",
                    "Pediatrician, City Health Center. (2015 - 2020)"
                ],
                educationTraining: [
                    "MBBS, LMN Medical College",
                    "PG Diploma in Child Health, UVW Hospital"
                ]
            }
        ],
        "CARDIOLOGY": [
            {
                id: 2,
                name: "Dr. John Smith",
                title: "Cardiologist",
                experience: "15 years",
                profileImage: "/photos/profile_image.png",
                workExperience: [
                    "Dr. John Smith",
                    "Senior Consultant, Rainbow Kids Hospital. (2020 - Present)",
                    "Pediatrician, City Health Center. (2015 - 2020)"
                ],
                educationTraining: [
                    "MBBS, LMN Medical College",
                    "PG Diploma in Child Health, UVW Hospital"
                ]
            }
        ],
        "NEUROLOGY": [
            {
                id: 4,
                name: "Dr. Ravi Patel",
                title: "Neurologist",
                experience: "20 years",
                profileImage: "/photos/profile_image.png",
                workExperience: [
                    "Dr. Ravi Patel",
                    "Senior Consultant, Rainbow Kids Hospital. (2020 - Present)",
                    "Pediatrician, City Health Center. (2015 - 2020)"
                ],
                educationTraining: [
                    "MBBS, LMN Medical College",
                    "PG Diploma in Child Health, UVW Hospital"
                ]
            }
        ],
        "DERMATOLOGY": [
            {
                id: 5,
                name: "Dr. Sara Lee",
                title: "Dermatologist",
                experience: "7 years",
                profileImage: "/photos/profile_image.png",
                workExperience: [
                    "Dr. Sara Lee",
                    "Senior Consultant, Rainbow Kids Hospital. (2020 - Present)",
                    "Pediatrician, City Health Center. (2015 - 2020)"
                ],
                educationTraining: [
                    "MBBS, LMN Medical College",
                    "PG Diploma in Child Health, UVW Hospital"
                ]
            }
        ]
    };

    // Fetch doctors (placeholder for API)
    const fetchDoctors = async () => {
        setLoading(true);
        try {
            // TODO: Replace with actual API call later
            // const response = await fetch('/api/doctors');
            // const data = await response.json(); // Should return grouped data by specialty
            // setDoctorGroups(data);

            setDoctorGroups(dummyGroupedData);
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
                        onClick={handleClick}
                        style={{ width: '50px', height: 'auto' }}
                    />
                </div>
            </header>

            {/* ------------------------Navigation--------------------- */}
            <nav className="navigation">
                <a href="#">Home</a> | <a href="#">Find Doctors</a>
            </nav>

            {/* -------------------- Filter by Specialty -------------------- */}
            <div className="filter-section">
                <label htmlFor="specialty">Find By Specialty:</label>
                <select
                    id="specialty"
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                >
                    <option value="PEDIATRICS">PEDIATRICS</option>
                    <option value="CARDIOLOGY">CARDIOLOGY</option>
                    <option value="NEUROLOGY">NEUROLOGY</option>
                    <option value="DERMATOLOGY">DERMATOLOGY</option>
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
                            <p>Experience: {doc.experience}</p>
                            <button className="book-btn" onClick={() => handleBookAppointment(doc)}>Book Appointment</button>
                            <button className="profile-btn" onClick={() => handleViewProfile(doc)}>View Profile</button>                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FindDoctor;
