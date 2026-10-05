# Design Review (Phase 4A)

This document is a comparison of the running site against the approved design images for the Home and Team pages. The review was conducted by comparing the implementation in code against the design reference images at 390px, 768px, and 1440px viewports.

## 1. Differences Table

| Page | Section | Viewport | Difference | Severity | File to change | Status |
|---|---|---|---|---|---|---|
| Home | Hero | Desktop (1440) | The second line of the headline ("WITH AI") is solid white. The design specifies a white-to-light-grey gradient on this line (with "AI" in purple). | Should | `src/pages/index.astro` | [x] Done |
| Home | What we do | All | The section eyebrow "What we do" is forced to uppercase ("WHAT WE DO") by the `.eyebrow` CSS class. The design uses sentence case for Home small eyebrows. | Must | `src/components/ui/Eyebrow.astro` | [x] Done |
| Home | What we do | Desktop (1440) | The intro text ("From structured research...") has a `padding-top: 36px`, pushing it down. The design specifies it should be "top-aligned" with the heading. | Nice | `src/pages/index.astro` | [x] Done |
| Home | Hero / Artwork | All | The mask on the main hero background uses `transparent` at 0% and 100%. Depending on viewport sizing, this may create a visible horizontal edge if the artwork extends into the bounds. | Should | `src/pages/index.astro` | [x] Done |
| Home | All | Desktop (1440) | The side stepper was intentionally moved into its own 200px sticky column to prevent overlapping with content cards. In the original design, the stepper overlapped the cards. | Deliberate | N/A | Skipped (intentional architecture) |
| Team | Hero | Desktop / Mobile | The pill reads "● OUR PEOPLE ●". The component hard-codes the dots in HTML, which is correct assuming `team.json` simply uses "OUR PEOPLE". Ensure JSON doesn't duplicate them. | Check | `src/content/team.json` | [x] Verified |

## 2. Text, Spacing, and Type-scale Differences

- **Text Differences from `content.md`**: The `index.astro` correctly imports eyebrow text and sublines. However, the exact punctuation (such as the dash in "CENTRE FOR AI —" present in the desktop image) is handled by JSON, which only provides "CENTRE FOR AI". This leaves the dash missing. *(Fixed in `home.json`)*
- **Type-scale**: The scaling uses `clamp()` correctly following the tokens. However, the missing gradient on the Home Hero makes the text hierarchy feel slightly flatter than the design. *(Fixed in `index.astro`)*
- **Spacing**: Section 02 intro text is pushed down by 36px on desktop instead of being strictly top-aligned with the two-line heading. *(Fixed in `index.astro`)*

## 3. Artwork Problems

- **Softness & Masks**: The radial and linear gradient masks on `optHeroDesktop`, `optGradBlueTop`, and `optWave1` may cut off the artwork sharply. Using `transparent` in gradients can sometimes leave visible edges where the image ends. It needs a slight smoothing adjustment (e.g. extending the opaque center). *(Fixed in `index.astro`)*

## 4. Stepper Behaviour

- The stepper implementation matches the design closely with glowing nodes and active states.
- The desktop stepper was intentionally moved to a dedicated column (unlike the overlapping design) to improve legibility and prevent overlapping with content cards, as noted in the PRD and `design.md`.

## 5. Top 10 Most Important Fixes (In Order)

- [x] 1. **Remove text-transform from `.eyebrow`**: Allow sentence case for Home small eyebrows like "What we do" and "Ways to engage", as specified in the design.
- [x] 2. **Add gradient to Home Hero headline**: Apply a `white-to-light-grey` gradient to `headlineLine2` ("WITH AI") in `index.astro` to match the premium design feel.
- [x] 3. **Fix Section 02 intro alignment (Home)**: Remove `padding-top: 36px` from `.what-we-do-intro` on desktop so it top-aligns with the heading.
- [x] 4. **Soften Hero artwork mask**: Check the `linear-gradient` mask on `optHeroDesktop` to ensure no hard horizontal edges are visible at extreme viewports.
- [x] 5. **Verify `home.json` for Dash**: Add the em-dash to the eyebrow text "CENTRE FOR AI —" in `home.json` if required to strictly match the visual design image.
- [x] 6. **Verify `team.json` for Pill Text**: Ensure `team.json` only contains "OUR PEOPLE" so the dots aren't duplicated by the HTML template.
- [x] 7. **Ensure `MemberCard` placeholder image loads smoothly**: If a photo is missing, ensure the placeholder doesn't break the layout or aspect ratio (the 4:5 aspect ratio is enforced by CSS, which is good).
- [x] 8. **Check Mobile Arrows**: Ensure that the right arrows on the What We Do mobile stacked cards align perfectly with the bottom of the card content.
- [x] 9. **Timeline Line Contrast**: Ensure the vertical line of the timeline uses `var(--color-border-strong)` and is distinct against the dark background.
- [x] 10. **Verify Carousel Buttons**: Ensure the disabled state (opacity 0.4) on the MemberGroup carousel buttons works correctly on tablet/mobile views.
