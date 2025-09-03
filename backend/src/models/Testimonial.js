import mongoose from "mongoose";

const TestimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  message: { type: String, required: true },
  avatar: { type: String },
  rating: { type: Number, default: 5 },
});

export default mongoose.model("Testimonial", TestimonialSchema);
