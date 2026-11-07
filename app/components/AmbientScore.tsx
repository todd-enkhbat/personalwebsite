"use client";

import { useEffect, useRef, useState } from "react";
import "./ambient-score.css";

const TRACK_URL = "https://open.spotify.com/track/6FNL42AcCBLL1evT2braRp";

type PlaybackEvent = { data: { isPaused?: boolean; position?: number; duration?: number } };
type SpotifyController = {
  play: () => void;
  pause: () => void;
  resume: () => void;
  destroy: () => void;
  addListener: {
    (event: "ready" | "playback_started", listener: () => void): void;
    (event: "playback_update", listener: (event: PlaybackEvent) => void): void;
  };
};
type SpotifyAPI = {
  createController: (element: HTMLElement, options: { url: string; width: string; height: number }, callback: (controller: SpotifyController) => void) => void;
};

let spotifyAPI: Promise<SpotifyAPI> | undefined;
function loadSpotifyAPI() {
  if (!spotifyAPI) {
    spotifyAPI = new Promise<SpotifyAPI>((resolve, reject) => {
      const spotifyWindow = window as Window & { onSpotifyIframeApiReady?: (api: SpotifyAPI) => void };
      spotifyWindow.onSpotifyIframeApiReady = resolve;
      const script = document.createElement("script");
      script.src = "https://open.spotify.com/embed/iframe-api/v1";
      script.async = true;
      script.onerror = () => { spotifyAPI = undefined; script.remove(); reject(new Error("Spotify could not load")); };
      document.head.appendChild(script);
    });
  }
  return spotifyAPI;
}

export function AmbientScore() {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<SpotifyController | null>(null);
  const started = useRef(false);
  const requestedPlay = useRef(false);
  const [enabled, setEnabled] = useState(false);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "playing" | "unavailable">("idle");

  useEffect(() => {
    if (!enabled) return;
    let disposed = false;
    let ready = false;
    const container = host.current;
    if (!container) return;
    const mount = document.createElement("div");
    container.appendChild(mount);
    const timeout = window.setTimeout(() => {
      if (!disposed && !ready) {
        requestedPlay.current = false;
        setStatus("unavailable");
      }
    }, 15000);

    loadSpotifyAPI().then(api => {
      if (disposed) return;
      // Spotify's iframe API has no volume setter. Start at the quiet opening,
      // and leave playback and volume under the visitor's control.
      api.createController(mount, { url: `${TRACK_URL}?theme=0`, width: "100%", height: 80 }, embed => {
        if (disposed) { embed.destroy(); return; }
        controller.current = embed;
        embed.addListener("ready", () => {
          if (disposed || ready) return;
          ready = true;
          window.clearTimeout(timeout);
          setStatus("ready");
          // This flag is set only by the dedicated Play button. Page entry,
          // navigation, scrolling, and unrelated clicks never request playback.
          if (requestedPlay.current) {
            requestedPlay.current = false;
            embed.play();
          }
        });
        embed.addListener("playback_started", () => {
          if (disposed) return;
          started.current = true;
          setStatus("playing");
        });
        embed.addListener("playback_update", event => {
          if (disposed) return;
          // Some preview events omit pause state; do not interpret that as playing.
          if (typeof event.data.isPaused !== "boolean") return;
          if (!event.data.isPaused) started.current = true;
          // Only Spotify's actual playback events change the play/pause indicator.
          setStatus(event.data.isPaused ? "ready" : "playing");
        });
      });
    }).catch(() => {
      if (!disposed) {
        requestedPlay.current = false;
        setStatus("unavailable");
      }
    });

    return () => {
      disposed = true;
      window.clearTimeout(timeout);
      controller.current?.destroy();
      controller.current = null;
      started.current = false;
      container.replaceChildren();
    };
  }, [enabled]);

  function loadPlayer() {
    if (enabled) return;
    setStatus("loading");
    setEnabled(true);
  }

  function togglePlayback() {
    if (status === "unavailable") { setOpen(true); return; }
    if (status === "idle") {
      requestedPlay.current = true;
      setOpen(true);
      loadPlayer();
    } else if (status === "playing") {
      controller.current?.pause();
    } else if (status === "ready") {
      if (started.current) controller.current?.resume();
      else controller.current?.play();
    }
  }

  function toggleDetails() {
    if (!open) loadPlayer();
    setOpen(value => !value);
  }

  return (
    <div className={`ambient-score${open ? " is-open" : ""}`}>
      <div id="ambient-score-player" className="ambient-score-panel" aria-hidden={!open} inert={!open}>
        <div className="ambient-score-frame" ref={host} />
        <p className="ambient-score-note">Debussy, performed by Claudio Arrau. Volume follows your Spotify and device settings.</p>
        {status === "unavailable" ? <a href={TRACK_URL} target="_blank" rel="noopener noreferrer">Listen on Spotify ↗</a> : null}
      </div>
      <div className="ambient-score-controls">
        <button type="button" className="ambient-score-toggle" onClick={togglePlayback} disabled={status === "loading"} aria-label={status === "playing" ? "Pause Clair de lune" : status === "unavailable" ? "Open music options" : "Play Clair de lune"}>
          <span className="ambient-score-kicker">Debussy</span>
          <span aria-live="polite">Clair de lune · {status === "playing" ? "pause" : status === "loading" ? "loading" : "play"}</span>
        </button>
        <button type="button" className="ambient-score-details" aria-expanded={open} aria-controls="ambient-score-player" aria-label={open ? "Hide Spotify player" : "Show Spotify player"} onClick={toggleDetails}>{open ? "−" : "+"}</button>
      </div>
    </div>
  );
}
