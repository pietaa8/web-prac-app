import { useEffect, useState } from "react";
import Testimonial from "../../Components/Testimonial/Testimonial.jsx";
import { getLawyers, getTestimonials } from "../../api/api.js"; // make sure api.js has getLawyers function
import LawyerCard from "./LawyerCard";

const Lawyers = () => {
    const [lawyers, setLawyers] = useState([]);
      const [loading, setLoading] = useState(true);
    // Remove this if not used yet
  //const [testimonials, setTestimonials] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
      const lawyersData = await getLawyers();
      setLawyers(lawyersData);

      const testimonialsData = await getTestimonials();
      setTestimonials(testimonialsData);
       } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); // ✅ mark loading as finished
    }
    };

    fetchData();
  }, []);
if (loading) {
  return (
    <section className="pt-[60px]">
      <div className="container text-center">
        <p className="text-gray-600 animate-pulse">Loading lawyers...</p>
      </div>
    </section>
  );
}

// Add this check for empty array
if (!lawyers.length) {
  return (
    <section className="pt-[60px]">
      <div className="container text-center">
        <p className="text-center mt-10 text-gray-500">No lawyers available.</p>
      </div>
    </section>
  );
}

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
              <LawyerCard key={lawyer._id} lawyer={lawyer} />
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
