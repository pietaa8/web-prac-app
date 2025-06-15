import aboutImg from "../assets/images/about.png";
import aboutCardImg from "../assets/images/about-card.png";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section>
      <div className="container">
        <div className="flex justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row">
          {/* Image Section */}
          <div className="relative w-3/4 lg:2-1/2 xl:w-[700px] z-10 order-2 lg:order-1">
            <img src={aboutImg} alt="About Us" />
            <div className="absolute z-20 bottom-4 w-[200px] md:w-[300px] right-[-30%] md:right-[-7%] lg:right-[22%]">
              <img src={aboutCardImg} alt="Healthcare Excellence" />
            </div>
          </div>

          {/* Content Section */}
          <div className="w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2">
            <h1 className="heading">Proud to be One of the Nations Best</h1>
            <p className="text_para">
              Our commitment to excellence in healthcare ensures that every
              patient receives top-tier medical attention. With a team of
              experienced professionals and cutting-edge technology, we strive
              to provide the best possible care tailored to individual needs.
            </p>
            <p className="text_para mt-[30px]">
              We believe in a patient-first approach, focusing on innovative
              treatments, compassionate care, and seamless healthcare
              experiences. Whether it is routine check-ups, specialized
              treatments, or advanced medical procedures, we are dedicated to
              ensuring the highest quality of service.
            </p>
            <Link to="/">
              <button className="btn">
                <Link to="/doctors">Learn More</Link>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
