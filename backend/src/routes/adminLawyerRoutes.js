// backend/routes/adminLawyerRoutes.js
import express from "express";
import multer from "multer";  
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary.js";  // ✅ your cloudinary config
import bcrypt from "bcrypt"; 
import User from "../models/User.js"; // lawyers stored in User model
import { authMiddleware, adminMiddleware } from "../middleware/auth.js";

const router = express.Router();
// ✅ Cloudinary Multer storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "lawvault", // 📂 Cloudinary folder
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});
const upload = multer({ storage });

// 🔒 Add lawyer
router.post("/add", upload.single("photo"), async (req, res) => {
  try {
    const { name, email, password, specialization, experience, bio } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const lawyer = new User({
      name,
      email,
      password: hashedPassword,
      role: "lawyer",
      specialization,
      experience,
      bio,
      photo: req.file ? req.file.path : null, // ✅ Cloudinary URL
    });

    await lawyer.save();
    res.status(201).json({ message: "Lawyer created successfully", lawyer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get all lawyers
router.get("/", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const lawyers = await User.find({ role: "lawyer" });
    res.json(lawyers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get single lawyer
router.get("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const lawyer = await User.findById(req.params.id);
    if (!lawyer) return res.status(404).json({ message: "Lawyer not found" });
    res.json(lawyer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Update lawyer (with photo support)
router.put("/:id", authMiddleware, adminMiddleware, upload.single("photo"), async (req, res) => {
  try {
    const updates = { ...req.body };

    // If new photo uploaded, replace old one
    if (req.file) {
      updates.photo = req.file.path; // ✅ Cloudinary gives direct URL
    }

    // Hash password only if updated
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const updatedLawyer = await User.findByIdAndUpdate(req.params.id, updates, { new: true });

    if (!updatedLawyer) return res.status(404).json({ message: "Lawyer not found" });

    res.json({ message: "Lawyer updated successfully", lawyer: updatedLawyer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Delete lawyer (no /delete anymore)
router.delete("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const deletedLawyer = await User.findByIdAndDelete(req.params.id);
    if (!deletedLawyer)
      return res.status(404).json({ message: "Lawyer not found" });

    res.json({ message: "Lawyer deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

