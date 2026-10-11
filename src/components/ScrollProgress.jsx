import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Thin vertical progress — Robin-style edge cue */
export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set(bar, { scaleY: 1 });
      return undefined;
    }

    gsap.set(bar, { scaleY: 0, transformOrigin: "top center" });
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        gsap.set(bar, { scaleY: self.progress });
      },
    });

    return () => st.kill();
  }, []);

  return (
    <div
      className="fixed left-3 md:left-5 top-1/2 -translate-y-1/2 z-40 h-24 w-[3px] rounded-full bg-white/10 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <div ref={barRef} className="w-full h-full bg-primary origin-top" />
    </div>
  );
}
