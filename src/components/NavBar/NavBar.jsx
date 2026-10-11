import { useEffect, useId, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { scrollToHash } from "../../providers/SmoothScrollProvider";
import { contactMethods } from "../../data/contact";
import PeriodJ from "../Logo/PeriodJ";

const emailDetail = contactMethods.find((d) => d.icon === "email");
const phoneDetail = contactMethods.find((d) => d.icon === "phone");

export default function NavBar({
  links = [],
  ctaHref = "mailto:dev.joshuadolor@gmail.com",
  ctaLabel = "Get in touch",
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState("#hero");
  const lenis = useLenis();
  const menuId = useId();
  const menuButtonRef = useRef(null);
  const menuPanelRef = useRef(null);
  const previouslyFocused = useRef(null);

  useEffect(() => {
    if (lenis) window.__lenis = lenis;
  }, [lenis]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map((l) => document.querySelector(l.href))
      .filter(Boolean);
    if (!sections.length) return undefined;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) {
          setActiveHref(`#${visible.target.id}`);
        }
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [links]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    previouslyFocused.current = document.activeElement;
    document.body.style.overflow = "hidden";
    const panel = menuPanelRef.current;
    const focusables = panel?.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    focusables?.[0]?.focus();

    const onKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused.current?.focus?.();
    };
  }, [menuOpen]);

  const onNavClick = (e, href) => {
    if (!href?.startsWith("#")) return;
    e.preventDefault();
    setMenuOpen(false);
    scrollToHash(href);
    const id = href.replace("#", "");
    const target = document.getElementById(id);
    if (target) {
      const hadTabIndex = target.hasAttribute("tabindex");
      if (!hadTabIndex) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
      if (!hadTabIndex) {
        target.addEventListener(
          "blur",
          () => target.removeAttribute("tabindex"),
          { once: true }
        );
      }
    }
  };

  return (
    <>
      <nav
        aria-label="Primary"
        className={`fixed top-0 z-50 w-full px-6 py-5 flex justify-between items-center transition-colors duration-300 ${
          scrolled || menuOpen ? "bg-dark/70 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <a
          href="#hero"
          className="text-2xl font-bold tracking-tighter text-paper no-underline cursor-pointer"
          onClick={(e) => onNavClick(e, "#hero")}
          aria-label="Joshua Dolor — home"
        >
          <PeriodJ />
        </a>

        <ul className="hidden md:flex items-center gap-8 text-sm text-mute">
          {links.map((item) => {
            const active = activeHref === item.href;
            return (
              <li key={item.href}>
                <a
                  className={`cursor-pointer transition-colors duration-200 ${
                    active ? "text-paper" : "hover:text-paper"
                  }`}
                  href={item.href}
                  aria-current={active ? "true" : undefined}
                  onClick={(e) => onNavClick(e, item.href)}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
          <li>
            <a
              href={ctaHref}
              className="text-primary hover:text-secondary transition-colors duration-200 cursor-pointer"
            >
              {ctaLabel}
            </a>
          </li>
        </ul>

        <button
          ref={menuButtonRef}
          type="button"
          className="md:hidden flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/15 text-paper"
          aria-expanded={menuOpen}
          aria-controls={menuId}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {menuOpen && (
        <div
          id={menuId}
          ref={menuPanelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-40 md:hidden flex flex-col bg-dark pt-24 px-6 pb-10"
        >
          <nav className="flex flex-col gap-1" aria-label="Section links">
            {links.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="min-h-12 flex items-center py-4 font-display text-3xl text-paper border-b border-white/10 cursor-pointer"
                onClick={(e) => onNavClick(e, item.href)}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href={ctaHref}
            className="mt-8 text-primary text-lg cursor-pointer"
            onClick={() => setMenuOpen(false)}
          >
            {ctaLabel}
          </a>
          <div className="mt-auto pt-10 flex flex-col gap-3 border-t border-white/10">
            {emailDetail && (
              <a
                href={emailDetail.href}
                className="text-sm text-mute hover:text-paper transition-colors cursor-pointer break-all"
                onClick={() => setMenuOpen(false)}
              >
                {emailDetail.value}
              </a>
            )}
            {phoneDetail && (
              <a
                href={phoneDetail.href}
                className="text-sm text-mute hover:text-paper transition-colors cursor-pointer"
                onClick={() => setMenuOpen(false)}
              >
                {phoneDetail.value}
              </a>
            )}
          </div>
        </div>
      )}
    </>
  );
}
