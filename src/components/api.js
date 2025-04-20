import axios from "axios";

// Base URL of your backend API
const API_BASE_URL = "https://zencare-backend-2.onrender.com";
const token = localStorage.getItem("access_token");

// ================================
// Function to Register a New User
// ================================
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register/`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("Error:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// ============================
// Function to Log in a User
// ============================
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login/`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("Error:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// ============================
// Function to Book Appointment
// ============================
export const book = async (appointmentData) => {
  try {
    const formattedData = {
      doctor: appointmentData.doctorId,
      doctor_name: appointmentData.doctorName,
      appointment_date: appointmentData.date,
      appointment_time: appointmentData.time,
      description: appointmentData.description,
      user: appointmentData.userId
    };

    const response = await axios.post(`${API_BASE_URL}/appointment/create/`, formattedData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error booking appointment:", error.response?.data || error.message);
    throw error;
  }
};

// ============================
// Complete User Profile
// ============================
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
    throw error;
  }
};

// ============================
// Get User Profile Details
// ============================
export const userProfile = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/profile-details/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// ============================
// Fetch All Doctors
// ============================
export const findDoctor = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/doctors/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// ============================
// Get Appointments
// ============================
export const getAppointments = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/appointment/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return Array.isArray(response.data) ? response.data : response.data.results || [];
  } catch (error) {
    console.error("Failed to fetch appointments:", error);
    return []; // Fallback to empty array
  }
};



// ================================
// Function to Save Prescription
// ================================
export const savePrescription = async (data) => {
  const token = localStorage.getItem("access_token");

  try {
    const response = await axios.post(
      `${API_BASE_URL}/appointment/prescriptions/create/`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error saving prescription:", error.response?.data || error.message);
    throw error;
  }
};

