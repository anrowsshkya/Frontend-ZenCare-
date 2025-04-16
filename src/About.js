import React from "react";
import "./About.css";

const About = () => {
    return (
        <div className="aboutPage-container">
            <header className="navbar">
                <h1 className="logo-about">ZenCare</h1>
            </header>

            <nav className="navigation">
                <a href="#">Home</a>  | <a href="#">Find Doctors</a>
            </nav>


            <section className="aboutPage-section">
                <h2 className="aboutPage-heading-first">About</h2>
                <div className="aboutPage-content">
                    <p className="aboutPage-text">
                        Welcome to ZenCare, where your health is our priority. We provide seamless
                        online doctor appointments, connecting you with experienced healthcare
                        professionals for in-person and virtual consultations. With a user-friendly
                        booking system and expert medical care, we ensure a hassle-free experience
                        for all your healthcare needs. Book your appointment today and take the first
                        step toward better health!
                        <br />
                        Our platform is designed with your convenience in mind-offering both in-person visits and secure virtual consultations from the comfort of your home. With an intuitive booking system, flexible scheduling, and transparent doctor profiles, ZenCare empowers you to take charge of your health with confidence.
                    </p>
                    <img src="/photos/about_page.webp" alt="Doctor about page" className="aboutPage-image" />
                </div>

            </section>

            <section className="aboutPage-howItWorks">
                <h4 className="aboutPage-heading-second">How it Works</h4>
                <ol className="aboutPage-steps-ol">
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
                <h2 className="aboutPage-heading-third">Help</h2>
                <div className="aboutPage-contact">
                    <p>If you need any kind of assistance, please feel free to contact us at</p>
                    <p>Phone: <strong>9876543210</strong></p>
                    <p>Email: <strong>assistant@gmail.com</strong></p>
                </div>
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
