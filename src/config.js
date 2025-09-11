// config.js
let BASE_URL = "";

if (process.env.NODE_ENV === "production") {
  BASE_URL = "https://lawvault.onrender.com/api"; // ✅ your deployed backend
} else {
  BASE_URL = "http://localhost:5000/api"; // ✅ your local backend
}

export default BASE_URL;

