# vibeinn brand rules

Last changed: 19 Oct 2026. Owner: Abhinav.

vibeinn makes hand-printed clothing. The brand is quiet so the prints can be loud. Every rule here serves that.

## 1. Logo

Files live in `public/brand/`. Use them as they are. Do not redraw, retype, or stretch them.

| File | What it is | Where to use it |
|------|------------|-----------------|
| `logo.svg` | Primary wordmark. VIBEINN in Futura Bold, the two Ns joined. Takes the current text colour. | Website header, emails, invoices, the front of packaging. |
| `logo-ink.svg` | Same wordmark, fixed ink colour. | Anywhere the colour cannot be inherited: documents, exports, print files. |
| `logo-paper.svg` | Same wordmark, fixed paper colour. | On ink or photo backgrounds. |
| `logo-stacked.svg` | VIBE over INN with a rule. | Square spaces only: woven labels, stamps, the Instagram avatar. |
| `mark.svg` | The V mark. | Favicon, back neck print, buttons, small spaces under 60 px. |
| `mark-ring.svg` | The V mark in a thin ring. | Stickers, wax seals, the back neck when a ring suits the print. |

### Which one to use

1. Use the primary wordmark whenever there is room for it.
2. Use the stacked lockup only when the space is square.
3. Use the V mark only when the wordmark would be under 14 px tall or 20 mm wide.
4. Never put the wordmark and the mark next to each other. One or the other.

### Clear space

Keep a space around the logo equal to the height of the V. Nothing enters that space: no text, no edge, no other logo.

### Minimum size

- Wordmark: 14 px on screen, 20 mm in print.
- V mark: 12 px on screen, 6 mm in print.

### Colour

The logo is one colour. It is ink on paper, or paper on ink. Nothing else.

- Ink: `#111111`
- Paper: `#f5f2ec`

On a photo, use the paper version over a dark area, or the ink version over a light area. If neither reads, darken the photo under the logo with a gradient. Never add an outline, shadow, or box.

### Do not

- Do not change the gap between the Ns. The join is the logo.
- Do not set VIBEINN in another font and call it the logo.
- Do not rotate, skew, or stretch it.
- Do not use a colour other than ink or paper.
- Do not add a tagline inside the clear space.
- Do not put it on a busy pattern.

### Font licence

The wordmark was drawn from Futura Bold as shipped with macOS. That licence covers personal use, not a registered trademark. Before registering the mark or printing at volume, redraw it from an open geometric font (Jost is the closest) or buy a Futura licence. The files are outlined paths, so nothing on the website depends on the font.

## 2. Colour

| Name | Hex | Use |
|------|-----|-----|
| Ink | `#111111` | Text, logo, buttons, the promo bar. |
| Paper | `#f5f2ec` | Page background. Also the logo on dark. |
| Sand | `#e8e4dc` | Image placeholders, preview backgrounds, hover fills. |
| Line | `#ddd8cf` | Borders and rules. |
| Muted | `#6b6760` | Secondary text: prices on cards, notes, captions. |
| Racing red | `#c8102e` | Prints only. One accent per artwork, never in the site chrome or the logo. |

Rules:

- The site is two tones: ink on paper. Red appears only inside artwork.
- No gradients, except the dark fade that makes hero text readable over a photo.
- No pure white or pure black. Paper and ink are warm on purpose.

## 3. Type

| Role | Font | Where |
|------|------|-------|
| Logo | Futura Bold (outlined) | Logo files only. Never typed. |
| Website | Geist | Everything on the site. Loaded by Next.js. |
| Prints | Impact, Futura Condensed, or hand lettering | Inside artwork only. Outline to paths before print. |

Sizes and style on the site:

- Labels and section titles: 11 to 12 px, uppercase, letter spacing 0.18 em.
- Body: 14 px, sentence case, line height 1.6.
- Product titles: 14 px on cards, 20 px on the product page. Sentence case with the size tag in square brackets, like `[UNISEX]`.
- Page titles: 24 px, uppercase, letter spacing 0.2 em.
- Buttons: 12 px, uppercase, letter spacing 0.18 em, 44 px tall.

Never use italics on the site. Never use more than two sizes in one block.

## 4. Layout

- Max content width 1280 px. Side gutter 16 px on phones, 24 px from 640 px up.
- Corners are square. No rounded corners except the favicon tile and the V ring.
- Borders are 1 px Line. No shadows except the cart drawer and modals.
- Product cards: image 4:5, title under it, price under the title in Muted.
- Grid: 2 columns on phones, 4 on desktop.

## 5. Photography

- Flat lay or on a hanger, against a plain wall. One light source.
- Front first, back second. Then details.
- No filters. Correct the white balance so paper reads as paper.
- Export 1200 × 1500 px, JPEG quality 85.

## 6. Voice

- Short sentences. Plain words. Lowercase brand name in prose: vibeinn.
- Say what the thing is. "Hand printed. One of a kind." Not "elevated essentials".
- Talk to one person. "Pick a size." Not "Customers can select a size."
- No exclamation marks. No emoji in the site or emails. Instagram captions may use one.
- Product names: `Vibeinn 001: Relaxed Fit Shirt [UNISEX]`. Number, colon, cut, size tag.
- Artwork names: code then name, `B01 · LIFE IS BETTER`. Names in caps, three words or fewer.

## 7. Instagram

- Handle: @vibeinnnow.
- Avatar: `logo-stacked.svg` on paper.
- Posts: product photos as in section 5, or the artwork alone on paper.
- Captions: one line of what it is, then the price and the link.
