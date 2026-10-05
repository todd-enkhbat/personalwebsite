# 003 -- Soften shelf-spine hover and respect reduced-motion

- **Status**: DONE
- **Commit**: 7191385
- **Severity**: HIGH
- **Category**: Purpose & frequency / Accessibility
- **Estimated scope**: 1 file (`app/globals.css`), ~25 lines

## Problem

Book spines on Feeding the Mind are browsed often (tens+/session). Hover lifts `translateY(-6px)` with weak built-in `ease`, animates `filter`, and is not gated for fine pointers or reduced-motion.

Current (`app/globals.css:2419-2437`):

```css
.shelf-spine {
  transition: transform 180ms ease, filter 180ms ease;
}

.shelf-spine:hover,
.shelf-spine:focus-visible {
  transform: translateY(-6px);
  filter: brightness(1.08);
  outline: none;
}
```

## Target

Reduce motion amplitude for frequency, use strong ease-out, drop expensive filter, gate hover, honor reduced-motion:

```css
.shelf-spine {
  transition: transform 160ms cubic-bezier(0.23, 1, 0.32, 1);
}

@media (hover: hover) and (pointer: fine) {
  .shelf-spine:hover {
    transform: translateY(-3px);
  }
}

.shelf-spine:focus-visible {
  transform: translateY(-3px);
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .shelf-spine {
    transition: none;
  }

  .shelf-spine:hover,
  .shelf-spine:focus-visible {
    transform: none;
  }
}
```

## Repo conventions to follow

Letter-site personality is crisp editorial -- prefer subtle lift over playful bounce. Prefer GPU `transform` only (no `filter` on hover).

## Steps

1. Replace `.shelf-spine` transition/hover in `app/globals.css`.
2. Remove hover `filter: brightness(...)`.
3. Add hover + reduced-motion media queries as above.
4. Feel-check shelf scrubbing: lift should feel quieter and not sticky on touch.

## Out of scope

- Scrubber `width` transition (separate LOW finding -- optional follow-up)
- DualShelf React logic
- Meet / calendar buttons

## Verification

- [ ] Hover lift ≤3px, only on fine pointers
- [ ] No brightness filter on hover
- [ ] Reduced-motion: no transform
- [ ] Focus-visible still discoverable without relying on lift alone
