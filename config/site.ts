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
  productInfo: {
    disclaimer:
      "Every print is made by hand. Small differences in ink and placement are part of the piece, not a fault. Printed to order, so allow up to 5 working days before dispatch.",
    returns:
      "Wrong size? Exchange within 7 days of delivery, unworn with tags on. Damaged or wrong item? Email us with photos and we will replace it or refund you.",
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
