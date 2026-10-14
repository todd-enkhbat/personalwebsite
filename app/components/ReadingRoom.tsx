"use client";

import Image from "next/image";
import { AnimatePresence, motion, useIsPresent, useReducedMotion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";
import { bookDescriptions } from "../data/bookDescriptions";
import { readingPhotoRows } from "../data/readingPhotos";
import type { ShelfBook } from "../data/content";

type ReadingRoomProps = {
  featured: ShelfBook[];
  archive: ShelfBook[];
  email: string;
  links: { label: string; href: string }[];
};

// Finishes are rendering treatments; the original edition artwork stays intact.
function bookFinish(id: string) {
  if (["nomos-of-the-earth", "groundwork", "wealth-of-nations", "city-of-god"].includes(id)) return "cloth";
  if (["human-condition", "time-and-chance", "quran", "meditations"].includes(id)) return "satin";
  return "laminated";
}

const NOTES_KEY = "feeding-the-mind-notes-v1";

const readingThemes = [
  { id: "ethics", title: "Ethics & the examined life", books: ["republic", "nicomachean-ethics", "letter-to-menoeceus", "handbook", "meditations", "groundwork"] },
  { id: "faith", title: "Faith, reason & knowledge", books: ["city-of-god", "quran", "hayy-ibn-yaqzan", "rescuer-from-error", "muqaddimah", "discourse-on-method"] },
  { id: "state", title: "The state & the social order", books: ["politics", "prince", "leviathan", "second-treatise", "social-contract", "wealth-of-nations", "democracy-in-america"] },
  { id: "liberty", title: "Liberty, equality & emancipation", books: ["city-of-ladies", "vindication", "what-is-enlightenment", "on-liberty", "narrative-douglass", "souls-of-black-folk", "annihilation-of-caste", "letter-birmingham"] },
  { id: "modernity", title: "Power & the critique of modernity", books: ["discourse-on-inequality", "marx-engels-reader", "genealogy-of-morals", "civilization-and-its-discontents", "hind-swaraj", "second-sex", "wretched-of-the-earth", "discipline-and-punish"] }
];


function BookObject({ book, open = false }: { book: ShelfBook; open?: boolean }) {
  return (
    <span className={`reading-volume-object${open ? " is-open" : ""}`} data-finish={bookFinish(book.id)} aria-hidden="true">
      <span className="reading-volume-back"><span>{book.title}</span></span>
      <span className="reading-volume-spine"><span>{book.spineLabel ?? book.title}</span></span>
      <span className="reading-volume-pages" />
      <span className="reading-volume-top" />
      <span className="reading-volume-bottom" />
      <span className="reading-title-page">
        <span className="reading-page-label">From the reading shelf</span>
        <strong>{book.title}</strong>
        <em>{book.author}</em>
        <span className="reading-page-ornament">✦</span>
        <small>Tsogt Enkhbat</small>
      </span>
      <span className="reading-turning-page reading-turning-page--one" />
      <span className="reading-turning-page reading-turning-page--two" />
      <span className="reading-cover-hinge">
        <span className="reading-volume-front">
          <Image src={book.cover} alt="" fill sizes="(max-width: 700px) 42vw, 540px" quality={95} priority={book.id === "dispossessed"} />
          <span className="reading-volume-texture" />
          <span className="reading-volume-print-light" style={{ backgroundImage: `url("${book.cover}")` } as CSSProperties} />
          <span className="reading-volume-sheen" />
          <span className="reading-volume-binding" />
        </span>
        <span className="reading-cover-inside">
          <span>Ex libris</span><strong>T. E.</strong>
        </span>
      </span>
    </span>
  );
}

function BookVolume({ book, active, onSelect }: { book: ShelfBook; active: boolean; onSelect: (trigger: HTMLButtonElement) => void }) {
  function onPointerMove(event: PointerEvent<HTMLButtonElement>) {
    if (event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--light-position", `${25 + ((event.clientX - rect.left) / rect.width) * 65}%`);
    event.currentTarget.style.setProperty("--book-tilt-y", `${((event.clientX - rect.left) / rect.width - 0.5) * 28}deg`);
    event.currentTarget.style.setProperty("--book-tilt-x", `${((event.clientY - rect.top) / rect.height - 0.5) * -16}deg`);
  }
  function onPointerLeave(event: PointerEvent<HTMLButtonElement>) {
    event.currentTarget.style.removeProperty("--light-position");
    event.currentTarget.style.removeProperty("--book-tilt-y");
    event.currentTarget.style.removeProperty("--book-tilt-x");
  }
  return (
    <button type="button" className={`reading-volume reading-volume--${book.id}${active ? " is-active" : ""}`}
      aria-label={`Open ${book.title} by ${book.author}`} aria-haspopup="dialog"
      onClick={(event) => onSelect(event.currentTarget)} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
      <span className="reading-volume-shadow" aria-hidden="true" />
      <BookObject book={book} />
    </button>
  );
}

function BookInspector({ book, note, onNote, email, onClose }: {
  book: ShelfBook; note: string; onNote: (value: string) => void; email: string; onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);
  const rotation = useRef({ x: -8, y: 24 });
  const drag = useRef<{ x: number; y: number; rx: number; ry: number } | null>(null);
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const reduceMotion = useReducedMotion();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function returnBook() {
    if (closing) return;
    setOpen(false);
    rotate(-8, 24);
    setClosing(true);
    closeTimer.current = setTimeout(onClose, reduceMotion ? 0 : 740);
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => { if (!closeTimer.current) setOpen(true); }, 650);
    return () => {
      window.clearTimeout(timer);
      if (closeTimer.current) clearTimeout(closeTimer.current);
      dialog?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  function rotate(x: number, y: number) {
    rotation.current = { x: Math.max(-35, Math.min(35, x)), y };
    modelRef.current?.style.setProperty("--inspect-x", `${rotation.current.x}deg`);
    modelRef.current?.style.setProperty("--inspect-y", `${rotation.current.y}deg`);
    modelRef.current?.style.setProperty("--light-position", `${Math.max(10, Math.min(90, 50 + y * .55))}%`);
  }
  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.button !== 0) return;
    drag.current = { x: event.clientX, y: event.clientY, rx: rotation.current.x, ry: rotation.current.y };
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.dataset.dragging = "true";
  }
  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!drag.current) return;
    rotate(drag.current.rx - (event.clientY - drag.current.y) * 0.25, drag.current.ry + (event.clientX - drag.current.x) * 0.6);
  }
  function onPointerUp(event: PointerEvent<HTMLDivElement>) {
    drag.current = null;
    delete event.currentTarget.dataset.dragging;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }
  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;
    event.preventDefault();
    rotate(rotation.current.x + (event.key === "ArrowUp" ? -10 : event.key === "ArrowDown" ? 10 : 0),
      rotation.current.y + (event.key === "ArrowLeft" ? -25 : event.key === "ArrowRight" ? 25 : 0));
  }
  const body = `Hi Todd,\n\nI'd like to discuss ${book.title} by ${book.author}.` + (note.trim() ? `\n\n${note.trim()}` : "");
  const discussHref = `mailto:${email}?subject=${encodeURIComponent(`Discuss ${book.title}`)}&body=${encodeURIComponent(body)}`;

  return (
    <dialog className={`book-inspector${closing ? " is-returning" : ""}`} ref={dialogRef} aria-labelledby="book-inspector-title"
      onCancel={(event) => { event.preventDefault(); returnBook(); }} onClick={(event) => { if (event.target === event.currentTarget) returnBook(); }}>
      <div className="book-inspector-layout">
        <button className="book-inspector-close" type="button" onClick={returnBook} disabled={closing} aria-label="Return book to shelf">×</button>
        <div className="book-inspector-display">
          <p className="book-inspector-eyebrow">On the reading table</p>
          <div className="book-inspector-stage" role="group" tabIndex={0}
            aria-label="3D book. Drag to rotate, or use the arrow keys."
            onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp} onKeyDown={onKeyDown}>
            <div className={`book-inspector-model reading-volume--${book.id}${open ? " is-open" : ""}`} ref={modelRef}>
              <BookObject book={book} open={open} />
            </div>
            <span className="book-inspector-shadow" aria-hidden="true" />
          </div>
          <p className="book-inspector-hint">Drag to turn the book</p>
          <div className="book-inspector-controls">
            <button type="button" aria-label="Rotate book left" onClick={() => rotate(rotation.current.x, rotation.current.y - 35)}>←</button>
            <button type="button" className="book-cover-toggle" aria-pressed={open} onClick={() => setOpen((value) => !value)}>{open ? "Close the cover" : "Open the cover"}</button>
            <button type="button" aria-label="Rotate book right" onClick={() => rotate(rotation.current.x, rotation.current.y + 35)}>→</button>
          </div>
        </div>
        <div className="book-inspector-copy">
          <span className="kicker">Currently reading</span>
          <h2 id="book-inspector-title">{book.title}</h2>
          <p className="book-inspector-author">{book.author}</p>
          <div className="reading-conversation-form">
            <label htmlFor="reading-note">A thought to discuss</label>
            <textarea id="reading-note" value={note} rows={4} placeholder="Write a thought or question…" onChange={(event) => onNote(event.target.value)} />
            <a className="reading-discuss" href={discussHref}>Discuss this book <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </div>
    </dialog>
  );
}

