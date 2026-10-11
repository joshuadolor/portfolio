import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { contactMethods, socialLinks } from "../../data/contact";
import SocialLinks from "../SocialLinks";

gsap.registerPlugin(ScrollTrigger);

/**
 * Finale section — room for the expanded contact WebGL on the right.
 */
export default function ContactSection() {
  const scopeRef = useRef(null);
  const email =
    contactMethods.find((m) => m.icon === "email") || contactMethods[0];
  const phone = contactMethods.find((m) => m.icon === "phone");

  useEffect(() => {
    const root = scopeRef.current;
    if (!root) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const bits = root.querySelectorAll("[data-contact]");

    if (reduced) {
      gsap.set(bits, { clearProps: "all" });
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        bits,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top 70%",
            end: "top 35%",
            scrub: true,
          },
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={scopeRef}
      className="relative z-10 min-h-[100svh] flex items-center py-28 md:py-36 px-6 border-t border-white/5 overflow-hidden"
      id="contact"
      aria-labelledby="contact-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-dark via-dark/88 to-dark/45"
        aria-hidden="true"
      />

      <div className="relative max-w-content mx-auto w-full md:grid md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:gap-16 md:items-end">
        <div>
          <p
            data-contact
            className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary mb-4"
          >
            Available for work
          </p>
          <h2
            id="contact-heading"
            data-contact
            className="font-display text-[clamp(2.5rem,8vw,5.5rem)] leading-[1.05] tracking-tight text-paper max-w-[14ch]"
          >
            Need an engineer who actually uses AI?
          </h2>
          <p
            data-contact
            className="mt-6 text-mute text-lg max-w-[36ch] leading-relaxed"
          >
            Senior delivery with Cursor and Claude in the loop. Accessible
            products. Clear ownership.
          </p>

          <div data-contact className="mt-12 flex flex-col gap-3">
            {email && (
              <a
                href={email.href}
                className="font-display text-2xl md:text-4xl text-primary hover:text-secondary transition-colors duration-200 w-fit cursor-pointer"
              >
                {email.value}
              </a>
            )}
            {phone && (
              <a
                href={phone.href}
                className="text-mute hover:text-paper transition-colors duration-200 w-fit cursor-pointer"
              >
                {phone.value}
              </a>
            )}
          </div>

          <div data-contact className="mt-14">
            <SocialLinks links={socialLinks} />
          </div>
        </div>

        <aside
          data-contact
          className="mt-16 md:mt-0 md:justify-self-end max-w-sm"
          aria-label="Working notes"
        >
          <p className="quote-pill">
            Let’s ship something people can actually use — and feel.
          </p>
          <dl className="mt-8 space-y-4 text-sm">
            <div className="flex justify-between gap-6 border-t border-white/10 pt-4">
              <dt className="text-mute">Focus</dt>
              <dd className="text-paper text-right">AI-assisted product UI</dd>
            </div>
            <div className="flex justify-between gap-6 border-t border-white/10 pt-4">
              <dt className="text-mute">Stack</dt>
              <dd className="text-paper text-right">Laravel · React · Vue</dd>
            </div>
            <div className="flex justify-between gap-6 border-t border-white/10 pt-4">
              <dt className="text-mute">Based</dt>
              <dd className="text-paper text-right">Remote · EU-friendly</dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  );
}
