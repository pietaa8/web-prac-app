import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: String,
  photo: String,
  rating: { type: Number, required: true },
  review: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
   role: { type: String, enum: ["client", "lawyer",  "admin"], default: "client" },
  gender: { type: String, enum: ["male", "female", "other"] },
  specialization: { type: String,  }, // only used for lawyers
  experience: { type: Number, }, // in years (for lawyers)
  bio: { type: String, },
  photo: { type: String },
  clientsCount: { type: Number, default: 0 }, // <-- NEW
   createdAt: {type: Date, default: Date.now, },


   // NEW FIELDS
    reviews: [reviewSchema],
    averageRating: { type: Number, default: 0 },
    totalRating: { type: Number, default: 0 }
  },
  { timestamps: true }
);


export default mongoose.model("User", userSchema);


