"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export function ContactEmblem() {
  const emblemRef = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const emblem = emblemRef.current;
    if (!emblem) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(emblem);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={emblemRef}
      className={`contact-map__emblem${entered ? " is-entered" : ""}`}
    >
      <Image
        src="/paper-assets/contact-emblem.png"
        alt=""
        width={497}
        height={507}
        priority
        unoptimized
      />
    </div>
  );
}
