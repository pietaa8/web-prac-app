 import axios from "axios";
import BASE_URL from "@/config.js";   // adjust the path depending on your folder

axios.defaults.baseURL = BASE_URL;

export default axios;


// --------------------- User Auth ---------------------

// Signup (Register new user)
export const signupUser = async (formData) => {
  try {
    const response = await axios.post(`/users/signup`, formData, {
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
    const response = await axios.post(`/users/login`, credentials);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    return { success: false, message: "Failed to login" };
  }
};

// --------------------- Lawyers ---------------------
export const getLawyers = async () => {
  try {
    const response = await axios.get(`/lawyers`);
    return response.data; // array of lawyers
  } catch (error) {
    console.error("Error fetching lawyers:", error);
    return [];
  }
};



// --------------------- Testimonials ---------------------
export const getTestimonials = async () => {
  try {
    const response = await axios.get(`/testimonials`);
    return response.data; // array of testimonials
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }
};

// --------------------- FAQs ---------------------
export const getFAQs = async () => {
  try {
    const response = await axios.get(`/faqs`);
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
    const response = await axios.post(`/appointments`, appointmentData, {
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
    const response = await axios.post(`/opinions`, opinionData);
    return response.data; // opinion result or confirmation
  } catch (error) {
    console.error("Error getting opinion:", error);
    return { success: false, message: "Failed to get opinion" };
  }
};

