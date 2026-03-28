import { motion } from "framer-motion";
import NavBarV2 from "./components/NavBar/NavBarV2";
import HeroV2 from "./components/Hero/HeroV2";
import SectionHeading from "./components/SectionHeading";
import TimelineItem from "./components/TimelineItem";
import SkillsSection from "./components/Skills/SkillsSection";
import ProjectCardV2 from "./components/ProjectCardV2";
import ContactCard from "./components/ContactCard";
import SocialLinks from "./components/SocialLinks";
import Footer from "./components/Footer";
import { navItems } from "./data/navItems";
import { careerJourney } from "./data/careerJourney";
import { contactMethods, socialLinks } from "./data/contact";
import { dlrHeroNote, dlrFooterLine } from "./data/site";
import projects from "./components/Project/projects";

const heroStatsCard = {
  number: "10+",
  label: "Years of Code Crafting",
  tags: ["Full Stack", "Architecture"],
};

export default function App() {
  return (
    <div className="min-h-screen">
      <header>
        <NavBarV2
          links={navItems}
          ctaHref="mailto:dev.joshuadolor@gmail.com"
          ctaLabel="Get in touch"
        />
      </header>
      <main>
        {/* Hero */}
        <HeroV2
          eyebrow="Available for new opportunities"
          headline="Hi, I'm Joshua Dolor"
          headlineHighlight="Joshua Dolor"
          subhead="Senior Web Engineer"
          tagline="With 10+ years of industry experience, I specialize in crafting high-performance full-stack applications using modern ecosystems like Laravel, React, and Vue."
          businessNote={dlrHeroNote}
          ctaLabel="Download CV"
          ctaHref="./JoshuaDolor.pdf"
          statsCard={heroStatsCard}
        />

        {/* Experience - Career Journey */}
        <section className="py-24 px-6 bg-surface/50" id="experience">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-20 text-center"
            >
              <SectionHeading
                title="Career Journey"
                underline
                className="text-center"
              />
            </motion.div>
            <div className="space-y-20 border-l-2 border-primary/20 ml-4">
              {careerJourney.map((item, idx) => (
                <TimelineItem
                  key={`${item.period}-${item.title}-${idx}`}
                  {...item}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                />
              ))}
            </div>
          </div>
        </section>

        <SkillsSection />

        {/* Projects */}
        <section className="py-24 px-6 bg-surface/50" id="projects">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4"
            >
              <div>
                <SectionHeading
                  title="Featured Projects"
                  subtitle="Selected work that highlights my engineering expertise"
                />
              </div>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              {projects.map((project, idx) => (
                <ProjectCardV2
                  key={project.title}
                  image={project.image}
                  title={project.title}
                  summary={project.summary}
                  tags={project.skills ?? []}
                  link={project.link}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-24 px-6 relative overflow-hidden" id="contact">
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold mb-8">
              Let's build something{" "}
              <span className="text-secondary">remarkable</span> together.
            </h2>
            <p className="text-gray-400 mb-12 text-lg">
              I'm always open to discussing new projects, creative ideas or
              opportunities to be part of your visions.
            </p>
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {contactMethods.map((method) => (
                <ContactCard
                  key={method.label}
                  label={method.label}
                  value={method.value}
                  href={method.href}
                  icon={method.icon}
                />
              ))}
            </div>
            <SocialLinks links={socialLinks} />
          </motion.div>
        </section>
      </main>

      <Footer
        copyright={`© ${new Date().getFullYear()} Joshua Dolor`}
        businessLine={dlrFooterLine}
      />
    </div>
  );
}
