export default function GlassCard({
  children,
  className = "",
  hover = true,
  transition = true,
}) {
  const baseClass = "glass-card";
  const classes = [
    baseClass,
    hover && "hover:border-primary/50 transition-colors",
    transition && "transition-all duration-300",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={classes}>{children}</div>;
}
