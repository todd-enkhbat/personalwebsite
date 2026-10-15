"use client";

import { useEffect, useRef } from "react";

type Star = { x: number; y: number; z: number; brightness: number };
type DistantStar = { x: number; y: number; radius: number; brightness: number; phase: number };

export function ContactStarfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0, height = 0, focal = 1;
    let frame = 0, previous = 0, lastPaint = 0;
    let time = 0;
    let stars: Star[] = [];
    let distantStars: DistantStar[] = [];

    const reset = (star: Star, initial = false) => {
      star.z = initial ? .12 + Math.random() * .88 : .75 + Math.random() * .25;
      // Seed inside the visible frustum at every depth, rather than losing most stars offscreen.
      star.x = (Math.random() - .5) * width / focal * star.z;
      star.y = (Math.random() - .55) * height / focal * star.z;
      star.brightness = .55 + Math.random() * .45;
    };

    const paint = (elapsed = 0) => {
      context.clearRect(0, 0, width, height);
      time += elapsed;
      for (const star of distantStars) {
        const shimmer = .9 + Math.sin(time * .65 + star.phase) * .1;
        context.fillStyle = `rgba(224, 233, 244, ${star.brightness * shimmer})`;
        context.beginPath(); context.arc(star.x * width, star.y * height, star.radius, 0, Math.PI * 2); context.fill();
      }
      const cx = width * .5, cy = height * .55;
      for (const star of stars) {
        const oldZ = star.z;
        star.z -= elapsed * .07;
        if (star.z < .07) { reset(star); continue; }
        const x = cx + star.x * focal / star.z;
        const y = cy + star.y * focal / star.z;
        if (x < -12 || x > width + 12 || y < -12 || y > height + 12) {
          reset(star); continue;
        }
        const depth = 1 - star.z;
        const fade = Math.min(1, .35 + (1 - star.z) * 5) * Math.min(1, (star.z - .07) * 8);
        const alpha = (.5 + depth * .5) * star.brightness * fade;
        const radius = .6 + depth * 1.3;

        // Short perspective trails suggest forward travel, without covering the links.
        if (elapsed > 0) {
          const px = cx + star.x * focal / oldZ;
          const py = cy + star.y * focal / oldZ;
          const dx = x - px, dy = y - py;
          const length = Math.hypot(dx, dy);
          const scale = Math.min(1, 10 / Math.max(length, .001));
          context.strokeStyle = `rgba(228, 235, 241, ${alpha * .45})`;
          context.lineWidth = Math.max(.45, radius * .7);
          context.beginPath(); context.moveTo(x - dx * scale, y - dy * scale); context.lineTo(x, y); context.stroke();
        }
        context.fillStyle = `rgba(241, 244, 248, ${alpha})`;
        context.beginPath(); context.arc(x, y, radius, 0, Math.PI * 2); context.fill();
      }
    };

    const resize = () => {
      width = window.innerWidth; height = window.innerHeight;
      focal = Math.min(width, height) * .8;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      distantStars = Array.from({ length: width < 600 ? 300 : 700 }, () => ({
        x: Math.random(), y: Math.random(), radius: .35 + Math.random() * .55,
        brightness: .25 + Math.random() * .4, phase: Math.random() * Math.PI * 2
      }));
      stars = Array.from({ length: width < 600 ? 320 : 800 }, () => {
        const star = { x: 0, y: 0, z: 1, brightness: 1 }; reset(star, true); return star;
      });
      paint();
    };

    const tick = (time: number) => {
      if (time - lastPaint >= 1000 / 30) {
        paint(previous ? Math.min((time - previous) / 1000, .08) : 0);
        previous = time; lastPaint = time;
      }
      frame = requestAnimationFrame(tick);
    };
    const syncMotion = () => {
      cancelAnimationFrame(frame); frame = 0; previous = 0; lastPaint = 0;
      if (!motion.matches && !document.hidden) frame = requestAnimationFrame(tick);
      else paint();
    };

    resize(); syncMotion();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", syncMotion);
    motion.addEventListener("change", syncMotion);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", syncMotion);
      motion.removeEventListener("change", syncMotion);
    };
  }, []);

  return <canvas ref={canvasRef} className="contact-starfield" aria-hidden="true" />;
}
