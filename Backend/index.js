import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";
import bcrypt from "bcryptjs";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

/* -------------------- CORS & body parsers -------------------- */
app.use(
  cors({
    origin: ["http://localhost:5173", "https://lawvault-frontend.vercel.app"],
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);
app.use(express.json()); // for JSON bodies (login, appointments)

/* -------------------- Uploads dir & static -------------------- */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// serve uploaded files as /uploads/...
app.use("/uploads", express.static(uploadDir));

/* -------------------- MongoDB -------------------- */
const uri = process.env.MONGO_URI; // <-- ensure .env has this
if (!uri) {
  console.error("❌ MONGO_URI not set in .env");
  process.exit(1);
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db, usersCollection, appointmentsCollection, lawyersCollection;

async function connectDB() {
  await client.connect();
  db = client.db("lawfirm"); // <-- database name
  usersCollection = db.collection("users");
  appointmentsCollection = db.collection("appointments");
  lawyersCollection = db.collection("lawyers");

  // helpful unique index (won’t throw if already exists)
  try {
    await usersCollection.createIndex({ email: 1 }, { unique: true });
  } catch (_) {}

  console.log("✅ MongoDB Connected");
}
await connectDB();

/* -------------------- Routes -------------------- */

/** Health */
app.get("/", (_req, res) => {
  res.send("🧑‍⚖️ Lawvault server is running");
});

/** --------- AUTH: SIGNUP (multipart/form-data) ---------
 * expects fields: name, email, password, gender?, role?, photo?
 * photo field name must be `photo`
 */
app.post("/signup", upload.single("photo"), async (req, res) => {
  try {
    // NOTE: this is multipart/form-data, so values come from req.body and req.file
    const {
      name,
      email,
      password,
      gender = "unspecified",
      role = "client",
    } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required" });
    }

    // Check existing
    const existing = await usersCollection.findOne({ email });
    if (existing) {
      return res
        .status(409)
        .json({ message: "User already exists with this email" });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Photo URL to return & store
    const photoUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const result = await usersCollection.insertOne({
      name,
      email,
      password: hashed,
      gender,
      role,
      photo: photoUrl,
      createdAt: new Date(),
    });

    return res.status(201).json({
      message: "Signup successful",
      userId: result.insertedId,
      photo: photoUrl,
    });
  } catch (err) {
    // duplicate key error from unique index
    if (err?.code === 11000) {
      return res
        .status(409)
        .json({ message: "User already exists with this email" });
    }
    console.error("Signup Error:", err);
    return res.status(500).json({ message: "Server error during signup" });
  }
});

/** --------- AUTH: LOGIN (application/json) ---------
 * expects JSON body: { email, password }
 */
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await usersCollection.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // send safe subset (never the hash)
    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        gender: user.gender,
        photo: user.photo,
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({ message: "Server error during login" });
  }
});

/** --------- APPOINTMENTS (application/json) ---------
 * POST /appointments -> { name, email, phone, date, time, message? }
 */
app.post("/appointments", async (req, res) => {
  try {
    const { name, email, phone, date, time, message = "" } = req.body || {};
    if (!name || !email || !phone || !date || !time) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const doc = {
      name,
      email,
      phone,
      date,
      time,
      message,
      createdAt: new Date(),
    };

    const result = await appointmentsCollection.insertOne(doc);

    return res.status(201).json({
      message: "Appointment booked successfully",
      appointmentId: result.insertedId,
    });
  } catch (err) {
    console.error("Appointment Error:", err);
    return res
      .status(500)
      .json({ message: "Server error while booking appointment" });
  }
});

/** Optional: fetch all appointments (for admin) */
app.get("/appointments", async (_req, res) => {
  try {
    const list = await appointmentsCollection
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    return res.status(200).json(list);
  } catch (err) {
    console.error("Get Appointments Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

/** --------- LAWYERS (optional, kept from your code) --------- */
app.get("/lawyers", async (_req, res) => {
  try {
    const result = await lawyersCollection.find().toArray();
    res.send(result);
  } catch (err) {
    res.status(500).json({ message: "Error fetching lawyers" });
  }
});

app.get("/lawyers/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await lawyersCollection.findOne({ _id: new ObjectId(id) });
    res.send(result);
  } catch (err) {
    res.status(500).json({ message: "Error fetching lawyer" });
  }
});

app.post("/lawyers", async (req, res) => {
  const newLawyer = req.body;
  const result = await lawyersCollection.insertOne(newLawyer);
  res.send(result);
});

app.delete("/lawyers/:id", async (req, res) => {
  const id = req.params.id;
  const result = await lawyersCollection.deleteOne({ _id: new ObjectId(id) });
  res.send(result);
});

/* -------------------- Start server -------------------- */
app.listen(port, () => {
  console.log(`⚖️ Server listening on port ${port}`);
});
