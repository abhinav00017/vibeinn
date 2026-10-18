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
- Next.js 16 with Cache Components: read `params` and `searchParams` only inside a `<Suspense>` child, never in the page function itself. The dev overlay flags it otherwise. Scaffold committed as 13f0817.
- Dev server: `npm run dev` on port 3000. The app preview tool cannot launch it from here because it only reads a launch file in the automateaccounts repo, which stays untouched.
