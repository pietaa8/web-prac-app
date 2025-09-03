import mongoose from "mongoose";

const OpinionSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  question: { type: String, required: true },
  answer: { type: String },
});

export default mongoose.model("Opinion", OpinionSchema);
