import projects from "./projects";
import ProjectCard from "./ProjectCard";
import { useStateContext } from "../../contexts/ContextProvider";
import { useEffect, useRef } from "react";

const ProjectSection = () => {
  const { setSection } = useStateContext();
  const ref = useRef(null);
  useEffect(() => {
    if (ref) {
      setSection(ref);
    }
  }, [ref]);

  return (
    <section ref={ref} id="project" className="pt-20 pb-10">
      <div className="text-white md:hidden sm:block xs:block font-bold text-2xl">
        Projects
      </div>
      {projects.map((item, idx) => (
        <ProjectCard key={idx} {...item} />
      ))}
      <div className=" italic text-xs">Most of my projects are internal.</div>
    </section>
  );
};
export default ProjectSection;
