import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import { RiLinkedinFill } from "react-icons/ri";
import { AiFillYoutube, AiFillGithub, AiOutlineInstagram } from "react-icons/ai";
import { requestAppointment, getOpinion } from "../api/api"; // backend functions

const sociallinks = [
  { path: "/", icon: <AiFillGithub className="group-hover:text-white w-4 h-5" /> },
  { path: "/", icon: <AiFillYoutube className="group-hover:text-white w-4 h-5" /> },
  { path: "/", icon: <AiOutlineInstagram className="group-hover:text-white w-4 h-5" /> },
  { path: "/", icon: <RiLinkedinFill className="group-hover:text-white w-4 h-5" /> },
];

const quickLinks01 = [
  { path: "/", display: "Home" },
  { path: "/services", display: "Services" },
  { path: "/about-us", display: "About-us" },
];

const quickLinks02 = [
  { path: "/lawyers", display: "Find a Lawyer" },
  { path: "/lawyers", display: "Request an Appointment" },
  { path: "/opinion", display: "Get a Opinion" },
];

const quickLinks03 = [
  { path: "/contact", display: "Contact-us" },
];

const Footer = () => {
  const year = new Date().getFullYear();

  // Call backend for appointment
  const handleAppointment = async () => {
    try {
      const data = await requestAppointment({ user: "Amine" }); // example payload
      alert("Appointment requested: " + JSON.stringify(data));
    } catch (err) {
      console.error(err);
      alert("Failed to request appointment.");
    }
  };

  // Call backend for opinion
  const handleOpinion = async () => {
    try {
      const data = await getOpinion({ user: "Amine" }); // example payload
      alert("Opinion received: " + JSON.stringify(data));
    } catch (err) {
      console.error(err);
      alert("Failed to get opinion.");
    }
  };

  return (
    <footer className="pb-16 pt-10">
      <div className="container">
        <div className="flex justify-between flex-col md:flex-row flex-wrap gap-[30px]">
          {/* Logo + copyright + social */}
          <div>
            <img src={logo} alt="lawvault-logo" />
            <p className="text-[16px] leading-7 font-[400]">
              Copyright ©️ {year} developed by group of CSE-616 Web Engg.
              Project <strong>Team LawVault</strong> All right reserved
            </p>
            <div className="flex items-center gap-3 mt-4">
              {sociallinks.map((link, index) => (
                <Link
                  to={link.path}
                  key={index}
                  className="w-9 h-9 rounded-full flex items-center border border-solid border-[#181A1E] justify-center group hover:bg-primaryColor hover:border-none"
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-headingColor">
              Quick Links
            </h2>
            <ul>
              {quickLinks01.map((item, index) => (
                <li key={index} className="mb-4">
                  <Link
                    to={item.path}
                    className="text-[16px] leading-7 font-[400] text-textColor">
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div>
            <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-headingColor">
              I want to:
            </h2>
            <ul>
              {quickLinks02.map((item, index) => (
                <li key={index} className="mb-4">
                  {item.display === "Request an Appointment" ? (
                    <Link
            to="/lawyers"  // ✅ navigate to lawyers page
            className="text-[16px] leading-7 font-[400] text-textColor hover:underline"
          >
            {item.display}
          </Link> 
                  ) : item.display === "Get a Opinion" ? (
                    <button
                      onClick={handleOpinion}
                      className="text-[16px] leading-7 font-[400] text-textColor hover:underline"
                    >
                      {item.display}
                    </button>
                  ) : (
                    <Link
                      to={item.path}
                      className="text-[16px] leading-7 font-[400] text-textColor">
                      {item.display}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-headingColor">
              Support
            </h2>
            <ul>
              {quickLinks03.map((item, index) => (
                <li key={index} className="mb-4">
                  <Link
                    to={item.path}
                    className="text-[16px] leading-7 font-[400] text-textColor" >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
