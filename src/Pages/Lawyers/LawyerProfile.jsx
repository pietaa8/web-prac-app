import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import SidePanel from "./SidePanel.jsx";
import Reviews from "./Reviews.jsx"; // import your Reviews component
import { UserContext } from "../../context/UserContext";
import axios from "@/api/api.js";
import starIcon from "../../assets/images/Star.png";

const LawyerProfile = () => {
  const { id } = useParams();
  const [lawyer, setLawyer] = useState(null);
  const [loading, setLoading] = useState(true);

  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);

   // review form states
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
    // ✅ get logged-in user from context
  const { user: currentUser } = useContext(UserContext);
  
   // Function to fetch reviews and update lawyer ratings
  const updateReviews = async () => {
    try {
      const res = await axios.get(`/reviews/${lawyer._id}`);
      setReviews(res.data);

      // Update lawyer's totalRating and averageRating
      const total = res.data.length;
      const avg =
        total > 0
          ? res.data.reduce((acc, item) => acc + item.rating, 0) / total
          : 0;

      setLawyer((prev) => ({
        ...prev,
        totalRating: total,
        averageRating: avg.toFixed(1), // 1 decimal
      }));
    } catch (err) {
      console.error(err);
    }
  };


  useEffect(() => {
    const fetchLawyer = async () => {
      try {
        const res = await axios.get(`/lawyers/${id}`);
        setLawyer(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLawyer();
  }, [id]);

  useEffect(() => {
  const fetchReviews = async () => {
    try {
      const res = await axios.get(`/reviews/${id}`);
      setReviews(res.data);
    } catch (err) {
      console.error(err);
    }
    finally {
      setReviewsLoading(false);
    }
  };
  fetchReviews();
}, [id]);

// If you store token in localStorage
const token = localStorage.getItem("token"); // <-- get JWT
const submitReview = async () => {
  if (!rating || !reviewText.trim()) {
    alert("Please provide both rating and review text.");
    return;
  }

  // ✅ Read token directly from localStorage
  const token = localStorage.getItem("token");
  if (!token) {
    alert("You must be logged in to submit a review.");
    return;
  }

  try {
    // POST review with Authorization header
    await axios.post(
      `/reviews/${lawyer._id}`,
      { rating, review: reviewText },
      { headers: { Authorization: `Bearer ${token}` } }
    );
      // ✅ Update reviews and lawyer ratings after submission
      await updateReviews();
    // Fetch updated reviews
    const res = await axios.get(`/reviews/${lawyer._id}`);
    setReviews(res.data);

    // Reset form
    setRating(0);
    setReviewText("");
  } catch (err) {
    console.error(err);
    if (err.response && err.response.data && err.response.data.message) {
      alert(err.response.data.message);
    } else {
      alert("Failed to submit review.");
    }
  }
};


  if (loading)
    return (
      <section className="pt-20 text-center">
        <p className="text-gray-500 animate-pulse text-lg">Loading lawyer profile...</p>
      </section>
    );

  if (!lawyer)
    return (
      <section className="pt-20 text-center">
        <p className="text-red-500 text-lg">Lawyer not found.</p>
      </section>
    );

  return (
    <section className="max-w-[1200px] mx-auto px-5 py-10">
      <div className="grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2 bg-white p-8 rounded-2xl shadow-lg">
          <div className="flex items-start gap-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">{lawyer.name}</h2>
              <p className="text-blue-600 font-medium mt-1">{lawyer.specialization}</p>
              <p className="text-gray-600 mt-1">{lawyer.experience} years of experience</p>

              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1">
                  <img src={starIcon} alt="star" className="w-5 h-5" />
                  <span className="font-semibold">{lawyer.averageRating || 0}</span>
                </div>
                <span className="text-gray-500">({lawyer.totalRating || 0} reviews)</span>
                <span className="text-gray-500">{lawyer.clientsCount || 0} clients</span>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            <h3 className="text-2xl font-semibold text-gray-800">About {lawyer.name}</h3>
            <p className="text-gray-600 leading-relaxed">{lawyer.bio}</p>

            <h3 className="text-2xl font-semibold text-gray-800">Education & Affiliations</h3>
            <ul className="list-disc pl-5 text-gray-600 space-y-2">
              <li>
                {lawyer.education || "LL.B. from a reputed law school"} –{" "}
                {lawyer.firm || "Law Firm / Bar Association affiliation"}
              </li>
            </ul>
             <h3 className="text-2xl font-semibold text-gray-800 mt-8">Client Reviews</h3>
            {reviewsLoading ? (
              <p className="text-gray-500 animate-pulse">Loading reviews...</p>
            ) : reviews.length === 0 ? (
              <p className="text-gray-500">No reviews yet.</p>
            ) : (
              reviews.map((item, index) => <Reviews key={index} items={item} />)
            )}
            
            {/* ✅ Review form / login prompt */}
            <div className="mt-6 bg-gray-50 p-4 rounded-xl shadow-sm">
              {currentUser ? (
  <div className="mt-6">
    <h4 className="text-xl font-semibold mb-2">Write a Review</h4>
    <div className="flex items-center mb-2">
      {[1,2,3,4,5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => setRating(star)}
          className={star <= rating ? "text-yellow-500" : "text-gray-300"}
        >
          ★
        </button>
      ))}
      <span className="ml-2">{rating} / 5</span>
    </div>
    <textarea
      className="w-full border p-2 rounded mb-2"
      rows="3"
      placeholder="Write your review..."
      value={reviewText}
      onChange={(e) => setReviewText(e.target.value)}
    />
    <button
      onClick={submitReview}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      Submit Review
    </button>
  </div>
) : (
  <p className="text-gray-500 mt-4">Login to write a review.</p>
)}

            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <SidePanel lawyerId={lawyer._id} />
        </div>
      </div>
    </section>
  );
};

export default LawyerProfile;
