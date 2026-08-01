"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "ambient-score-open";
// Prokofiev · Montagues and Capulets · Berlin Phil / Abbado
const SPOTIFY_SRC =
  "https://open.spotify.com/embed/track/23fR7o0T2efsRlcnXLaSot?utm_source=generator&theme=0";

export function AmbientScore() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(window.localStorage.getItem(STORAGE_KEY) === "1");
  }, []);

  const toggle = () => {
    setOpen((value) => {
      const next = !value;
      window.localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
      return next;
    });
  };

  return (
    <div className={`ambient-score${open ? " is-open" : ""}`}>
      {open ? (
        <iframe
          className="ambient-score-frame"
          src={SPOTIFY_SRC}
          title="Prokofiev — Montagues and Capulets"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      ) : null}
      <button
        type="button"
        className="ambient-score-toggle"
        aria-expanded={open}
        aria-label={open ? "Hide score player" : "Show Montagues and Capulets on Spotify"}
        title={open ? "Hide score" : "Play score"}
        onClick={toggle}
      >
        <span className="ambient-score-kicker">Prokofiev</span>
        <span>{open ? "Montagues · hide" : "Montagues · play"}</span>
      </button>
    </div>
  );
}
