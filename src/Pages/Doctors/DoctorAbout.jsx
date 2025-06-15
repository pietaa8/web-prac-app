const DoctorAbout = ({ doctor = {} }) => {
  return (
    <div>
      <div>
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2">
          About of{" "}
          <span className="text-irisBlueColor font-bold text-[24px] leading-9">
            {doctor?.name || "Doctor"}
          </span>
        </h3>
        <p className="text_para">
          <strong>{doctor?.name || "Dr. Faris"}</strong> is a highly skilled{" "}
          {doctor?.specialty || "medical professional"} with extensive
          experience in diagnosing and treating a wide range of medical
          conditions. Specializing in various areas of healthcare,{" "}
          <strong>{doctor?.name || "Dr. Faris"}</strong> is dedicated to
          providing personalized care to each patient with a focus on effective
          treatment and compassionate support. Their goal is to improve the
          well-being of individuals by offering innovative and tailored care
          that meets the specific needs of every patient.{" "}
          <strong>{doctor?.name || "Dr. Faris"}</strong> remains committed to
          advancing their knowledge and expertise through continuous learning
          and staying at the forefront of medical developments.
        </p>
      </div>

      <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">
          Education
        </h3>

        <ul className="pt-4 md:p-5">
          <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]">
            <div>
              <span className="text-irisBlueColor text-[15px] leading-6 font-semibold">
                {doctor?.name || "Doctor"}
              </span>
              <p className="text-[16px] leading-6 font-medium text-textColor">
                {doctor?.education || "Education details not available"}
              </p>
            </div>
            <p className="text-[14px] leading-5 font-medium text-textColor">
              {doctor?.hospital || "Hospital details not available"}
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DoctorAbout;
