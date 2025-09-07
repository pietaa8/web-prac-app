import { useEffect, useState } from "react";
import axios from "axios";

const LawyerDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("You are not logged in.");
          return;
        }

        const res = await axios.get(
          "http://localhost:5000/api/appointments/lawyer/appointments",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setAppointments(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Failed to fetch appointments:", err);
        setError(
          err.response?.data?.error ||
          err.response?.data?.message ||
          err.message ||
          "Failed to fetch."
        );
      }
    };

    fetchAppointments();
  }, []);

    const handleStatusChange = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      
    // Update appointment status (accepted/cancelled)
      await axios.put(
        `http://localhost:5000/api/appointments/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
       // If accepted, also update payment status to 'accepted'
    if (status === "accepted") {
      await axios.put(
        `http://localhost:5000/api/appointments/${id}/payment`,
        { status: "paid" },  // <-- must be one of ["pending","paid","cancelled"]
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }
      
      // update UI immediately
      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === id ? {
              ...appt,
              status,
              paymentStatus: status === "accepted" ? "paid" : appt.paymentStatus,
            } : appt
        )
      );
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">My Appointments</h1>

      {error && (
        <div className="mb-3 p-2 rounded bg-red-50 text-red-700 border border-red-200">
          {error}
        </div>
      )}

      <table className="w-full border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Client</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Requested At</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length > 0 ? (
            appointments.map((appt) => (
              <tr key={appt._id}>
                <td className="p-2 border">{appt.client?.name || "Unknown"}</td>
                <td className="p-2 border">{appt.client?.email || "N/A"}</td>
                <td className="p-2 border">
                  {new Date(appt.createdAt).toLocaleString()}
                </td>
                <td className="p-2 border">{appt.status}</td>
                  <td className="p-2 border space-x-2">
                  {appt.status === "pending" && (
                    <>
                      <button
                        className="px-3 py-1 bg-green-500 text-white rounded"
                        onClick={() =>
                          handleStatusChange(appt._id, "accepted")
                        }
                      >
                        Accept
                      </button>
                        <button
                        className="px-3 py-1 bg-red-500 text-white rounded"
                        onClick={() =>
                          handleStatusChange(appt._id, "cancelled")
                        }
                      >
                        Decline
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="p-2 border text-center text-gray-500">
                No appointments found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LawyerDashboard;
