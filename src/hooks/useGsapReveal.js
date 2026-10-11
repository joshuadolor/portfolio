import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Fade/rise children with [data-reveal]. Content stays visible by default
 * for accessibility; motion only enhances when allowed.
 */
export function useGsapReveal(deps = []) {
  const scopeRef = useRef(null);

  useEffect(() => {
    const root = scopeRef.current;
    if (!root) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = root.querySelectorAll("[data-reveal]");

    if (reduced || !targets.length) {
      gsap.set(targets, { clearProps: "all" });
      return undefined;
    }

    const ctx = gsap.context(() => {
      targets.forEach((el) => {
        const delay = Number(el.getAttribute("data-delay") || 0);
        gsap.fromTo(
          el,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            delay,
            ease: "power3.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none none",
            },
            onComplete: () => {
              gsap.set(el, { clearProps: "transform" });
            },
          }
        );
      });
    }, root);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return scopeRef;
}
