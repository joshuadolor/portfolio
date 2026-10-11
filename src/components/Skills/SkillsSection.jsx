import { skillCategories } from "../../data/skillCategories";

export default function SkillsSection() {
  return (
    <section
      className="relative z-10 py-24 md:py-28 px-6 border-t border-white/5 overflow-hidden"
      id="skills"
      aria-labelledby="skills-heading"
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-full md:w-[70%] bg-gradient-to-r from-dark via-dark/90 to-transparent"
        aria-hidden="true"
      />
      <div className="relative max-w-content mx-auto">
        <h2
          id="skills-heading"
          className="font-display text-4xl md:text-5xl text-paper tracking-tight mb-12 md:mb-16"
        >
          Toolkit
        </h2>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((cat, colIdx) => (
            <section key={cat.title} aria-labelledby={`skill-cat-${colIdx}`}>
              <h3
                id={`skill-cat-${colIdx}`}
                className={`text-sm font-semibold uppercase tracking-[0.14em] mb-4 ${
                  colIdx === 0 ? "text-primary" : "text-mute"
                }`}
              >
                {cat.title}
              </h3>
              <ul className="space-y-2 list-none p-0 m-0">
                {cat.items.map(({ label }) => (
                  <li key={label} className="text-lg text-paper/90">
                    {label}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
