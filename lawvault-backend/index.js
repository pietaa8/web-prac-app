import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import bcrypt from "bcryptjs";
import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";
import fs from "fs";
import path from "path";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// ==================== MIDDLEWARE ====================
app.use(cors());
app.use(express.json());

// Ensure uploads folder exists
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// Serve static uploads
app.use("/uploads", express.static(uploadDir));

// ==================== MONGO DB ====================
const client = new MongoClient(process.env.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let usersCollection, lawyersCollection, appointmentsCollection;

async function connectDB() {
  try {
    await client.connect();
    const db = client.db("lawfirm");
    usersCollection = db.collection("users");
    lawyersCollection = db.collection("lawyers");
    appointmentsCollection = db.collection("appointments");
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
  }
}
connectDB();

// ==================== ROUTES ====================

// Root
app.get("/", (req, res) => res.send("🚀 LawVault Backend Running"));

// -------- SIGNUP --------
app.post("/signup", upload.single("photo"), async (req, res) => {
  try {
    const { name, email, password, gender, role } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, error: "All fields required" });
    }

    // Duplicate check
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser)
      return res
        .status(409)
        .json({ success: false, error: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const photoUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const newUser = {
      name,
      email,
      password: hashedPassword,
      gender,
      role,
      photoUrl,
      createdAt: new Date(),
    };
    const result = await usersCollection.insertOne(newUser);

    res
      .status(201)
      .json({ success: true, userId: result.insertedId, photoUrl });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ success: false, error: "Signup failed" });
  }
});

// -------- LOGIN --------
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, error: "All fields required" });

    const user = await usersCollection.findOne({ email });
    if (!user)
      return res
        .status(401)
        .json({ success: false, error: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(401)
        .json({ success: false, error: "Invalid email or password" });

    // Remove password from response
    const { password: _, ...userData } = user;
    res.status(200).json({ success: true, user: userData });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ success: false, error: "Login failed" });
  }
});

// -------- BOOK APPOINTMENT --------
app.post("/appointments", async (req, res) => {
  try {
    const { clientName, lawyerId, date, time, message } = req.body;

    if (!clientName || !lawyerId || !date || !time) {
      return res
        .status(400)
        .json({ success: false, error: "All fields required" });
    }

    if (!ObjectId.isValid(lawyerId)) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid lawyerId" });
    }

    const appointment = {
      clientName,
      lawyerId: new ObjectId(lawyerId),
      date,
      time,
      message: message || "",
      status: "pending",
      createdAt: new Date(),
    };

    const result = await appointmentsCollection.insertOne(appointment);
    res.status(201).json({ success: true, appointmentId: result.insertedId });
  } catch (err) {
    console.error("Appointment Error:", err);
    res
      .status(500)
      .json({ success: false, error: "Appointment booking failed" });
  }
});

// -------- GET ALL APPOINTMENTS --------
app.get("/appointments", async (req, res) => {
  try {
    const appointments = await appointmentsCollection.find().toArray();
    res.status(200).json(appointments);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch appointments" });
  }
});

// -------- GET ALL LAWYERS --------
app.get("/lawyers", async (req, res) => {
  try {
    const lawyers = await lawyersCollection.find().toArray();
    res.status(200).json(lawyers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to fetch lawyers" });
  }
});

// ==================== START SERVER ====================
app.listen(port, () => console.log(`✅ Server running on port ${port}`));
