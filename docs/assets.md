# CAI Website — Asset Guide

Every picture on Home and Team comes from **one source**: `asset_sheet_vector_transparent.svg`. This file explains what was cut from it, where each piece goes, and how to build with it so the result looks as good as the source allows.

## 1. The source, honestly

- The SVG is an **auto-traced picture** (about 85,000 tiny shapes at 1536 × 1024), not a hand-drawn vector. It contains no detail beyond the size of the original sheet.
- It is genuinely **transparent**, so every cut-out layers cleanly on the near-black page with no boxes.
- It weighs 21 MB, so it is **never loaded by the website**. It only exists to be re-sliced.
- Result: cut-outs are clean and crisp-edged, but very large pieces (hero) are slightly soft. The fix is craft, not size: **layer** several pieces, keep cubes near their native size, blend with the dark page, and let slow drift hide softness.

## 2. Folders and what is where

| Folder | Content | Used by the site? |
|---|---|---|
| `assets-source/asset_sheet_vector_transparent.svg` | the original | No |
| `assets-source/masters/` | 49 full-resolution transparent PNGs (untouched) | No |
| `src/assets/art/` | the 49 optimised, lightly smoothed WebP files from the pack's `web/` folder | **Yes** |
| `src/assets/brand/` | your `cai-logo.*` and `affiliation-logo.*` | **Yes** |
| `src/assets/team/` | member photos | **Yes** |
| `scripts/slice_assets.py` | re-cuts everything from a new SVG | Tool only |

The `web/` files were smoothed (a small blur plus faint dither) to hide the blotchy look of the tracing. The tall-background pieces (`01a`, `01b`, `01c`) also have soft fades on their cut edges so they blend into the page. Gradients, rails, and brackets are untouched.

## 3. Piece catalogue

Sizes are the delivered WebP pixel sizes.

| File | Size | What it is |
|---|---|---|
| `01_main_background` | 1800 × 3397 | Full tall background (portrait) |
| `01a_background_top` | 1800 × 1313 | Top third: wave with cubes (faded bottom edge) |
| `01b_background_middle` | 1800 × 1200 | Middle: cube on a dark ridge with wave (faded top and bottom) |
| `01c_background_bottom` | 1800 × 1313 | Bottom: large cube on a ridge, pillars of light (faded top) |
| `02_hero_background` | 2032 × 1208 | Wide hero: wave dipping through the middle and rising into a cluster of cubes on the right |
| `03_section_overlay` | 1760 × 368 | Very faint wide wave band for section transitions |
| `04_ground_element` | 1747 × 464 | Glowing ground line with thin light pillars and small cubes |
| `05_cube_large` | 786 × 760 | Large glowing cube |
| `06_cube_medium` | 451 × 480 | Medium cube |
| `07_cube_small_1` / `_2` / `_3` | ~300 px | Three small cubes, each separate |
| `07_cubes_small_set` | 951 × 316 | The three together |
| `08_orb_1` / `_2` / `_3` | ~100 px | Single glowing points |
| `08_network_1` / `_2` | 429×404 / 741×403 | Dots joined by thin lines |
| `08_particles_set` | 1200 × 577 | All particles together |
| `09_wave_1` … `09_wave_4` | 740–1200 px wide | Four particle waves |
| `09_waves_set` | 1200 × 313 | All four together |
| `10_glow_1` … `10_glow_8` | 45–546 px | Flares: wide streaks (1, 8), cross flare (2), star glows (3, 4), thin vertical lines (5, 6), tall flare (7) |
| `10_glows_set` | 1200 × 478 | All glows together |
| `11a_gradient_blue_dark` … `11d_gradient_blue_top` | 568 × 424 | Four soft gradient fields (dark blue, blue glow top-left, violet top-right and blue bottom-left, blue glow top) |
| `11_gradients_set` | 1200 × 248 | All four together |
| `12_rail_1` … `12_rail_4` | tall thin | Vertical lines with nodes (decoration; the real stepper is CSS) |
| `12_bracket_1` … `12_bracket_3` | wide thin | Corner and line brackets |
| `12_bokeh_1` … `12_bokeh_3` | ~400 px | Soft blurred circles |
| `12_ornaments_set` | 1200 × 473 | All ornaments together |

Prefer the single pieces over the `_set` files; the sets are only for reference.

## 4. Where each piece goes

### Home — desktop

| Slot | Pieces | How |
|---|---|---|
| **Hero** | `02_hero_background` as the base, full-bleed, anchored bottom, `object-fit: cover`. Add `09_wave_1` low across the left half (keep its original orientation, do not flip it), `10_glow_3` / `10_glow_4` as soft highlights near the cube cluster, `07_cube_small_1/2/3` drifting beside the cluster, `11a_gradient_blue_dark` as a faint backdrop | The wave must read as one continuous ribbon from left to right as in the design. Keep cubes at ≤ 1.6× native size |
| **Section 01 (Who we are)** | `01b_background_middle` aligned to the right edge and bottom of the section (about 55–60% of section width), `11d_gradient_blue_top` placed top-right as the cool beam of light, `07_cube_small_*` floating above the ridge with `10_glow_5` / `10_glow_6` as thin light lines under them | The beam in the design is a soft blue-white ray; the gradient plus a glow flare approximates it |
| **Section 02 (What we do)** | `09_wave_2` and `09_wave_3` at the far right edge (as horizontal bands, partly off-screen; do not rotate them), a column of `07_cube_small_*` with `10_glow_5/6` lines at the right edge, `03_section_overlay` across the top | Keep the four columns clear; art stays at the edges |
| **Section 03 (Projects)** | `05_cube_large` left-centre at about 320–380 px wide (never larger than 1.5× native), `09_wave_3` behind it sweeping up from the left, `08_network_2` and `08_orb_*` as scattered points, `06_cube_medium` small accent top-left | The cube is the focal point; timeline on the right stays clear |
| **Section 04 (Ways to engage)** | `04_ground_element` along the bottom edge, `09_wave_1` and `09_wave_4` in the bottom corners, `07_cube_small_*` at the sides with `10_glow_*` | Cards stay unobstructed; glow only in corners |

