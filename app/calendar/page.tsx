import Image from "next/image";
import { LetterShell } from "../components/LetterShell";
import { calendarLanes } from "../data/content";

export default function CalendarPage() {
  return (
    <LetterShell>
      <p className="kicker">Calendar</p>
      <h1
        className="display"
        style={{ fontSize: 32, lineHeight: "38px", marginTop: 12, marginBottom: 32 }}
      >
        Where I am.
      </h1>

      <div className="calendar-lanes">
        {calendarLanes.map((lane) => (
          <div
            key={lane.label}
            className={`calendar-card calendar-card--${lane.tone}`}
          >
            <p
              className="kicker"
              style={{
                letterSpacing: "0.1em",
                fontSize: 13,
                color: lane.tone === "solid" ? "var(--accent)" : "var(--ink-faint)"
              }}
            >
              {lane.label}
            </p>
            <p className="display" style={{ fontSize: 22, lineHeight: "28px" }}>
              {lane.title}
            </p>
            <p
              style={{
                color: lane.tone === "solid" ? "var(--ink-soft)" : "var(--ink-faint)",
                fontSize: 16,
                lineHeight: "24px"
              }}
            >
              {lane.note}
            </p>
          </div>
        ))}
      </div>

      <Image
        className="calendar-visual"
        src="/paper-assets/calendar-visual.jpg"
        alt="Calendar visual"
        width={494}
        height={280}
      />
    </LetterShell>
  );
}
