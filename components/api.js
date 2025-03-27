import axios from "axios";

const API_BASE_URL = "https://zencare-backend-2.onrender.com";

// Register User Function
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register/`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error:", error.response ? error.response.data : error.message);
  }
};

// Login User Function (Assuming this exists)
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login/`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error:", error.response ? error.response.data : error.message);
  }
};
