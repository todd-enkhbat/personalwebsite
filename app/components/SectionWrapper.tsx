"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type SectionWrapperProps = {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export function SectionWrapper({ id, title, subtitle, children }: SectionWrapperProps) {
  return (
    <section id={id} className="section-divider relative mx-auto w-full max-w-6xl px-5 py-14 md:px-8 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-8"
      >
        <p className="ui-sans text-xs uppercase tracking-[0.3em] text-[var(--ink-muted)]">Section</p>
        <h2 className="mt-3 text-3xl leading-tight text-[var(--ink)] md:text-5xl">{title}</h2>
        {subtitle ? <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--ink-muted)]">{subtitle}</p> : null}
      </motion.div>
      {children}
    </section>
  );
}
