import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Contact from "../Pages/Contact";
import Lawyers from "../Pages/Lawyers/Lawyers";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import Services from "../Pages/Services";
import LawyersList from "../Pages/Lawyers/LawyersList";
import LawyersDetails from "../Pages/Lawyers/LawyersDetails";
import AppointmentDetails from "../Pages/Lawyers/AppointmentDetails";
import SidePanel from "../Pages/Lawyers/SidePanel";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/lawyers" element={<Lawyers />} />
      <Route path="/lawyers" element={<LawyersList />} />
      <Route path="/lawyers/:id" element={<LawyersDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/services" element={<Services />} />
      <Route path="/side-panel" element={<SidePanel />} />
      <Route
        path="/appointment-details"
        element={<AppointmentDetails />}
      />{" "}
      {/* New route */}
    </Routes>
  );
};

export default Routers;
