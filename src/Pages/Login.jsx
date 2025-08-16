import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      // Await the Axios response
      // const res = await axios.post(
      //   "http://localhost:5000/login", // Correct URL
      //   //"https://lawvault-backend-1.onrender.com/login", // ✅ Render backend link
      //   formData,
      //   {
      //     headers: { "Content-Type": "application/json" },
      //   }
      // );

        const res = await axios.post(
        "https://lawvault-backend-1.onrender.com/login", // ✅ Render backend link
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );


      // Check success
      if (res.data.success) {
        alert("✅ Login Successful");

        // Save user in localStorage
        if (res.data.user) {
          localStorage.setItem("user", JSON.stringify(res.data.user));
        }

        navigate("/"); // Go to home
      } else {
        alert(res.data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert(err.response?.data?.message || err.message || "Login failed");
    }
  };

  return (
    <section className="px-5 xl:px-0">
      <div className="max-w-[1170px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="rounded-lg lg:pl-16 py-10">
            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
              Welcome Back
            </h3>
            <form onSubmit={submitHandler}>
              <div className="mb-5">
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full py-4 border-b border-solid border-[#006ff61] focus:outline-none focus:border-b-primaryColor text-[22px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer"
                />
              </div>
              <div className="mb-5">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full py-4 border-b border-solid border-[#006ff61] focus:outline-none focus:border-b-primaryColor text-[22px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer"
                />
              </div>

              <div className="mt-7">
                <button
                  type="submit"
                  className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg py-3"
                >
                  Login
                </button>
              </div>
            </form>

            <p className="mt-5 text-textColor text-center">
              Do not have an account?{" "}
              <Link to="/signup" className="text-primaryColor font-medium">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
