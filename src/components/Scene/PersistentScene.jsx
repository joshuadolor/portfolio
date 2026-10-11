import { lazy, Suspense, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HeroCanvas = lazy(() => import("../Hero/HeroCanvas"));

const SECTION_MODES = [
  { id: "hero", mode: "hero" },
  { id: "projects", mode: "work" },
  { id: "experience", mode: "experience" },
  { id: "skills", mode: "skills" },
  { id: "contact", mode: "contact" },
];

function pickActiveMode() {
  const mid = window.innerHeight * 0.42;
  let best = { mode: "hero", score: -Infinity };

  SECTION_MODES.forEach(({ id, mode }) => {
    const el = document.getElementById(id);
    if (!el) return;
    const r = el.getBoundingClientRect();
    // How close the section center is to the reading band
    const center = (r.top + r.bottom) / 2;
    const score = -Math.abs(center - mid) + Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0);
    if (score > best.score && r.bottom > 80 && r.top < window.innerHeight - 80) {
      best = { mode, score };
    }
  });

  const chapters = document.querySelectorAll("[data-work-chapter]");
  let chapter = 0;
  chapters.forEach((ch, i) => {
    const r = ch.getBoundingClientRect();
    if (r.top <= mid && r.bottom >= mid) chapter = i;
  });

  return { mode: best.mode, chapter };
}

/**
 * Fixed WebGL layer + scroll/section drivers (Robin: canvas always present).
 */
export default function PersistentScene() {
  const [motionOk, setMotionOk] = useState(false);

  useEffect(() => {
    setMotionOk(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (!motionOk) {
      window.__sceneScroll = 0;
      window.__sceneMode = "hero";
      window.__sceneChapter = 0;
      return undefined;
    }

    window.__sceneScroll = 0;
    window.__sceneMode = "hero";
    window.__sceneChapter = 0;

    const apply = () => {
      const { mode, chapter } = pickActiveMode();
      window.__sceneMode = mode;
      window.__sceneChapter = chapter;
    };

    const scrollSt = ScrollTrigger.create({
      start: 0,
      end: "max",
      scrub: true,
      onUpdate: (self) => {
        window.__sceneScroll = self.progress;
        apply();
      },
    });

    apply();

    const refresh = () => {
      ScrollTrigger.refresh();
      apply();
    };
    window.addEventListener("load", refresh);
    const t = window.setTimeout(refresh, 500);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("load", refresh);
      scrollSt.kill();
      window.__sceneScroll = 0;
      window.__sceneMode = "hero";
      window.__sceneChapter = 0;
    };
  }, [motionOk]);

  if (!motionOk) return null;

  return (
    <Suspense fallback={null}>
      <HeroCanvas active />
    </Suspense>
  );
}
