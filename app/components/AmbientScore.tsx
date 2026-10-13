"use client";

import { useEffect, useRef, useState } from "react";

const TRACK_URI = "spotify:track:23fR7o0T2efsRlcnXLaSot";
const TRACK_URL = "https://open.spotify.com/track/23fR7o0T2efsRlcnXLaSot";
const START_SECONDS = 10;
const PAUSED_KEY = "ambient-score-paused";

type PlaybackEvent = { data: { isPaused: boolean; position: number } };
type SpotifyController = {
  loadEntity: (uri: string, preferVideo: boolean, startAt: number) => void;
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
  createController: (element: HTMLElement, options: { uri: string; width: string; height: number }, callback: (controller: SpotifyController) => void) => void;
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
  const requestPlay = useRef<() => void>(() => {});
  const optedOut = useRef(false);
  const playing = useRef(false);
  const started = useRef(false);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"loading" | "ready" | "playing" | "unavailable">("loading");

  useEffect(() => {
    let disposed = false;
    let ready = false;
    const container = host.current;
    if (!container) return;
    // Session storage preserves an explicit pause while navigating or refreshing.
    try { optedOut.current = sessionStorage.getItem(PAUSED_KEY) === "1"; } catch { /* Storage may be disabled. */ }
    const mount = document.createElement("div");
    container.appendChild(mount);
    const timeout = window.setTimeout(() => { if (!disposed && !ready) setStatus("unavailable"); }, 15000);

    const play = () => {
      if (!ready || optedOut.current || playing.current) return;
      if (started.current) controller.current?.resume();
      else controller.current?.play();
    };
    requestPlay.current = play;
    const onInteraction = (event: Event) => {
      if (!event.isTrusted || (event.target instanceof Element && event.target.closest(".ambient-score"))) return;
      play();
    };
    const removeInteractionListeners = () => {
      document.removeEventListener("click", onInteraction);
      document.removeEventListener("keydown", onInteraction);
    };
    document.addEventListener("click", onInteraction);
    document.addEventListener("keydown", onInteraction);

    loadSpotifyAPI().then(api => {
      if (disposed) return;
      api.createController(mount, { uri: TRACK_URI, width: "100%", height: 80 }, embed => {
        if (disposed) { embed.destroy(); return; }
        controller.current = embed;
        embed.addListener("ready", () => {
          if (disposed || ready) return;
          ready = true;
          window.clearTimeout(timeout);
          setStatus("ready");
          // Spotify receives the requested track offset before any playback request.
          embed.loadEntity(TRACK_URI, false, START_SECONDS);
          play();
        });
        embed.addListener("playback_started", () => {
          if (disposed) return;
          started.current = true;
          playing.current = true;
          removeInteractionListeners();
          setStatus("playing");
        });
        embed.addListener("playback_update", event => {
          if (disposed) return;
          playing.current = !event.data.isPaused;
          if (playing.current) {
            started.current = true;
            removeInteractionListeners();
          }
          // Only Spotify's actual playback events change the play/pause indicator.
          setStatus(event.data.isPaused ? "ready" : "playing");
        });
      });
    }).catch(() => { if (!disposed) setStatus("unavailable"); });

    return () => {
      disposed = true;
      window.clearTimeout(timeout);
      removeInteractionListeners();
      requestPlay.current = () => {};
      controller.current?.destroy();
      controller.current = null;
      container.replaceChildren();
    };
  }, []);

  function togglePlayback() {
    if (status === "unavailable") { setOpen(true); return; }
    optedOut.current = status === "playing";
    try { sessionStorage.setItem(PAUSED_KEY, optedOut.current ? "1" : "0"); } catch { /* Playback works without storage. */ }
    if (optedOut.current) controller.current?.pause();
    else requestPlay.current();
  }

  return (
    <div className={`ambient-score${open ? " is-open" : ""}`}>
      <div id="ambient-score-player" className="ambient-score-panel" aria-hidden={!open} inert={!open}>
        <div className="ambient-score-frame" ref={host} />
        {status === "unavailable" ? <a href={TRACK_URL} target="_blank" rel="noopener noreferrer">Listen on Spotify ↗</a> : null}
      </div>
      <div className="ambient-score-controls">
        <button type="button" className="ambient-score-toggle" onClick={togglePlayback} disabled={status === "loading"} aria-label={status === "playing" ? "Pause background music" : "Play Montagues and Capulets"}>
          <span className="ambient-score-kicker">Prokofiev</span>
          <span aria-live="polite">Montagues · {status === "playing" ? "pause" : status === "loading" ? "loading" : "play"}</span>
        </button>
        <button type="button" className="ambient-score-details" aria-expanded={open} aria-controls="ambient-score-player" aria-label={open ? "Hide Spotify player" : "Show Spotify player"} onClick={() => setOpen(value => !value)}>{open ? "−" : "+"}</button>
      </div>
    </div>
  );
}
