"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { PointerEvent, ReactNode, useRef } from "react";

type Props = {
  href: string;
  external?: boolean;
  variant?: "solid" | "ghost";
  children: ReactNode;
};

export function MagneticButton({ href, external, variant = "solid", children }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 15, mass: 0.4 });

  const onMove = (e: PointerEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = e.clientX - (rect.left + rect.width / 2);
    const py = e.clientY - (rect.top + rect.height / 2);
    x.set(px * 0.25);
    y.set(py * 0.35);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const className = `magnetic sheen ${variant === "ghost" ? "ghost" : ""}`;
  const inner = (
    <>
      <span>{children}</span>
      <span className="magnetic-arrow">→</span>
    </>
  );

  if (external) {
    return (
      <motion.a
        ref={ref}
        href={href}
        target="_blank"
        rel="noreferrer"
        style={{ x: sx, y: sy }}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className={className}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <Link href={href} legacyBehavior passHref>
      <motion.a
        ref={ref}
        style={{ x: sx, y: sy }}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className={className}
      >
        {inner}
      </motion.a>
    </Link>
  );
}
