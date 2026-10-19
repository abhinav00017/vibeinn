# vibeinn brand rules

Last changed: 19 Oct 2026. Owner: Abhinav.

vibeinn makes hand-printed clothing. The brand is quiet so the prints can be loud. Every rule here serves that.

## 1. Logo

There is one logo: the wordmark. VIBEINN in Futura Bold with the two Ns joined. The file is `public/brand/logo.svg`. It is outlined paths and takes the current text colour. Use it as it is. Do not redraw, retype, or stretch it.

### Where it goes

- Website header and footer.
- Emails, invoices, packing slips.
- Packaging, labels, and tags.
- Instagram: the avatar is the wordmark on paper, centred, with clear space on all sides.
- Favicon: the V from the wordmark, paper on an ink square. File `app/icon.svg`. This is the only place a single letter stands for the brand.

### Clear space

Keep a space around the logo equal to the height of the V. Nothing enters that space: no text, no edge, no other logo.

### Minimum size

14 px tall on screen. 20 mm wide in print. If the space is smaller, do not use the logo. Write the name in the body font instead.

### Colour

The logo is one colour. It is ink on paper, or paper on ink. Nothing else.

- Ink: `#111111`
- Paper: `#f5f2ec`

On a photo, put it over a dark area in paper, or over a light area in ink. If neither reads, darken the photo under the logo with a gradient. Never add an outline, shadow, or box.

### Do not

- Do not change the gap between the Ns. The join is the logo.
- Do not set VIBEINN in another font and call it the logo.
- Do not rotate, skew, or stretch it.
- Do not use a colour other than ink or paper.
- Do not add a tagline inside the clear space.
- Do not put it on a busy pattern.
- Do not make a second mark, monogram, or badge. One logo.

### Font licence

The wordmark was drawn from Futura Bold as shipped with macOS. That licence covers personal use, not a registered trademark. Before registering the mark or printing at volume, redraw it from an open geometric font (Jost is the closest) or buy a Futura licence. The file is outlined paths, so nothing on the website depends on the font.

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
- Corners are square. No rounded corners.
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
- Avatar: the wordmark on paper, centred, with clear space.
- Posts: product photos as in section 5, or the artwork alone on paper.
- Captions: one line of what it is, then the price and the link.
