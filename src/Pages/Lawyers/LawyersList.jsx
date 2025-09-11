import { useState, useEffect } from "react";
import LawyerCard from "./LawyerCard";
import BASE_URL from "@/config.js";

const LawyersList = () => {
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const res = await fetch(`${BASE_URL}/lawyers`);

        if (!res.ok) throw new Error("Failed to fetch lawyers");
        const data = await res.json();
        setLawyers(data);
      } catch (error) {
        console.error("❌ Error fetching lawyers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLawyers();
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

  return (
    <section className="pt-[60px]">
      <div className="container">
        <div className="xl:w-[470px] mx-auto">
          <h2 className="heading text-center">Our Lawyers</h2>
          <p className="text__para text-center">
            Meet our experienced lawyers ready to help you with legal issues.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
          {lawyers.length > 0 ? (
            lawyers.map((lawyer) => (
              <LawyerCard key={lawyer._id} lawyer={lawyer} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 italic">
              No lawyers available yet. Please check back later.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default LawyersList;
