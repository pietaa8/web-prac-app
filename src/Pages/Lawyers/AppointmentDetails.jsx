import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "@/api/api";

const AppointmentDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialAppointment = location.state; // appointment info passed from AppointmentForm/Payment
console.log("Initial appointment _id:", initialAppointment?._id);
const [appointment, setAppointment] = useState(initialAppointment);
useEffect(() => {
    if (!initialAppointment?._id) {
      navigate("/lawyers/sidepanel");
      return;
    }
     const fetchAppointment = async () => {
      try {
        const { data } = await axios.get(`/appointments/${initialAppointment._id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setAppointment(data);
      } catch (err) {
        console.error("Error fetching appointment:", err);
      }
    };
    
    // fetch immediately
    fetchAppointment();

    // ✅ poll every 5 seconds
    const interval = setInterval(fetchAppointment, 5000);

    return () => clearInterval(interval);
  }, [initialAppointment, navigate]);

  if (!appointment) {
    // No appointment info: redirect back to appointment form
    navigate("/lawyers/sidepanel");
    return null;
  }

  const renderStatusContent = () => {
    switch (appointment.status) {
      case "accepted":
        return (
          <div className="text-center">
            <div className="text-green-600 text-[40px] mb-4">✔</div>
            <h3 className="text-headingColor text-[28px] font-bold">
              Your Appointment is Confirmed!
            </h3>
          </div>
        );
      case "pending":
        return (
          <div className="text-center">
            <div className="pending-animation w-12 h-12 mx-auto mb-4"></div>
            <h3 className="text-yellow-600 text-[28px] font-bold">
              Your Appointment is Pending...
            </h3>
            <p className="text-textColor mt-2">
              Please wait while the lawyer reviews your request.
            </p>
          </div>
        );
      case "cancelled":
      default:
        return (
          <div className="text-center">
            <div className="text-red-600 text-[40px] mb-4">✘</div>
            <h3 className="text-headingColor text-[28px] font-bold">
              Your Appointment was Cancelled
            </h3>
          </div>
        );
    }
  };

  return (
    <div className="max-w-[1170px] px-5 mx-auto py-10">
      <h2 className="text-headingColor text-[24px] font-bold mb-4">
        Appointment Details
      </h2>
      {renderStatusContent()}

      {/* Optional: show client details */}
      <div className="mt-5 border p-4 rounded-lg bg-gray-50">
        <p><strong>Name:</strong> {appointment.name}</p>
        <p><strong>Email:</strong> {appointment.email}</p>
        <p><strong>Phone:</strong> {appointment.phone}</p>
        <p>
          <strong>Lawyer:</strong>{" "}
          {appointment.lawyer?.name || appointment.lawyerName || "N/A"}
        </p>
        <p><strong>Date:</strong> {appointment.date}</p>
        <p><strong>Time:</strong> {appointment.time}</p>
        <p><strong>Payment Status:</strong> {appointment.paymentStatus}</p>
      </div>
    </div>
  );
};

// Pending Animation CSS
const styles = `
  .pending-animation {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #f59e0b;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

if (typeof window !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default AppointmentDetails;
