import express from "express";
import multer from "multer";
import path from "path";
import { registerUser, loginUser, getUsers } from "../controllers/userController.js";

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Routes

router.post("/signup", upload.single("photo"), registerUser);
router.post("/login", loginUser);
router.get("/", getUsers);

export default router;




