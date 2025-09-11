// src/Admin/AdminDashboard.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "@/api/api.js"; 

const AdminDashboard = () => {
  const [lawyers, setLawyers] = useState([]);
  const [stats, setStats] = useState({ totalLawyers: 0 });
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/lawyers", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLawyers(res.data);
        setStats({ totalLawyers: res.data.length });
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this lawyer?")) return;
    try {
      await axios.delete(`/lawyers/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLawyers(lawyers.filter((l) => l._id !== id));
      setStats({ totalLawyers: lawyers.length - 1 });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-gray-500 font-semibold">Total Lawyers</h2>
          <p className="text-3xl font-bold">{stats.totalLawyers}</p>
        </div>
        {/* Add more cards here if needed */}
      </div>

      {/* Lawyers table */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">All Lawyers</h2>
        <table className="min-w-full border border-gray-300 rounded overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left">Email</th>
              <th className="border px-4 py-2 text-left">Specialization</th>
              <th className="border px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {lawyers.map((lawyer) => (
              <tr key={lawyer._id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{lawyer.name}</td>
                <td className="border px-4 py-2">{lawyer.email}</td>
                <td className="border px-4 py-2">{lawyer.specialization || "-"}</td>
                <td className="border px-4 py-2 flex gap-2">
                  <Link
                    to={`/admin/lawyers/edit/${lawyer._id}`}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(lawyer._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
