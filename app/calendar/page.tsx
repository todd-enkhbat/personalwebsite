import Image from "next/image";
import Link from "next/link";
import { GoogleSchedulingButton } from "../components/GoogleSchedulingButton";
import { LetterShell } from "../components/LetterShell";
import { calendarLanes, calendarPhotos, meetInvite } from "../data/content";

function ChainBlock({
  lane
}: {
  lane: (typeof calendarLanes)[number];
}) {
  const inner = (
    <>
      <div className="calendar-block__meta">
        <span className="calendar-block__label">{lane.label}</span>
        {lane.dates ? <span className="calendar-block__dates">{lane.dates}</span> : null}
      </div>
      {lane.logo ? (
        <Image
          src={lane.logo}
          alt={lane.org ?? "Payload"}
          width={90}
          height={17}
          className="calendar-block__logo"
          unoptimized
        />
      ) : null}
      <p className="calendar-block__title">{lane.title}</p>
      <p className="calendar-block__note">{lane.note}</p>
      {lane.open ? <span className="calendar-block__open">Open to meet</span> : null}
    </>
  );

  if (lane.href) {
    return (
      <a
        className={`calendar-block calendar-block--${lane.tone}`}
        href={lane.href}
        target="_blank"
        rel="noreferrer"
      >
        {inner}
      </a>
    );
  }

  return <div className={`calendar-block calendar-block--${lane.tone}`}>{inner}</div>;
}

export default function CalendarPage() {
  const externalCta = meetInvite.ctaHref.startsWith("http");
  const ctaProps = {
    href: meetInvite.ctaHref,
    className: "meet-button" as const,
    ...(externalCta ? { target: "_blank" as const, rel: "noreferrer" } : {})
  };

  return (
    <LetterShell>
      <div className="calendar-top">
        <div className="calendar-top__intro">
          <p className="kicker">Calendar</p>
          <p className="calendar-top__line">
            <span className="meet-invite__headline">{meetInvite.headline}</span>
            <span className="calendar-top__aside">{meetInvite.window}</span>
          </p>
        </div>
        {externalCta ? (
          <a {...ctaProps}>
            <span className="meet-button__label">{meetInvite.cta}</span>
            <span className="meet-button__arrow" aria-hidden>
              →
            </span>
          </a>
        ) : (
          <Link {...ctaProps}>
            <span className="meet-button__label">{meetInvite.cta}</span>
            <span className="meet-button__arrow" aria-hidden>
              →
            </span>
          </Link>
        )}
      </div>

      <ol className="calendar-chain" aria-label="Upcoming places">
        {calendarLanes.map((lane, index) => (
          <li key={lane.label + lane.title} className="calendar-chain__item">
            {index > 0 ? (
              <span className="calendar-chain__link" aria-hidden>
                <span className="calendar-chain__dash" />
              </span>
            ) : null}
            <ChainBlock lane={lane} />
          </li>
        ))}
      </ol>

      <section className="calendar-gallery" aria-label="Scenes">
        <div className="calendar-gallery__row">
          {calendarPhotos.map((photo) => (
            <figure
              key={photo.src}
              className={`calendar-gallery__frame${photo.wide ? " calendar-gallery__frame--wide" : ""}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.wide ? 720 : 480}
                height={photo.wide ? 480 : 640}
                className="calendar-gallery__image"
                unoptimized
              />
            </figure>
          ))}
        </div>
      </section>

      <section className="calendar-schedule" aria-label="Schedule time">
        <div className="calendar-schedule__header">
          <p className="ui-label">Schedule</p>
          <p className="body-copy" style={{ marginTop: 6, maxWidth: 420 }}>
            Pick a time that works. Coffee, a walk, or a quick call.
          </p>
        </div>
        <div className="calendar-schedule__slot calendar-schedule__slot--live">
          <GoogleSchedulingButton label="Book an appointment" />
        </div>
      </section>
    </LetterShell>
  );
}
