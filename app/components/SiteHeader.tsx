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

function stampFromPath(pathname: string): string {
  const match = nav.find((item) =>
    item.href === "/"
      ? pathname === "/"
      : pathname === item.href || pathname.startsWith(`${item.href}/`)
  );
  return (match?.label ?? "Main").toLowerCase();
}

export function SiteHeader({
  showLogo = true,
  variant = "letter",
  meta,
  stamp
}: SiteHeaderProps) {
  const pathname = usePathname();
  const metaLine = meta ?? `${person.emails.academic} | New York, NY`;
  const stampLabel = stamp ?? stampFromPath(pathname);

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
                width={84}
                height={92}
                priority
                unoptimized
              />
            </div>
          ) : (
            <span className="letterhead-crest letterhead-crest--empty" aria-hidden />
          )}
          <p className="letterhead-stamp">{stampLabel}</p>
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
