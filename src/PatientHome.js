import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const ZenCare = () => {
    const navigate = useNavigate();

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
            <section className="hero">
                <div className="hero-text">
                    <h2>Health Can't Be Compromised</h2>
                    <p>We provide you with Excellent care and with us. You are in Great Hands</p>
                </div>
            </section>

            {/* -------------------------------------About Section---------------------------------------------- */}

            <section className="about">
                <div className="about-info">
                    <h3>About</h3>
                    <p>Awarded with the top doctor app since 2020. With the collection of most exceptional doctors. We have the greatest appointment system.</p>
                    <a onClick={() => navigate("/about_patient")} className="learn-more">Learn more</a>                </div>
                <img src="/photos/about2.jpg" alt="About" className="about-img" />
            </section>

            {/* -------------------------------------Top Doctors Section -------------------------------------- */}

            <section className="top-doctors">
                <img src="/photos/topdoc3.jpg" alt="Doctor" className="doctor-img" />
                <div className="doctor-list">
                    <h3>Top Doctors</h3>
                    <ol>
                        <li>Dr. Arrows Shakya</li>
                        <li>Dr. Sushi Gautam</li>
                        <li>Dr. Brook Magar</li>
                    </ol>
                    <a href="#">Learn more</a>
                </div>
            </section>

            {/* ------------------------------------------Review Section-------------------------------------- */}

            {/* <section className="reviews">
                <h3>Review</h3>
                <div className="review-box">
                    <div className="review-item">
                        <img src="/photos/person.jpg" alt="User" />
                        <p><strong>Anrows</strong></p>
                        <p>I had a great experience using this website.</p>
                    </div>
                    <div className="review-item">
                        <img src="/photos/person.jpg" alt="User" />
                        <p><strong>Anrows</strong></p>
                        <p>I had a great experience using this website.</p>
                    </div>
                    <div className="review-item">
                        <img src="/photos/person.jpg" alt="User" />
                        <p><strong>Anrows</strong></p>
                        <p>I had a great experience using this website.</p>
                    </div>
                </div>
            </section> */}

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

export default ZenCare;
