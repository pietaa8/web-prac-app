// backend/src/routes/appointmentRoutes.js
import express from "express";
import {
  requestAppointment,
  getAppointments,
  updatePaymentStatus,
  getAppointmentsByLawyer,
   updateAppointmentStatus, 
    getMyAppointments,
     getAppointmentById, 
} from "../controllers/appointmentController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// POST /api/appointments  (protected)
router.post("/", authMiddleware, requestAppointment);

// GET /api/appointments  (protected admin or user dashboard)
router.get("/", authMiddleware, getAppointments);

// ✅ Put the "fixed string" route BEFORE the param route
router.get("/lawyer/appointments", authMiddleware, getMyAppointments);

// ✅ Constrain :id to a 24-hex Mongo ObjectId so "appointments" won't match
router.get("/lawyer/:id", authMiddleware, getAppointmentsByLawyer);


// PUT /api/appointments/:id/payment  (update payment status)
router.put("/:id/payment", authMiddleware, updatePaymentStatus);

// PUT /api/appointments/:id/status  (lawyer can approve/reject)
router.put("/:id/status", authMiddleware, updateAppointmentStatus);

// ✅ Single appointment details route
router.get("/:id", authMiddleware, getAppointmentById);



export default router;



