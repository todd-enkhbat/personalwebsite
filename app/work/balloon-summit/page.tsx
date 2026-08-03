import Link from "next/link";
import { LetterShell } from "../../components/LetterShell";
import { work } from "../../data/content";

const summit = work.find((item) => item.id === "balloon-summit")!;

const FACEBOOK_VIDEO =
  "https://www.facebook.com/marsapage/videos/646521701496242/";
const FACEBOOK_EMBED = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
  FACEBOOK_VIDEO
)}&show_text=false&width=720`;

export default function BalloonSummitPage() {
  return (
    <LetterShell showHeader={false}>
      <article className="case-editorial">
        <header className="case-header">
          <div className="case-header-top">
            <p className="case-kicker">International Space Balloon Summit · March 2024</p>
            <Link href="/work" className="open-arrow">
              ← Portfolio
            </Link>
          </div>
          <h1>A public balloon launch under presidential patronage</h1>
        </header>

        <p className="case-byline">
          {summit.role} · Ulaanbaatar ·{" "}
          <a href={FACEBOOK_VIDEO} target="_blank" rel="noreferrer">
            launch film ↗
          </a>
        </p>

        <p className="case-deck">
          Two days linking a field launch the public could attend with a scientific conference —
          co-organized across government, universities, and Mongolia’s space research community.
        </p>
        <p className="case-dateline">
          Mar 21–22, 2024 · National Park launch · Scientific conference · Presidential patronage
        </p>

        <figure className="case-hero">
          <img
            src="/paper-assets/balloon-summit-launch.jpg"
            alt="High-altitude balloon preparation at the International Space Balloon Summit launch site"
          />
          <figcaption>
            <span>Day 1 · Space balloon launch</span>
            <span>360 Archery Range · National Park</span>
          </figcaption>
        </figure>

        <div className="case-body">
          <section>
            <h2>The summit</h2>
            <p>
              The Mongolian Space Research and Science Agency organized the International Space
              Balloon Summit on March 21–22, 2024, under the patronage of the President of Mongolia.
              Co-organizers included the Ministry of Digital Development, Innovation, and
              Communications; the Koosen Technology College of the Mongolian University of Science
              and Technology (MUST); New Mongol Technology College; Mongol Koosen; and partner
              institutions spanning research and education.
            </p>
          </section>

          <section>
            <h2>Two days</h2>
            <p>
              Day 1 put a space balloon in the air at 10AM on March 21 at the 360 Archery Range of
              the National Park — open to the public. Day 2 shifted indoors for the Space Balloon
              Scientific Conference: papers, partners, and the technical thread behind high-altitude
              platforms. Field ops and symposium, same weekend.
            </p>
            <p className="case-pull">
              Launch at 10AM · March 21, 2024 · National Park — cordially open to the public.
            </p>
          </section>

          <section>
            <h2>Launch film</h2>
            <p>
              Field footage from the summit launch — balloon inflation, payload prep, and ascent
              against the Ulaanbaatar horizon.
            </p>
            <div className="case-video">
              <iframe
                src={FACEBOOK_EMBED}
                title="International Space Balloon Summit launch film"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
            </div>
            <p className="case-video-fallback">
              <a href={FACEBOOK_VIDEO} target="_blank" rel="noreferrer">
                Open the launch film on Facebook ↗
              </a>
            </p>
          </section>
        </div>

        <div className="case-gallery">
          <figure className="case-plate">
            <img
              src="/paper-assets/balloon-summit-poster.jpg"
              alt="International Space Balloon Summit poster"
            />
            <figcaption>Summit poster · partners and schedule</figcaption>
          </figure>
        </div>
      </article>
    </LetterShell>
  );
}
