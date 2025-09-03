import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SidePanel from "./SidePanel.jsx";
import axios from "axios";
import starIcon from "../../assets/images/Star.png";

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

  return (
    <section className="max-w-[1200px] mx-auto px-5 py-10">
      <div className="grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2 bg-white p-8 rounded-2xl shadow-lg">
          <div className="flex items-start gap-6">
            <img
              src={lawyer.photo || "/default-lawyer.png"}
              alt={lawyer.name}
              className="w-48 h-48 object-cover rounded-xl shadow-md"
            />
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
                <span className="text-gray-500">{lawyer.totalClients || 0} clients</span>
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
