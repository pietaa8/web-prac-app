import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SidePanel from "./SidePanel.jsx";
import axios from "axios";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const LawyerProfile = () => {
  const { id } = useParams();
  const [lawyer, setLawyer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLawyer = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/lawyers/${id}`);
        setLawyer(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLawyer();
  }, [id]);

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

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) stars.push(<FaStar key={i} className="text-yellow-400" />);
      else if (rating >= i - 0.5) stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      else stars.push(<FaRegStar key={i} className="text-yellow-400" />);
    }
    return stars;
  };

  return (
    <section className="max-w-[1200px] mx-auto px-5 py-10">
      <div className="grid md:grid-cols-3 gap-10">
        {/* Left Panel */}
        <div className="md:col-span-2 bg-[#fdfbf6] p-8 rounded-2xl shadow-lg transition-all hover:shadow-xl">
          <div className="flex items-start gap-6">
            <img
              src={lawyer.photo || "/default-lawyer.png"}
              alt={lawyer.name}
              className="w-48 h-48 object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
            />
            <div>
              <h2 className="text-3xl font-bold text-gray-800">{lawyer.name}</h2>
              <p className="text-blue-600 font-medium mt-1">{lawyer.specialization}</p>
              <p className="text-gray-600 mt-1">{lawyer.experience} years of experience</p>

              <div className="flex items-center gap-3 mt-3">
                {renderStars(lawyer.averageRating || 0)}
                <span className="text-gray-500 ml-2">
                  ({lawyer.totalRating || 0} reviews) • {lawyer.totalClients || 0} clients
                </span>
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

            {/* Reviews Section */}
            <div className="mt-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Client Reviews</h3>
              {lawyer.reviews && lawyer.reviews.length > 0 ? (
                <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                  {lawyer.reviews.map((rev, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-lg shadow-sm border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">{rev.clientName}</span>
                        <div className="flex items-center gap-1">{renderStars(rev.rating)}</div>
                      </div>
                      <p className="text-gray-600">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">No reviews yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel: Booking Form */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <SidePanel lawyerId={id} />
        </div>
      </div>
    </section>
  );
};

export default LawyerProfile;
