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
import { RiCursorLine, RiRobot2Line } from "react-icons/ri";
import { HiSparkles } from "react-icons/hi2";

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
    title: "AI workflow",
    description: "How I move faster without giving up craft.",
    items: [
      { Icon: RiCursorLine, label: "Cursor" },
      { Icon: HiSparkles, label: "Claude" },
      { Icon: RiRobot2Line, label: "Claude Code" },
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
