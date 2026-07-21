"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/projects", label: "Recent Projects" },
  { href: "/about", label: "About" },
  { href: "/public", label: "Public" },
  { href: "/writing", label: "Writing" },
  { href: "/reading", label: "Reading" },
  { href: "/philosophy", label: "Philosophy" }
];

export function NavLinks() {
  const pathname = usePathname();
  return (
    <nav className="site-nav" aria-label="Primary">
      {LINKS.map((link) => {
        const active = pathname === link.href;
        return (
          <Link key={link.href} href={link.href} className="nav-link">
            {active ? (
              <motion.span
                layoutId="nav-active"
                className="nav-active"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            ) : null}
            <span className="nav-label">{link.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
