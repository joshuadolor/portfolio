import {
  SiJavascript,
  SiLaravel,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiPhp,
  SiReact,
  SiTailwindcss,
  SiVuedotjs,
  SiGit,
  SiDocker,
  SiGithubactions,
} from "react-icons/si";

export const skillCategories = [
  {
    title: "Interface",
    description: "Component-driven UIs and styling systems.",
    items: [
      { Icon: SiReact, label: "React" },
      { Icon: SiVuedotjs, label: "Vue.js" },
      { Icon: SiTailwindcss, label: "Tailwind CSS" },
      { Icon: SiJavascript, label: "JavaScript" },
    ],
  },
  {
    title: "Application layer",
    description: "APIs, backends, and data stores I use regularly.",
    items: [
      { Icon: SiLaravel, label: "Laravel" },
      { Icon: SiPhp, label: "PHP" },
      { Icon: SiNodedotjs, label: "Node.js" },
      { Icon: SiMysql, label: "MySQL" },
      { Icon: SiMongodb, label: "MongoDB" },
    ],
  },
  {
    title: "Ship & run",
    description: "Version control, containers, and release automation.",
    items: [
      { Icon: SiGit, label: "Git" },
      { Icon: SiDocker, label: "Docker" },
      { Icon: SiGithubactions, label: "CI / CD" },
    ],
  },
];
