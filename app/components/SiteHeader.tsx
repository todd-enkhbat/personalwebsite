"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, person } from "../data/content";

type SiteHeaderProps = {
  showLogo?: boolean;
  variant?: "letter" | "compact";
  meta?: string;
  stamp?: string;
};

export function SiteHeader({
  showLogo = true,
  variant = "letter",
  meta,
  stamp
}: SiteHeaderProps) {
  const pathname = usePathname();
  const metaLine = meta ?? `${person.emails.academic} | New York, NY`;

  return (
    <>
      {variant === "letter" ? (
        <div className="letterhead">
          <div className="letterhead-text">
            <Link href="/" className="brand-name">
              {person.name}
            </Link>
            <span className="brand-meta">{metaLine}</span>
          </div>
          {showLogo ? (
            <div className="letterhead-crest" aria-hidden>
              <Image
                src="/paper-assets/crest-archer.png"
                alt=""
                width={105}
                height={115}
                priority
                unoptimized
              />
            </div>
          ) : null}
          {stamp ? <p className="letterhead-stamp">{stamp}</p> : <span className="letterhead-spacer" />}
        </div>
      ) : null}

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
              className={current ? "is-active" : undefined}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
