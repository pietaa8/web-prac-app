import 'dotenv/config'; // ✅ MUST be first before anything else
import express from "express";
import path from "path";
import mongoose from "mongoose";
import cors from "cors";


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


const app = express();


app.use(cors({
  origin: function(origin, callback) {
    const allowedOrigins = [
      "http://localhost:5173",       // local dev frontend
      "https://lawvault-app.surge.sh" // production frontend
    ];
    if (!origin) return callback(null, true); // allow Postman or server-to-server requests
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = "The CORS policy for this site does not allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads"))); // ✅ Serve uploaded photos

// Routes
app.get("/", (req, res) => res.send("Backend is live!"));
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
const PORT = process.env.PORT || 5000;   // <--- for deployment
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas");
        app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  })
  .catch((err) => console.error("❌ DB connection error:", err));
