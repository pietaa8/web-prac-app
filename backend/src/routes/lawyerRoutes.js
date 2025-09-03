import express from "express";
import bcrypt from "bcryptjs";
import multer from "multer";
import path from "path";
import User from "../models/User.js"; // lawyers stored in User model

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// 🔒 Hidden route for adding lawyers
router.post("/add", upload.single("photo"), async (req, res) => {
  try {
    const { name, email, password, specialization, experience, bio } = req.body;

    // hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const lawyer = new User({
      name,
      email,
      password: hashedPassword,
      role: "lawyer", // fixed role
      specialization,
      experience,
      bio,
      // ✅ Only save filename, not full path
     photo: req.file ? `http://localhost:5000/uploads/${req.file.filename}` : null,

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


export default router;
