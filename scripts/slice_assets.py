#!/usr/bin/env python3
"""
CAI asset slicer.
Renders asset_sheet_vector_transparent.svg at 4x with transparency, cuts the 12 labelled
assets out of it (labels excluded), and writes:
  masters/  full-resolution transparent PNGs
  web/      optimised WebP versions for the site
  slice_manifest.json  every crop box, output size and file size

Usage:  python slice_assets.py path/to/asset_sheet_vector_transparent.svg out_dir
Needs:  pip install cairosvg pillow numpy scipy
All boxes are in SHEET units (the SVG is 1536 x 1024). Edit BOXES if a new sheet has a different layout.
"""
import sys, os, json
import numpy as np
from PIL import Image
from scipy import ndimage as ndi

SCALE = 4                      # master render scale
Image.MAX_IMAGE_PIXELS = None

# (x0, y0, x1, y1) in sheet units. Labels sit above each box and are excluded.
BOXES = {
    "01_main_background":   (20, 48, 530, 1012),
    "02_hero_background":   (553, 48, 1062, 352),
    "03_section_overlay":   (1080, 74, 1520, 166),
    "04_ground_element":    (1080, 240, 1520, 356),
    "05_cube_large":        (548, 408, 745, 598),
    "06_cube_medium":       (770, 455, 900, 575),
    "07_cubes_small_set":   (920, 462, 1170, 552),
    "08_particles_set":     (1180, 420, 1520, 590),
    "09_waves_set":         (550, 655, 1110, 810),
    "10_glows_set":         (1115, 655, 1525, 810),
    "11_gradients_set":     (550, 862, 1170, 990),
    "12_ornaments_set":     (1180, 870, 1530, 1005),
}
# Fixed-box (never auto-trimmed): very faint or panel-shaped assets
NO_TRIM = {"03_section_overlay", "11_gradients_set"}
# Extra pieces cut from the tall background so mobile/sections can use portrait crops
BG_PIECES = {
    "01a_background_top":    (20, 48, 530, 420),
    "01b_background_middle": (20, 380, 530, 720),
    "01c_background_bottom": (20, 640, 530, 1012),
}
GRADIENT_BOXES = {
    "11a_gradient_blue_dark":  (560, 873, 702, 979),
    "11b_gradient_blue_glow":  (713, 873, 855, 979),
    "11c_gradient_violet":     (866, 873, 1008, 979),
    "11d_gradient_blue_top":   (1020, 873, 1162, 979),
}
# sets that are also split into individual files (name -> (dilate_iterations, min_area_px_at_sheet_scale))
SPLIT = {
    "07_cubes_small_set": ("07_cube_small", 3, 40),
    "09_waves_set":       ("09_wave",       3, 200),
    "10_glows_set":       ("10_glow",       3, 30),
    "08_particles_set":   ("08_particles",  6, 150),
    "12_ornaments_set":   ("12_ornament",   4, 5),
}

def piece_name(base, w, h, counters):
    """Give split pieces meaningful names (sizes are in sheet units)."""
    if base == "08_particles":
        kind = "orb" if max(w, h) < 50 else "network"
        name = "08_" + kind
    elif base == "12_ornament":
        if h > 90 and w < 30: name = "12_rail"
        elif w >= 50 and h < 35: name = "12_bracket"
        else: name = "12_bokeh"
    else:
        name = base
    counters[name] = counters.get(name, 0) + 1
    return f"{name}_{counters[name]}"
WEB_MAX_W = {"01": 1800, "02": 2400, "03": 2400, "04": 2400}   # default 1200 for the rest

def trim(img, thr=6, pad=8):
    a = np.array(img.getchannel("A"))
    ys, xs = np.where(a > thr)
    if len(xs) == 0:
        return img
    x0, x1 = max(xs.min() - pad, 0), min(xs.max() + pad, img.width)
    y0, y1 = max(ys.min() - pad, 0), min(ys.max() + pad, img.height)
    return img.crop((x0, y0, x1, y1))

