import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import bkashLogo from "../assets/bkash.png";
import paypalLogo from "../assets/paypal.png";

export default function Payment({ setPaymentDone }) { // optional: pass down state
  const navigate = useNavigate();
  const { lawyerId } = useParams();
  const location = useLocation();
  const appointmentData = location.state || {};

  const userId = localStorage.getItem("userId");
  const paymentKey = `paymentInfo_${lawyerId}_${userId}`;

  const [method, setMethod] = useState(localStorage.getItem("paymentMethod") || "");
  const [amount, setAmount] = useState("");
  const [clientName, setClientName] = useState(appointmentData?.name || "");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [tokenExists, setTokenExists] = useState(false);

  // Ensure user is logged in and we have lawyerId
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || !lawyerId) {
      alert("Please login first or select a lawyer.");
      navigate("/login");
      return;
    }
    setTokenExists(true);
  }, [navigate, lawyerId]);

  const selectMethod = (selectedMethod) => {
    setMethod(selectedMethod);
    setAmount("");
    localStorage.setItem("paymentMethod", selectedMethod);
  };

  const handlePaymentSuccess = (methodUsed) => {
    const paymentData = {
      status: "success",
      method: methodUsed,
      lawyerId,
      userId,
      timestamp: Date.now(),
    };

    localStorage.setItem(paymentKey, JSON.stringify(paymentData));
    localStorage.setItem("paymentStatus", "paid");
    localStorage.setItem("paymentMethod", methodUsed);

    if (setPaymentDone) setPaymentDone(true); // if you pass this prop from AppointmentForm

    navigate(`/lawyers/${lawyerId}`);
  };

  const handlePayment = async () => {
    if (!method) {
      setMessage("Please select a payment method first.");
      return;
    }
    if (!password) {
      setMessage("Please enter your password to confirm payment.");
      return;
    }
    if (!amount || Number(amount) <= 0) {
      setMessage("Please enter a valid amount.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `http://localhost:5000/api/payments/${method.toLowerCase()}`,
        {
          amount,
          clientName,
          password,
          currency: method.toLowerCase() === "bkash" ? "BDT" : "USD",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      handlePaymentSuccess(method);
    } catch (err) {
      setMessage(err.response?.data?.error || "Payment failed. Try again.");
    }
  };

  if (!tokenExists) return null; // prevents blank page

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-200">
      <div className="p-8 border rounded-2xl shadow-2xl max-w-md w-full bg-white relative">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          ⚖️ Secure Legal Payment
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Pay your legal consultant fees safely & securely.
        </p>

        <label className="block mb-2 font-semibold text-gray-700">
          Select Payment Method:
        </label>
        <div className="flex items-center justify-between gap-4 mb-5">
          <button
            onClick={() => selectMethod("bKash")}
            className={`flex-1 flex items-center gap-2 border rounded-lg px-4 py-2 transition ${
              method === "bKash" ? "border-pink-500 bg-pink-50" : "border-gray-300 hover:border-pink-400"
            }`}
          >
            <img src={bkashLogo} alt="bKash" className="h-6 w-6" />
            <span className="font-medium text-gray-700">bKash</span>
          </button>

          <button
            onClick={() => selectMethod("PayPal")}
            className={`flex-1 flex items-center gap-2 border rounded-lg px-4 py-2 transition ${
              method === "PayPal" ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-400"
            }`}
          >
            <img src={paypalLogo} alt="PayPal" className="h-6 w-6" />
            <span className="font-medium text-gray-700">PayPal</span>
          </button>
        </div>

        <input
          type="text"
          placeholder="Your Full Name"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />

        {method && (
          <>
            <label className="block mb-2 font-semibold text-gray-700">
              Enter Amount ({method === "bKash" ? "BDT ৳" : "USD $"})
            </label>
            <input
              type="number"
              placeholder={`Amount in ${method === "bKash" ? "Taka" : "Dollar"}`}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />

            <div className="p-3 mb-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-700">
              🔒 Your information is <strong>secure</strong>. We never store your
              password or personal details.
            </div>

            <input
              type="password"
              placeholder="Enter Password to Confirm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />

            <button
              onClick={handlePayment}
              className={`w-full py-3 rounded-lg text-white font-semibold shadow-md transition ${
                method === "bKash" ? "bg-pink-500 hover:bg-pink-600" : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              Pay with {method === "bKash" ? "bKash" : "PayPal"}
            </button>
          </>
        )}

        {message && (
          <p className="mt-5 text-center font-medium text-red-600">{message}</p>
        )}
      </div>
    </div>
  );
}
