/**
 * Live joshuadolor.com wordmark — JD with a primary period.
 */
export default function PeriodJ({ className = "" }) {
  return (
    <span className={className} aria-hidden="true">
      JD<span className="text-primary">.</span>
    </span>
  );
}
