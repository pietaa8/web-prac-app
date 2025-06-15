const LawyerAbout = ({ lawyer = {} }) => {
  return (
    <div>
      <div>
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2">
          About{" "}
          <span className="text-irisBlueColor font-bold text-[24px] leading-9">
            {lawyer?.name || "Lawyer"}
          </span>
        </h3>
        <p className="text_para">
          <strong>{lawyer?.name || "Mr. Faris"}</strong> is a highly respected{" "}
          {lawyer?.specialty || "legal consultant"} with years of experience in
          advising clients on complex legal matters. Specializing in{" "}
          {lawyer?.practiceArea ||
            "corporate law, civil disputes, and legal compliance"}
          ,<strong> {lawyer?.name || "Mr. Faris"}</strong> is dedicated to
          providing sound legal strategies and personalized consultation. With a
          strong commitment to justice and professional ethics,{" "}
          <strong>{lawyer?.name || "Mr. Faris"}</strong> helps clients navigate
          legal challenges confidently. Continuously staying updated on legal
          reforms and case law, they ensure the best possible outcomes for every
          client.
        </p>
      </div>

      <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">
          Education & Affiliations
        </h3>

        <ul className="pt-4 md:p-5">
          <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]">
            <div>
              <span className="text-irisBlueColor text-[15px] leading-6 font-semibold">
                {lawyer?.name || "Lawyer"}
              </span>
              <p className="text-[16px] leading-6 font-medium text-textColor">
                {lawyer?.education || "LL.B. from a reputed law school"}
              </p>
            </div>
            <p className="text-[14px] leading-5 font-medium text-textColor">
              {lawyer?.firm || "Law Firm / Bar Association affiliation"}
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LawyerAbout;
