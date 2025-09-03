// src/Admin/AdminSidebar.jsx
import { Link, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const location = useLocation();

  const linkClass = (path) =>
    `block px-4 py-3 rounded mb-2 transition-colors ${
      location.pathname === path
        ? "bg-primaryColor text-white font-semibold"
        : "hover:bg-primaryColor hover:text-white text-gray-700"
    }`;

  return (
    <aside className="w-64 bg-white shadow-lg p-6 flex flex-col">
      <h2 className="text-2xl font-bold text-primaryColor mb-6">Admin Menu</h2>
      <Link to="/admin/lawyers" className={linkClass("/admin/lawyers")}>
        Manage Lawyers
      </Link>
      <Link to="/lawyers" className={linkClass("/lawyers")}>
        View All Lawyers
      </Link>
      <Link to="/services" className={linkClass("/services")}>
        Services
      </Link>
      <Link to="/contact" className={linkClass("/contact")}>
        Contact
      </Link>
      <Link to="/" className={linkClass("/")}>
        Home
      </Link>
    </aside>
  );
};

export default AdminSidebar;

