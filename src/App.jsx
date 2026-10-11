import SmoothScrollProvider from "./providers/SmoothScrollProvider";
import SkipLink from "./components/SkipLink";
import ScrollProgress from "./components/ScrollProgress";
import PersistentScene from "./components/Scene/PersistentScene";
import NavBar from "./components/NavBar/NavBar";
import Hero from "./components/Hero/Hero";
import ProjectsSection from "./components/Project/ProjectsSection";
import ExperienceSection from "./components/Experience/ExperienceSection";
import SkillsSection from "./components/Skills/SkillsSection";
import ContactSection from "./components/Contact/ContactSection";
import Footer from "./components/Footer";
import { navItems } from "./data/navItems";
import { dlrFooterLine, heroCopy } from "./data/site";

export default function App() {
  return (
    <SmoothScrollProvider>
      <div className="relative min-h-screen bg-dark text-paper">
        <SkipLink />
        <PersistentScene />
        <ScrollProgress />
        <header className="relative z-20">
          <NavBar
            links={navItems}
            ctaHref="mailto:dev.joshuadolor@gmail.com"
            ctaLabel="Get in touch"
          />
        </header>

        <main id="main-content" className="relative z-10">
          <Hero
            brand={heroCopy.brand}
            role={heroCopy.role}
            pill={heroCopy.pill}
            ctaLabel={heroCopy.ctaLabel}
            ctaHref={heroCopy.ctaHref}
          />
          <ProjectsSection />
          <ExperienceSection />
          <SkillsSection />
          <ContactSection />
        </main>

        <Footer
          copyright={`© ${new Date().getFullYear()} Joshua Dolor`}
          businessLine={dlrFooterLine}
        />
      </div>
    </SmoothScrollProvider>
  );
}
