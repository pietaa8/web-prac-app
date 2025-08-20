//import { Link } from "react-router-dom";
import heroImg01 from "../assets/images/hero-img04.jpg";
import heroImg02 from "../assets/images/hero-img05.jpg";
import heroImg03 from "../assets/images/hero-img06.jpg";
import About from "../About/About";
import ServicesList from "../Services/ServicesList";
import faqImg from "../assets/images/faq-img.jpg";
import LawyersList from "./Lawyers/LawyersList";
import FaqItem from "./Faq/FaqItem";
import Testimonial from "../Components/Testimonial/Testimonial";
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
                  <strong> we care about you</strong>.
                </p>

                {/*   <button className="btn">
                  <Link to="/lawyers">Request an Appointment</Link>
                </button> */}
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

      {/* About Section */}
      <About />
      {/* Services */}
      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">Our Legal Services</h2>
            <p className="text_para text-center">
              Expert legal solutions for everyone. Our platform connects you to
              trusted legal professionals across a wide range of practice areas.
            </p>
          </div>
          <ServicesList />
        </div>
      </section>

      {/* Lawyer Section */}
      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">Our Great lawyers</h2>
            <p className="text_para text-center">
              Trusted legal support for everyone. Our platform offers unmatched
              access to expert legal consultants for all your legal needs.
            </p>
          </div>
          <LawyersList />
        </div>
      </section>
      {/* FAQ SECTION */}
      <section>
        <div className="container">
          <div className="flex justify-between gap-[50px] lg:gap-0">
            <div className="w-1/2 hidden md:block">
              <img src={faqImg} alt="" />
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="heading">Most Question by our beloved clients</h2>
              <FaqItem />
            </div>
          </div>
        </div>
      </section>
      {/* testimonial */}
      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">What our clients say</h2>
            <p className="text_para text-center">
              Trusted legal advice for everyone. Our platform connects you with
              top-tier legal consultants, offering <br /> reliable and timely
              support whenever you need it.
            </p>
          </div>
          <Testimonial />
        </div>
      </section>
    </>
  );
};

export default Home;
