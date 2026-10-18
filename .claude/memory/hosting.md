---
name: hosting
description: Where vibeinn is hosted and how to deploy it
metadata:
  type: reference
---

- Live site: https://vibeinn-one.vercel.app (production alias). Also https://vibeinn-abhinav00017s-projects.vercel.app.
- Vercel project: `vibeinn` on team `abhinav00017s-projects`, account abhinav00017. The repo is linked via `.vercel/` (git-ignored).
- GitHub: https://github.com/abhinav00017/vibeinn, branch `main`. First pushed 18 Oct 2026.
- Commit as `Abhinav Naidu Chintala <abhinavch53@gmail.com>` (set in this repo's git config). Vercel's Hobby plan blocks a deploy whose latest commit author email is not on the Vercel account; the work email abhinav@automateaccounts.com gets blocked.
- Deploy: push to `main`, then run `vercel deploy --prod --yes` from the repo root. Vercel could not connect the GitHub repo automatically (the Vercel GitHub app is not installed for it), so pushes do not deploy on their own yet.

**How to apply:** After each change the user wants to share, push to GitHub and run the deploy command. Tell the user the live URL. See [[decisions]].
