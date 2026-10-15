# Philosophy / Physics laboratory

Route: `/philosophy-physics`, linked from the shared navigation in `app/data/content.ts`.

The page preserves the site's Garamond / Plex Mono typography, paper texture, letterhead, and burgundy accent. Its three experiments are explicit teaching models. They are not cosmological calculations or pre-rendered animations. No additional runtime dependencies were added.

## Reading and editorial structure

Source: David Z. Albert, *Time and Chance* (Harvard University Press, 2000), supplied as `Albert_TimeChance.pdf`. References in the page use **printed** page numbers (printed page 1 is PDF page 16).

- Chapter 2, pp. 22-34: macroscopic descriptions, energy conservation, free expansion, heat transfer, entropy, equilibrium.
- Chapter 3, pp. 35-70: microscopic descriptions, macrostate multiplicity, Boltzmann entropy, probability, and the limits of strict monotonicity.
- Chapter 4, pp. 71-96: optional context for reversibility and the Past Hypothesis; explicitly distinguished from the requested chapters.
- Appendix, pp. 165-170: optional heat-engine context.

The supplied book is not copied into the public website. All prose is an original teaching adaptation. Its cover was already an asset in the site's reading room.

The closing section offers a question about meaning without presenting an existential conclusion as a consequence of physics. The broader cosmic scenario is separately sourced to:

- Adams and Laughlin (1997), https://arxiv.org/abs/astro-ph/9701131
- NASA, https://science.nasa.gov/astrophysics/programs/physics-of-the-cosmos/expand-our-knowledge-of-dark-energy/

Continued expansion and the behavior of dark energy, gravity, and black holes are conditions of the extrapolation. No cosmic dates or guarantees are inferred from the simulations.

## Physics

Pure model functions live in `app/lib/entropy.ts`.

### Gas

A 2-by-1 rectangular box contains independent point particles with elastic wall reflections. Initial positions and velocities come from a deterministic seeded generator, so initialization is reproducible and server rendering is stable. Different seeds generate different preparations. There are no interparticle collisions or thermalization claims.

Analytic folded coordinates implement reflections for arbitrary step lengths. Reversal negates current velocities and actually integrates back to the release time; no position history is replayed. Each particle retains its kinetic energy. The visualization's enlarged dot size is not a physical radius.

The macrostate counts particles in the two halves. S/kB = ln(N! / (NL! NR!)), up to a constant. This is a positional coarse graining only. The equilibrium probability of every particle occupying the specified left half is 2^-N, assuming independent uniform positions. It is not a recurrence time.

### Two reservoirs

Each reservoir has constant heat capacity C = 1 J/K. The model uses U = TA + TB with a fixed energy reference. Passive conduction is integrated analytically: the mean remains constant and the difference decays as exp(-2gt). Entropy change is ln(TA/TA0) + ln(TB/TB0) J/K.

The reversible-engine trajectory keeps TA*TB constant. Stored work equals the reduction in reservoir energy. The endpoint is the geometric mean and the maximum work is TA0 + TB0 - 2*sqrt(TA0*TB0). Finite animation speed is a visualization of the reversible limit, not a claim of finite-power reversible operation.

Changing the conduction/engine path resets the preparation for comparison. Changing coupling changes the rate without resetting the current state. Coupling zero stops exchange.

### Finite world

A 16-by-8 grid has C = 1 J/K per region, insulated outside boundaries, and conductive contact between orthogonally adjacent cells. Every preparation totals 38,400 J and averages 300 K. Hotspots are energy distributions, not simulated stars.

Equal and opposite pairwise fluxes conserve total energy. Substeps have g*dt <= 0.2, so the explicit diffusion update is a convex average even at maximum graph degree four. Positive temperatures are preserved and sum(log T) does not decrease.

The remaining work potential is sum(T) - N*geometricMean(T), assuming ideal reversible engines operating between the regions. Passive diffusion dissipates this opportunity rather than storing it. The near-equilibrium display threshold is 0.05 J. The macroscopic diffusion model has no thermal fluctuations or recurrences. Color saturates above 2,000 K; the physical values are not clipped.

## Interface and privacy

### Material artwork

The introduction contains a restrained burgundy and oxblood satin material field, with diagonal optical refraction and a screen-space glyph lattice. The reference is [BVP's homepage](https://www.bvp.com/), whose public Unicorn Studio scene (`/unicorn/bvp_main_light_right.json`, inspected October 15, 2026) has nine authored effects compiled into five rendering stages. The visual treatment is recreated with an original color map and shader; no BVP shaders, logos, scene files, or Unicorn runtime are shipped.

`MaterialField.tsx` loads the local `public/physics/burgundy-material.jpg` color map and renders it through `materialShader.ts`. Low-amplitude domain distortion moves two broad folds slowly. A 7.5-by-10 CSS-pixel character lattice with less atlas padding maps the material to dots, colons, digits, slashes, Ω, and M. Pointer interaction bends the actual glyph coordinates, changes characters in the immediate vicinity, and leaves an inertial wake that settles after the pointer exits. Diagonal optical bands subtly refract the surface. Glyphs are rendered live, not baked into the image. The material fades into the existing paper at its margins and clears the book caption. No runtime dependencies or remote requests are added.

The color map is an original generated asset, compressed to a local JPEG. Source images remain in the conversation's generated-images directory. A CSS rendering of the same color map provides the static fallback. Animation values stay outside React's render cycle; rendering is capped at 30 fps and device pixel ratio 1.5. Intersection and visibility observers suspend drawing offscreen and in background tabs. A pause/resume button controls the decoration independently of the experiments. Reduced-motion users get a still frame without pointer response. GPU context restoration rebuilds the renderer. All GPU resources, image handlers, frames, and observers are cleaned up on unmount. The artwork is hidden from assistive technology; the book retains its image description and caption.

All artwork styles are scoped to the philosophy/physics route; the letterhead, site typography, homepage intro, and simulation models retain their behavior.

Experiments start paused, including for reduced-motion preferences. Native range/select/radio controls and keyboard-navigable tabs are provided. Inactive panels and background tabs suspend simulation updates. Per-tab state is retained when switching experiments. The gas canvas has a current textual count, and all charts have accessible labels and adjacent metrics.

The reflection uses the browser-local key `philosophy-physics-reflection-v1`. No reflection is submitted to a server. Recorded experiment observations last for the current page session; the reflection persists in the current browser. Both can be downloaded as a plain-text notebook. Storage failure leaves editing and downloading available.

## Verification

Run `npm run test:physics` for the model invariants. Tests transpile the TypeScript model using the existing TypeScript dev dependency and run with Node's built-in test runner. Coverage includes energy conservation, exact retracing, combinatorics, equilibrium endpoints, positivity, entropy monotonicity in the thermal models, stable large timesteps, disconnected systems, and equal-temperature starts.

Run `npm run build` for the full production build and type checks. Browser verification should cover all controls, notebook download and persistence, keyboard tabs, hydration, and widths 320, 390, 768, 1024, and 1440 pixels. Round calculated SVG display attributes before rendering to avoid platform-dependent last-bit differences in transcendental functions; retain full precision in the physics.

### Material controls

The shared experiment transport uses a satin burgundy primary button, with the same material map, restrained glyph detail, a cursor-following highlight, and a divided play/pause area. Run, pause, and equilibrium labels remain native button text; decorative glyphs are hidden from assistive technology. Step controls have a complementary muted paper finish. Reduced-motion preferences remove the button highlight.
