import axios from "axios";
axios.defaults.baseURL = "http://localhost:5000";
export default axios;
import express from "express";
import path from "path";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/userRoutes.js";
import lawyerRoutes from "./routes/lawyerRoutes.js";
import faqRoutes from "./routes/faqRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import opinionRoutes from "./routes/opinionRoutes.js";
import authTestRoutes from "./routes/authTest.js";
//import paymentRoutes from "./routes/paymentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import adminLawyerRoutes from "./routes/adminLawyerRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads"))); // ✅ Serve uploaded photos

// Routes
app.use("/api/users", userRoutes);
app.use("/api/lawyers", lawyerRoutes);
app.use("/api/faqs", faqRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/opinions", opinionRoutes);
app.use("/api", authTestRoutes);
//app.use("/api/payments", paymentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/lawyers", adminLawyerRoutes);
app.use("/api/reviews", reviewRoutes);


// DB + Server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas");
    app.listen(process.env.PORT, () =>
      console.log(`🚀 Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error("❌ DB connection error:", err));
