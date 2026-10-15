# Portfolio studio rendering

The sixteen exhibition models share beveled geometry and physically based materials, with separate finishes for machined aluminum, anodized graphite, thermal gold foil, photovoltaic glass, fabric, paper, ceramic paint, and lacquer. Detail is illustrative, rather than a claim of hardware qualification or measured dimensions.

## Rendering

`three-gpu-pathtracer` 0.0.24 and `three-mesh-bvh` 0.9.5 are build-time development dependencies only. Card images use offline 900px renders, 256 samples per pixel, five light bounces, a real HDR studio environment and three area lights. Transparent WebP derivatives are 768px with quality 90. Full-resolution PNG masters remain available. The previous previews are preserved.

The installed WebGL path tracer has a clearcoat compatibility problem with the installed Three release. Offline rendering disables the extra coat layer while preserving base roughness, metal, bump and transmission properties; the interactive renderer retains the full material. No path tracer is included in the website bundle.

Rebuild:

```sh
PLAYWRIGHT_MODULE=/path/to/playwright CHROME_EXECUTABLE=/path/to/chrome node scripts/render-portfolio-previews.mjs
node --experimental-strip-types scripts/export-portfolio-models.ts
```

Optional renderer controls: `MODELS=suit,growlight`, `SAMPLES=256`, `RENDER_SIZE=900`, `OUTPUT_DIR=/tmp/model-check`, `PATH_TRACE=0` (raster diagnostic).

The rendering script checks model bounds and rejects blank renders before writing assets. Geometry controls remain available in each expanded project. Their WebGL renderer starts on demand, renders on interaction, uses studio HDR reflections with an immediate room-environment fallback, and releases geometries, generated textures, materials, environment targets, controls, and observers when closed.

## Surface and geometry changes

- Space hardware: rounded edges, cellular busbars, fasteners, anodized components, cable harnesses, foil grain, machined reflectors, motor laminations, linkage pivots, and deployment structure.
- Habitat: original enclosure geometry preserved; surface rocks, airlock markings and ramp treads added.
- Exoplanet: textured atmospheric bands, thin atmosphere, rocky moon, host star, fine orbital path. Colors and distances are illustrative.
- Balloon: translucent envelope, twenty gores, suspension lines, recovery chute, enclosure, camera and antenna.
- Horticultural lighting: finned heat sink, individual LEDs, driver, electrical cable and suspension hardware, with a seedling tray.
- Campsite: A-frame cloth, open entrance, seam poles, guylines, stakes, bedding and lantern.
- Telescope: equatorial mount and tripod, optical coatings, retaining rings, finder, focuser and cable.
- Analog suit: curved gold visor segment, hinge fittings, textile pack, straps, chest unit and hoses.
- Golden Record: fine concentric grooves, brushed metallic finish, center label and engraved radial marks.
- Piano: lacquered curved rim, hinged raised lid, exposed soundboard and strings, 52 white keys and corresponding black keys, braces, pedals, casters and bench.
- Retail: molded plastic blocks with rounded edges and correctly attached studs.
- Research work: printed page textures, paper edges, notebook binding, leather cover and metal writing instrument.

Studio HDR provenance: `public/models/environment/LICENSE.md`. Generated text, plots and surface detail are illustrative presentation elements; they are not new project results or extracted research data.

## Verification

Final asset set: 16 transparent 768px WebP previews, 847 KiB combined, plus 900px PNG masters and regenerated downloadable GLBs. Publishing validates alpha content and assigns content-hashed filenames, then writes `app/data/modelPreviewAssets.json` so Next's image cache cannot serve an earlier render. `scripts/publish-portfolio-previews.mjs` can republish a validated set after targeted renders.

Production build and TypeScript checks pass. Browser QA at 1440, 800 and 390 px confirms all 16 cards, consistent media, no horizontal overflow or broken images, functioning category filters, and no motion under reduced-motion preferences. All standalone routes return HTTP 200. The grid mounts zero WebGL canvases. Interactive zoom, rotation, component separation, and nested image dialogs pass with no browser runtime errors. One unrelated, existing HomeIntro image lint warning remains.

## Photographic texture update

Interactive models and card previews now share `texturePortfolioModel`: local photographic metal and fabric normal/roughness maps, the supplied Golden Record face image, HUR artwork printed onto its research notebook, the existing MICC logo on its research folio, and an attributed NASA Jupiter cylindrical map for the illustrative exoplanet. Polished optical surfaces keep their low roughness. Texture images load only when a model is opened; card previews remain static images. Missing textures retain procedural geometry/material fallbacks.

Texture provenance: `public/models/textures/LICENSE.md`. The Node GLB export script produces the geometry/material study; browser-only printed pages and photographic maps are currently part of the website viewer and offline preview pipeline.

## Logo and heading update

Cards place marks before their titles in a single responsive row, with original colors and no grayscale filter. Expanded project headings also place marks beside the title, allowing long titles to wrap. HALO's card again uses the supplied `halo-hero.jpg` spacecraft mechanism rendering.

Official source assets:

- Brown full-color coat of arms: https://www.brown.edu/themes/custom/brown/static/images/logo.svg — `public/paper-assets/orgs/brown-shield.svg` uses its coat-of-arms view box.
- MIT red logo: https://brand.mit.edu/logos-marks/mit-logo — `public/paper-assets/orgs/mit-red.svg` preserves the rectangular strokes and red fill of its official logo-colors-mit-red PNG. The relationship label remains MIT Lincoln Laboratory as documented in the supplied T-REX archive.
- Wakayama's orange mark: https://www.wakayama-u.ac.jp/_themes/site/wakayama-u/tmpl-img/logo_pc.svg — `public/paper-assets/orgs/wakayama-symbol.svg` retains the original vector symbol.
- Harvard crest: extracted by view box from the existing supplied full-color vector.
- MARSA and Nomos: `marsa-clean.svg` and `nomos-clean.svg` embed and clip the supplied original pixels to their circular identities. Their exterior backgrounds are transparent; lettering and internal colors are unchanged.

Background extraction used the built-in image generation tool, transparent background enabled, followed by lossless trimming/resizing with Sharp. Production assets:

- `public/paper-assets/orgs/hur-clean.png` → `hur-compact.png`.
- `public/paper-assets/orgs/trend-home-clean.png` → `trend-home-compact.png`.

Final production prompt set:

1. HUR: Extract the existing blue “HUR.” wordmark and its small globe from the supplied image. Remove the beige background, top triangles and bottom globe. Preserve the existing lettering, shapes and blue colors. Actual transparent background; no new marks.
2. Trend Home: Extract the existing Trend Home lettering from the supplied photographic logo. Remove the dark photograph/background. Preserve the letter shapes and proportions, with the lettering in deep charcoal #26343b for visibility on the paper website. Actual transparent background; no decorative additions.

The generated MARSA candidate changed the identity and was rejected. MARSA and Nomos use faithful source-image clipping instead of generated redraws.

Final texture-update verification: production build and TypeScript pass. Responsive card checks at 1440/1050/800/390px confirm single-line headings, aligned visible marks, no overflow and no broken images. All 16 project routes, filters, reduced motion, nested dialogs and model controls pass. Direct viewer checks for Nomos, HUR, the exoplanet study and MARS-V confirm successful local photographic texture loading (including valid 304 browser cache responses) and no browser runtime errors. Expanded project headings also pass mobile overflow checks.
