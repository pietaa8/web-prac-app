import Testimonial from "../models/Testimonial.js";

export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addTestimonial = async (req, res) => {
  try {
    const newTestimonial = new Testimonial(req.body);
    const saved = await newTestimonial.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
