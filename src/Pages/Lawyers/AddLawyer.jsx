import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddLawyer = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
     password: "",
    specialization: "",
    experience: "",
    bio: "",
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
     if (files) {
    setFormData((prev) => ({ ...prev, [name]: files[0] }));  // ✅ preview
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const res = await fetch("http://localhost:5000/api/lawyers/add", {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error("Failed to add lawyer");
      await res.json();

      alert("✅ Lawyer added successfully!");
      navigate("/lawyers");
    } catch (error) {
      console.error("❌ Error:", error);
      alert("Error adding lawyer. Please try again.");
    }
  };

  return (
    <section className="pt-[60px] pb-[80px]">
      <div className="container max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Add New Lawyer
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter full name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-700">Password</label>
            <input
            type="password"
            name="password"
            placeholder="Enter password for lawyer"
            value={formData.password || ""}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
           />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">Specialization</label>
            <input
              type="text"
              name="specialization"
              placeholder="e.g., Family Law, Corporate Law"
              value={formData.specialization}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">Experience (Years)</label>
            <input
              type="number"
              name="experience"
              placeholder="Years of experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">Short Bio</label>
            <textarea
              name="bio"
              placeholder="Write a short bio..."
              value={formData.bio}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none min-h-[100px]"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">Profile Photo</label>
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleChange}
              className="w-full text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200"
          >
            ➕ Add Lawyer
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddLawyer;
