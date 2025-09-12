import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary.js";  // ✅ your cloudinary config
import { registerUser, loginUser, getUsers } from "../controllers/userController.js";

const router = express.Router();

// ✅ Multer setup for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "lawvault", // 📂 all uploads will go into this folder in your Cloudinary account
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage });

// Routes

router.post("/signup", upload.single("photo"), registerUser);
router.post("/login", loginUser);
router.get("/", getUsers);

export default router;




