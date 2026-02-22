import { motion } from "framer-motion";

export default function SkillCard({ icon, label, ...motionProps }) {
  return (
    <motion.div
      className="glass-card p-8 text-center hover:border-primary/50 transition-colors group"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.35 }}
      {...motionProps}
    >
      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h5 className="font-bold">{label}</h5>
    </motion.div>
  );
}
