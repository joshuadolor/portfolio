import experienceData from "../components/Experience/experience.json";

/**
 * Maps experience.json → timeline entries (work only).
 */
export const careerJourney = experienceData.map((item) => ({
  period: `${item.from} — ${item.to}`,
  title: item.role,
  org: item.company,
  orgHref: item.link || undefined,
  description: item.summary,
  skills: item.skills || [],
}));

/** Kept under Experience as a footnote — not mixed into the job rail */
export const education = {
  period: "2016",
  title:
    "Bachelor of Science in Information Technology with Specialization in Web and Mobile Applications",
  org: "Far Eastern University - Institute of Technology",
};
