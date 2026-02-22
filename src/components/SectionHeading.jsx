export default function SectionHeading({
  title,
  subtitle,
  underline = false,
  className = "",
}) {
  return (
    <div className={className}>
      <h3
        className={`text-3xl md:text-4xl font-bold mb-4 ${
          underline
            ? "underline-offset-[12px] border-b-4 border-secondary inline-block pb-2"
            : ""
        }`}
      >
        {title}
      </h3>
      {subtitle && (
        <p className="text-gray-400 text-lg">{subtitle}</p>
      )}
    </div>
  );
}
