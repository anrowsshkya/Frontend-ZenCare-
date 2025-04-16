import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TopDoctors.css";

const FindDoctor = () => {
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleViewProfile = (doctor) => {
        navigate(`/doctor/${doctor.id}`, { state: { doctor } });
    };

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

    const fetchDoctors = async () => {
        setLoading(true);
        try {
            // Combine all doctors from all specialties
            const allDoctors = Object.values(dummyGroupedData).flat();

            // Sort descending by experience
            const sortedDoctors = allDoctors.sort((a, b) => {
                const expA = parseInt(a.experience);
                const expB = parseInt(b.experience);
                return expB - expA;
            });

            setDoctors(sortedDoctors);
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
    };

    return (
        <div className="container_home">
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

            <nav className="navigation">
                <a href="#">Home</a> | <a href="#">Find Doctors</a>
            </nav>

            {loading ? (
                <p style={{ paddingLeft: "45px" }}>Loading doctors...</p>
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
                            <p>{doc.title}</p>
                            <p>Experience: {doc.experience}</p>
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
