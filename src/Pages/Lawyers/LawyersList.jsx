import { lawyers } from "../../../data/lawyers.js";
import LawyerCard from "./LawyerCard.jsx";
const LawyersList = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
      {lawyers.map((lawyer, index) => (
        <LawyerCard doctor={lawyer} key={index} />
      ))}
    </div>
  );
};

export default LawyersList;
