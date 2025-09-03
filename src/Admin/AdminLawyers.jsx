// src/Admin/AdminLawyers.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLawyers = () => {
  const [lawyers, setLawyers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/lawyers")
      .then((res) => setLawyers(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleEdit = (id) => {
    navigate(`/admin/lawyers/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this lawyer?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/lawyers/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setLawyers(lawyers.filter((lawyer) => lawyer._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Lawyers</h1>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Specialization</th>
            <th className="border px-4 py-2">Experience</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {lawyers.map((lawyer) => (
            <tr key={lawyer._id} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{lawyer.name}</td>
              <td className="border px-4 py-2">{lawyer.specialization || "-"}</td>
              <td className="border px-4 py-2">{lawyer.experience || "-"}</td>
              <td className="border px-4 py-2 flex gap-2">
                <button
                  onClick={() => handleEdit(lawyer._id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(lawyer._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminLawyers;

