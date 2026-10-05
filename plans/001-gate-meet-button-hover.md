# 001 -- Gate meet-button hover motion to fine pointers

- **Status**: DONE
- **Commit**: 7191385
- **Severity**: MEDIUM
- **Category**: Accessibility
- **Estimated scope**: 1 file (`app/globals.css`), ~15 lines

## Problem

`.meet-button:hover` applies `translateY(-1px)` and arrow `translateX(3px)` for all pointer types. On touch devices this sticky-hovers after tap. Hover motion must live behind `@media (hover: hover) and (pointer: fine)`.

Current (`app/globals.css:1515-1523`):

```css
.meet-button:hover {
  background: #7a2339;
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.2) inset, 0 14px 28px rgba(139, 41, 66, 0.22);
  transform: translateY(-1px);
}

.meet-button:hover .meet-button__arrow {
  transform: translateX(3px);
}
```

## Target

Keep color/shadow hover for all devices if desired; move **transform** hover into fine-pointer media query. Keep `:active` press (`scale(0.97)`, 80ms) for everyone. Keep existing `prefers-reduced-motion` block.

```css
.meet-button:hover {
  background: #7a2339;
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.2) inset, 0 14px 28px rgba(139, 41, 66, 0.22);
}

@media (hover: hover) and (pointer: fine) {
  .meet-button:hover {
    transform: translateY(-1px);
  }

  .meet-button:hover .meet-button__arrow {
    transform: translateX(3px);
  }
}
```

Easing tokens already in use: `cubic-bezier(0.23, 1, 0.32, 1)` at 180ms -- keep.

## Repo conventions to follow

Match the existing reduced-motion block at `app/globals.css:1536-1544`. Do not introduce Framer Motion. Prefer CSS-only.

## Steps

1. Open `app/globals.css`.
2. Split `.meet-button:hover` so transforms are gated; leave background/box-shadow outside the gate.
3. Leave `:active` and `prefers-reduced-motion` unchanged.
4. Feel-check: desktop hover lift, touch tap without stuck lift, reduced-motion OS setting kills movement.

## Out of scope

- Redesigning the button
- Changing calendar chain layout
- Shelf / Nomos motion

## Verification

- [ ] Hover lift only on mouse / trackpad
- [ ] Touch tap still shows press scale
- [ ] `prefers-reduced-motion: reduce` removes transforms
- [ ] Durations stay ≤180ms
