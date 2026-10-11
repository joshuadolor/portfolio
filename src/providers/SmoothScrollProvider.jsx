import { useEffect, useRef } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function LenisGsapBridge() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return undefined;

    window.__lenis = lenis;
    ScrollTrigger.config({ ignoreMobileResize: true });

    const reduced = prefersReducedMotion();
    if (reduced) {
      return () => {
        if (window.__lenis === lenis) delete window.__lenis;
      };
    }

    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.off("scroll", ScrollTrigger.update);
      ScrollTrigger.getAll().forEach((t) => t.kill());
      if (window.__lenis === lenis) delete window.__lenis;
    };
  }, [lenis]);

  return null;
}

export default function SmoothScrollProvider({ children }) {
  const reducedRef = useRef(prefersReducedMotion());
  const reduced = reducedRef.current;

  return (
    <ReactLenis
      root
      options={{
        autoRaf: false,
        syncTouch: !reduced,
        duration: reduced ? 0 : 1.1,
        smoothWheel: !reduced,
      }}
    >
      <LenisGsapBridge />
      {children}
    </ReactLenis>
  );
}

export function scrollToHash(hash) {
  if (!hash || hash === "#") return;
  const id = hash.replace("#", "");
  const el = document.getElementById(id);
  if (!el) return;

  if (prefersReducedMotion()) {
    el.scrollIntoView({ behavior: "auto" });
    return;
  }

  const lenis = window.__lenis;
  if (lenis?.scrollTo) {
    lenis.scrollTo(el, { offset: -80 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}
