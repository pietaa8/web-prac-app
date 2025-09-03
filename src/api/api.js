import axios from "axios";

// Base URL of your backend
const BASE_URL = "http://localhost:5000/api"; // change 5000 if your backend port is different

// --------------------- User Auth ---------------------

// Signup (Register new user)
export const signupUser = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/signup`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error signing up:", error);
    return { success: false, message: "Failed to signup" };
  }
};


// Login (Authenticate user)
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/login`, credentials);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    return { success: false, message: "Failed to login" };
  }
};

// --------------------- Lawyers ---------------------
export const getLawyers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/lawyers`);
    return response.data; // array of lawyers
  } catch (error) {
    console.error("Error fetching lawyers:", error);
    return [];
  }
};



// --------------------- Testimonials ---------------------
export const getTestimonials = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/testimonials`);
    return response.data; // array of testimonials
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }
};

// --------------------- FAQs ---------------------
export const getFAQs = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/faqs`);
    return response.data; // array of FAQs
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return [];
  }
};

// --------------------- Request Appointment ---------------------
export const requestAppointment = async (appointmentData) => {
  try {
    const token = localStorage.getItem("token"); // get saved JWT
    const response = await axios.post(`${BASE_URL}/appointments`, appointmentData, {
      headers: {
        Authorization: `Bearer ${token}`, // send token
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error requesting appointment:", error.response?.data || error.message);
    return { success: false, message: "Failed to request appointment" };
  }
};


// --------------------- Get Opinion ---------------------
export const getOpinion = async (opinionData) => {
  try {
    const response = await axios.post(`${BASE_URL}/opinions`, opinionData);
    return response.data; // opinion result or confirmation
  } catch (error) {
    console.error("Error getting opinion:", error);
    return { success: false, message: "Failed to get opinion" };
  }
};

