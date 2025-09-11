import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "@/api/api.js"

const AppointmentForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    lawyerId: "", // <-- store lawyer ObjectId
  });

  const [paymentDone, setPaymentDone] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [lawyers, setLawyers] = useState([]); // fetch lawyers

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in first to book an appointment.");
      navigate("/login");
      return;
    }
    setIsLoggedIn(true);

    // load saved form data
    const savedFormData = localStorage.getItem("formData");
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }

    const paid = localStorage.getItem("paymentStatus");
    if (paid === "paid") {
      setPaymentDone(true);
    }

    // fetch lawyers
    const fetchLawyers = async () => {
      try {
        const res = await axios.get("/lawyers");
        setLawyers(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLawyers();
  }, [navigate]);

  const handleChange = (e) => {
    const updated = { ...formData, [e.target.name]: e.target.value };
    setFormData(updated);
    localStorage.setItem("formData", JSON.stringify(updated));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must log in to book an appointment.");
      navigate("/login");
      return;
    }

    if (!paymentDone) {
      alert("Please complete the advanced payment first.");
      return;
    }

    try {
      const res = await axios.post(
        "/appointments",
        {
          ...formData,
         // set paymentStatus based on whether payment was done
        paymentStatus: paymentDone ? "paid" : "pending",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
 // clear saved form + payment flags and go to details
      localStorage.removeItem("formData");
      localStorage.removeItem("paymentStatus");
      localStorage.removeItem("paymentMethod");

      navigate("/appointment-details", {
        state: res.data.appointment,
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        lawyerId: "",
      });
      setPaymentDone(false);
    } catch (error) {
      alert(error.response?.data?.error || "Failed to book appointment");
    }
  };

  const handlePayment = () => {
    if (!formData.lawyerId) {
      alert("Please select a lawyer first.");
      return;
    }
    // navigate to payment for the selected lawyer id (was formData.lawyer)
    navigate(`/payment/${formData.lawyerId}`, { state: formData });
  };

  if (!isLoggedIn) return null;

  return (
    <section className="max-w-md mx-auto p-5">
      <h2 className="text-2xl font-bold mb-5">Book an Appointment</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Your Full Name" value={formData.name} onChange={handleChange} required className="w-full border p-2 rounded" />
        <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required className="w-full border p-2 rounded" />
        <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required className="w-full border p-2 rounded" />
        <input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full border p-2 rounded" />
        <input type="time" name="time" value={formData.time} onChange={handleChange} required className="w-full border p-2 rounded" />

        {/* Dropdown for lawyers */}
        <select
          name="lawyerId"
          value={formData.lawyerId}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        >
          <option value="">Select a Lawyer</option>
          {lawyers.map((lawyer) => (
            <option key={lawyer._id} value={lawyer._id}>
              {lawyer.name} – {lawyer.specialization}
            </option>
          ))}
        </select>

        <button type="button" onClick={handlePayment} disabled={paymentDone} className={`w-full py-2 rounded ${paymentDone ? "bg-green-600 text-white" : "bg-yellow-500 text-black hover:bg-yellow-600"}`}>
          {paymentDone ? "✅ Payment Done" : "Advanced Payment"}
        </button>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Book Appointment
        </button>
      </form>
    </section>
  );
};

export default AppointmentForm;
