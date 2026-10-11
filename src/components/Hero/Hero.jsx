import { useEffect, useRef } from "react";
import gsap from "gsap";
import { heroCopy } from "../../data/site";
import { scrollToHash } from "../../providers/SmoothScrollProvider";

/**
 * Welcome → settle (Robin-inspired).
 * WebGL lives in PersistentScene (fixed), not here.
 */
export default function Hero({
  brand = heroCopy.brand,
  role = heroCopy.role,
  pill = heroCopy.pill,
  ctaLabel = heroCopy.ctaLabel,
  ctaHref = heroCopy.ctaHref,
}) {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const name = root.querySelector("[data-hero-name]");
    const after = root.querySelectorAll("[data-hero-after]");

    if (reduced) {
      gsap.set([name, ...after], { clearProps: "all" });
      return undefined;
    }

    const ctx = gsap.context(() => {
      // Phase 1 — name alone in the void (welcome)
      gsap.set(name, { opacity: 0, y: 28 });
      gsap.set(after, { opacity: 0, y: 18 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(name, {
        opacity: 1,
        y: 0,
        duration: 1.1,
        delay: 0.15,
      })
        // Hold the quiet moment, then bring the rest
        .to(
          after,
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.08,
          },
          "+=0.85"
        );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="hero"
      aria-labelledby="hero-heading"
      className="relative z-10 min-h-[100svh] flex flex-col justify-between overflow-hidden px-6 pt-28 pb-10 md:pt-32 md:pb-12"
    >
      <div className="relative max-w-content w-full mx-auto">
        <h1
          id="hero-heading"
          data-hero-name
          className="font-display outline-name text-[clamp(3.5rem,12vw,9rem)] leading-[0.92] tracking-tight"
        >
          {brand}
        </h1>
        <p
          data-hero-after
          className="mt-3 md:mt-4 text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-paper"
        >
          {role}
          <span className="text-mute"> · Ships with AI</span>
        </p>
      </div>

      <div
        data-hero-after
        className="relative max-w-content w-full mx-auto flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8"
      >
        <div className="max-w-md">
          <p className="quote-pill">{pill}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={ctaHref}
              download={ctaHref?.endsWith?.(".pdf")}
              className="inline-flex min-h-11 cursor-pointer items-center px-5 py-2.5 rounded-pill bg-primary text-white text-sm font-semibold hover:bg-[#2563eb] transition-colors duration-200"
            >
              {ctaLabel}
            </a>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                scrollToHash("#projects");
                document
                  .getElementById("projects")
                  ?.focus({ preventScroll: true });
              }}
              className="inline-flex min-h-11 cursor-pointer items-center px-5 py-2.5 rounded-pill border border-white/15 text-paper text-sm font-semibold hover:border-primary hover:text-primary transition-colors duration-200"
            >
              View work
            </a>
          </div>
        </div>

        <p className="text-sm text-mute max-w-[16rem] sm:text-right leading-relaxed">
          Cursor · Claude · Claude Code
          <br />
          Laravel · React · Vue
        </p>
      </div>
    </section>
  );
}
