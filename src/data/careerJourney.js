import experienceData from "../components/Experience/experience.json";

/**
 * Maps experience.json entries to { period, title, org, description, variant? }.
 * variant: undefined | "education" | "yellow" for timeline dot style.
 */
const fromExperience = experienceData.map((item) => ({
  period: `${item.from} — ${item.to}`,
  title: item.role,
  org: item.company,
  description: item.summary,
  variant: undefined,
}));

const educationItem = {
  period: "2016",
  title: "Bachelor of Science in Information Technology with Spacialization in Web and Mobile Applications",
  org: "Far Eastern University - Institute of Technology",
  description:
    "",
  variant: "education",
};

export const careerJourney = [...fromExperience, educationItem];
