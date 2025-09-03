import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useRef, useContext } from "react";
import logo from "../../src/assets/images/logo.png";
import { BiMenu } from "react-icons/bi";
import { UserContext } from "../context/UserContext.jsx"; // ✅ Make sure path is correct

const navLinks = [
  { path: "/", display: "Home" },
  { path: "/lawyers/list", display: "Our Lawyers" },
  { path: "/services", display: "Services" },
  { path: "/contact", display: "Contact" },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const togglemenu = () => menuRef.current.classList.toggle("shown__menu");

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  // Sticky header
  const handleStickyHeader = () => {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
      headerRef.current.classList.add("sticky__header");
    } else {
      headerRef.current.classList.remove("sticky__header");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyHeader);
    return () => window.removeEventListener("scroll", handleStickyHeader);
  }, []);

  return (
    <header className="header" ref={headerRef}>
      <div className="container flex items-center justify-between">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>

        {/* Navigation */}
        <nav className="navigation" ref={menuRef}>
          <ul className="menu flex items-center gap-[2.7rem]">
            {navLinks.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  className={(navClass) =>
                    navClass.isActive
                      ? "text-primaryColor text-16px leading-7 font-600"
                      : "text-textColor text-16px leading-7 font-500"
                  }
                >
                  {item.display}
                </NavLink>
              </li>
            ))}
           {/* ✅ Show Dashboard only if user is a lawyer */}
    {user?.role === "lawyer" && (
      <li>
        <NavLink
          to="/lawyer-dashboard"
          className={(navClass) =>
            navClass.isActive
              ? "text-primaryColor text-16px leading-7 font-600"
              : "text-textColor text-16px leading-7 font-500"
          }
        >
          Dashboard
        </NavLink>
      </li>
    )}

          </ul>
        </nav>

        {/* Login / User Info */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-2">
              {/* ✅ Profile photo */}
              {user.photo && (
                <img
                  src={user.photo}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover border border-gray-300"
                />
              )}
              <div className="flex flex-col">
                <span className="font-semibold">{user.name}</span>
                <span className="text-sm text-gray-500">{user.role}</span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-2 rounded text-sm font-medium hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-primaryColor px-3 py-2 text-white rounded text-sm font-medium hover:bg-opacity-90"
            >
              Login
            </Link>
          )}
          <span className="md:hidden" onClick={togglemenu}>
            <BiMenu className="w-6 h-6 cursor-pointer" />
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
