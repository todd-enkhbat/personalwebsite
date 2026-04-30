"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Book = {
  title: string;
  author: string;
  cover: string;
  href: string;
};

export default function ReadingPage() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/goodreads", { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => setBooks(Array.isArray(data.books) ? data.books : []))
      .catch(() => setBooks([]));
    return () => controller.abort();
  }, []);

  return (
    <main className="page-shell">
      <section className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="ui-mono text-[11px] uppercase tracking-[0.2em] text-[var(--ink-muted)]">Reading</p>
          <h1 className="mt-1 text-xl text-[var(--ink)]">Books and references</h1>
        </div>
        <a
          href="https://www.goodreads.com"
          target="_blank"
          rel="noreferrer"
          className="ui-sans border border-[var(--line)] px-3 py-2 text-xs uppercase tracking-[0.12em]"
        >
          Goodreads Profile
        </a>
      </section>
      <section className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-6">
        {books.length ? (
          books.map((book) => (
            <a key={`${book.title}-${book.author}`} href={book.href} target="_blank" rel="noreferrer" className="hard-card group p-2">
              <div className="relative aspect-[3/4] w-full overflow-hidden border border-[var(--line)]">
                <Image src={book.cover} alt={book.title} fill sizes="20vw" className="object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <p className="mt-2 text-xs leading-snug text-[var(--ink)]">{book.title}</p>
              <p className="ui-sans mt-1 text-[11px] text-[var(--ink-muted)]">{book.author}</p>
            </a>
          ))
        ) : (
          <div className="hard-card col-span-full p-4 text-sm text-[var(--ink-muted)]">Reading feed loading or temporarily unavailable.</div>
        )}
      </section>
    </main>
  );
}
