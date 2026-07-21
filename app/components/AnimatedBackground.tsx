"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export function AnimatedBackground() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -140]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base wash — matches beige surface with slight warmth toward top */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #f7f2ea 0%, #f5f0e8 40%, #efe9dd 100%)"
        }}
      />

      {/* Soft moving colour fields — barely perceptible */}
      <motion.div
        style={{ y: y1 }}
        className="absolute -top-[15%] right-[-10%] h-[65vh] w-[65vh]"
      >
        <div
          className="h-full w-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(232,107,56,0.10), transparent 70%)",
            filter: "blur(30px)"
          }}
        />
      </motion.div>
      <motion.div
        style={{ y: y2 }}
        className="absolute top-[45%] left-[-18%] h-[60vh] w-[60vh]"
      >
        <div
          className="h-full w-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(23,50,79,0.10), transparent 70%)",
            filter: "blur(40px)"
          }}
        />
      </motion.div>
      <motion.div
        style={{ y: y3 }}
        className="absolute bottom-[-15%] right-[20%] h-[50vh] w-[50vh]"
      >
        <div
          className="h-full w-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(191,127,61,0.08), transparent 70%)",
            filter: "blur(50px)"
          }}
        />
      </motion.div>

      {/* Fine grid — masked to fade at edges */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(7,27,51,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(7,27,51,0.06) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse 85% 65% at 50% 30%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 85% 65% at 50% 30%, black 40%, transparent 100%)"
        }}
      />

      {/* Grain */}
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>\")",
          backgroundSize: "220px 220px"
        }}
      />
    </div>
  );
}
