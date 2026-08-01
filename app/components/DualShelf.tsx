"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent
} from "react";
import type { MindShelf, ShelfBook } from "../data/content";

type DualShelfProps = {
  shelves: MindShelf[];
  links: { label: string; href: string; external?: boolean }[];
};

const SPINE_SIZES = [
  { width: 32, height: 220 },
  { width: 28, height: 214 },
  { width: 34, height: 236 },
  { width: 30, height: 228 },
  { width: 30, height: 222 },
  { width: 36, height: 240 },
  { width: 28, height: 210 },
  { width: 34, height: 232 },
  { width: 30, height: 218 },
  { width: 32, height: 226 },
  { width: 36, height: 234 },
  { width: 30, height: 216 },
  { width: 33, height: 224 }
];

function padIndex(n: number) {
  return String(n).padStart(2, "0");
}

function ShelfRow({ shelf, defaultIndex = 0 }: { shelf: MindShelf; defaultIndex?: number }) {
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState(
    shelf.books[Math.min(defaultIndex, Math.max(shelf.books.length - 1, 0))]?.id ??
      shelf.books[0]?.id
  );
  const railRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    scrollLeft: number;
    moved: boolean;
  } | null>(null);

  const activeIndex = Math.max(
    0,
    shelf.books.findIndex((book) => book.id === activeId)
  );
  const active = shelf.books[activeIndex] ?? shelf.books[0];

  const selectByOffset = useCallback(
    (delta: number) => {
      if (!shelf.books.length) return;
      const next = (activeIndex + delta + shelf.books.length) % shelf.books.length;
      setActiveId(shelf.books[next].id);
    },
    [activeIndex, shelf.books]
  );

  useEffect(() => {
    const node = railRef.current?.querySelector<HTMLElement>(`[data-book-id="${activeId}"]`);
    node?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      inline: "nearest",
      block: "nearest"
    });
  }, [activeId, reduceMotion]);

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      selectByOffset(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      selectByOffset(-1);
    } else if (event.key === "Home") {
      event.preventDefault();
      setActiveId(shelf.books[0].id);
    } else if (event.key === "End") {
      event.preventDefault();
      setActiveId(shelf.books[shelf.books.length - 1].id);
    }
  }

  function onPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    const rail = railRef.current;
    if (!rail || event.button !== 0) return;
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      scrollLeft: rail.scrollLeft,
      moved: false
    };
    rail.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const rail = railRef.current;
    const drag = dragRef.current;
    if (!rail || !drag || drag.pointerId !== event.pointerId) return;
    const dx = event.clientX - drag.startX;
    if (Math.abs(dx) > 6) drag.moved = true;
    if (drag.moved) {
      rail.scrollLeft = drag.scrollLeft - dx;
    }
  }

  function onPointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    const rail = railRef.current;
    const drag = dragRef.current;
    if (!rail || !drag || drag.pointerId !== event.pointerId) return;
    dragRef.current = null;
    try {
      rail.releasePointerCapture(event.pointerId);
    } catch {
      /* ignore */
    }
  }

  if (!active) return null;

  const spines = shelf.books.filter((book) => book.id !== active.id);
  const progress = shelf.books.length <= 1 ? 0 : activeIndex / (shelf.books.length - 1);

  return (
    <section className="shelf-block" aria-labelledby={`shelf-${shelf.id}-label`}>
      <div className="shelf-row-label">
        <span id={`shelf-${shelf.id}-label`}>
          {shelf.label} — {shelf.code}
        </span>
        <span className="shelf-row-rule" aria-hidden />
        <span>
          {padIndex(shelf.books.length)} volumes · {shelf.meta}
        </span>
      </div>

      <div
        className="shelf-row"
        tabIndex={0}
        onKeyDown={onKeyDown}
        aria-label={`${shelf.label} shelf. Use arrow keys to move between volumes.`}
      >
        <div className="shelf-info">
          <p className="shelf-counter">
            <span>{padIndex(activeIndex + 1)}</span>
            <span className="shelf-counter-rule" aria-hidden />
            <span>{padIndex(shelf.books.length)}</span>
          </p>
          <div className="shelf-title-block">
            <h2 className="shelf-title">{active.title}</h2>
            {active.author ? <p className="shelf-author">{active.author}</p> : null}
          </div>
          <a
            className="shelf-inspect"
            href={`https://www.goodreads.com/search?q=${encodeURIComponent(
              `${active.title} ${active.author}`.trim()
            )}`}
            target="_blank"
            rel="noreferrer"
          >
            Inspect volume
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </a>
        </div>

        <div className="shelf-column">
          <div className="shelf-stage">
            <button
              type="button"
              className="shelf-nav-btn shelf-nav-btn--prev"
              aria-label="Previous volume"
              onClick={() => selectByOffset(-1)}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </button>

            <div
              className="shelf-rail"
              ref={railRef}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active.id}
                  className="shelf-cover"
                  aria-current="true"
                  initial={reduceMotion ? false : { opacity: 0, y: 14, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image
                    src={active.cover}
                    alt={`${active.title}${active.author ? ` by ${active.author}` : ""}`}
                    width={168}
                    height={252}
                    className="shelf-cover-image"
                    priority={shelf.id === "fall" && activeIndex === 0}
                  />
                </motion.div>
              </AnimatePresence>

              <div className="shelf-spines" role="list">
                {spines.map((book, index) => {
                  const size = SPINE_SIZES[index % SPINE_SIZES.length];
                  return (
                    <SpineButton
                      key={book.id}
                      book={book}
                      width={size.width}
                      height={size.height}
                      onSelect={() => {
                        if (dragRef.current?.moved) return;
                        setActiveId(book.id);
                      }}
                    />
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              className="shelf-nav-btn shelf-nav-btn--next"
              aria-label="Next volume"
              onClick={() => selectByOffset(1)}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </button>
          </div>

          <div className="shelf-wood" aria-hidden>
            <span />
            <span />
          </div>

          <div className="shelf-footer">
            <div className="shelf-scrubber" role="presentation">
              {shelf.books.map((book, index) => (
                <button
                  key={book.id}
                  type="button"
                  className={`shelf-tick${book.id === active.id ? " is-active" : ""}`}
                  style={{ left: `${(index / Math.max(shelf.books.length - 1, 1)) * 100}%` }}
                  aria-label={`Go to ${book.title}`}
                  aria-current={book.id === active.id ? "true" : undefined}
                  onClick={() => setActiveId(book.id)}
                />
              ))}
              <span className="shelf-scrubber-track" aria-hidden />
              <span
                className="shelf-scrubber-progress"
                style={{ width: `${progress * 100}%` }}
                aria-hidden
              />
            </div>
            <p className="shelf-hint">Drag · Scroll · Arrow keys</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SpineButton({
  book,
  width,
  height,
  onSelect
}: {
  book: ShelfBook;
  width: number;
  height: number;
  onSelect: () => void;
}) {
  const label = book.spineLabel ?? book.title;

  return (
    <button
      type="button"
      className="shelf-spine"
      role="listitem"
      data-book-id={book.id}
      style={{ width, height }}
      onClick={onSelect}
      aria-label={`Select ${book.title}${book.author ? ` by ${book.author}` : ""}`}
    >
      <Image src={book.cover} alt="" width={120} height={240} className="shelf-spine-image" />
      <span className="shelf-spine-veil" aria-hidden />
      <span className="shelf-spine-label">{label}</span>
    </button>
  );
}

export function DualShelf({ shelves, links }: DualShelfProps) {
  return (
    <div className="shelf-experience">
      <div className="shelf-intro">
        <p className="shelf-kicker">Feeding the Mind · Columbia Core</p>
        <h1 className="shelf-headline">Contemporary Civilization, two shelves.</h1>
      </div>

      {shelves.map((shelf) => (
        <ShelfRow
          key={shelf.id}
          shelf={shelf}
          defaultIndex={
            shelf.id === "spring"
              ? Math.max(
                  0,
                  shelf.books.findIndex((book) => book.id === "souls-of-black-folk")
                )
              : 0
          }
        />
      ))}

      <div className="shelf-links">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
          >
            {link.label} →
          </a>
        ))}
      </div>
    </div>
  );
}
