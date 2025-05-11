import axios from "axios";

// Base URL of your backend API
const API_BASE_URL = "https://zencare-backend-2.onrender.com/api/v1";

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

export const book = async (appointmentData) => {
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



// ================================
// Function to userProfile a New User
// ================================
export const userProfile = async (token) => {
  console.log(token);

  try {
    // Make POST request to backend with user data
    const response = await axios.get(`${API_BASE_URL}/profile-details/`, {
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
    console.error("Error:", error.response ? error.response.data : error.message);
    throw (error);
  }
};


// ================================
// Function to Cancel Appointments 
// ================================
export const getAppointments = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/appointment/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Check if it's an object with data
    console.log("Raw response for appointments:", response.data);

    // Fix if it's wrapped in an object like { results: [...] }
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


// ================================
// Function to Get Prescriptions That Need Lab Tests
// ================================
export const getPrescriptionsNeedingLabTests = async () => {
  const token = localStorage.getItem("access_token");
  try {
    const response = await axios.get(`${API_BASE_URL}/appointment/prescriptions/`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    // Check for the expected structure
    if (!response.data || !Array.isArray(response.data.results)) {
      console.warn("Unexpected response structure:", response.data);
      return [];
    }

    return response.data.results;  // return only the `results` array
  } catch (error) {
    console.error("Error fetching lab test prescriptions:", error.response?.data || error.message);
    throw error;
  }
};




// Get a specific prescription by ID
export const getPrescriptionById = async (id, token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/appointment/prescriptions/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch prescription: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("API Error (getPrescriptionById):", error);
        throw error;
    }
};



// Submit lab technician's description for a prescription
export const submitLabDescription = async (formData, token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/appointment/reports/create/`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Backend error:", errorData);
            throw new Error("Failed to submit lab description");
        }

        return await response.json();
    } catch (error) {
        console.error("API Error (submitLabDescription):", error);
        throw error;
    }
};



