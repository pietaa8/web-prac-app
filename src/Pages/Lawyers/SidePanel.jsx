import { useState } from "react";
import axios from "axios";

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    lawyerName: "", // new field
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post(
        "https://lawvault-backend-1.onrender.com/appointments",
        formData
      );

      alert(res.data.message);
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        lawyerName: "",
      });
    } catch (error) {
      alert(error.response?.data?.message || "Failed to book appointment");
    }
  };

  return (
    <section className="max-w-md mx-auto p-5">
      <h2 className="text-2xl font-bold mb-5">Book an Appointment</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        {/* New lawyer name input */}
        <input
          type="text"
          name="lawyerName"
          placeholder="Lawyer Name(e.g.,Omar Hossain-Family Law)"
          value={formData.lawyerName}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded w-[430px]"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Book Appointment
        </button>
      </form>
    </section>
  );
};

export default AppointmentForm;
