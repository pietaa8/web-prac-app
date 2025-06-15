import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SidePanel = () => {
  const [selectedSlot, setSelectedSlot] = useState(1); // Default slot
  const navigate = useNavigate();

  const handleBookAppointment = () => {
    navigate("/appointment-details", { state: { timeSlot: selectedSlot } });
  };

  const timeSlots = [
    { id: 1, label: "Monday, 4 PM - 6 PM" }, // Pending → Accepted
    { id: 2, label: "Thursday, 5 PM - 7 PM" }, // Only Pending
    { id: 3, label: "Saturday, 9 AM - 11 AM" }, // Pending → Cancelled
    { id: 4, label: "Tuesday, 5 PM - 7 PM" }, // Only Pending
  ];

  return (
    <div className="shadow-panelShadow p-3 lg:p-5 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text_para mt-0 font-semibold">Ticket Price</p>
        <span className="textx-[16px] leading-7 lg:text-[32px] lg:leading-8 text-headingColor font-bold">
          $20
        </span>
      </div>

      <div className="mt-[30px]">
        <p className="text_para mt-0 font-semibold text-headingColor">
          Available Time Slots:
        </p>
        <ul className="mt-3">
          {timeSlots.map((slot) => (
            <li
              key={slot.id}
              className="flex items-center justify-between mb-2"
            >
              <label className="text-[15px] leading-6 text-textColor font-semibold">
                <input
                  type="radio"
                  name="timeSlot"
                  value={slot.id}
                  checked={selectedSlot === slot.id}
                  onChange={() => setSelectedSlot(slot.id)}
                />{" "}
                {slot.label}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <button
        className="btn w-full px-2 rounded-md"
        onClick={handleBookAppointment}
      >
        Book Appointment
      </button>
    </div>
  );
};

export default SidePanel;
