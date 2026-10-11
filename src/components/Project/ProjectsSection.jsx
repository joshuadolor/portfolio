import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import projects from "./projects";

gsap.registerPlugin(ScrollTrigger);

const featured = projects.filter((p) => !p.isOutdated).slice(0, 6);

/** Subtle OLED tints — Robin color-shifts without leaving brand */
const chapterTints = [
  "from-[#0a1628]/90 via-dark/80 to-dark",
  "from-[#14100a]/90 via-dark/80 to-dark",
  "from-[#0a1a14]/90 via-dark/80 to-dark",
  "from-[#1a0f14]/90 via-dark/80 to-dark",
  "from-[#0c1420]/90 via-dark/80 to-dark",
  "from-[#16120a]/90 via-dark/80 to-dark",
];

/**
 * Full-viewport project stages — robin-noguier.com composition:
 * left copy, right media, edge progress, one job per screen.
 */
export default function ProjectsSection() {
  const scopeRef = useRef(null);
  const [active, setActive] = useState(0);
  const [dotsVisible, setDotsVisible] = useState(false);

  useEffect(() => {
    const root = scopeRef.current;
    if (!root) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const chapters = root.querySelectorAll("[data-work-chapter]");

    const sectionWatch = ScrollTrigger.create({
      trigger: root,
      start: "top 70%",
      end: "bottom 30%",
      onEnter: () => setDotsVisible(true),
      onEnterBack: () => setDotsVisible(true),
      onLeave: () => setDotsVisible(false),
      onLeaveBack: () => setDotsVisible(false),
    });

    if (reduced) {
      gsap.set(chapters, { clearProps: "all" });
      chapters.forEach((chapter, i) => {
        ScrollTrigger.create({
          trigger: chapter,
          start: "top 55%",
          end: "bottom 45%",
          onEnter: () => setActive(i),
          onEnterBack: () => setActive(i),
        });
      });
      return () => {
        sectionWatch.kill();
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger && root.contains(st.trigger)) st.kill();
        });
      };
    }

    const ctx = gsap.context(() => {
      chapters.forEach((chapter, i) => {
        const title = chapter.querySelector("[data-work-title]");
        const meta = chapter.querySelectorAll("[data-work-meta]");
        const media = chapter.querySelector("[data-work-media]");
        const thumb = chapter.querySelector("[data-work-thumb]");
        const veil = chapter.querySelector("[data-work-veil]");

        ScrollTrigger.create({
          trigger: chapter,
          start: "top 55%",
          end: "bottom 45%",
          onEnter: () => setActive(i),
          onEnterBack: () => setActive(i),
        });

        gsap.fromTo(
          title,
          { opacity: 0.12, y: 56 },
          {
            opacity: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: chapter,
              start: "top 80%",
              end: "top 28%",
              scrub: true,
            },
          }
        );

        gsap.fromTo(
          meta,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.04,
            ease: "none",
            scrollTrigger: {
              trigger: chapter,
              start: "top 70%",
              end: "top 35%",
              scrub: true,
            },
          }
        );

        if (media) {
          gsap.fromTo(
            media,
            { yPercent: 12, scale: 1.08, rotate: -1.5 },
            {
              yPercent: -8,
              scale: 1,
              rotate: 1.5,
              ease: "none",
              scrollTrigger: {
                trigger: chapter,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }

        if (thumb) {
          gsap.fromTo(
            thumb,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: chapter,
                start: "top 60%",
                end: "top 30%",
                scrub: true,
              },
            }
          );
        }

        if (veil) {
          gsap.fromTo(
            veil,
            { opacity: 0.35 },
            {
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: chapter,
                start: "top bottom",
                end: "top top",
                scrub: true,
              },
            }
          );
        }
      });
    }, root);

    return () => {
      sectionWatch.kill();
      ctx.revert();
    };
  }, []);

  const scrollToChapter = (i) => {
    const el = document.querySelector(`[data-work-chapter][data-index="${i}"]`);
    if (!el) return;
    if (window.__lenis?.scrollTo) {
      window.__lenis.scrollTo(el, { offset: 0 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="projects"
      ref={scopeRef}
      tabIndex={-1}
      aria-labelledby="projects-heading"
      className="outline-none relative"
    >
      <div className="sr-only">
        <h2 id="projects-heading">Featured work</h2>
      </div>

      {/* Edge progress — Robin dots (only while in work) */}
      <nav
        aria-label="Project progress"
        className={`fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-30 hidden sm:flex flex-col gap-2 transition-opacity duration-300 ${
          dotsVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {featured.map((project, i) => (
          <button
            key={project.title}
            type="button"
            onClick={() => scrollToChapter(i)}
            aria-label={`Go to ${project.title}`}
            aria-current={active === i ? "true" : undefined}
            className={`w-1.5 rounded-pill transition-all duration-300 ${
              active === i
                ? "h-6 bg-paper"
                : "h-1.5 bg-white/25 hover:bg-white/50"
            }`}
          />
        ))}
      </nav>

      <ul className="list-none p-0 m-0">
        {featured.map((project, idx) => (
          <li key={project.title}>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              data-work-chapter
              data-index={idx}
              className="work-stage group relative flex min-h-[100svh] items-stretch no-underline text-inherit cursor-pointer overflow-hidden"
              aria-label={`${project.title} — opens in a new tab`}
            >
              <div
                data-work-veil
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${chapterTints[idx % chapterTints.length]}`}
                aria-hidden="true"
              />

              <div className="relative z-10 flex w-full max-w-content mx-auto flex-col md:flex-row md:items-center gap-8 md:gap-10 px-6 py-24 md:py-0">
                {/* Left — copy column */}
                <div className="flex-1 min-w-0 md:max-w-[46%] flex flex-col justify-center">
                  <span
                    className="text-xs font-semibold tabular-nums text-primary tracking-[0.2em]"
                    aria-hidden="true"
                  >
                    {String(idx + 1).padStart(2, "0")} /{" "}
                    {String(featured.length).padStart(2, "0")}
                  </span>
                  <h3
                    data-work-title
                    className="mt-4 font-display text-[clamp(3rem,8vw,6.5rem)] leading-[0.92] tracking-tight text-paper group-hover:text-primary transition-colors duration-300"
                  >
                    {project.title}
                  </h3>
                  <p
                    data-work-meta
                    className="mt-6 text-paper/80 text-base md:text-lg leading-relaxed max-w-[34ch]"
                  >
                    {project.summary}
                  </p>
                  {project.skills?.length > 0 && (
                    <p
                      data-work-meta
                      className="mt-4 text-sm text-mute"
                    >
                      {project.skills.slice(0, 4).join(" · ")}
                    </p>
                  )}
                  <span
                    data-work-meta
                    className="mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-paper"
                  >
                    Open project
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:translate-x-1 text-primary"
                    >
                      →
                    </span>
                  </span>

                  {/* Bottom-left context chip (Robin thumbnail slot) */}
                  <div
                    data-work-thumb
                    className="mt-10 md:mt-14 inline-flex items-center gap-3 rounded-xl border border-white/10 bg-dark/60 backdrop-blur-sm p-2 pr-4 max-w-xs"
                  >
                    {project.image ? (
                      <img
                        src={project.image}
                        alt=""
                        className="h-14 w-20 rounded-lg object-cover shrink-0"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : null}
                    <span className="text-xs text-mute leading-snug">
                      Case {String(idx + 1).padStart(2, "0")}
                      <br />
                      <span className="text-paper/90">Selected work</span>
                    </span>
                  </div>
                </div>

                {/* Right — dominant media plane */}
                {project.image && (
                  <div className="relative w-full md:w-[52%] shrink-0 md:self-stretch flex items-center">
                    <div className="relative w-full overflow-hidden rounded-2xl md:rounded-3xl bg-surface aspect-[4/3] md:aspect-[5/4] md:min-h-[70svh] md:max-h-[82svh] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)]">
                      <img
                        data-work-media
                        src={project.image}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover opacity-95 group-hover:opacity-100 transition-opacity duration-500 will-change-transform"
                        loading="lazy"
                        decoding="async"
                      />
                      <div
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-dark/40 via-transparent to-transparent"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                )}
              </div>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
