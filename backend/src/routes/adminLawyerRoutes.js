// backend/routes/adminLawyerRoutes.js
import express from "express";
import User from "../models/User.js"; // lawyers stored in User model
import { authMiddleware, adminMiddleware } from "../middleware/auth.js";

const router = express.Router();

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

// ✅ Update lawyer (no /edit anymore)
router.put("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const updatedLawyer = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedLawyer)
      return res.status(404).json({ message: "Lawyer not found" });

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

