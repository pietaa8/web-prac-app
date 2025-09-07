import express from "express";
import User from "../models/User.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Add a review to a lawyer (protected)
router.post("/:lawyerId", authMiddleware, async (req, res) => {
  const { lawyerId } = req.params;
  const { rating, review } = req.body;

  try {
    const lawyer = await User.findById(lawyerId);
    if (!lawyer || lawyer.role !== "lawyer") {
      return res.status(404).json({ message: "Lawyer not found" });
    }

 // Initialize reviews array if not exists
    lawyer.reviews = lawyer.reviews || [];

    // Prevent duplicate reviews from same client
    const alreadyReviewed = lawyer.reviews.find(
      (r) => r.clientId.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      return res.status(400).json({ message: "You already reviewed this lawyer" });
    }


    // Add review
    lawyer.reviews.push({
      clientId: req.user._id,
      name: req.user.name,
         photo: req.user.photo || "", // ✅ Add photo
      rating,
      review,
    });

   // Update status
    lawyer.totalRating = lawyer.reviews.length;
    lawyer.averageRating =
      lawyer.reviews.reduce((acc, item) => acc + item.rating, 0) /
      lawyer.totalRating;


    await lawyer.save();

    res
      .status(201)
      .json({ message: "Review added successfully", 
              reviews: lawyer.reviews });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all reviews for a lawyer
router.get("/:lawyerId", async (req, res) => {
  const { lawyerId } = req.params;

  try {
    const lawyer = await User.findById(lawyerId);
    if (!lawyer || lawyer.role !== "lawyer") {
      return res.status(404).json({ message: "Lawyer not found" });
    }

    res.json(lawyer.reviews || []);
  } catch (err) {
      console.error("Get reviews error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
