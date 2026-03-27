import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function NavBarV2({
  links = [],
  ctaHref = "mailto:dev.joshuadolor@gmail.com",
  ctaLabel = "Get in touch",
  logoText = "JD",
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35 }}
        className={`fixed top-0 w-full px-6 py-4 flex justify-between items-center glass-card border-none rounded-none bg-dark/80 backdrop-blur-md ${
          menuOpen ? "z-[110]" : "z-50"
        }`}
      >
        <a
          href="#hero"
          className="text-2xl font-bold tracking-tighter text-inherit no-underline"
          onClick={() => setMenuOpen(false)}
        >
          {logoText}
          <span className="text-primary">.</span>
        </a>

        <ul className="hidden md:flex space-x-8 text-sm font-medium uppercase tracking-widest">
          {links.map((item) => (
            <li key={item.href}>
              <a
                className="hover:text-primary transition-colors text-gray-300"
                href={item.href}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            className="hidden sm:inline-flex px-5 py-2 border rounded-custom hover:text-white transition-all text-sm font-bold uppercase border-secondary text-secondary hover:bg-secondary"
            href={ctaHref}
          >
            {ctaLabel}
          </a>

          <button
            type="button"
            className="md:hidden flex h-11 w-11 items-center justify-center rounded-custom border border-white/10 text-gray-200 hover:bg-white/5 transition-colors"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? (
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav"
            className="fixed inset-0 z-[100] md:hidden flex flex-col bg-dark/97 backdrop-blur-lg pt-24 px-8 pb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="flex flex-col gap-1" aria-label="Section links">
              {links.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className="py-4 text-lg font-medium uppercase tracking-widest text-gray-200 border-b border-white/[0.06] hover:text-primary transition-colors"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.04 }}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
            <motion.a
              href={ctaHref}
              className="mt-8 px-5 py-3.5 text-center border rounded-custom text-sm font-bold uppercase border-secondary text-secondary hover:bg-secondary hover:text-dark transition-colors"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onClick={() => setMenuOpen(false)}
            >
              {ctaLabel}
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
