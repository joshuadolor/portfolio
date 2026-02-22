import { motion } from "framer-motion";

export default function NavBarV2({ links = [], ctaHref = "mailto:dev.joshuadolor@gmail.com", ctaLabel = "Hire Me", logoText = "JD" }) {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center glass-card border-none rounded-none bg-dark/80 backdrop-blur-md"
    >
      <a href="#hero" className="text-2xl font-bold tracking-tighter text-inherit no-underline">
        {logoText}<span className="text-primary">.</span>
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
      <a
        className="px-5 py-2 border rounded-custom hover:text-white transition-all text-sm font-bold uppercase border-secondary text-secondary hover:bg-secondary"
        href={ctaHref}
      >
        {ctaLabel}
      </a>
    </motion.nav>
  );
}
