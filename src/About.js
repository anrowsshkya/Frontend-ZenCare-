import React from "react";
import "./About.css";

const About = () => {
    return (
        <div className="aboutPage-container">
            <header className="aboutPage-navbar">
                <h1 className="aboutPage-logo">ZenCare</h1>
                <nav>
                    <ul className="aboutPage-navLinks">
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Find Doctors</a></li>
                    </ul>
                </nav>
            </header>

            <section className="aboutPage-section">
                <h2 className="aboutPage-heading">About</h2>
                <div className="aboutPage-content">
                    <p className="aboutPage-text">
                        Welcome to ZenCare, where your health is our priority. We provide seamless
                        online doctor appointments, connecting you with experienced healthcare
                        professionals for in-person and virtual consultations. With a user-friendly
                        booking system and expert medical care, we ensure a hassle-free experience
                        for all your healthcare needs. Book your appointment today and take the first
                        step toward better health!
                    </p>
                    <img src="/photos/about_page.webp" alt="Doctor about page" className="aboutPage-image" />
                </div>
            </section>

            <section className="aboutPage-howItWorks">
                <h2 className="aboutPage-heading">How it Works</h2>
                <ol className="aboutPage-steps">
                    <li className="aboutPage-step">
                        <strong>Find a Doctor</strong> <br />
                        Browse our list of experienced doctors in various specialties using the
                        Find Doctor feature. You can view their profiles, expertise, and availability.
                    </li>
                    <li className="aboutPage-step">
                        <strong>Choose Your Appointment Time</strong> <br />
                        Select a convenient time slot for your consultation. If a preferred time is
                        already booked, you may choose an alternative available slot.
                    </li>
                    <li className="aboutPage-step">
                        <strong>Provide Necessary Details</strong> <br />
                        Enter the required information to confirm your appointment. This helps ensure
                        a smooth consultation process.
                    </li>
                    <li className="aboutPage-step">
                        <strong>Visit the Doctor</strong> <br />
                        Attend your appointment at the scheduled time for an in-person consultation.
                        Our doctors are dedicated to providing high-quality healthcare services.
                    </li>
                    <li className="aboutPage-step">
                        <strong>Access Test Results Online</strong> <br />
                        After your consultation, any test results or medical reports will be securely
                        available online for easy access and review.
                    </li>
                </ol>
            </section>

            <section className="aboutPage-help">
                <h2 className="aboutPage-heading">Help</h2>
                <p className="aboutPage-text">If you need any kind of assistance, please feel free to contact us at</p>
                <p className="aboutPage-contact">Phone: <strong>9876543210</strong></p>
                <p className="aboutPage-contact">Email: <strong>assistant@gmail.com</strong></p>
            </section>

            <footer className="aboutPage-footer">
                <h2 className="aboutPage-footerHeading">ZenCare</h2>
                <p className="aboutPage-footerText">ZenCare is the largest growing website with 1000+ professional doctors.</p>
                <p className="aboutPage-footerText">We provide you with utmost care and don't worry about your privacy.
                    We have excellent security and privacy systems.</p>
            </footer>
        </div>
    );
};

export default About;
