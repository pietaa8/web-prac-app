// src/components/AppointmentCard.jsx
import React from "react";

const AppointmentCard = ({ appointment }) => {
  return (
    <div className="border rounded-xl shadow-md p-4 mb-4">
      <h2 className="text-lg font-semibold">{appointment.lawyer?.name}</h2>
      <p className="text-sm text-gray-600">Service: {appointment.service}</p>
      <p className="text-sm text-gray-600">
        Date: {new Date(appointment.date).toLocaleString()}
      </p>
      <p className="text-sm text-gray-600">Message: {appointment.message}</p>
      <span
        className={`inline-block mt-2 px-3 py-1 rounded-full text-white text-xs ${
          appointment.status === "accepted"
            ? "bg-green-500"
            : appointment.status === "cancelled"
            ? "bg-red-500"
            : "bg-yellow-500"
        }`}
      >
        {appointment.status}
      </span>
    </div>
  );
};

export default AppointmentCard;
