import React from "react";
import "./HomePage.css";

const ZenCare: React.FC = () => {
    return (
        <div className="container">

            {/* ------------------------------------------Header Part------------------------------------------ */}


            <header className="navbar">
                <h1 className="logo">ZenCare</h1>
                <div className="auth-buttons">
                    <button className="login">Login</button>
                    <button className="signup">Signup</button>
                </div>
            </header>



            {/* ------------------------Navigation--------------------- */}

            <nav className="navigation">
                <a href="#">Find Doctors</a>  | <a href="#">Book Appointments</a>
            </nav>
            <section className="hero">
                <div className="hero-text">
                    <h2>Health Can't Be Compromised</h2>
                    <p>We provide you with Excellent care and with us You are in Great Hands</p>
                </div>
            </section>


            {/* -------------------------------------About Section---------------------------------------------- */}


            <section className="about">
                <div className="about-info">
                    <h3>About</h3>
                    <p>Awarded with the top doctor app since 2020. With the collection of most exception doctors. We have the greatest appointment system.</p>
                    <a href="#">Learn more</a>
                </div>
                <img src="public/photos/about2.jpg" alt="About" className="about-img" />
            </section>



            {/* -------------------------------------Top Doctors Section -------------------------------------- */}


            <section className="top-doctors">
                <img src="public/photos/topdoc3.jpg" alt="Doctor" className="doctor-img" />
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

            <section className="reviews">
                <h3>Review</h3>
                <div className="review-box">
                    <div className="review-item">
                        <img src="/public/photos/person.jpg" alt="User" />
                        <p><strong>Anrows</strong></p>
                        <p>I had a great experience using this website.</p>
                    </div>
                    <div className="review-item">
                        <img src="/public/photos/person.jpg" alt="User" />
                        <p><strong>Anrows</strong></p>
                        <p>I had a great experience using this website.</p>
                    </div>
                    <div className="review-item">
                        <img src="/public/photos/person.jpg" alt="User" />
                        <p><strong>Anrows</strong></p>
                        <p>I had a great experience using this website.</p>
                    </div>
                </div>
            </section>


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