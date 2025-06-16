import { Link } from "react-router-dom";
import heroImg01 from "../assets/images/hero-img04.jpg";
import heroImg02 from "../assets/images/hero-img05.jpg";
import heroImg03 from "../assets/images/hero-img06.jpg";
import icon01 from "../assets/images/icon011.jpg";
import icon02 from "../assets/images/icon02.png";
import icon03 from "../assets/images/icon03.png";
import { BsArrowRight } from "react-icons/bs";
import About from "../About/About";
import ServicesList from "../Services/ServicesList";
import featureImg from "../assets/images/feature-img.jpg";
import videoIcon from "../assets/images/video-icon.png";
import avatarIcon from "../assets/images/avatar-icon.png";
//import faqImg from "../assets/images/faq-img.jpg";
//import LawyersList from "./Lawyers/LawyersList";
//import FaqItem from "./Faq/FaqItem";
//import Testimonial from "../Components/Testimonial/Testimonial";
import useTitle from "../Hooks/useTitle";

const Home = () => {
  useTitle("Legal App");
  return (
    <>
      <section className="hero__section pt-[60px] 2xl:h-[800px]">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">
            <div>
              <div className="lg:w-[570px]">
                <h1 className="text-[36px] leading-[46px] text-headingColor font-[800] md:text-[60px] md:leading-[70px]">
                  We help clients access expert legal guidance with ease
                </h1>
                <p className="text_para">
                  <strong> LegalVault </strong> is a user-friendly legal
                  consultant booking app designed to simplify your legal
                  journey. From finding top-rated lawyers to booking
                  consultations seamlessly,
                  <strong> LegalVault </strong>
                  ensures hassle-free access to trusted legal support with
                  features like client reviews, personalized recommendations,
                  and firm details. We connect you to the legal help you need.
                  Your justice, made simpler and more accessible because
                  <strong> we care</strong>.
                </p>

                <button className="btn">
                  <Link to="/lawyers">Request an Appointment</Link>
                </button>
              </div>
              <div className="mt-[30px] lg:mt-[70px] flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-[30px]">
                <div>
                  <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                    30+
                  </h2>
                  <span className="w-[100px] h-2 bg-yellowColor rounded-full block mt-[-14px]"></span>
                  <p className="text_para">Years of Legal Expertise</p>
                </div>
                <div>
                  <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                    15+
                  </h2>
                  <span className="w-[100px] h-2 bg-purpleColor rounded-full block mt-[-14px]"></span>
                  <p className="text_para">Practice Locations</p>
                </div>
                <div>
                  <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                    100%
                  </h2>
                  <span className="w-[100px] h-2 bg-yellowColor rounded-full block mt-[-14px]"></span>
                  <p className="text_para">Client Satisfaction</p>
                </div>
              </div>
            </div>
            <div className="flex gap-[30px] justify-end">
              <div>
                <img src={heroImg01} alt=" " className="w-full" />
              </div>
              <div className="mt-[30px]">
                <img src={heroImg02} alt=" " className="w-full mb-[30px]" />
                <img src={heroImg03} alt=" " className="w-full " />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section End */}

      <section>
        <div className="container">
          <div className="lg:[4709x] mx-auto">
            <h2 className="heading text-center">
              Providing the Best Legal Services
            </h2>
            <p className="text_para text-center">
              Professional legal guidance for everyone. Our platform connects
              you with trusted, experienced legal consultants.
            </p>
          </div>

          {/* <div className="flex flex-wrap items-center flex-col md:flex-row gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]"></div> */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
            <div className="py-[30px] px-5">
              <div className="flex items-center justify-center">
                <img src={icon01} alt="" />
              </div>
              <div className="mt-[30px]">
                <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                  Find a Lawyer
                </h2>
                <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                  Access verified legal professionals across various fields. Our
                  network includes experts in family law, business law, and
                  more.
                </p>
                <Link
                  to="/lawyers"
                  className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none "
                >
                  <BsArrowRight className="group-hover:text-white w-6 h-5" />
                </Link>
              </div>
            </div>

            <div className="py-[30px] px-5">
              <div className="flex items-center justify-center">
                <img src={icon02} alt="" />
              </div>
              <div className="mt-[30px]">
                <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                  Browse by Location
                </h2>
                <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                  Find legal consultants near you. Explore offices and firms in
                  your city and get localized support for your legal needs.
                </p>
                <Link
                  to="/locations"
                  className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none "
                >
                  <BsArrowRight className="group-hover:text-white w-6 h-5" />
                </Link>
              </div>
            </div>

            <div className="py-[30px] px-5">
              <div className="flex items-center justify-center">
                <img src={icon03} alt="" />
              </div>
              <div className="mt-[30px]">
                <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                  Book Consultation
                </h2>
                <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                  Schedule a session with your preferred legal expert. Flexible
                  time slots and instant confirmation — get help when you need
                  it.
                </p>
                <Link
                  to="/appointments"
                  className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none "
                >
                  <BsArrowRight className="group-hover:text-white w-6 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
