import jwt from "jsonwebtoken";
import express from "express";

const router = express.Router();

// Protected route
router.get("/me", (req, res) => {
  const authHeader = req.headers.authorization;

  // Check if token is provided
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Format: "Bearer <token>"
  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    // If token valid
    res.json({
      message: "Access granted ✅",
      user: decoded, // contains payload you put when creating token (e.g. {id, email})
    });
  });
});

export default router;
