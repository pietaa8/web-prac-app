// src/Admin/AdminEditLawyer.jsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "@/api/api.js"; 

const AdminEditLawyer = () => {
  const { id } = useParams(); // get lawyer ID from URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    specialization: "",
    experience: "",
    phone: "",
    photo: null, // ✅ add photo
  });
  const [loading, setLoading] = useState(true);

  // Fetch lawyer data
  useEffect(() => {
    const fetchLawyer = async () => {
      try {
        const res = await axios.get(`/lawyers/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setFormData(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch lawyer data");
      }
    };
    fetchLawyer();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null) {
        data.append(key, formData[key]);
      }
    });

      await axios.put(`/lawyers/${id}`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
        },
      });
      alert("✅ Lawyer updated successfully!");
      navigate("/admin/lawyers");
    } catch (err) {
      console.error(err);
      alert("Failed to update lawyer");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Lawyer</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block font-semibold mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primaryColor"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-semibold mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primaryColor"
            required
          />
        </div>

        {/* Specialization */}
        <div>
          <label className="block font-semibold mb-1">Specialization</label>
          <input
            type="text"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primaryColor"
          />
        </div>

        {/* Experience */}
        <div>
          <label className="block font-semibold mb-1">Experience (years)</label>
          <input
            type="number"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primaryColor"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block font-semibold mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primaryColor"
          />
        </div>
        {/* Photo */}
<div>
  <label className="block font-semibold mb-1">Profile Photo</label>
  <input
    type="file"
    name="photo"
    accept="image/*"
    onChange={(e) => setFormData({ ...formData, photo: e.target.files[0] })}
    className="w-full"
  />
</div>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            className="bg-primaryColor text-white px-6 py-2 rounded hover:bg-blue-600 transition"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/lawyers")}
            className="bg-gray-300 px-6 py-2 rounded hover:bg-gray-400 transition"
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminEditLawyer;

