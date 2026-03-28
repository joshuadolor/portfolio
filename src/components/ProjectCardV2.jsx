import { motion } from "framer-motion";

const ArrowIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 8l4 4m0 0l-4 4m4-4H3"
    />
  </svg>
);

export default function ProjectCardV2({
  image,
  title,
  summary,
  tags = [],
  link,
  ...motionProps
}) {
  return (
    <motion.article
      className="group glass-card overflow-hidden hover:-translate-y-2 transition-transform duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
      {...motionProps}
    >
      <div className="h-48 bg-surface-light relative">
        {image && (
          <img
            alt={`${title} — project preview`}
            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
            src={image}
          />
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-400 text-sm mb-4">{summary}</p>
        {tags.length > 0 && (
          <div className="flex gap-2 mb-4 flex-wrap">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] uppercase font-bold px-2 py-1 bg-dark text-gray-300 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        {link && (
          <a
            className="text-primary text-sm font-bold inline-flex items-center gap-1 group-hover:gap-2 transition-all"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            View site <ArrowIcon />
          </a>
        )}
      </div>
    </motion.article>
  );
}
