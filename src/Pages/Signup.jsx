import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext.jsx";

const Signup = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "client",
    photo: null, // ✅ for file upload
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setFormData({ ...formData, photo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("role", formData.role);
      if (formData.photo) data.append("photo", formData.photo);

      const res = await axios.post(
        "http://localhost:5000/api/users/signup",
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.token || ""); // optional if backend sends token
        setUser(res.data.user); // ✅ update context immediately

        alert("✅ Signup successful!");
        navigate("/"); // redirect after signup
      } else {
        alert(res.data.message || "Signup failed. Check your inputs.");
      }
    } catch (err) {
      console.error("Signup error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Internal Server Error");
    }
  };

  return (
    <section className="px-5 xl:px-0">
      <div className="max-w-[1170px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="rounded-lg lg:pl-16 py-10">
            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
              Create Your Account
            </h3>

            <form onSubmit={submitHandler}>
              {/* Name */}
              <div className="mb-5">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full py-4 border-b border-solid border-[#006ff61] focus:outline-none text-[22px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer"
                />
              </div>

              {/* Email */}
              <div className="mb-5">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full py-4 border-b border-solid border-[#006ff61] focus:outline-none text-[22px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer"
                />
              </div>

              {/* Password */}
              <div className="mb-5">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full py-4 border-b border-solid border-[#006ff61] focus:outline-none text-[22px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer"
                />
              </div>

              {/* Role */}
              <div className="mb-5">
                <label className="text-headingColor font-bold text-[16px] leading-7 mr-4">
                  Role:
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none border rounded"
                >
                  <option value="client">Client</option>
                  <option value="lawyer">Lawyer</option>
                </select>
              </div>

              {/* Profile Photo */}
              <div className="mb-5">
                <label className="text-headingColor font-bold text-[16px] leading-7 mr-4">
                  Profile Photo:
                </label>
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={handleInputChange}
                  className="block mt-2"
                />
              </div>

              {/* Submit */}
              <div className="mt-7">
                <button
                  type="submit"
                  className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg py-3"
                >
                  Sign Up
                </button>
              </div>
            </form>

            <p className="mt-5 text-textColor text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-primaryColor font-medium">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
