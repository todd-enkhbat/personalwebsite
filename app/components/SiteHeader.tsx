"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, person } from "../data/content";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="brand-lockup">
          <span className="brand-name">{person.name}</span>
          <span className="brand-meta">
            {person.location} — {person.tagline}
          </span>
        </Link>
        <nav className="site-nav" aria-label="Primary">
          {nav.map((item) => {
            const current =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={current ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
