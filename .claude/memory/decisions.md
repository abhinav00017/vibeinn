# Decisions

Append only. Newest at the bottom.

## 2026-10-18

- Build a custom e-commerce clothing brand storefront. Reference: arxstudios.in/collections/artko.
- Fully custom build. No Shopify, not headless either.
- Stack: Next.js App Router, TypeScript, Tailwind, Zustand for cart.
- Catalogue lives as JSON in `content/` to start. No database, no auth yet.
- One commerce interface in `lib/commerce/`. Swap the backend later without touching pages.
- Payments provider: decide later.
- Folder structure: see CLAUDE.md.
