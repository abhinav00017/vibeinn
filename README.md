# vibeinn

Custom storefront for a clothing brand. Next.js, TypeScript, Tailwind.

```bash
npm install
npm run dev
```

- `content/` holds the catalogue as JSON and policies as Markdown.
- `lib/commerce/` is the only place that reads `content/`. Swap `lib/commerce/index.ts` to change the backend.
- `config/site.ts` holds brand name, nav, socials, promo line.
