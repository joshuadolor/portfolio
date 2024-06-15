import { useStateContext } from "../../contexts/ContextProvider";
import { useEffect, useRef } from "react";

const HomeSection = () => {
  const { setSection } = useStateContext();
  const ref = useRef(null);
  useEffect(() => {
    if (ref) {
      setSection(ref);
    }
  }, [ref]);

  return (
    <section id="home" className="py-10 md:py-24 lg:py-24" ref={ref}>
      <p>
        I'm <span className="text-white font-medium">Joshua Olbes Dolor</span>,
        a graduate of{" "}
        <a
          href="https://www.feutech.edu.ph/"
          className="text-white font-medium hover:text-[#f2c542]"
        >
          Far Eastern University - Institute of Technology
        </a>{" "}
        with a degree in
        <span className="text-white font-medium"> Information Technology</span>,
        specializing in
        <span className="text-white font-medium">
          {" "}
          Web and Mobile applications
        </span>
        . For{" "}
        <span className="text-white font-bold">
          {new Date().getFullYear() - 2016} years
        </span>
        , I've gained diverse experience in different industries, applying my
        skills in PHP, Laravel, MySQL, MongoDB, jQuery, React, VueJS, and
        vanilla <span className="text-white font-medium">Javascript</span>.
      </p>

      <p className="mt-5">
        In various contexts, I've optimized processes and contributed to
        creating engaging applications. My adaptable nature, combined with a
        passion for building applications using{" "}
        <span className="text-white font-medium">Javascript</span>, drives my
        commitment to delivering quality solutions. I look forward to exploring
        new opportunities that align with my career aspirations.
      </p>
    </section>
  );
};

export default HomeSection;
