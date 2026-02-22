import { motion } from "framer-motion";

const dotClass = (variant) =>
  variant === "education" || variant === "yellow"
    ? "timeline-dot-yellow"
    : "timeline-dot";

export default function TimelineItem({
  period,
  title,
  org,
  description,
  variant,
  ...motionProps
}) {
  return (
    <motion.div
      className={`relative pl-12 ${dotClass(variant)}`}
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
      {...motionProps}
    >
      <span
        className={`${
          variant === "education" || variant === "yellow"
            ? "text-secondary"
            : "text-primary"
        } font-bold text-sm block mb-2 tracking-widest uppercase`}
      >
        {period}
      </span>
      <h4 className="text-3xl font-bold mb-1">{title}</h4>
      <p
        className={`text-xl font-medium mb-4 ${
          variant === "education" || variant === "yellow"
            ? "text-primary"
            : "text-secondary"
        }`}
      >
        {org}
      </p>
      <p className="text-gray-400 leading-relaxed text-lg max-w-2xl">
        {description}
      </p>
    </motion.div>
  );
}
