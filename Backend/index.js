import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 8000;

// MongoDB connection
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/mediease";
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// CORS configuration
const corsOptions = {
  origin: true, // Allows all origins; adjust as needed for security
};

// Middleware
app.use(cors(corsOptions)); // Apply CORS with options
app.use(cookieParser()); // Enable cookie parsing
app.use(express.json()); // Parse JSON request bodies

// Basic route
app.get("/", (req, res) => {
  res.send("API is Working");
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
