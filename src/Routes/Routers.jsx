import { Routes, Route } from "react-router-dom";
import Layout from "../Layout/Layout";
import AdminLayout from "../Admin/AdminLayout.jsx"; // Admin layout
import Home from "../Pages/Home";
import Contact from "../Pages/Contact";
import Lawyers from "../Pages/Lawyers/Lawyers";
import LawyersList from "../Pages/Lawyers/LawyersList";
import LawyerProfile from "../Pages/Lawyers/LawyerProfile.jsx";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import Services from "../Pages/Services";
import AppointmentDetails from "../Pages/Lawyers/AppointmentDetails";
import SidePanel from "../Pages/Lawyers/SidePanel";
import Payment from "../Pages/Payment";
import AddLawyer from "../Pages/Lawyers/AddLawyer";
import AdminLawyers from "../Admin/AdminLawyers.jsx";
import AdminEditLawyer from "../Admin/AdminEditLawyer.jsx";
import AdminRoute from "../Admin/AdminRoute.jsx";
import { Navigate } from "react-router-dom";
import LawyerDashboard from "../Pages/Lawyers/LawyerDashboard";
const ProtectedLawyerRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || user.role !== "lawyer") {
    return <Navigate to="/" replace />;
  }
  return children;
};


const Routers = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="lawyers" element={<Lawyers />} />
        <Route path="lawyers/list" element={<LawyersList />} />
        <Route path="lawyers/:id" element={<LawyerProfile />} />
        <Route path="services" element={<Services />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="side-panel" element={<SidePanel />} />
        <Route path="appointment-details" element={<AppointmentDetails />} />
        <Route path="payment/:lawyerId" element={<Payment />} />
        <Route path="/add-lawyer" element={<AddLawyer />} />
        <Route path="/lawyer-dashboard" element={<LawyerDashboard />} />
        <Route path="/appointments/:id" element={<AppointmentDetails />} />


      </Route>

      {/* Admin routes */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout /> {/* Layout renders <Outlet /> */}
          </AdminRoute>
        }
      >
        <Route index element={<AdminLawyers />} /> {/* /admin */}
        <Route path="lawyers" element={<AdminLawyers />} /> {/* /admin/lawyers */}
        <Route path="lawyers/edit/:id" element={<AdminEditLawyer />} /> {/* /admin/lawyers/edit/:id */}
      </Route>
<Route
  path="/lawyer-dashboard"
  element={
    <ProtectedLawyerRoute>
      <LawyerDashboard />
    </ProtectedLawyerRoute>
  }
/>

    </Routes>
  );
};

export default Routers;