function LibraryBookDetail({ book, index, total, trigger, onClose, onBrowse }: {
  book: ShelfBook; index: number; total: number; trigger: HTMLButtonElement | null;
  onClose: () => void; onBrowse: (offset: number) => void;
}) {
  const reduceMotion = useReducedMotion();
  const isPresent = useIsPresent();
  const coverRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [origin, setOrigin] = useState<{ x: number; y: number; scale: number; rotateY: number } | null>(null);
  const duration = reduceMotion ? 0 : 0.72;

  useLayoutEffect(() => {
    function measureOrigin() {
      const destination = coverRef.current?.getBoundingClientRect();
      const source = trigger?.getBoundingClientRect();
      if (destination && source) {
        setOrigin({
          x: source.left + source.width / 2 - destination.left - destination.width / 2,
          y: source.top + source.height / 2 - destination.top - destination.height / 2,
          scale: source.height / destination.height,
          rotateY: 66
        });
      } else {
        setOrigin({ x: 0, y: 24, scale: 0.9, rotateY: 66 });
      }
    }
    measureOrigin();
    window.addEventListener("resize", measureOrigin);
    closeRef.current?.focus({ preventScroll: true });
    return () => window.removeEventListener("resize", measureOrigin);
  }, [trigger]);

  return (
    <motion.div className="library-detail" id="library-book-detail" role="dialog" aria-modal="false" data-present={isPresent} inert={!isPresent}
      aria-labelledby="library-detail-title" aria-describedby="library-detail-description"
      onKeyDown={(event) => {
        if (event.key === "Escape") { event.preventDefault(); onClose(); }
        else if (event.key === "ArrowLeft") { event.preventDefault(); onBrowse(-1); }
        else if (event.key === "ArrowRight") { event.preventDefault(); onBrowse(1); }
      }}>
      <motion.div className="library-detail-backdrop" aria-hidden="true"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration }} />
      <motion.div className="library-detail-toolbar"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.25 }}>
        <button type="button" ref={closeRef} className="library-detail-close" onClick={onClose}>
          <span aria-hidden="true">←</span> Return to shelf
        </button>
        <div className="library-detail-navigation">
          <span>{String(index + 1).padStart(2, "0")} / {total}</span>
          <button type="button" aria-label="Previous book" onClick={() => onBrowse(-1)}>←</button>
          <button type="button" aria-label="Next book" onClick={() => onBrowse(1)}>→</button>
        </div>
      </motion.div>
      <div className="library-detail-body">
        <div className="library-detail-stage">
          <div className="library-detail-cover" ref={coverRef}>
            {origin ? <motion.div className="library-detail-flight"
              initial={reduceMotion ? false : origin}
              animate={{ x: 0, y: 0, scale: 1, rotateY: 0, opacity: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { ...origin, opacity: [1, 1, 0] }}
              transition={{ duration, ease: [0.22, 1, 0.36, 1] }}>
              <BookObject book={book} />
            </motion.div> : null}
          </div>
          <motion.span className="library-detail-shadow" aria-hidden="true"
            initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            transition={{ duration }} />
        </div>
        <motion.div className="library-detail-copy"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
          transition={{ duration: reduceMotion ? 0 : 0.4, delay: reduceMotion ? 0 : 0.12 }}>
          <h3 id="library-detail-title">{book.title}</h3>
          {book.author ? <p className="library-detail-author">{book.author}</p> : null}
          <span className="library-detail-rule" aria-hidden="true" />
          <p className="library-detail-description" id="library-detail-description">{bookDescriptions[book.id]}</p>
          <a className="library-detail-link" href={`https://www.goodreads.com/search?q=${encodeURIComponent(`${book.title} ${book.author}`.trim())}`} target="_blank" rel="noreferrer">
            Find this book <span aria-hidden="true">↗</span>
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function ReadingRoom({ featured, archive, email, links }: ReadingRoomProps) {
  const reduceMotion = useReducedMotion();
  const [selectedId, setSelectedId] = useState(featured[0]?.id ?? "");
  const [inspected, setInspected] = useState<ShelfBook | null>(null);
  const [archiveId, setArchiveId] = useState<string | null>(null);
  const [hiddenArchiveIds, setHiddenArchiveIds] = useState<string[]>([]);
  const [activeThemeId, setActiveThemeId] = useState(readingThemes[0].id);
  const [photosPaused, setPhotosPaused] = useState(false);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [notesLoaded, setNotesLoaded] = useState(false);
  const railRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const archiveOpenerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    function selectHashTopic() {
      const theme = readingThemes.find((entry) => window.location.hash === `#reading-${entry.id}`);
      if (theme) setActiveThemeId(theme.id);
    }
    selectHashTopic();
    window.addEventListener("hashchange", selectHashTopic);
    return () => window.removeEventListener("hashchange", selectHashTopic);
  }, []);

  function selectTheme(id: string) {
    setActiveThemeId(id);
    window.history.replaceState(window.history.state, "", `#reading-${id}`);
  }

  function onTopicKeyDown(event: KeyboardEvent<HTMLElement>) {
    const index = readingThemes.findIndex((theme) => theme.id === activeThemeId);
    let next = index;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (index + 1) % readingThemes.length;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (index - 1 + readingThemes.length) % readingThemes.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = readingThemes.length - 1;
    else return;
    event.preventDefault();
    selectTheme(readingThemes[next].id);
    event.currentTarget.querySelectorAll<HTMLButtonElement>("[role=tab]")[next]?.focus();
  }

  useEffect(() => {
    // Focus only after React has removed inert and revealed the returned spine.
    if (!archiveId && hiddenArchiveIds.length === 0) archiveOpenerRef.current?.focus({ preventScroll: true });
  }, [archiveId, hiddenArchiveIds.length]);

  function browseArchive(offset: number) {
    if (!archiveId || !archive.length) return;
    const index = archive.findIndex((book) => book.id === archiveId);
    const next = archive[(index + offset + archive.length) % archive.length];
    if (!next) return;
    const trigger = railRef.current?.querySelector<HTMLButtonElement>(`[data-archive-id="${next.id}"]`);
    if (trigger && railRef.current) {
      const rail = railRef.current;
      // Browsing moves only the shelf rail and preserves the reading view position.
      const left = trigger.offsetLeft - rail.offsetLeft;
      if (left < rail.scrollLeft) rail.scrollLeft = left;
      else if (left + trigger.offsetWidth > rail.scrollLeft + rail.clientWidth) {
        rail.scrollLeft = left + trigger.offsetWidth - rail.clientWidth;
      }
      archiveOpenerRef.current = trigger;
    }
    setHiddenArchiveIds((ids) => [...new Set([...ids, next.id])]);
    setArchiveId(next.id);
  }

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(NOTES_KEY);
      if (saved) setNotes(JSON.parse(saved) as Record<string, string>);
    } catch {
      // Private browsing may block storage; the field remains editable.
    }
    setNotesLoaded(true);
  }, []);

  useEffect(() => {
    if (!notesLoaded) return;
    try {
      window.localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
    } catch {
      // The current edit still works when storage is unavailable.
    }
  }, [notes, notesLoaded]);

  const selected = featured.find((book) => book.id === selectedId) ?? featured[0];
  const picked = archive.find((book) => book.id === archiveId);
  if (!selected) return null;

  return (
    <main className="reading-room">
      <header className="reading-intro">
        <div>
          <p className="kicker">Feeding the mind</p>
          <h1>Currently<br />reading.</h1>
        </div>
        <div className="reading-commentary">
          <p>I&apos;m currently focusing on the Political Philosophy of the upcoming Space Civilization and the Philosophy of Science in relation to the nature of Time. Existential thought and Meaning-making projects are deeply moving to me, and this makes the world feel extremely malleable.</p>
          <p className="reading-commentary-closing">Let&apos;s force our Virtu on the tyranny of Fortune.</p>
        </div>
      </header>

      <section className="reading-feature" aria-labelledby="reading-current-title">
        <div className="reading-feature-heading">
          <h2 id="reading-current-title">On the shelf</h2>
          <span><span className="reading-hint-desktop">Pick up a book to open it</span><span className="reading-hint-mobile">Tap to open</span> ↗</span>
        </div>

        <div className="reading-feature-stage">
          <div className="reading-feature-books">
            {featured.map((book, index) => (
              <div className="reading-feature-slot" key={book.id}>
                <span className="reading-feature-number">0{index + 1}</span>
                <BookVolume
                  book={book}
                  active={book.id === selected.id}
                  onSelect={(trigger) => { openerRef.current = trigger; setSelectedId(book.id); setInspected(book); }}
                />
                <div className="reading-feature-caption">
                  <strong>{book.title}</strong>
                  <span>{book.author}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="reading-feature-ledge" aria-hidden="true" />
        </div>


      </section>

      <section className="reading-archive reading-library" aria-labelledby="reading-archive-title">
        <div className="reading-library-shelf" inert={hiddenArchiveIds.length > 0}>
          <div className="reading-archive-heading">
            <div>
              <p className="kicker">The rest of the shelf</p>
              <h2 id="reading-archive-title">Pull out a volume.</h2>
            </div>
            <div className="reading-archive-controls">
              <span>{archive.length} books</span>
              <button type="button" aria-label="Scroll books left" onClick={() => railRef.current?.scrollBy({ left: -420, behavior: reduceMotion ? "auto" : "smooth" })}>←</button>
              <button type="button" aria-label="Scroll books right" onClick={() => railRef.current?.scrollBy({ left: 420, behavior: reduceMotion ? "auto" : "smooth" })}>→</button>
            </div>
          </div>

          <div className="reading-archive-case">
            <div className="reading-archive-rail" ref={railRef} role="group" aria-label="Other books. Scroll horizontally to see every volume.">
              {archive.map((book, index) => (
                <button
                  type="button"
                  key={book.id}
                  className={`reading-archive-book${hiddenArchiveIds.includes(book.id) ? " is-away" : ""}`}
                  data-archive-id={book.id}
                  style={{
                    "--archive-height": `${132 + (index * 19) % 37}px`,
                    "--archive-width": `${28 + (index * 7) % 10}px`,
                    "--archive-lean": `${((index * 5) % 7) - 3}deg`,
                    backgroundImage: `linear-gradient(90deg, rgba(0,0,0,.46), transparent 28%, rgba(255,255,255,.16) 58%, rgba(0,0,0,.48)), url("${book.cover}")`
                  } as CSSProperties}
                  aria-label={`Pick up ${book.title}${book.author ? ` by ${book.author}` : ""}`}
                  aria-haspopup="dialog"
                  aria-expanded={archiveId === book.id}
                  aria-controls={archiveId === book.id ? "library-book-detail" : undefined}
                  onClick={(event) => {
                    archiveOpenerRef.current = event.currentTarget;
                    event.currentTarget.closest(".reading-library")?.scrollIntoView({
                      block: "nearest", behavior: "instant"
                    });
                    setHiddenArchiveIds([book.id]);
                    setArchiveId(book.id);
                  }}
                >
                  <span>{book.spineLabel ?? book.title}</span>
                </button>
              ))}
            </div>
            <div className="reading-archive-ledge" aria-hidden="true" />
          </div>
        </div>
        <AnimatePresence mode="wait" onExitComplete={() => {
          setHiddenArchiveIds(picked ? [picked.id] : []);
        }}>
          {picked ? <LibraryBookDetail key={picked.id} book={picked}
            index={archive.findIndex((book) => book.id === picked.id)} total={archive.length}
            trigger={archiveOpenerRef.current} onClose={() => setArchiveId(null)} onBrowse={browseArchive} /> : null}
        </AnimatePresence>
      </section>

      <section className="reading-catalog" aria-labelledby="reading-catalog-title">
        <header className="reading-catalog-header">
          <p className="kicker">The reading list · {archive.length} books</p>
          <h2 id="reading-catalog-title">Ideas in conversation.</h2>
        </header>
        <div className="reading-catalog-layout">
          <nav className="reading-catalog-index" role="tablist" aria-orientation="vertical"
            aria-label="Reading list topics" onKeyDown={onTopicKeyDown}>
            {readingThemes.map((theme, index) => (
              <button key={theme.id} type="button" role="tab" id={`reading-tab-${theme.id}`}
                aria-controls={`reading-${theme.id}`} aria-selected={activeThemeId === theme.id}
                tabIndex={activeThemeId === theme.id ? 0 : -1} onClick={() => selectTheme(theme.id)}>
                <span>0{index + 1}</span>{theme.title}
              </button>
            ))}
          </nav>
          <div className="reading-catalog-topics">
            {readingThemes.map((theme, index) => (
              <section className="reading-topic" id={`reading-${theme.id}`} key={theme.id} role="tabpanel"
                aria-labelledby={`reading-tab-${theme.id}`} hidden={activeThemeId !== theme.id} tabIndex={0}>
                <header className="reading-topic-heading"><span className="reading-topic-number">0{index + 1}</span><h3>{theme.title}</h3></header>
                <ul>
                  {theme.books.map((id) => {
                    const book = archive.find((entry) => entry.id === id);
                    if (!book) return null;
                    return <li key={id}>
                      <a href={`https://www.goodreads.com/search?q=${encodeURIComponent(`${book.title} ${book.author}`.trim())}`} target="_blank" rel="noreferrer">
                        <span>{book.author ? <><span className="reading-list-author">{book.author}</span>, </> : null}<em>{book.title}</em></span>
                        <span className="reading-list-arrow" aria-hidden="true">↗</span>
                      </a>
                    </li>;
                  })}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="reading-collage calendar-gallery" data-paused={photosPaused}
        aria-label="Reading rooms, books, and places of thought">
        <div className="reading-collage-toolbar">
          <button className="reading-collage-motion-control" type="button" aria-pressed={photosPaused}
            onClick={() => setPhotosPaused((paused) => !paused)}>{photosPaused ? "Resume photos" : "Pause photos"}</button>
        </div>
        {readingPhotoRows.map((row, rowIndex) => (
          <div key={rowIndex} className="reading-photo-row calendar-gallery__row" role="group" tabIndex={0}
            aria-label={`Photo row ${rowIndex + 1} of 3. Photos pause while focused.`}>
            <div className="reading-photo-track" style={{
              "--photo-duration": `${row.reduce((width, photo) => width + (photo.wide ? 280 : 160) + 12, 0) / 5}s`,
              "--photo-direction": rowIndex === 1 ? "reverse" : "normal"
            } as CSSProperties}>
              {[0, 1].map((copy) => (
                <div key={copy} className="reading-photo-set" aria-hidden={copy === 1 ? true : undefined}>
                  {row.map((photo) => (
                    <figure key={photo.src} className={`calendar-gallery__frame${photo.wide ? " calendar-gallery__frame--wide" : ""}`}>
                      <Image src={photo.src} alt={copy === 1 ? "" : photo.alt} width={photo.width} height={photo.height}
                        sizes={photo.wide ? "280px" : "160px"} className="calendar-gallery__image" />
                    </figure>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {inspected ? (
        <BookInspector book={inspected} note={notes[inspected.id] ?? ""} email={email}
          onNote={(value) => setNotes((current) => ({ ...current, [inspected.id]: value }))}
          onClose={() => { setInspected(null); requestAnimationFrame(() => openerRef.current?.focus()); }} />
      ) : null}
      <footer className="reading-links">
        {links.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noreferrer">{link.label} ↗</a>)}
      </footer>
    </main>
  );
}
