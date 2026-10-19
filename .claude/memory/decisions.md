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

## 2026-10-18 (later)

- Customiser UX, chosen over the reference site's checkboxes-plus-two-carousels: Size → "Print on" tiles for Back and Front → one side at a time with a live shirt preview and an artwork grid → summary rows → Add to cart. The button stays disabled with the reason written under it.
- Back and front have separate artwork sets. A back print sits big between the shoulders; a front print sits small on the left chest.
- Artworks live in `content/artworks/*.json` with `side`, `code`, `name`, `new`, `image`. A product shows the customiser when `customisable: true`.
- Cart lines carry `prints[]`. The line id includes the artwork ids, so two different customisations are separate lines. Cart store is at version 2; older saved carts are dropped.
- Done 18 Oct (later): gallery swipe carousel with lightbox zoom, size chart modal (data in `content/size-charts/<type>.json`), accordions (garment details from `product.details`, disclaimer and returns copy from `config/site.ts`), product-level low stock badge when total stock is 5 or less.
- Still to build from the reference: delivery estimate countdown, two-line announcement bar, search. Accounts, order tracking, and chat wait for a backend.

## 2026-10-19

- Logo: direction B, VIBEINN in Futura Bold with the two Ns joined, as outlined paths. V mark as the symbol. Stacked lockup for square spaces. Files in `public/brand/`, rules in `brand/BRAND.md`. Abhinav wants the brand minimal: ink on paper, one colour, no decoration.
- Company rules in `docs/COMPANY.md`, product and print rules in `docs/PRODUCT-RULES.md`. Keep policy pages and COMPANY.md promises in sync.
- Eight motorsport artworks (B07 to B10, F07 to F10) are drafted and live in the catalogue, pending Abhinav's pick. Type inside them is not yet outlined.
- `tools/textpath.py` turns text into SVG paths with fontTools. Use it to outline artwork text before print.
