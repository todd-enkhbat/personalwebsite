"use client";

import { useEffect, useRef } from "react";

const SIZE = 240;

// A moving, grainy contour field inspired by the supplied black-and-white reference.
export function ContactVortex() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: false });
    if (!context) return;

    const image = context.createImageData(SIZE, SIZE);
    const pixels = image.data;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let visible = true;
    let lastDraw = 0;

    const draw = (time: number) => {
      const t = media.matches ? 0 : time * 0.00034;

      for (let y = 0; y < SIZE; y++) {
        const ny = (y - SIZE / 2) / (SIZE / 2);
        for (let x = 0; x < SIZE; x++) {
          const nx = (x - SIZE / 2) / (SIZE / 2);
          const radius = Math.hypot(nx, ny);
          const angle = Math.atan2(ny, nx);

          // Fold two drifting waves through a spiral to make branching cells.
          const twist = 1.7 * radius - t;
          const wx = nx * Math.cos(twist) - ny * Math.sin(twist);
          const wy = nx * Math.sin(twist) + ny * Math.cos(twist);
          const bendX = wx + 0.16 * Math.sin(6.4 * wy + 1.5 * t);
          const bendY = wy + 0.16 * Math.cos(6.1 * wx - 1.2 * t);
          const cells = Math.sin(9.2 * bendX + 1.8 * Math.sin(5.1 * bendY + t))
            + Math.sin(9.4 * bendY - 1.7 * Math.cos(4.8 * bendX - t));
          const spiral = 0.46 * Math.sin(19 * radius - 3.2 * angle - 2.5 * t);
          const contour = Math.abs(cells + spiral - 0.12);

          // Animated film grain gives the edges the stippled quality of the reference.
          const grain = Math.random();
          const edge = Math.max(0, 1 - contour / 0.36);
          const halo = Math.max(0, 1 - contour / 0.58) * 0.16;
          const fleck = grain < 0.004 ? 180 : 0;
          const center = Math.max(0, 1 - radius * 5) * 80;
          const value = Math.min(255, (edge * (grain > 0.19 ? 255 : 80)) + halo * 75 + fleck + center);
          const index = (y * SIZE + x) * 4;
          pixels[index] = value;
          pixels[index + 1] = value;
          pixels[index + 2] = value;
          pixels[index + 3] = 255;
        }
      }

      context.putImageData(image, 0, 0);
    };

    const tick = (time: number) => {
      if (time - lastDraw >= 1000 / 24) {
        draw(time);
        lastDraw = time;
      }
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !media.matches && !frame) frame = requestAnimationFrame(tick);
      if (!visible && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    });

    const onMotionChange = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      if (media.matches) draw(0);
      else if (visible) frame = requestAnimationFrame(tick);
    };

    draw(0);
    observer.observe(canvas);
    media.addEventListener("change", onMotionChange);
    if (!media.matches) frame = requestAnimationFrame(tick);

    return () => {
      observer.disconnect();
      media.removeEventListener("change", onMotionChange);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas ref={canvasRef} className="contact-map__vortex" width={SIZE} height={SIZE} aria-hidden="true" />;
}
