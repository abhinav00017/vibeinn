export const siteConfig = {
  name: "vibeinn",
  tagline: "Hand-made. One of a kind.",
  currency: "INR" as const,
  locale: "en-IN",
  promo: "FIRST DROP: NOW LIVE",
  nav: [
    { label: "Shop all", href: "/collections/all" },
    { label: "Drop 01", href: "/collections/drop-01" },
  ],
  socials: {
    instagram: "https://www.instagram.com/vibeinnnow/",
  },
  footer: {
    policies: [
      { label: "Shipping", href: "/policies/shipping" },
      { label: "Refunds", href: "/policies/refunds" },
      { label: "Privacy", href: "/policies/privacy" },
      { label: "Terms", href: "/policies/terms" },
    ],
    services: [
      { label: "Track order", href: "/account/orders" },
      { label: "Return or exchange", href: "/policies/refunds" },
    ],
  },
};

export type SiteConfig = typeof siteConfig;