### Home — mobile (use different crops, not shrunk desktop art)

| Slot | Pieces |
|---|---|
| **Hero** | `01a_background_top` filling the lower half of the hero, anchored bottom; `10_glow_3` highlight |
| **Section 01** | `01b_background_middle` below the paragraph (full width, faded edges), `07_cube_small_*` |
| **Section 02** | `09_wave_2` and `05_cube_large` near the bottom as shown in the mobile design |
| **Section 03** | `05_cube_large` centred under the intro, `09_wave_3` behind |
| **Section 04** | `01c_background_bottom` or `04_ground_element` at the very bottom |

### Team — desktop and mobile
The Team page uses very little art by design: dark space, thin arcs, soft glows.

| Slot | Pieces |
|---|---|
| **Hero** | Arc graphic drawn as inline SVG (not from the sheet). Glowing nodes on the arcs use `08_orb_1/2/3`. Soft side glows use `10_glow_4` at low opacity, left and right. `11a_gradient_blue_dark` very faint |
| **Our structure / The team** | No artwork. At most `11a_gradient_blue_dark` as a barely visible tint |
| **The collective** | Arc graphic again with `08_orb_*` nodes and `08_network_1` very faint |
| **Page bottom (above footer)** | `09_wave_4` or `04_ground_element` as a soft band |

### Header and footer
No sheet artwork. Logo and affiliation logo come from `src/assets/brand/`.

## 5. Build rules for artwork

1. **Layer, don't stretch.** No single piece may be scaled above about 1.5× its delivered size (hero base is the exception; it may fill the width but should be anchored and faded).
2. **Blend into the dark.** Pieces are transparent. For glows and cubes use `mix-blend-mode: screen` (or normal) over `--color-bg`; verify there are no visible rectangle edges anywhere.
3. **Soften edges.** Use CSS `mask-image` linear/radial gradients on any piece whose cut edge could show, and never end a piece inside the visible area without a fade.
4. **Parallax and drift, gently.** Layers move at different slow speeds (20–40 s loops, a few percent of their size). Off for reduced motion; paused when the tab is hidden.
5. **Art direction.** Use `<picture>` or separate `ArtLayer` instances per breakpoint so mobile gets the portrait crops listed above.
6. **Decorative only.** All art has `alt=""` and `aria-hidden="true"`; it never carries meaning.
7. **Weight.** Hero ≤ 500 KB desktop / 250 KB mobile delivered; lazy-load everything below the hero; set width and height to avoid layout shift.
8. **Gradients.** If a `11*` gradient shows visible banding when stretched, replace it with a CSS radial gradient using the same hues (deep blue about `#2a3aa8`, violet about `#6a1fd8`).
9. **No new artwork.** Do not generate or draw additional cubes, waves, or illustrations. Crisp UI shapes (stepper rail and nodes, brackets, arc lines, borders) are CSS/SVG because they must animate and stay sharp.

## 6. Quality ladder if the hero still looks soft

Try in this order, stopping when it looks good on a real large screen:
1. Reduce the hero's displayed width so it does not exceed about 1.4× native (anchor to the right, let the wave fade out on the left behind CSS particles).
2. Add a very light film grain overlay (CSS, under 4% opacity) over the artwork to unify texture.
3. Run an AI upscaler on `masters/02_hero_background.png` (and `01a_background_top.png`) and compare before/after; keep it only if clearly better. Re-export with the same naming.
4. Replace the source: if you can get higher-resolution originals, run `scripts/slice_assets.py` on the new SVG (adjust the crop boxes at the top of the script if the layout differs).

## 7. Brand and photo slots

| Slot | Path | Rules |
|---|---|---|
| Header + footer logo | `src/assets/brand/cai-logo.svg` (or `.png`, `.webp`) | SVG preferred. Transparent background. Light-on-dark version works best. Referenced by `site.json` → `brand.logo` ("cai-logo") |
| Affiliation logo | `src/assets/brand/affiliation-logo.svg` (or `.png`, `.webp`) | Transparent background. Light-on-dark version works best. Referenced by `site.json` → `footer.affiliation.logo` |
| Team photos | `src/assets/team/firstname-lastname.jpg` | Any aspect ratio works, **portrait at least 800 px on the short side** is ideal; the site crops to 4:5 and converts to black-and-white with CSS. Named in `team.json` → member `photo` |
| Share image | `src/assets/brand/share.png` (later) | 1200 × 630, referenced in `site.json` → `seo.shareImage` |

Until the logo files exist, neutral placeholders appear. If your logo already contains the name "Centre for Artificial Intelligence", set `brand.showWordmark` to `false`.

## 8. Re-slicing

`scripts/slice_assets.py <svg> <output_dir>` renders the SVG at 4× with transparency, cuts the 12 labelled assets (labels excluded), splits the sets into single pieces, writes `masters/` (PNG) and `web/` (WebP, lightly smoothed), and a `slice_manifest.json`. Requires `cairosvg`, `pillow`, `numpy`, `scipy`. Crop boxes are in sheet units at the top of the script.
