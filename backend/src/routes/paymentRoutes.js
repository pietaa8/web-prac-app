import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import Appointment from "../models/Appointment.js";   // ✅ import Appointment model

const router = express.Router();

// Utility: simple validation helper
function ensureFields(body, fields) {
  for (const f of fields) {
    if (body[f] === undefined || body[f] === null || body[f] === "") {
      return `Missing field: ${f}`;
    }
  }
  return null;
}

/**
 * DEMO ONLY — No real gateway calls.
 * We DO NOT store the password. We only simulate an auth check.
 */

router.post("/bkash",authMiddleware, async(req, res) => {
  const { clientName, amount, currency, password } = req.body;

  const missing = ensureFields(req.body, ["clientName", "amount", "currency", "password"]);
  if (missing) return res.status(400).json({ error: missing });

  if (currency !== "BDT") {
    return res.status(400).json({ error: "bKash requires currency BDT." });
  }
  if (Number(amount) < 500 || Number(amount) > 20000) {
    return res.status(400).json({ error: "Amount must be between 500 and 20000 BDT." });
  }

  if (String(password).length < 4) {
    return res.status(401).json({ error: "Invalid password (demo rule: min 4 chars)." });
  }

  try {
    // ✅ Update appointment in DB
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      {
        paymentStatus: "paid",
        transactionId: "bkash_" + Date.now()
      },
      { new: true }
    );

  

  return res.json({
    success: true,
    method: "bKash",
    currency,
    amount: Number(amount),
    message: `Payment of ${amount} ${currency} by ${clientName} successful via bKash.`,
     user: req.user.name,   // ← you now know who paid
  });
} catch (err) {
    return res.status(500).json({ error: "Failed to update appointment payment." });
  }
});

router.post("/paypal",authMiddleware, async(req, res) => {
  const { clientName, amount, currency, password } = req.body;

  const missing = ensureFields(req.body, ["clientName", "amount", "currency", "password"]);
  if (missing) return res.status(400).json({ error: missing });

  if (currency !== "USD") {
    return res.status(400).json({ error: "PayPal requires currency USD." });
  }
  if (Number(amount) < 5 || Number(amount) > 200) {
    return res.status(400).json({ error: "Amount must be between 5 and 200 USD." });
  }

  if (String(password).length < 4) {
    return res.status(401).json({ error: "Invalid password (demo rule: min 4 chars)." });
  }
  try {
    // ✅ Update appointment in DB
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      {
        paymentStatus: "paid",
        transactionId: "paypal_" + Date.now()
      },
      { new: true }
    );


  return res.json({
    success: true,
    method: "PayPal",
    currency,
    amount: Number(amount),
    message: `Payment of ${amount} ${currency} by ${clientName} successful via PayPal.`,
     user: req.user.name,   // ← now linked to logged-in user
  });
  } catch (err) {
    return res.status(500).json({ error: "Failed to update appointment payment." });
  }

});

export default router;


