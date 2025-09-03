import express from "express";
import { getFAQs, addFAQ } from "../controllers/faqController.js";

const router = express.Router();

router.get("/", getFAQs);
router.post("/", addFAQ);

export default router;
