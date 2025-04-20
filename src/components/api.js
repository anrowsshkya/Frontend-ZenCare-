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
    return [];
  }
};

// ============================
// Get Prescriptions Needing Lab Tests
// ============================
export const getPrescriptionsNeedingLabTests = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/appointment/lab-tests-required/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching lab test prescriptions:", error.response?.data || error.message);
    throw error;
  }
};

// ============================
// Get Prescription By ID
// ============================
export const getPrescriptionById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/appointment/prescriptions/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching prescription:", error.response?.data || error.message);
    throw error;
  }
};

// ============================
// Submit Lab Report
// ============================
export const submitLabReport = async (reportData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/appointment/reports/create/`, reportData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error submitting lab report:", error.response?.data || error.message);
    throw error;
  }
};

// ============================
// Submit Lab Description
// ============================
export const submitLabDescription = async (id, description) => {
  try {
    await axios.put(`${API_BASE_URL}/appointment/prescriptions/${id}/`, {
      lab_description: description,
      status: "Report Submitted",
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error updating prescription description:", error.response?.data || error.message);
    throw error;
  }
};

// ============================
// Get All Reports for Patient
// ============================
export const getPatientReports = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/appointment/reports/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching patient reports:", error.response?.data || error.message);
    throw error;
  }
};


const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api", // or whatever your Django backend is
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    "Content-Type": "application/json",
  },
});

export default axiosInstance;