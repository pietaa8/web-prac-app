// models/Lawyer.js
import mongoose from "mongoose";

const LawyerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  experience: {
    type: Number, // in years
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  image: {
    type: String, // URL of lawyer's image
    required: true,
  },
  description: {
    type: String, // short bio/intro
    required: true,
  },
  availableSlots: {
    type: [String], // e.g. ["10:00 AM", "11:30 AM", "2:00 PM"]
    default: [],
  },
  reviews: [
  {
    clientName: String,
    rating: Number,
    comment: String,
  }
]

});

export default mongoose.model("Lawyer", LawyerSchema);
