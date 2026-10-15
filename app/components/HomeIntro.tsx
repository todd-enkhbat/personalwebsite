"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { readingPhotoRows } from "../data/readingPhotos";

const sessionKey = "todd-home-intro-v1";
const ease = [0.76, 0, 0.24, 1] as const;

export function HomeIntro({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<"checking" | "playing" | "revealing" | "done">("checking");
  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem(sessionKey) === "seen"; } catch { /* Storage is optional. */ }
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("done");
      return;
    }
    try { sessionStorage.setItem(sessionKey, "seen"); } catch { /* Continue without persistence. */ }
    setPhase("playing");
    const timer = window.setTimeout(() => setPhase("revealing"), 2600);
    return () => window.clearTimeout(timer);
  }, []);
  const active = phase === "playing" || phase === "revealing";
  useEffect(() => {
    if (!active) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") setPhase("revealing"); };
    window.addEventListener("keydown", escape);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", escape);
    };
  }, [active]);
  return <>
    <motion.div inert={active || undefined} initial={false}
      animate={{ scale: active && phase !== "revealing" ? 0.96 : 1 }} transition={{ duration: 1.05, ease }}>
      {children}
    </motion.div>
    {active && <motion.div className="home-intro" role="dialog" aria-modal="true" aria-label="Photo introduction"
      initial={{ clipPath: "inset(0% 0% 0% 0% round 0px)" }}
      animate={{ clipPath: phase === "revealing" ? "inset(50% 50% 50% 50% round 12px)" : "inset(0% 0% 0% 0% round 0px)" }}
      transition={{ duration: 1.05, ease }} onAnimationComplete={() => { if (phase === "revealing") setPhase("done"); }}>
      <motion.div className="home-intro__photos" initial={{ scale: 1.1 }} animate={{ scale: phase === "revealing" ? 1.18 : 1 }} transition={{ duration: phase === "revealing" ? 1.05 : 2.6, ease }} aria-hidden="true">
        {readingPhotoRows.map((row, index) => <motion.div key={index} className="home-intro__row"
          initial={{ x: index === 1 ? -60 : 60, opacity: 0.65 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1.5, delay: index * 0.12, ease }}>
          {row.slice(0, 6).map(photo => <img key={photo.src} src={photo.src} alt="" width={photo.width} height={photo.height} loading="eager" decoding="async" />)}
        </motion.div>)}
      </motion.div>
      <div className="home-intro__shade" />
      <motion.div className="home-intro__title" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.35 }}>
        <p>“The new therefore always appears<br /><em>in the guise of a miracle.”</em></p>
        <span className="home-intro__attribution">Hannah Arendt · The Human Condition (1958), p. 178</span>
      </motion.div>
    </motion.div>}
  </>;
}
