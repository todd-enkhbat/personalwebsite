# 002 -- Gate calendar-block hover lift + add reduced-motion

- **Status**: DONE
- **Commit**: 7191385
- **Severity**: MEDIUM
- **Category**: Accessibility
- **Estimated scope**: 1 file (`app/globals.css`), ~20 lines

## Problem

`a.calendar-block:hover` lifts with `translateY(-2px)` for all pointers and has **no** `prefers-reduced-motion` handling (unlike `.meet-button`).

Current (`app/globals.css:1652-1655`, `1687-1690`):

```css
.calendar-block {
  transition:
    border-color 160ms ease,
    background-color 160ms ease,
    transform 160ms cubic-bezier(0.23, 1, 0.32, 1);
}

a.calendar-block:hover {
  transform: translateY(-2px);
  border-color: var(--accent);
}
```

## Target

```css
a.calendar-block:hover {
  border-color: var(--accent);
}

@media (hover: hover) and (pointer: fine) {
  a.calendar-block:hover {
    transform: translateY(-2px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .calendar-block {
    transition: border-color 160ms ease, background-color 160ms ease;
  }

  a.calendar-block:hover {
    transform: none;
  }
}
```

## Repo conventions to follow

Mirror `.meet-button` reduced-motion pattern in the same file. Keep the strong ease-out curve `cubic-bezier(0.23, 1, 0.32, 1)` under 300ms.

## Steps

1. Edit `app/globals.css` around the calendar-block rules.
2. Gate transform hover; keep border-color hover always.
3. Add reduced-motion override that drops transform transition.
4. Feel-check horizontal chain on desktop + phone + reduced-motion.

## Out of scope

- Changing chain layout or copy
- Meet button (plan 001)
- Shelf spines

## Verification

- [ ] No sticky lift on touch
- [ ] Reduced-motion: no vertical movement
- [ ] Border accent still changes on hover/tap affordance
