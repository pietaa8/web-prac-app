import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema(
  {
    client: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Add this
    name: { type: String, required: true },       // client name
    email: { type: String, required: true },      // client email
    phone: { type: String, required: true },      // client phone

    lawyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",   // links to User collection (lawyers)
      required: true,
    },

    date: { type: String, required: true },       // appointment date
    time: { type: String, required: true },       // appointment time

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "cancelled"],    // payment status
      default: "pending",
    },

    status: {
      type: String,
      enum: ["pending", "accepted", "cancelled"], // appointment approval status
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Appointment", AppointmentSchema);
