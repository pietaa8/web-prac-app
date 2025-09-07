/* eslint-disable react/prop-types */
import { AiFillStar } from "react-icons/ai";

const Reviews = ({ items }) => {
  const arr = Array.from({ length: items.rating });

  return (
    <div className="flex justify-between gap-6 mb-6">
      {/* Left: Client info */}
      <div className="flex gap-3 items-start">
        {/* Client photo */}
        {items.photo ? (
          <img
            src={items.photo}
            alt={items.name}
            className="w-8 h-8 rounded-full object-cover mt-1"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold mt-1">
            {items.name[0]}
          </div>
        )}

        {/* Name, date, review text */}
        <div>
          <h5 className="text-[15px] font-semibold text-primaryColor">
            {items.name}
          </h5>
          <p className="text-[13px] text-gray-500">{items.date}</p>
          <p className="text-[14px] mt-1">{items.review}</p>
        </div>
      </div>

      {/* Right: Rating stars */}
      <div className="flex gap-1 items-center mt-1">
        {arr.map((_, index) => (
          <AiFillStar key={index} color="#0067FF" />
        ))}
        <span className="text-gray-500">({items.rating})</span>
      </div>
    </div>
  );
};

export default Reviews;
