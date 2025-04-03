import React from "react";
import "./About.css";

const About = () => {
    return (
        <div className="about-container">
            <header className="navbar">
                <h1 className="logo">ZenCare</h1>
                <nav>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Find Doctors</a></li>
                        <li><a href="#">Book Appointments</a></li>
                    </ul>
                </nav>
            </header>

            <section className="about-section">
                <h2>About</h2>
                <div className="about-content">
                    <p>
                        Welcome to ZenCare, where your health is our priority. We provide seamless
                        online doctor appointments, connecting you with experienced healthcare
                        professionals for in-person and virtual consultations. With a user-friendly
                        booking system and expert medical care, we ensure a hassle-free experience
                        for all your healthcare needs. Book your appointment today and take the first
                        step toward better health!
                    </p>
                    <img src="about-image.jpg" alt="Doctor consultation" />
                </div>
            </section>

            <section className="how-it-works">
                <h2>How it Works</h2>
                <ol>
                    <li>
                        <strong>Find a Doctor</strong> <br />
                        Browse our list of experienced doctors in various specialties using the
                        Find Doctor feature. You can view their profiles, expertise, and availability.
                    </li>
                    <li>
                        <strong>Choose Your Appointment Time</strong> <br />
                        Select a convenient time slot for your consultation. If a preferred time is
                        already booked, you may choose an alternative available slot.
                    </li>
                    <li>
                        <strong>Provide Necessary Details</strong> <br />
                        Enter the required information to confirm your appointment. This helps ensure
                        a smooth consultation process.
                    </li>
                    <li>
                        <strong>Visit the Doctor</strong> <br />
                        Attend your appointment at the scheduled time for an in-person consultation.
                        Our doctors are dedicated to providing high-quality healthcare services.
                    </li>
                    <li>
                        <strong>Access Test Results Online</strong> <br />
                        After your consultation, any test results or medical reports will be securely
                        available online for easy access and review.
                    </li>
                </ol>
            </section>

            <section className="help">
                <h2>Help</h2>
                <p>If you need any kind of assistance, please feel free to contact us at</p>
                <p>Phone: <strong>9876543210</strong></p>
                <p>Email: <strong>assistant@gmail.com</strong></p>
            </section>

            <footer className="footer">
                <h2>ZenCare</h2>
                <p>ZenCare is the largest growing website with 1000+ professional doctors.</p>
                <p>We provide you with utmost care and don't worry about your privacy.
                    We have excellent security and privacy systems.</p>
            </footer>
        </div>
    );
};

export default About;
