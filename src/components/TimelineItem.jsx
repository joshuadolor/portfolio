export default function TimelineItem({
  period,
  title,
  org,
  description,
  skills = [],
}) {
  return (
    <article className="relative">
      <time className="block text-sm text-mute mb-1.5">
        <span className="sr-only">Period: </span>
        {period}
      </time>
      <h3 className="font-display text-2xl md:text-3xl text-paper tracking-tight">
        {title}
      </h3>
      <p className="mt-1 text-sm text-primary">
        <span className="sr-only">Company: </span>
        {org}
      </p>
      {description ? (
        <p className="mt-3 text-mute text-sm md:text-base leading-relaxed max-w-[46ch]">
          {description}
        </p>
      ) : null}
      {skills.length > 0 ? (
        <p className="mt-4 text-xs sm:text-sm text-mute/90 leading-relaxed max-w-[52ch]">
          <span className="sr-only">Technologies: </span>
          {skills.join(" · ")}
        </p>
      ) : null}
    </article>
  );
}
