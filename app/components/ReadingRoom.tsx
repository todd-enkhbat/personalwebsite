"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";
import type { ShelfBook } from "../data/content";

type ReadingRoomProps = {
  featured: ShelfBook[];
  archive: ShelfBook[];
  email: string;
  links: { label: string; href: string }[];
};

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
    <span className={`reading-volume-object${open ? " is-open" : ""}`} aria-hidden="true">
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
          <Image src={book.cover} alt="" fill sizes="(max-width: 700px) 42vw, 300px" priority={book.id === "dispossessed"} />
          <span className="reading-volume-sheen" />
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
    event.currentTarget.style.setProperty("--book-tilt-y", `${((event.clientX - rect.left) / rect.width - 0.5) * 28}deg`);
    event.currentTarget.style.setProperty("--book-tilt-x", `${((event.clientY - rect.top) / rect.height - 0.5) * -16}deg`);
  }
  function onPointerLeave(event: PointerEvent<HTMLButtonElement>) {
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
  const rotation = useRef({ x: -8, y: -24 });
  const drag = useRef<{ x: number; y: number; rx: number; ry: number } | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => setOpen(true), 650);
    return () => {
      window.clearTimeout(timer);
      dialog?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  function rotate(x: number, y: number) {
    rotation.current = { x: Math.max(-35, Math.min(35, x)), y };
    modelRef.current?.style.setProperty("--inspect-x", `${rotation.current.x}deg`);
    modelRef.current?.style.setProperty("--inspect-y", `${rotation.current.y}deg`);
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
    <dialog className="book-inspector" ref={dialogRef} aria-labelledby="book-inspector-title"
      onCancel={onClose} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="book-inspector-layout">
        <button className="book-inspector-close" type="button" onClick={onClose} aria-label="Return book to shelf">×</button>
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

export function ReadingRoom({ featured, archive, email, links }: ReadingRoomProps) {
  const [selectedId, setSelectedId] = useState(featured[0]?.id ?? "");
  const [inspected, setInspected] = useState<ShelfBook | null>(null);
  const [archiveId, setArchiveId] = useState<string | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [notesLoaded, setNotesLoaded] = useState(false);
  const railRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);

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

      <section className="reading-archive" aria-labelledby="reading-archive-title">
        <div className="reading-archive-heading">
          <div>
            <p className="kicker">The rest of the shelf</p>
            <h2 id="reading-archive-title">Pull out a volume.</h2>
          </div>
          <div className="reading-archive-controls">
            <span>{archive.length} books</span>
            <button type="button" aria-label="Scroll books left" onClick={() => railRef.current?.scrollBy({ left: -420, behavior: "smooth" })}>←</button>
            <button type="button" aria-label="Scroll books right" onClick={() => railRef.current?.scrollBy({ left: 420, behavior: "smooth" })}>→</button>
          </div>
        </div>

        <div className="reading-archive-case">
          <div className="reading-archive-rail" ref={railRef} role="group" aria-label="Other books. Scroll horizontally to see every volume.">
            {archive.map((book, index) => (
              <button
                type="button"
                key={book.id}
                className={`reading-archive-book${archiveId === book.id ? " is-active" : ""}`}
                style={{
                  "--archive-height": `${132 + (index * 19) % 37}px`,
                  "--archive-width": `${28 + (index * 7) % 10}px`,
                  "--archive-lean": `${((index * 5) % 7) - 3}deg`,
                  backgroundImage: `linear-gradient(90deg, rgba(0,0,0,.46), transparent 28%, rgba(255,255,255,.16) 58%, rgba(0,0,0,.48)), url("${book.cover}")`
                } as CSSProperties}
                aria-label={`Pick up ${book.title}${book.author ? ` by ${book.author}` : ""}`}
                aria-pressed={archiveId === book.id}
                onClick={() => setArchiveId(book.id)}
              >
                <span>{book.spineLabel ?? book.title}</span>
              </button>
            ))}
          </div>
          <div className="reading-archive-ledge" aria-hidden="true" />
        </div>

        {picked ? (
          <div className="reading-archive-picked" aria-live="polite">
            <Image src={picked.cover} alt="" width={74} height={106} />
            <div>
              <span>From the shelf</span>
              <h3>{picked.title}</h3>
              <p>{picked.author}</p>
              <a href={`https://www.goodreads.com/search?q=${encodeURIComponent(`${picked.title} ${picked.author}`.trim())}`} target="_blank" rel="noreferrer">Find this book ↗</a>
            </div>
          </div>
        ) : null}
      </section>

      <section className="reading-catalog" aria-labelledby="reading-catalog-title">
        <header className="reading-catalog-header">
          <p className="kicker">The reading list · {archive.length} books</p>
          <h2 id="reading-catalog-title">Ideas in conversation.</h2>
        </header>
        <div className="reading-catalog-layout">
          <nav className="reading-catalog-index" aria-label="Reading list topics">
            {readingThemes.map((theme, index) => (
              <a key={theme.id} href={`#reading-${theme.id}`}><span>0{index + 1}</span>{theme.title}</a>
            ))}
          </nav>
          <div className="reading-catalog-topics">
            {readingThemes.map((theme, index) => (
              <details className="reading-topic" id={`reading-${theme.id}`} key={theme.id} open>
                <summary><span className="reading-topic-number">0{index + 1}</span><h3>{theme.title}</h3><span className="reading-topic-toggle" aria-hidden="true" /></summary>
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
              </details>
            ))}
          </div>
        </div>
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
