import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Signup / Register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, gender } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const backendUrl = process.env.BACKEND_URL || "http://localhost:5000";
const photo = req.file
  ? `${backendUrl}/${req.file.path.replace(/\\/g, "/")}`
  : null;

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      gender,
      photo,
    });

    res.status(201).json({ message: "User registered successfully.", user: newUser });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Login
export const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email, role });
    if (!user) return res.status(404).json({ message: "User not found." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password." });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      message: "Login successful",
      user: { id: user._id, name: user.name, email: user.email, role: user.role, photo: user.photo },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET all users (for testing)
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
