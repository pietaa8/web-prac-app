import React, { useEffect, useState } from "react";
import { BiPlus, BiMinus } from "react-icons/bi";
import { getFAQs } from "../../../api/api"; // backend API function

const FAQItem = () => {
  const [faqs, setFaqs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const data = await getFAQs();
        setFaqs(data);
      } catch (err) {
        console.error("Failed to fetch FAQs:", err);
      }
    };
    fetchFAQs();
  }, []);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="mt-5 lg:mt-7">
      {faqs.length === 0 && <p>Loading FAQs...</p>}
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="border rounded-lg p-4 mb-3 cursor-pointer"
          onClick={() => toggleFAQ(index)}
        >
          <div className="flex justify-between items-center">
            <h4 className="font-semibold text-textColor">{faq.question}</h4>
            {activeIndex === index ? <BiMinus /> : <BiPlus />}
          </div>
          {activeIndex === index && (
            <p className="mt-2 text-textColor">{faq.answer}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQItem;
