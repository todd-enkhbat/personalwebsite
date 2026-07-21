"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { PointerEvent, useRef } from "react";
import { Project } from "../data/content";

type ProjectCardProps = {
  project: Project;
  onOpen: (project: Project) => void;
  index?: number;
};

const springConfig = { stiffness: 220, damping: 22, mass: 0.6 };

export function ProjectCard({ project, onOpen, index = 0 }: ProjectCardProps) {
  const ref = useRef<HTMLButtonElement>(null);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, springConfig);
  const sry = useSpring(ry, springConfig);
  const rotateX = useTransform(srx, (v) => `${v}deg`);
  const rotateY = useTransform(sry, (v) => `${v}deg`);

  const handleMove = (e: PointerEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * 8);
    rx.set(-(py - 0.5) * 8);
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  };

  const handleLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.button
      ref={ref}
      type="button"
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      onClick={() => {
        if (project.href) {
          window.open(project.href, "_blank", "noopener,noreferrer");
          return;
        }
        onOpen(project);
      }}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: 0.05 * index, ease: [0.22, 1, 0.36, 1] }}
      whileTap={{ scale: 0.985 }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 900
      }}
      className="tilt-card group relative h-full w-full bg-[var(--surface)] p-5 text-left"
    >
      <span className="tilt-glow" />
      <motion.div
        layoutId={`project-shell-${project.id}`}
        className="relative z-10 tilt-inner"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 90vw, 30vw"
            className="tilt-media object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(7,27,51,0) 55%, rgba(7,27,51,0.5) 100%)"
            }}
          />
          <div className="absolute left-3 top-3 flex items-center gap-2">
            <span
              className="ui-mono px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-white"
              style={{ background: "rgba(7,27,51,0.55)", backdropFilter: "blur(4px)" }}
            >
              {project.year}
            </span>
          </div>
          <div className="absolute bottom-3 right-3">
            <span
              className="ui-mono inline-flex items-center gap-1 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-white"
              style={{ background: "rgba(232,107,56,0.85)" }}
            >
              {project.href ? "Visit" : "Open"} →
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="ui-sans text-[10px] uppercase tracking-[0.22em] text-[var(--ink-muted)]">
            Project · {String(index + 1).padStart(2, "0")}
          </p>
          <p className="ui-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-muted)]">
            {project.stack[0]}
          </p>
        </div>

        <motion.h3
          layoutId={`project-title-${project.id}`}
          className="mt-3 text-lg leading-snug text-[var(--ink)]"
        >
          {project.title}
        </motion.h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--ink-muted)]">
          {project.shortDescription}
        </p>

        <div className="mt-4 flex flex-wrap gap-1">
          {project.stack.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="ui-sans px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-[var(--ink-muted)]"
              style={{ background: "var(--surface-2)" }}
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.button>
  );
}
