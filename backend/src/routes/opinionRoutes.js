import express from "express";
import { getOpinion } from "../controllers/opinionController.js";

const router = express.Router();

router.post("/", getOpinion);

export default router;
