"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

type Book = {
  title: string;
  author: string;
  cover: string;
  href: string;
};

export default function ReadingPage() {
  const [books, setBooks] = useState<Book[] | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/goodreads", { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => setBooks(Array.isArray(data.books) ? data.books : []))
      .catch(() => setBooks([]));
    return () => controller.abort();
  }, []);

  const loading = books === null;
  const empty = !loading && books.length === 0;

  return (
    <main className="page-shell">
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-5 flex flex-wrap items-end justify-between gap-3"
      >
        <div>
          <p className="ui-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent-strong)]">
            Reading feed · Goodreads
          </p>
          <h1 className="mt-2 text-3xl text-[var(--ink)]">Books & references</h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-[var(--ink-muted)]">
            Live pull from my Goodreads profile. Hover any cover to see the title and author.
          </p>
        </div>
        <a
          href="https://www.goodreads.com/user/show/189398350-tsogt-enkhbat"
          target="_blank"
          rel="noreferrer"
          className="magnetic sheen"
        >
          <span>Goodreads Profile</span>
          <span className="magnetic-arrow">→</span>
        </a>
      </motion.section>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
        {loading &&
          Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="hard-card animate-pulse p-2"
              style={{ background: "var(--surface-2)" }}
            >
              <div
                className="relative aspect-[3/4] w-full"
                style={{ background: "rgba(7,27,51,0.08)" }}
              />
            </div>
          ))}

        {empty && (
          <div className="hard-card col-span-full p-6 text-sm text-[var(--ink-muted)]">
            Reading feed is temporarily unavailable. Visit the Goodreads profile directly.
          </div>
        )}

        {!loading &&
          books.map((book, i) => (
            <motion.a
              key={`${book.title}-${book.author}-${i}`}
              href={book.href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.03 * i }}
              whileHover={{ y: -4 }}
              className="hard-card group relative p-2"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src={book.cover}
                  alt={book.title}
                  fill
                  sizes="(max-width: 640px) 45vw, 16vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 flex flex-col justify-end p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(7,27,51,0.1) 0%, rgba(7,27,51,0.9) 100%)"
                  }}
                >
                  <p className="text-xs leading-snug text-white">{book.title}</p>
                  <p className="ui-mono mt-1 text-[10px] uppercase tracking-[0.14em] text-[#eadfcd]">
                    {book.author}
                  </p>
                </div>
              </div>
            </motion.a>
          ))}
      </section>
    </main>
  );
}
