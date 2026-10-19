import { siteConfig } from "@/config/site";

// The wordmark as an inline SVG so it takes the current text colour.
// Source of truth: public/brand/logo.svg. Keep the two in sync.
export function Logo({ className = "h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 432 75.4"
      role="img"
      aria-label={siteConfig.name}
      className={className}
      fill="currentColor"
    >
      <use href="/brand/logo.svg#wordmark" />
    </svg>
  );
}
