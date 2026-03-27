import { motion } from "framer-motion";
import { skillCategories } from "../../data/skillCategories";

export default function SkillsSection() {
  return (
    <section className="py-24 px-6" id="skills">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45 }}
          className="mb-14 md:mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
            Capabilities
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-100 tracking-tight">
            Tools by layer
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl text-base leading-relaxed">
            Grouped how I actually think about work—UI, server and data, then how
            it gets to production. Not an exhaustive list; just what shows up most
            often in my day-to-day.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, delay: 0.06 }}
          className="grid gap-12 md:grid-cols-3 md:gap-0 md:divide-x md:divide-white/[0.06]"
        >
          {skillCategories.map((cat, colIdx) => (
            <div
              key={cat.title}
              className={colIdx > 0 ? "md:pl-10 lg:pl-12" : ""}
            >
              <h3 className="text-sm font-semibold text-gray-200 mb-1">
                {cat.title}
              </h3>
              <p className="text-xs text-gray-600 mb-6 leading-relaxed">
                {cat.description}
              </p>
              <ul className="space-y-3.5">
                {cat.items.map(({ Icon, label }) => (
                  <li key={label} className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-white/[0.08] bg-dark/40 text-[1.15rem] text-gray-400">
                      <Icon className="h-[1.15rem] w-[1.15rem]" aria-hidden />
                    </span>
                    <span className="text-sm text-gray-300 font-medium">
                      {label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
