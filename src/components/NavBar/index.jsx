import Link from "./Link";

import { useStateContext } from "../../contexts/ContextProvider";

const Navbar = () => {
  const { activeLink } = useStateContext();

  return (
    <nav className="md:flex-1 my-12 hidden md:block lg:block">
      <ul className="flex flex-col gap-3 ">
        <li>
          <Link isActive={activeLink === "home"} href="home">
            SUMMARY
          </Link>
        </li>
        <li>
          <Link isActive={activeLink === "experience"} href="experience">
            EXPERIENCE
          </Link>
        </li>
        <li>
          <Link isActive={activeLink === "project"} href="project">
            PROJECTS
          </Link>
        </li>
        <li>
          <Link isActive={activeLink === "contact"} href="contact">
            CONTACT
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
