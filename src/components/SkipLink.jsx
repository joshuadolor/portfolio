import { scrollToHash } from "../providers/SmoothScrollProvider";

export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="skip-link"
      onClick={(e) => {
        e.preventDefault();
        const main = document.getElementById("main-content");
        if (main) {
          main.setAttribute("tabindex", "-1");
          main.focus({ preventScroll: true });
          scrollToHash("#main-content");
        }
      }}
    >
      Skip to main content
    </a>
  );
}
