import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { lawyers } from "../../../data/lawyers.js";
import starIcon from "../../assets/images/Star.png";
import LawyerAbout from "./LawyerAbout.jsx";
import Feedback from "./Feedback.jsx";
import SidePanel from "./SidePanel.jsx";

const LawyerDetails = () => {
  const { id } = useParams();
  const [lawyer, setLawyer] = useState(null);
  const [tab, setTab] = useState("about");

  useEffect(() => {
    const selectedLawyer = lawyers.find((law) => law.id === id);
    setLawyer(selectedLawyer);
  }, [id]);

  if (!lawyer) {
    return <div>Loading...</div>;
  }

  const { name, specialty, avgRating, totalRating, photo, short } = lawyer;

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        <div className="grid md:grid-cols-3 gap-[50px]">
          <div className="md:col-span-2">
            <div className="flex items-center gap-5">
              <figure>
                <img
                  src={photo}
                  alt={name}
                  className="w-[200px] h-[200px] rounded"
                />
              </figure>
              <div>
                <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-6 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded">
                  {specialty}
                </span>
                <h3 className="text-headingColor text-[22px] leading-9 mt-3 font-bold">
                  {name}
                </h3>
                <div className="flex items-center gap-[6px]">
                  <span className="flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold text-headingColor">
                    <img src={starIcon} alt="star" /> {avgRating}
                  </span>
                  <span className="text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold text-headingColor">
                    ({totalRating})
                  </span>
                </div>
                <p className="text_para text-[14px] leading-5 md:text-[15px] lg:max-w-[390px]">
                  {short}
                </p>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-[50px] border-b border-solid border-[#0066ff34]">
              <button
                onClick={() => setTab("about")}
                className={`${
                  tab === "about" && `border-b border-solid border-primaryColor`
                } py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
              >
                About
              </button>
              <button
                onClick={() => setTab("feedback")}
                className={`${
                  tab === "feedback" &&
                  `border-b border-solid border-primaryColor`
                } py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
              >
                Feedback
              </button>
            </div>

            {/* Tab content */}
            <div className="mt-[50px]">
              {tab === "about" && <LawyerAbout lawyer={lawyer} />}
              {tab === "feedback" && <Feedback lawyer={lawyer} />}
            </div>
          </div>

          {/* Right panel */}
          <SidePanel />
        </div>
      </div>
    </section>
  );
};

export default LawyerDetails;
