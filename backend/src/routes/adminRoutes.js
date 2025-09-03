import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import User from "../models/User.js";

const router = express.Router();

// GET all users (admin only)
router.get("/users", authMiddleware, async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// DELETE a user
router.delete("/users/:id", authMiddleware, async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({ message: "User deleted successfully", user });
});

// EDIT a user
router.put("/users/:id", authMiddleware, async (req, res) => {
  const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: "User not found" });
  res.json({ message: "User updated successfully", user: updated });
});

export default router;
