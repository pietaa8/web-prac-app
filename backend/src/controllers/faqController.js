import FAQ from "../models/Faq.js";

export const getFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find();
    res.json(faqs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addFAQ = async (req, res) => {
  try {
    const newFAQ = new FAQ(req.body);
    const saved = await newFAQ.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
