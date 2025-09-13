import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useRef, useContext, useState } from "react";
import logo from "../../src/assets/images/logo.png";
import { BiMenu, BiX } from "react-icons/bi";
import { UserContext } from "../context/UserContext.jsx";

const navLinks = [
  { path: "/", display: "Home" },
  { path: "/lawyers/list", display: "Our Lawyers" },
  { path: "/services", display: "Services" },
  { path: "/contact", display: "Contact" },
];

const Header = () => {
  const headerRef = useRef(null);
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const handleStickyHeader = () => {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
      headerRef.current.classList.add("shadow-md", "bg-white");
    } else {
      headerRef.current.classList.remove("shadow-md", "bg-white");
    }
  };

  useEffect(() => {
    // set initial header height
    if (headerRef.current) setHeaderHeight(headerRef.current.offsetHeight);

    const handleResize = () => {
      if (headerRef.current) setHeaderHeight(headerRef.current.offsetHeight);
    };

    window.addEventListener("scroll", handleStickyHeader);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleStickyHeader);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 w-full z-50 bg-white"
      >
        <div className="container mx-auto flex items-center justify-between py-4 px-5 md:px-10">
          {/* Logo */}
          <Link to="/">
            <img src={logo} alt="Logo" className="h-10" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-primaryColor font-semibold"
                    : "text-textColor font-medium hover:text-primaryColor"
                }
              >
                {item.display}
              </NavLink>
            ))}
            {user?.role === "lawyer" && (
              <NavLink
                to="/lawyer-dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "text-primaryColor font-semibold"
                    : "text-textColor font-medium hover:text-primaryColor"
                }
              >
                Dashboard
              </NavLink>
            )}
          </nav>

          {/* User Info & Mobile Menu */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="hidden md:flex items-center gap-3">
                {user.photo && (
                  <img
                    src={user.photo}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover border border-gray-300"
                  />
                )}
                <div className="flex flex-col text-sm">
                  <span className="font-semibold">{user.name}</span>
                  <span className="text-gray-500">{user.role}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm font-medium hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:inline-block bg-primaryColor px-3 py-2 text-white rounded text-sm font-medium hover:bg-opacity-90"
              >
                Login
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden text-2xl focus:outline-none"
            >
              {mobileMenuOpen ? <BiX /> : <BiMenu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden bg-white w-full shadow-md">
            <ul className="flex flex-col items-start gap-4 px-5 py-4">
              {navLinks.map((item, index) => (
                <li key={index} className="w-full">
                  <NavLink
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      isActive
                        ? "text-primaryColor font-semibold block w-full"
                        : "text-textColor font-medium block w-full hover:text-primaryColor"
                    }
                  >
                    {item.display}
                  </NavLink>
                </li>
              ))}
              {user?.role === "lawyer" && (
                <li>
                  <NavLink
                    to="/lawyer-dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      isActive
                        ? "text-primaryColor font-semibold block w-full"
                        : "text-textColor font-medium block w-full hover:text-primaryColor"
                    }
                  >
                    Dashboard
                  </NavLink>
                </li>
              )}
              {user ? (
                <li className="flex flex-col gap-2 mt-2">
                  {user.photo && (
                    <img
                      src={user.photo}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover border border-gray-300"
                    />
                  )}
                  <span className="font-semibold">{user.name}</span>
                  <span className="text-gray-500">{user.role}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm font-medium hover:bg-red-600"
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <li>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="bg-primaryColor px-3 py-2 text-white rounded text-sm font-medium hover:bg-opacity-90"
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        )}
      </header>

      {/* Spacer for fixed header */}
      <div style={{ height: `${headerHeight}px` }} />
    </>
  );
};

export default Header;
