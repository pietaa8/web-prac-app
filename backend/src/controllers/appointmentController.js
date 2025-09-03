// backend/src/controllers/appointmentController.js
import mongoose from "mongoose";
import Appointment from "../models/Appointment.js";
import User from "../models/User.js"; // lawyers are in User model

// Create appointment
export const requestAppointment = async (req, res) => {
  try {
    // accept either lawyer or lawyerId from client for flexibility
    const { name, email, phone, date, time, lawyerId, paymentStatus } = req.body;
    const lawyerRef = lawyerId; // only use lawyerId from frontend


    if (!name || !email || !phone || !date || !time || !lawyerRef) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(lawyerRef)) {
      return res.status(400).json({ error: "Invalid lawyer id" });
    }

    // ensure lawyer exists (in users collection with role 'lawyer')
    const lawyerDoc = await User.findById(lawyerRef);
    if (!lawyerDoc || lawyerDoc.role !== "lawyer") {
      return res.status(404).json({ error: "Lawyer not found" });
    }

    const newAppointment = new Appointment({
      client: req.user._id, // logged-in user
      name,
      email,
      phone,
      date,
      time,
      lawyer: lawyerRef,
      paymentStatus: paymentStatus || "pending",
    });

   // Save first
let saved = await newAppointment.save();

// ✅ Populate lawyer info immediately
saved = await saved.populate("lawyer", "name email specialization");

    return res.status(201).json({
      message: "Appointment booked successfully!",
      appointment: saved,
    });
  } catch (err) {
    console.error("requestAppointment error:", err);
    return res.status(500).json({ error: err.message || "Server error" });
  }
};

// Get all appointments (admin)
export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .sort({ createdAt: -1 })
      .populate("lawyer", "name email photo specialization");
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

 export const getMyAppointments = async (req, res) => {
  try {
    // Must be a logged-in lawyer (comes from authMiddleware)
    if (!req.user || req.user.role !== "lawyer") {
      return res.status(403).json({ error: "Access denied. Not a lawyer." });
    }

    const lawyerId = req.user._id;

    const appointments = await Appointment.find({ lawyer: lawyerId })
      .sort({ createdAt: -1 })
      .populate("client", "name email")          // ✅ schema field is "client"
      .populate("lawyer", "name email");

    res.json(appointments);
  } catch (err) {
    console.error("getMyAppointments error:", err);
    res.status(500).json({ error: err.message });
  }
};
// Get appointments for a single lawyer
export const getAppointmentsByLawyer = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid lawyer id" });
    }
    const appointments = await Appointment.find({ lawyer: id })
      .sort({ createdAt: -1 })
      .populate("client", "name email")
      .populate("lawyer", "name email photo specialization");
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// Update payment status
export const updatePaymentStatus = async (req, res) => {
  try {
    const { id } = req.params; // appointment id
    const { status, transactionId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid appointment id" });
    }

    if (!["pending", "paid", "cancelled"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const updated = await Appointment.findByIdAndUpdate(
      id,
      { paymentStatus: status, transactionId: transactionId || null },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Appointment not found" });

    res.json({ message: "Payment status updated successfully!", appointment: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Handles APPOINTMENT updates
// Example: "pending" → "accepted"
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // 'accepted' or 'cancelled'

    if (!["accepted", "cancelled"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const updated = await Appointment.findByIdAndUpdate(
      id,
      { status, paymentStatus: status === "accepted" ? "paid" : undefined },  // <-- appointment status (different from paymentStatus)
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Appointment not found" });

    res.json({ message: "Appointment status updated successfully!", appointment: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid appointment id" });
    }

    const appointment = await Appointment.findById(id)
      .populate("client", "name email")
      .populate("lawyer", "name email specialization photo");

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    res.json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