def components(img, iters, min_area):
    small = img.resize((img.width // SCALE, img.height // SCALE), Image.BILINEAR)
    m = np.array(small.getchannel("A")) > 18
    d = ndi.binary_dilation(m, structure=np.ones((3, 3), bool), iterations=iters)
    lab, n = ndi.label(d)
    out = []
    for i, sl in enumerate(ndi.find_objects(lab)):
        if int(m[sl].sum()) < min_area:
            continue
        out.append((sl[1].start, sl[0].start, sl[1].stop, sl[0].stop))
    return out

SMOOTH_SIGMA = 1.7            # px at master scale; hides the blotchy banding left by the SVG tracing
NO_SMOOTH_PREFIX = ("11", "12_rail", "12_bracket")   # gradients and crisp line ornaments stay untouched

def smooth(img, sigma=SMOOTH_SIGMA):
    arr = np.array(img).astype(np.float32) / 255.0
    a = arr[..., 3:4]
    pm = arr[..., :3] * a                       # premultiply so glows don't get dark halos
    pm = ndi.gaussian_filter(pm, sigma=(sigma, sigma, 0))
    a2 = ndi.gaussian_filter(a, sigma=(sigma, sigma, 0))
    rgb = np.where(a2 > 1e-4, pm / np.maximum(a2, 1e-4), 0)
    rng = np.random.default_rng(7)
    rgb = rgb + rng.normal(0, 0.006, rgb.shape) * (a2 > 0.02)   # faint dither against visible bands
    out = np.concatenate([np.clip(rgb, 0, 1), a2], axis=-1)
    return Image.fromarray((out * 255 + 0.5).astype("uint8"), "RGBA")

FEATHER = {"01a_background_top": ("bottom",), "01b_background_middle": ("top", "bottom"),
           "01c_background_bottom": ("top",)}

def feather(img, sides, frac=0.14):
    a = np.array(img.getchannel("A")).astype(float)
    h, w = a.shape
    n = int(h * frac)
    ramp = np.linspace(0, 1, n)
    if "top" in sides:
        a[:n] *= ramp[:, None]
    if "bottom" in sides:
        a[-n:] *= ramp[::-1][:, None]
    out = img.copy()
    out.putalpha(Image.fromarray(a.astype("uint8")))
    return out

def save(img, name, manifest, kind):
    os.makedirs(f"{OUT}/masters", exist_ok=True)
    os.makedirs(f"{OUT}/web", exist_ok=True)
    mp = f"{OUT}/masters/{name}.png"
    img.save(mp, optimize=True)
    key = name[:2]
    maxw = WEB_MAX_W.get(key, 1200)
    img_web = img if name.startswith(NO_SMOOTH_PREFIX) else smooth(img)
    if name in FEATHER:
        img_web = feather(img_web, FEATHER[name])
    w = img_web if img_web.width <= maxw else img_web.resize((maxw, round(img_web.height * maxw / img_web.width)), Image.LANCZOS)
    wp = f"{OUT}/web/{name}.webp"
    w.save(wp, "WEBP", quality=86, method=6, alpha_quality=92)
    manifest[name] = {"kind": kind, "master_px": [img.width, img.height], "web_px": [w.width, w.height],
                      "master_kb": round(os.path.getsize(mp) / 1024), "web_kb": round(os.path.getsize(wp) / 1024)}

if __name__ == "__main__":
    svg, OUT = sys.argv[1], sys.argv[2]
    import cairosvg
    os.makedirs(OUT, exist_ok=True)
    tmp = os.path.join(OUT, "_sheet.png")
    cairosvg.svg2png(url=svg, write_to=tmp, output_width=1536 * SCALE)
    sheet = Image.open(tmp).convert("RGBA")
    manifest = {}
    boxes_used = {}
    def cut(box): return sheet.crop(tuple(v * SCALE for v in box))
    for name, box in BOXES.items():
        im = cut(box)
        if name not in NO_TRIM:
            im = trim(im)
        save(im, name, manifest, "asset")
        boxes_used[name] = box
        if name in SPLIT:
            base, iters, min_area = SPLIT[name]
            raw = cut(box)
            parts = components(raw, iters, min_area)
            parts.sort(key=lambda b: (round(b[1] / 40), b[0]))
            counters = {}
            for b in parts:
                pad = 6
                bb = (max(b[0] - pad, 0) * SCALE, max(b[1] - pad, 0) * SCALE,
                      min(b[2] + pad, raw.width // SCALE) * SCALE, min(b[3] + pad, raw.height // SCALE) * SCALE)
                piece = trim(raw.crop(bb), pad=6)
                save(piece, piece_name(base, b[2] - b[0], b[3] - b[1], counters), manifest, "split")
    for name, box in {**BG_PIECES, **GRADIENT_BOXES}.items():
        save(cut(box), name, manifest, "piece")
        boxes_used[name] = box
    json.dump({"scale": SCALE, "sheet_units": [1536, 1024], "boxes": boxes_used, "files": manifest},
              open(f"{OUT}/slice_manifest.json", "w"), indent=2)
    os.remove(tmp)
    print("done", len(manifest), "files")
