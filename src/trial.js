// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom"; // For navigation
// import "./HomePage.css";

// const ZenCare = () => {
//     // State for storing top doctors
//     const [doctors, setDoctors] = useState([]);

//     // Default doctors list
//     const defaultDoctors = [
//         { name: "Dr. Arrows Shakya" },
//         { name: "Dr. Sushi Gautam" },
//         { name: "Dr. Brook Magar" }
//     ];

//     // Fetch data for Top Doctors or fallback to default
//     useEffect(() => {
//         const fetchDoctors = async () => {
//             try {
//                 const response = await fetch("https://api.example.com/top-doctors");
//                 if (response.ok) {
//                     const data = await response.json();
//                     setDoctors(data); // Assuming the data returned is an array of doctors
//                 } else {
//                     setDoctors(defaultDoctors); // API failed, using default
//                 }
//             } catch (error) {
//                 console.error("Error fetching top doctors:", error);
//                 setDoctors(defaultDoctors); // API error, using default
//             }
//         };

//         fetchDoctors();
//     }, []);

//     return (
//         <div className="container">

//             {/* Header Part */}
//             <header className="navbar">
//                 <h1 className="logo">ZenCare</h1>
//                 <div className="auth-buttons">
//                     <button className="login">Login</button>
//                     <button className="signup">Signup</button>
//                 </div>
//             </header>

//             {/* Navigation */}
//             <nav className="navigation">
//                 <Link to="/find-doctors">Find Doctors</Link> | <Link to="/book-appointments">Book Appointments</Link>
//             </nav>

//             {/* Hero Section */}
//             <section className="hero">
//                 <div className="hero-text">
//                     <h2>Health Can't Be Compromised</h2>
//                     <p>We provide you with Excellent care and with us You are in Great Hands</p>
//                 </div>
//             </section>

//             {/* About Section */}
//             <section className="about">
//                 <div className="about-info">
//                     <h3>About</h3>
//                     <p>Awarded with the top doctor app since 2020. With the collection of most exceptional doctors. We have the greatest appointment system.</p>
//                     <Link to="/about">Learn more</Link>
//                 </div>
//                 <img src="/photos/about2.jpg" alt="About" className="about-img" />
//             </section>

//             {/* Top Doctors Section */}
//             <section className="top-doctors">
//                 <img src="/photos/topdoc3.jpg" alt="Doctor" className="doctor-img" />
//                 <div className="doctor-list">
//                     <h3>Top Doctors</h3>
//                     <ol>
//                         {doctors.map((doctor, index) => (
//                             <li key={index}>{doctor.name}</li> // Assuming doctor object has a 'name' field
//                         ))}
//                     </ol>
//                     <Link to="/top-doctors">Learn more</Link>
//                 </div>
//             </section>

//             {/* Review Section */}
//             <section className="reviews">
//                 <h3>Review</h3>
//                 <div className="review-box">
//                     <div className="review-item">
//                         <img src="/photos/person.jpg" alt="User" />
//                         <p><strong>Anrows</strong></p>
//                         <p>I had a great experience using this website.</p>
//                     </div>
//                     {/* Other review items */}
//                 </div>
//             </section>

//             {/* Footer Part */}
//             <footer className="footer">
//                 <h2>ZenCare</h2>
//                 <p>ZenCare is the largest growing website with 1000+ professional doctors.</p>
//                 <p>We provide you with utmost care and don't worry about your privacy. We have excellent security and privacy system.</p>
//                 <p>&copy; Copy Rights Reserved</p>
//             </footer>
//         </div>
//     );
// };

// export default ZenCare;
