import React, { createContext, useContext, useState, useEffect } from "react";

const StateContext = createContext();

const isSectionActive = (el) => {
  if (!el) return;
  const { top } = el.getBoundingClientRect();
  return top < 120;
};

export const ContextProvider = ({ children }) => {
  const [activeLink, setActiveLink] = useState("home");
  const [sections, setSections] = useState([]);

  const setSection = (el) => {
    const { current } = el;
    if (current && !sections.find((section) => section.id == current.id)) {
      sections.push(current);
      setSections(sections);
      if (isSectionActive(current)) {
        setActiveLink(current.id);
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      sections.forEach((section) => {
        if (isSectionActive(section)) {
          setActiveLink(section.id);
        }
      });
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  return (
    <StateContext.Provider value={{ activeLink, setSection }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
