import { useState } from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";

const Link = ({ children, isActive, href }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <AnchorLink
      href={"#" + href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`anchor-link text-sm flex items-center ${
        isActive || isHovered ? "font-bold text-white" : "text-blue-200"
      }`}
    >
      <div
        className={`${
          isActive || isHovered ? "w-10 bg-white" : "w-6 bg-blue-200"
        } h-1 mr-2  inline-block`}
      ></div>
      {children}
    </AnchorLink>
  );
};
export default Link;
