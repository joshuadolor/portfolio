import SkillTag from "../SkillTag";
import { FaExternalLinkAlt } from "react-icons/fa";

const ProjectCard = ({
  title,
  image,
  summary,
  skills,
  link,
  isOutdated = false,
}) => {
  return (
    <div
      onClick={() => {
        if (link) {
          window.open(link, "_blank");
        }
      }}
      className="experience-card rounded-md items-start hover:outline hover:outline-[#f2c542] flex gap-5 mb-5 px-3 py-5"
      style={{
        opacity: isOutdated ? 0.5 : 1,
      }}
    >
      <div className="w-1/5">
        <img src={image} />
        {isOutdated && (
          <div className="text-sm text-center text-[#f2c542] italic">
            Obsolete
          </div>
        )}
      </div>
      <div className="relative w-4/5">
        <FaExternalLinkAlt className="absolute text-sm right-0 hidden text-[#f2c542] link-icon" />
        <h3 className="font-bold  text-white pr-1">{title}</h3>
        <p className="text-sm my-2">{summary}</p>
        <div className="flex gap-2 py-2 flex-wrap">
          {skills.map((item, idx) => (
            <SkillTag key={idx}>{item}</SkillTag>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
