import Opinion from "../models/Opinion.js";

export const getOpinion = async (req, res) => {
  try {
    const newOpinion = new Opinion(req.body);
    const saved = await newOpinion.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
