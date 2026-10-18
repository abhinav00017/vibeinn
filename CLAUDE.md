# vibeinn

Personal project of Abhinav. A custom e-commerce clothing brand storefront.
Reference for look and flow: https://www.arxstudios.in/collections/artko (a Shopify store).

@.claude/memory/MEMORY.md

## Boundaries

- This folder is personal. It has nothing to do with Automate Accounts or Automate Insurance.
- Do not touch `~/automateaccounts/` from this project. No GitLab tasks, no wiki, no MRs, no company skills.
- Do not follow the Automate Insurance ways-of-working here. Plain git on this repo is enough.

## Who you work with

- I am Abhinav. Speak to me plainly. Short, simple, straight replies. One point at a time.
- Do not assume. If something is not known, say so and ask.

## Memory

- `.claude/memory/MEMORY.md` is the index. One line per memory file.
- `.claude/memory/decisions.md` holds every product and tech decision, with the date. Append, never rewrite history.
- When I make a decision in chat, write it to `decisions.md` in the same turn.
- When I give feedback on how to work, add a memory file and index it.

## Stack (decided 18 Oct 2026)

- Fully custom. No Shopify.
- Next.js App Router, TypeScript, Tailwind.
- Catalogue as JSON in `content/` to start. No database, no auth until orders exist.
- One commerce interface in `lib/commerce/`. Pages never read `content/` directly.
- Payments: not decided yet.

## Folder structure

```
app/            routes only, thin pages
components/     ui/ layout/ product/ collection/ cart/
lib/            commerce/ cart/ payments/ utils/
content/        products/ collections/ policies/
public/images/
config/site.ts  brand name, currency, nav, socials
tests/
```

## How to write

- Plain English. One idea per sentence. Active voice. Under 20 words a sentence.
- Do not claim work is done before it is done. Say what you tested and what you did not.
- Commit messages: one short line saying what changed and why.
