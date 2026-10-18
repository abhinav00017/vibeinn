import { siteConfig } from "@/config/site";

export function PromoBanner() {
  if (!siteConfig.promo) return null;
  return (
    <div className="bg-ink px-4 py-2 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-paper">
      {siteConfig.promo}
    </div>
  );
}
