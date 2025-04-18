import axios from "axios";

// Base URL of your backend API
const API_BASE_URL = "https://zencare-backend-2.onrender.com";

// ================================
// Function to Register a New User
// ================================
export const registerUser = async (userData) => {
  try {
    // Make POST request to backend with user data
    const response = await axios.post(`${API_BASE_URL}/auth/register/`, userData, {
      headers: {
        "Content-Type": "application/json", // Ensures data is sent in JSON format
      },
    });
    return response.data; // Return the response data (e.g., success message)
  } catch (error) {
    // Log error message from server or general error
    console.error("Error:", error.response ? error.response.data : error.message);
  }
};

// ============================
// Function to Log in a User
// ============================
export const loginUser = async (userData) => {
  try {
    // Make POST request to login endpoint with credentials
    const response = await axios.post(`${API_BASE_URL}/auth/login/`, userData, {
      headers: {
        "Content-Type": "application/json", // Sends data in JSON format
      },
    });
    return response.data; // Return token or user info on success
  } catch (error) {
    // Log error message from server or general error
    console.error("Error:", error.response ? error.response.data : error.message);
  }
};

export const book = async (appointmentData) => {
  const token = localStorage.getItem("access_token");
  try {
    // Transform the data to match the expected field names
    const formattedData = {
      // Send doctor as a primary key value
      doctor: appointmentData.doctorId,
      doctor_name: appointmentData.doctorName, // Include doctor's name
      appointment_date: appointmentData.date, // Should be in YYYY-MM-DD format
      appointment_time: appointmentData.time, // Should be in hh:mm format
      description: appointmentData.description,
      user: appointmentData.userId // Send user as a primary key value
    };
    
    console.log("Sending to API:", formattedData);
    
    // Make POST request to backend with appointment data
    const response = await axios.post(`${API_BASE_URL}/appointment/create/`, formattedData, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    return response; // Return the response data (e.g., success message)
  } catch (error) {
    // Log the full error response
    console.error("Error booking appointment:", error.response ? error.response.data : error.message);
    console.error("Full error response:", error.response);
    throw error; // Re-throw the error to be handled by the component
  }
};
