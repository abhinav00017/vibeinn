# Product and print rules

Last changed: 19 Oct 2026. Owner: Abhinav.

## Naming and codes

| Thing | Format | Example |
|-------|--------|---------|
| Product code | Three digits, in order of release | `001` |
| Product handle | `vibeinn-` plus the code | `vibeinn-001` |
| Product title | `Vibeinn <code>: <cut> [<fit tag>]` | `Vibeinn 001: Relaxed Fit Shirt [UNISEX]` |
| Artwork id | `b-` or `f-` plus two digits | `b-07` |
| Artwork code | `B` or `F` plus the number | `B07` |
| Artwork name | Caps, three words or fewer | `BOX BOX BOX` |
| Collection handle | `drop-` plus two digits | `drop-01` |

Codes are never reused. A retired artwork keeps its code.

## Garments

- Types: `shirt` (relaxed fit) and `tee` (boxy fit). Add a type only with a size chart for it.
- Sizes: XS, S, M, L, XL, 2XL. Always all six in the file, with stock 0 where none.
- Stock is per size and is the truth. The site shows "Sold out" when every size is 0 and "Low stock" at 5 or fewer in total.
- Every product has a front and a back photo, 1200 × 1500 px, in `public/images/products/`.

## Prints

- Two inks at most per artwork: Ink `#111111` and Racing red `#c8102e`. Paper `#f5f2ec` is the garment showing through, not an ink.
- Back print: up to 28 × 28 cm, centred between the shoulders, top edge 8 cm below the collar seam.
- Front print: up to 10 × 10 cm, on the left chest, centred 10 cm from the centre line and 18 cm below the shoulder seam.
- Artwork files: square, 600 × 600 units, SVG with all text outlined to paths. No fonts, no raster images, no gradients, no transparency below 100%.
- A back artwork is never used on the front and the other way round. Draw for the placement.
- Every artwork gets a `new: true` flag for its first drop, then `false`.

## Artwork file checklist

Before an artwork goes into `content/artworks/`:

1. Reads at 60 px on the product page grid.
2. Reads on the shirt preview at the real print size.
3. Only the two inks.
4. Text outlined. Open the SVG and search for `<text`; there must be none.
5. The JSON has id, code, name, side, new, image.

## Customiser rules

- The buyer picks a size first, then the sides, then one artwork per side.
- At least one side must be printed. Both is allowed.
- The Add to cart button stays disabled until the picks are complete, with the reason written under it.
- The cart line records the size and each print as code plus name. Two different print sets are two lines.

## Pricing

- One price per product, whatever the print choice. Printing is included.
- Prices end in 99. Shirts ₹1,799. Tees ₹1,299. Change these in the product files only.
- No discounts on the site until a payments provider exists.

## Adding a product

1. Copy `content/products/001.json`. Change code, handle, title, type, price, stock, details.
2. Add the two photos.
3. Add the handle to a collection, or the product only shows under Shop all.
4. Run `npm run build`. Open the product page. Check the size chart opens and the customiser works.
5. Commit, push, deploy.

## Adding an artwork

1. Draw it to the rules above. Outline the text.
2. Save as `public/images/artworks/<id>.svg`.
3. Add `content/artworks/<id>.json`.
4. Open any customisable product. Check it on the preview for its side.
5. Commit, push, deploy.
