import { motion } from "framer-motion";

export default function HeroV2({
  eyebrow = "Available for new opportunities",
  headline = "Hi, I'm Joshua Dolor",
  headlineHighlight = "Joshua Dolor",
  subhead = "Senior Web Engineer",
  tagline,
  businessNote,
  ctaLabel = "Download CV",
  ctaHref = "./JoshuaDolor.pdf",
  statsCard = null, // { number, label, tags[] }
}) {
  return (
    <section
      className="min-h-screen flex items-center justify-center pt-20 px-6"
      id="hero"
    >
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-primary font-bold tracking-[0.2em] uppercase text-sm block"
          >
            {eyebrow}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-6xl md:text-8xl font-bold leading-tight"
          >
            {headlineHighlight
              ? (
                  <>
                    {headline.replace(headlineHighlight, "").trim()}
                    <br />
                    <span className="text-primary">{headlineHighlight}</span>
                  </>
                )
              : headline}
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-2xl md:text-3xl text-gray-400 font-light"
          >
            {subhead}
          </motion.h2>
          {tagline && (
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="text-gray-400 max-w-lg text-lg leading-relaxed"
            >
              {tagline}
            </motion.p>
          )}
          {businessNote && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.28 }}
              className="max-w-xl pt-6 mt-1 border-t border-white/[0.07]"
            >
              <p className="text-[0.9375rem] text-gray-500 leading-[1.65]">
                {businessNote}
              </p>
            </motion.div>
          )}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: businessNote ? 0.34 : 0.3 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <a
              href={ctaHref}
              download={ctaHref?.endsWith?.(".pdf")}
              className="bg-primary hover:bg-blue-600 text-white px-8 py-4 rounded-custom font-bold text-lg inline-flex items-center gap-2 transition-transform active:scale-95 shadow-lg shadow-secondary/10"
            >
              {ctaLabel}
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </a>
          </motion.div>
        </div>

        {statsCard && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: businessNote ? 0.38 : 0.35 }}
            className="relative hidden md:block"
          >
            <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full" />
            <div className="relative z-10 p-8 glass-card aspect-square flex flex-col justify-center items-center text-center space-y-4 border-secondary/20">
              <div className="text-7xl font-bold text-secondary">
                {statsCard.number}
              </div>
              <div className="text-xl font-medium text-gray-300">
                {statsCard.label}
              </div>
              {statsCard.tags && statsCard.tags.length > 0 && (
                <div className="flex gap-2 flex-wrap justify-center">
                  {statsCard.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-surface-light rounded-full text-xs text-secondary border border-secondary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
