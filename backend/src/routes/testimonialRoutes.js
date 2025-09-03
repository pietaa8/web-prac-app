import express from "express";
import { getTestimonials, addTestimonial } from "../controllers/testimonialController.js";

const router = express.Router();

router.get("/", getTestimonials);
router.post("/", addTestimonial);

export default router;
