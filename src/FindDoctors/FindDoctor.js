import React from "react";
// import { useNavigate } from "react-router-dom";
import "./FindDoctor.css";

// Component for the Find Doctor page
const FindDoctor = () => {
    // const navigate = useNavigate();

    // Function to handle profile image click
    const handleClick = () => {
        console.log("Profile image clicked!");
        // navigate("/PatientHome"); // Change the path as needed
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
                        alt="button"
                        onClick={handleClick}
                        style={{ width: '50px', height: 'auto' }}
                    />
                </div>
            </header>

            {/* ------------------------Navigation--------------------- */}

            <nav className="navigation">
                <a href="#">Home</a>  | <a href="#">Find Doctors</a>
            </nav>
        </div>
    );
};

export default FindDoctor;
