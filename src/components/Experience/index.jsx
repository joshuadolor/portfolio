import experiences from "./experience.json";
import ExperienceCard from "./ExperienceCard";
import { useStateContext } from "../../contexts/ContextProvider";
import { useEffect, useRef } from "react";

const ExperienceSection = () => {
  const { setSection } = useStateContext();
  const ref = useRef(null);
  useEffect(() => {
    if (ref) {
      setSection(ref);
    }
  }, [ref]);

  return (
    <section ref={ref} className="pt-20 pb-10" id="experience">
      <div className="text-white md:hidden sm:block xs:block font-bold text-2xl">
        Work Experience
      </div>
      {experiences.map((item, idx) => (
        <ExperienceCard key={idx} {...item} />
      ))}
    </section>
  );
};
export default ExperienceSection;
