"use client";

import { useEffect, useRef } from "react";

const SCHEDULE_URL =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ2YJn-_w_1k70r3ugpuNY5ZwvbCzkRPom-FjA-Hl-JL28jHWHs2ZJuxB0U4BD0wiYKQFV6dd8KA?gv=true";

const ACCENT = "#8b2942";

declare global {
  interface Window {
    calendar?: {
      schedulingButton: {
        load: (config: {
          url: string;
          color: string;
          label: string;
          target: HTMLElement;
        }) => void;
      };
    };
  }
}

type GoogleSchedulingButtonProps = {
  label?: string;
};

export function GoogleSchedulingButton({
  label = "Book an appointment"
}: GoogleSchedulingButtonProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);

  useEffect(() => {
    const target = targetRef.current;
    if (!target || loadedRef.current) return;

    const cssId = "google-scheduling-button-css";
    if (!document.getElementById(cssId)) {
      const link = document.createElement("link");
      link.id = cssId;
      link.rel = "stylesheet";
      link.href = "https://calendar.google.com/calendar/scheduling-button-script.css";
      document.head.appendChild(link);
    }

    const mount = () => {
      if (loadedRef.current || !window.calendar?.schedulingButton || !targetRef.current) return;
      loadedRef.current = true;
      window.calendar.schedulingButton.load({
        url: SCHEDULE_URL,
        color: ACCENT,
        label,
        target: targetRef.current
      });
    };

    if (window.calendar?.schedulingButton) {
      mount();
      return;
    }

    const scriptId = "google-scheduling-button-js";
    const existing = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (existing) {
      if (window.calendar?.schedulingButton) {
        mount();
      } else {
        existing.addEventListener("load", mount);
        return () => existing.removeEventListener("load", mount);
      }
      return;
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://calendar.google.com/calendar/scheduling-button-script.js";
    script.async = true;
    script.addEventListener("load", mount);
    document.body.appendChild(script);

    return () => {
      script.removeEventListener("load", mount);
    };
  }, [label]);

  return <div ref={targetRef} className="calendar-schedule__button-target" />;
}
