import React from "react";
import { useNavigate } from "react-router-dom";
import "../PopUpHomepage/PopUp.css";

const PopUp = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/login"); // Navigate to Login page
    };

    const handleClose = () => {
        navigate("/"); // Navigate to HomePage (ZenCare)
    };

    return (
        <div className="popup-overlay">
            <div className="popup-modal">
                <h2>Alert !!!</h2>
                <p>You need to Login before you access this content. Please Login.</p>
                <div className="popup-buttons">
                    <button className="login-btn" onClick={handleLogin}>Login</button>
                    <button className="close-btn" onClick={handleClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default PopUp;
