"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  { href: "/", label: "Base" },
  { href: "/work", label: "What I'm Up To" },
  { href: "/writing", label: "Writing" },
  { href: "/about", label: "About" }
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-4 z-30 rounded-full border border-white/70 bg-white/80 px-6 py-4 shadow-card backdrop-blur">
      <div className="flex flex-wrap items-center gap-4 text-xs font-semibold uppercase tracking-[0.25em]">
        <Link href="/" className="text-lg tracking-[0.5em] text-ink">
          Todd Enkhbat
        </Link>

        <nav className="flex flex-1 flex-wrap items-center justify-center gap-4 text-ink/70">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "transition-colors",
                pathname === link.href ? "text-ink" : "hover:text-ink"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <a
          href="mailto:tsogt.e@columbia.com"
          className="ml-auto rounded-full bg-gradient-to-r from-accent to-blue-500 px-5 py-2 text-white shadow"
        >
          Book now
        </a>
      </div>
    </header>
  );
}

