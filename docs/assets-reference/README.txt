CAI ASSETS - sliced from asset_sheet_vector_transparent.svg
============================================================

FOLDERS
  web/       Use THESE in the website. Optimised WebP with transparency.
             Lightly smoothed to hide the blotchy "traced" look. Tall-background
             pieces (01a/01b/01c) have soft faded cut edges so they blend into the page.
  masters/   Full-resolution transparent PNGs, untouched. Keep for future edits.
             Do NOT put these in the website (too heavy).
  preview_contact_sheet.png   One picture showing every asset on the dark page colour.
  slice_manifest.json         Crop boxes, sizes, file weights.
  slice_assets.py             Re-runs the whole slicing if you ever get a better SVG.

All images are transparent and meant to sit on the near-black page background.
Layer them (several assets, blend mode "screen" or normal on dark) rather than
stretching one image across the whole screen.

WHAT EACH PREFIX IS
  01_main_background       full tall background (portrait)
  01a / 01b / 01c          that background cut into top / middle / bottom pieces
  02_hero_background       wide hero art (wave + cubes)
  03_section_overlay       faint wide wave, for section transitions
  04_ground_element        glowing ground line with pillars, for section/footer bottoms
  05 / 06                  large and medium cube
  07_cube_small_1..3       three small cubes (07_cubes_small_set = all three together)
  08_orb_1..3              single glowing points; 08_network_1..2 = dots joined by lines
  09_wave_1..4             four particle waves (09_waves_set = all together)
  10_glow_1..8             light flares and glows (10_glows_set = all together)
  11a..11d                 four soft gradient backgrounds
  12_rail_1..4             vertical lines with nodes; 12_bracket_1..3 corner/line brackets;
                           12_bokeh_1..3 soft blurred circles
  (The stepper rail and brackets on the site are drawn in CSS so they can animate;
   the 12_* pieces are here in case you want them as decoration.)

SUGGESTED PLACEMENT (matches your designs; final mapping goes in assets.md)
  Home hero, desktop        02_hero_background
  Home hero, mobile         01a_background_top
  "Who we are" art          01b_background_middle (cube on rock) 
  Projects section art      05_cube_large + 01c_background_bottom
  Section transitions       03_section_overlay, 09_wave_*
  "Ways to engage" bottom   04_ground_element
  Floating cubes            06, 07_cube_small_*
  Team page hero            12_bokeh_*, 10_glow_*, 08_network_*

HONEST NOTE ON QUALITY
  The SVG is an auto-traced picture, so it contains no detail beyond about the size of the
  original sheet. Cut-outs are crisp-edged and clean, but big hero pieces are soft when shown
  very large. That is why the web files are lightly smoothed and why layering is recommended.
