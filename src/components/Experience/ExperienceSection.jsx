import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { careerJourney, education } from "../../data/careerJourney";
import { certifications } from "../../data/certifications";
import TimelineItem from "../TimelineItem";

gsap.registerPlugin(ScrollTrigger);

/**
 * Experience stays readable with persistent WebGL.
 * Jobs on the rail; education and certifications as quiet notes underneath.
 */
export default function ExperienceSection() {
  const scopeRef = useRef(null);

  useEffect(() => {
    const root = scopeRef.current;
    if (!root) return undefined;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = root.querySelectorAll("[data-timeline-item]");
    const line = root.querySelector("[data-timeline-line]");
    const head = root.querySelectorAll("[data-exp-head]");

    if (reduced) {
      gsap.set([...items, ...head, line].filter(Boolean), { clearProps: "all" });
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.from(head, {
        opacity: 0,
        y: 18,
        duration: 0.55,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: root,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top center",
            scrollTrigger: {
              trigger: root.querySelector("[data-timeline]"),
              start: "top 70%",
              end: "bottom 60%",
              scrub: true,
            },
          }
        );
      }

      items.forEach((item) => {
        gsap.from(item, {
          opacity: 0,
          x: -16,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="relative z-10 py-24 md:py-32 px-6 border-t border-white/5"
      id="experience"
      ref={scopeRef}
      aria-labelledby="experience-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-l from-dark via-dark/90 to-dark/35 md:to-transparent"
        aria-hidden="true"
      />

      <div className="relative max-w-content mx-auto md:grid md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.25fr)] md:gap-20 lg:gap-24 md:items-start">
        <aside className="mb-12 md:mb-0 md:sticky md:top-28 md:self-start md:z-[2]">
          <p
            data-exp-head
            className="text-xs font-semibold uppercase tracking-[0.18em] text-mute mb-3"
          >
            Path
          </p>
          <h2
            id="experience-heading"
            data-exp-head
            className="font-display text-4xl md:text-5xl text-paper tracking-tight drop-shadow-[0_2px_24px_rgba(10,10,10,0.85)]"
          >
            Experience
          </h2>
          <p
            data-exp-head
            className="mt-4 text-mute leading-relaxed max-w-[28ch]"
          >
            Current roles run on Cursor, Claude, and Claude Code — with
            accessibility and quality still owned end to end.
          </p>
        </aside>

        <div>
          <div data-timeline className="relative">
            <div
              data-timeline-line
              className="absolute left-[5px] top-2 bottom-2 w-px bg-gradient-to-b from-primary via-white/20 to-transparent origin-top"
              aria-hidden="true"
            />
            <ol className="space-y-14 list-none p-0 m-0">
              {careerJourney.map((item, idx) => (
                <li
                  key={`${item.period}-${item.title}-${idx}`}
                  data-timeline-item
                  className="relative pl-8 md:pl-10"
                >
                  <span
                    className="absolute left-[5px] top-[0.4rem] z-[1] h-[11px] w-[11px] -translate-x-1/2 rounded-full border-2 border-dark bg-primary"
                    aria-hidden="true"
                  />
                  <TimelineItem {...item} />
                </li>
              ))}
            </ol>
          </div>

          {/* Education — kept nearby, not as a fake job on the rail */}
          <aside
            data-timeline-item
            className="mt-16 pt-10 border-t border-white/10 pl-8 md:pl-10"
            aria-labelledby="education-heading"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary mb-3">
              Education
            </p>
            <h3
              id="education-heading"
              className="font-display text-xl md:text-2xl text-paper tracking-tight max-w-[36ch]"
            >
              {education.title}
            </h3>
            <p className="mt-2 text-sm text-mute">
              {education.org}
              <span className="text-mute/70"> · {education.period}</span>
            </p>
          </aside>

          {/* Certifications — same quiet footnote as Education */}
          <aside
            data-timeline-item
            className="mt-12 pt-10 border-t border-white/10 pl-8 md:pl-10"
            aria-labelledby="certifications-heading"
          >
            <p
              id="certifications-heading"
              className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary mb-5"
            >
              Licenses &amp; certifications
            </p>
            <ul className="space-y-6 list-none p-0 m-0">
              {certifications.map((cert) => (
                <li
                  key={`${cert.title}-${cert.issuer}`}
                  className="flex gap-3 sm:gap-4 items-start"
                >
                  {cert.logo ? (
                    <a
                      href={cert.issuerHref || cert.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-0.5 shrink-0 flex h-10 w-10 items-center justify-center rounded-md bg-white/95 p-1.5"
                      aria-label={`${cert.issuer} website (opens in a new tab)`}
                    >
                      <img
                        src={cert.logo}
                        alt=""
                        className="max-h-full max-w-full object-contain"
                        loading="lazy"
                        decoding="async"
                      />
                    </a>
                  ) : null}
                  <div className="min-w-0">
                    <p className="text-base md:text-lg text-paper tracking-tight">
                      {cert.title}
                    </p>
                    <p className="mt-1 text-sm text-mute">
                      {cert.issuerHref ? (
                        <a
                          href={cert.issuerHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-mute hover:text-paper transition-colors cursor-pointer no-underline"
                        >
                          {cert.issuer}
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                      ) : (
                        cert.issuer
                      )}
                      <span className="text-mute/70"> · {cert.issued}</span>
                    </p>
                    {cert.href ? (
                      <a
                        href={cert.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1.5 inline-block text-sm text-primary hover:text-secondary transition-colors cursor-pointer"
                      >
                        Credential
                        <span className="sr-only">
                          {" "}
                          for {cert.title} (opens in a new tab)
                        </span>
                      </a>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
