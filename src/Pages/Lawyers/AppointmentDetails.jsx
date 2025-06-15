import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const AppointmentDetails = () => {
  const location = useLocation();
  const timeSlot = location.state?.timeSlot || 1; // Default slot 1 if none selected

  const [status, setStatus] = useState("pending");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeSlot === 1) setStatus("accepted"); // Monday: Pending → Accepted
      else if (timeSlot === 2) setStatus("pending"); // Thursday: Always Pending
      else if (timeSlot === 3)
        setStatus("cancelled"); // Saturday: Pending → Cancelled
      else if (timeSlot === 4) setStatus("pending"); // Tuesday: Always Pending
    }, 3000);

    return () => clearTimeout(timer);
  }, [timeSlot]);

  const renderStatusContent = () => {
    switch (status) {
      case "accepted":
        return (
          <div className="text-center">
            <div className="text-green-600 text-[40px] mb-4">✔</div>
            <h3 className="text-headingColor text-[28px] font-bold">
              Your Appointment is Confirmed!
            </h3>
            <p className="text-textColor mt-2">
              Congratulations! Your appointment has been successfully booked.
            </p>
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
              Please wait while we process your request.
            </p>
          </div>
        );
      case "cancelled":
        return (
          <div className="text-center">
            <div className="text-red-600 text-[40px] mb-4">✘</div>
            <h3 className="text-headingColor text-[28px] font-bold">
              Your Appointment was Cancelled
            </h3>
            <p className="text-textColor mt-2">
              Unfortunately, your appointment could not be confirmed.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-[1170px] px-5 mx-auto py-10">
      <h2 className="text-headingColor text-[24px] font-bold mb-4">
        Appointment Details
      </h2>
      {renderStatusContent()}
    </div>
  );
};

// CSS for Pending Animation
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

// Inject styles into document head
if (typeof window !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default AppointmentDetails;
