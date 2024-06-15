import SkillTag from "../SkillTag";
import { FaExternalLinkAlt } from "react-icons/fa";

const ExperienceCard = ({ from, to, role, company, summary, skills, link }) => {
  return (
    <div
      onClick={() => {
        if (link) {
          window.open(link, "_blank");
        }
      }}
      className="experience-card rounded-md hover:outline hover:outline-[#f2c542] flex gap-5 mb-5 px-3 py-5"
    >
      <div className="w-1/6 text-sm">
        {from} to {to}
      </div>
      <div className="relative w-5/6">
        <FaExternalLinkAlt className="absolute right-0 hidden text-[#f2c542] link-icon text-sm" />
        <h3 className="font-bold  text-white">{role}</h3>
        <h4 className="text-white company-name">{company}</h4>
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

export default ExperienceCard;
