import { useState, useContext } from "react"; 
import { Link, useNavigate } from "react-router-dom"; 
import axios from "@/api/api.js"; 
import { UserContext } from "../context/UserContext.jsx"; 
// ✅ Import context 
const Login = () => { 
  const navigate = useNavigate(); 
  const { setUser } = useContext(UserContext); 
  // ✅ Get setUser to update context 
  const [formData, setFormData] = useState({ email: "", password: "", role: "client", }); 
  const handleInputChange = (e) => { setFormData({ ...formData, 
    [e.target.name]: e.target.value }); 
  }; 
  const submitHandler = async (event) => { event.preventDefault(); 
    try { const res = await axios.post( 
      "/users/login", // Backend login endpoint 
        formData, 
        { 
          headers: { "Content-Type": "application/json" }, 
        } 
      ); 
      if (res.data.token) {
         // Save token and user info in localStorage 
         localStorage.setItem("token", res.data.token); 
         localStorage.setItem("user", JSON.stringify(res.data.user)); 
         // ✅ Update UserContext so header updates immediately 
         setUser(res.data.user); 
         alert("✅ Login Successful!"); 
          // ✅ Redirect based on role
          
      if (res.data.user.role === "admin") {
         navigate("/admin/lawyers"); // admin dashboard
        } else { 
         navigate("/"); // Redirect to home page after login 
         }
         } else { 
          alert(res.data.message || "Login failed. Check your credentials."); 
        } 
      } catch (err) { 
        console.error("Login error details:", err.response?.data || err.message); 
        alert( err.response?.data?.message || "Internal Server Error. Please try again." );
       }
       }; 
       return ( 
       <section className="px-5 xl:px-0"> 
       <div className="max-w-[1170px] mx-auto"> 
        <div className="grid grid-cols-1 lg:grid-cols-2"> 
          <div className="rounded-lg lg:pl-16 py-10"> 
            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10"> Welcome Back </h3> 
            <form onSubmit={submitHandler}> {/* Email */}
               <div className="mb-5"> 
                <input 
                type="email" 
                name="email"
                 placeholder="Enter Your Email" 
                 value={formData.email} 
                 onChange={handleInputChange} 
                 required className="w-full py-4 border-b border-solid border-[#006ff61] focus:outline-none focus:border-b-primaryColor text-[22px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer" 
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
                    required className="w-full py-4 border-b border-solid border-[#006ff61] focus:outline-none focus:border-b-primaryColor text-[22px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer" 
                    /> 
                    </div> 
                    {/* Role selector */} 
                    <div className="mb-5"> 
                      <label className="text-headingColor font-bold text-[16px] leading-7 mr-4"> 
                        Role: 
                        </label> 
                        <select 
                        name="role" 
                        value={formData.role} 
                        onChange={handleInputChange} 
                        className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none border rounded" >
                           <option value="client">Client</option> 
                           <option value="lawyer">Lawyer</option> 
                           <option value="admin">Admin</option>
                           </select>
                            </div> {/* Submit button */} 
                            <div className="mt-7"> 
                              <button 
                              type="submit" 
                              className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg py-3" > 
                              Login 
                              </button> 
                              </div>
                               </form>
                                <p className="mt-5 text-textColor text-center"> Don't have an account?{" "} 
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

