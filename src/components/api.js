import axios from "axios";

// Base URL of your backend API
const API_BASE_URL = "https://zencare-backend-2.onrender.com";

const token = localStorage.getItem("access_token");


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
    return response; // Return the response data (e.g., success message)
  } catch (error) {
    // Log error message from server or general error
    console.error("Error:", error.response ? error.response.data : error.message);
    throw (error);
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
    return response; // Return token or user info on success
  } catch (error) {
    // Log error message from server or general error
    console.error("Error:", error.response ? error.response.data : error.message);
    throw (error);
  }
};




// ================================
// Function to FindDoctors a New User
// ================================
export const findDoctor = async () => {
  console.log(token);

  try {
    // Make POST request to backend with user data
    const response = await axios.get(`${API_BASE_URL}/doctors/`, {
      headers: {
        "Content-Type": "application/json", // Ensures data is sent in JSON format
        "Authorization": `Bearer ${token}`, // attach token here

      },
    });
    return response; // Return the response data (e.g., success message)
  } catch (error) {
    // Log error message from server or general error
    console.error("Error:", error.response ? error.response.data : error.message);
    throw (error);
  }
};






// ================================
// Function to UserInfo a New User
// ================================
export const userInfo = async (formData, token) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/complete-profile/`, formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw (error);
  }
};
