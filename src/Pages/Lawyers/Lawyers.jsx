import Testimonial from "../../Components/Testimonial/Testimonial.jsx";
import { lawyers } from ".././../../data/lawyers.js";
import LawyerCard from "./LawyerCard";

const Lawyers = () => {
  return (
    <>
      {/* Section: Heading */}
      <section className="bg-[#fff9ea]">
        <div className="container text-center">
          <div>
            <h2 className="heading">Our Legal Experts</h2>
          </div>
        </div>
      </section>

      {/* Section: Lawyer Cards */}
      <section>
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {lawyers.map((lawyer) => (
              <LawyerCard key={lawyer.id} lawyer={lawyer} />
            ))}
          </div>
        </div>
      </section>

      {/* Section: Testimonials */}
      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">What Our Clients Say</h2>
            <p className="text_para text-center">
              Trusted legal support for everyone. Our consultants provide expert
              guidance with all the dedication and integrity.
            </p>
          </div>
          <Testimonial />
        </div>
      </section>
    </>
  );
};

export default Lawyers;
