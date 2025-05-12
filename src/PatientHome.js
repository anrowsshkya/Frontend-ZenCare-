import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserInfo from './UserInfo';
import Notification from "./components/Notification/Notification";
import bell from "./assets/bell.png";
import "./HomePage.css";

const ZenCare = () => {
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(
        localStorage.getItem("showUserInfoModal") === "true" && !localStorage.getItem("userInfoSubmitted")
    );

    const [showNotification, setShowNotification] = useState(false);

    const handleClick = () => {
        console.log("Profile image clicked!");
        navigate("/MyProfile");
    };

    const handleModalClose = () => {
        localStorage.setItem("userInfoSubmitted", "true");
        localStorage.removeItem("showUserInfoModal");
        setShowModal(false);

        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        console.log("User Info Submitted:", userInfo);
    };

    useEffect(() => {
        if (localStorage.getItem("userInfoSubmitted")) {
            navigate("/PatientHome");
        }
    }, [navigate]);

    const notifications = [
        { id: 1, message: "Your appointment for 2025-05-10 at 11:00 AM has been successfully booked." },
        { id: 2, message: "Your appointment for 2025-05-05 at 03:30 PM has been canceled." }
    ];

    return (
        <div className="container_home">

            <header className="navbar">
                <h1 className="logo">ZenCare</h1>
                <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                    <button onClick={() => setShowNotification(!showNotification)} className="notification-button">
                        <img src={bell} alt="Notifications" style={{ background:'#E0F2FE', width: '24px', height: '24px' }} />
                    </button>
                    <input
                        type="image"
                        src="/photos/profile_image.png"
                        alt="button"
                        onClick={handleClick}
                        style={{ width: '50px', height: 'auto' }}
                    />
                </div>
            </header>

            <nav className="navigation">
                <a href="#">Home</a>  |  <a onClick={() => navigate("/find-doctor")}>Find Doctors</a>
            </nav>

            <section className="hero">
                <div className="hero-text">
                    <h2>Health Can't Be Compromised</h2>
                    <p>We provide you with Excellent care and with us. You are in Great Hands</p>
                </div>
            </section>

            <section className="about">
                <div className="about-info">
                    <h3>About</h3>
                    <p>Awarded with the top doctor app since 2020. With the collection of most exceptional doctors. We have the greatest appointment system.</p>
                    <a onClick={() => navigate("/about_patient")} className="learn-more">Learn more</a>
                </div>
                <img src="/photos/about2.jpg" alt="About" className="about-img" />
            </section>

            <section className="top-doctors">
                <img src="/photos/topdoc3.jpg" alt="Doctor" className="doctor-img" />
                <div className="doctor-list">
                    <h3>Top Doctors</h3>
                    <ol>
                        <li>We hire only the best doctors.</li>
                        <li>The doctors are well qualified and experts.</li>
                        <li>Look through our top listed doctors.</li>
                    </ol>
                    <a onClick={() => navigate("/topdoc")} className="learn-more">Learn more</a>
                </div>
            </section>

            <footer className="footer">
                <h2>ZenCare</h2>
                <p>ZenCare is the largest growing website with 1000+ professional doctors.</p>
                <p>We provide you with utmost care and don't worry about your privacy. We have excellent security and privacy system.</p>
                <p>&copy; Copy Rights Reserved</p>
            </footer>

            {showModal && <UserInfo onClose={handleModalClose} />}
            {showNotification && <Notification notifications={notifications} onClose={() => setShowNotification(false)} />}
        </div>
    );
};

export default ZenCare;
