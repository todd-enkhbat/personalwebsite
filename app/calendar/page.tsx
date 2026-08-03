import Image from "next/image";
import Link from "next/link";
import { LetterShell } from "../components/LetterShell";
import { calendarLanes, meetInvite } from "../data/content";

export default function CalendarPage() {
  const itinerary = calendarLanes.filter((lane) => lane.tone !== "event");
  const featured = calendarLanes.find((lane) => lane.tone === "event");

  return (
    <LetterShell>
      <p className="kicker">Calendar</p>
      <h1
        className="display"
        style={{ fontSize: 32, lineHeight: "38px", marginTop: 12, marginBottom: 12 }}
      >
        Where I am.
      </h1>
      <p className="body-copy" style={{ maxWidth: 560, marginBottom: 36 }}>
        A short stretch of travel this August — then Houston for Payload&apos;s Off World summit.
        Along the way I&apos;m glad to meet people. Coffee, a conversation, whatever fits.
      </p>

      <section className="meet-invite meet-invite--calendar" aria-label="Open to meeting">
        <div className="meet-invite__copy">
          <p className="ui-label">{meetInvite.eyebrow}</p>
          <h2 className="meet-invite__headline">{meetInvite.headline}</h2>
          <p className="meet-invite__body">{meetInvite.body}</p>
          <p className="meet-invite__window">{meetInvite.window}</p>
        </div>
        <Link href={meetInvite.ctaHref} className="meet-button">
          <span className="meet-button__label">{meetInvite.cta}</span>
          <span className="meet-button__arrow" aria-hidden>
            →
          </span>
        </Link>
      </section>

      <div className="calendar-timeline" role="list">
        {itinerary.map((lane, index) => (
          <article
            key={lane.label + lane.title}
            className={`calendar-stop calendar-stop--${lane.tone}`}
            role="listitem"
          >
            <div className="calendar-stop__rail" aria-hidden>
              <span className="calendar-stop__dot" />
              {index < itinerary.length - 1 ? <span className="calendar-stop__line" /> : null}
            </div>
            <div className="calendar-stop__body">
              <div className="calendar-stop__meta">
                <p className="kicker" style={{ letterSpacing: "0.1em", fontSize: 13 }}>
                  {lane.label}
                </p>
                {lane.dates ? <p className="calendar-stop__dates">{lane.dates}</p> : null}
              </div>
              <p className="display" style={{ fontSize: 22, lineHeight: "28px" }}>
                {lane.title}
              </p>
              <p className="calendar-stop__note">{lane.note}</p>
              {lane.open ? (
                <p className="calendar-stop__open">Open to meet</p>
              ) : null}
            </div>
          </article>
        ))}
      </div>

      {featured ? (
        <section className="calendar-event" aria-label={featured.title}>
          <div className="calendar-event__media">
            {featured.image ? (
              <Image
                src={featured.image}
                alt="Off World summit — Payload at Space Center Houston"
                width={948}
                height={543}
                className="calendar-event__image"
                unoptimized
              />
            ) : null}
          </div>
          <div className="calendar-event__copy">
            {featured.logo ? (
              <Image
                src={featured.logo}
                alt={`${featured.org ?? "Payload"} logo`}
                width={119}
                height={22}
                className="calendar-event__logo"
                unoptimized
              />
            ) : null}
            <p className="kicker" style={{ marginTop: 16 }}>
              {featured.label}
              {featured.dates ? ` · ${featured.dates}` : ""}
            </p>
            <h2 className="display" style={{ fontSize: 28, lineHeight: "34px", marginTop: 8 }}>
              {featured.title}
            </h2>
            <p className="calendar-event__note">{featured.note}</p>
            <p className="calendar-event__venue">NASA&apos;s Space Center Houston</p>
            {featured.href ? (
              <a
                href={featured.href}
                className="calendar-event__link"
                target="_blank"
                rel="noreferrer"
              >
                Event page →
              </a>
            ) : null}
          </div>
        </section>
      ) : null}

      <section className="calendar-schedule" aria-label="Schedule time">
        <div className="calendar-schedule__header">
          <p className="ui-label">Schedule</p>
          <h2 className="display" style={{ fontSize: 24, lineHeight: "30px", marginTop: 8 }}>
            Book time with me
          </h2>
          <p className="body-copy" style={{ marginTop: 8, maxWidth: 480 }}>
            Google Calendar booking will live here soon. For now, reach out directly and we&apos;ll
            find a time.
          </p>
        </div>
        <div className="calendar-schedule__slot" aria-hidden>
          <span>Calendar embed coming soon</span>
        </div>
      </section>
    </LetterShell>
  );
}
