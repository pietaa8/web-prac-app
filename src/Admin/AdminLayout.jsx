// src/Admin/AdminLayout.jsx
import { Outlet, Link, useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen font-sans">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {/* Top nav */}
        <header className="flex justify-between items-center bg-white shadow p-4">
          <Link to="/" className="text-2xl font-bold text-primaryColor hover:text-blue-600">
            LawVault
          </Link>
          <div>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 transition-colors text-white px-4 py-2 rounded shadow"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">
          <Outlet /> {/* Admin pages render here */}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;




 
