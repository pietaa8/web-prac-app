import { Link } from "react-router-dom";

const LawyerCard = ({ lawyer }) => {
  return (
    <div className="p-3 lg:p-5 rounded-lg shadow-md hover:shadow-xl transition-shadow">
      <img
        src={
          lawyer.photo
            ? (lawyer.photo.startsWith("http") ? lawyer.photo : `http://localhost:5000/${lawyer.photo.replace(/\\/g, "/")}`)
            : "/default-lawyer.png"
        }
        alt={lawyer.name}
        className="w-full h-48 object-cover rounded-lg mb-3"
      />

      <h3 className="text-lg font-semibold">{lawyer.name}</h3>
      <p className="text-sm text-gray-600 capitalize">
        {lawyer.specialization || "General Practice"}
      </p>
      <p className="text-sm text-gray-500">
        {lawyer.experience ? `${lawyer.experience} years experience` : "Experience not specified"}
      </p>

      <div className="flex items-center justify-between mt-2 text-sm text-gray-700">
        <p>
          ⭐ {lawyer.averageRating ? lawyer.averageRating.toFixed(1) : "N/A"} ({lawyer.totalRating || 0} reviews)
        </p>
        <p>{lawyer.totalClients || 0} clients</p>
      </div>

      <Link
        to={`/lawyers/${lawyer._id}`}
        className="mt-3 inline-block text-blue-600 hover:underline"
      >
        View Profile
      </Link>
    </div>
  );
};

export default LawyerCard;
