import express from "express";
import bcrypt from "bcryptjs";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary.js";  // ✅ your cloudinary config
import User from "../models/User.js"; // lawyers stored in User model

const router = express.Router();

// ✅ Cloudinary Multer storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "lawvault", // folder name in Cloudinary
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});
const upload = multer({ storage });

// 🔒 Hidden route for adding lawyers
router.post("/add", upload.single("photo"), async (req, res) => {
  try {
    const { name, email, password, specialization, experience, bio } = req.body;

    // hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const backendUrl = process.env.BACKEND_URL || "http://localhost:5000";
    const lawyer = new User({
      name,
      email,
      password: hashedPassword,
      role: "lawyer", // fixed role
      specialization,
      experience,
      bio,
     // ✅ Cloudinary gives URL directly
      photo: req.file ? req.file.path : null,

    });

    await lawyer.save();
    res
      .status(201)
      .json({ message: "Lawyer created successfully", lawyer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get all lawyers
router.get("/", async (req, res) => {
  try {
    const lawyers = await User.find({ role: "lawyer" });
    res.json(lawyers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// lawyerRoutes.js
router.get("/:id", async (req, res) => {
  try {
    const lawyer = await User.findById(req.params.id);
    if (!lawyer) return res.status(404).json({ message: "Lawyer not found" });
    res.json(lawyer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// ✅ Delete lawyer by ID
router.delete("/:id", async (req, res) => {
  try {
    const lawyer = await User.findByIdAndDelete(req.params.id);
    if (!lawyer) {
      return res.status(404).json({ message: "Lawyer not found" });
    }
    res.json({ message: "Lawyer deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



export default router;
