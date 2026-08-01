import Link from "next/link";
import { LetterShell } from "../../components/LetterShell";
import { work } from "../../data/content";

const hur = work.find((item) => item.id === "hur")!;

export default function HurPage() {
  return (
    <LetterShell showHeader={false}>
      <article className="case-editorial">
        <header className="case-header">
          <div className="case-header-top">
            <p className="case-kicker">HUR. EdTech · 2024–2025</p>
            <Link href="/work" className="open-arrow">
              ← Portfolio
            </Link>
          </div>
          <h1>A hub for Mongolian students who needed more than a brochure</h1>
        </header>

        <p className="case-byline">
          {hur.role} · Ulaanbaatar ·{" "}
          <a href="https://all-hur.com" target="_blank" rel="noreferrer">
            all-hur.com ↗
          </a>
        </p>

        <p className="case-deck">
          Mentorship, funding access, and peer collaboration across colleges — built as a company, not a club
          newsletter.
        </p>
        <p className="case-dateline">$46,000 funding · 22 staff · 120+ colleges · 1,100 students lectured</p>

        <figure className="case-hero">
          <img src="/paper-assets/hur-hero.jpg" alt="HUR. Education brand banner" />
          <figcaption>
            <span>HUR. Education Technology</span>
            <span>Student research hub</span>
          </figcaption>
        </figure>

        <div className="case-body">
          <section>
            <h2>The gap</h2>
            <p>
              Mongolian students aiming at competitive colleges lacked a centralized place for mentorship, funding
              pathways, and collaboration with peers who had already crossed those gates. HUR. was founded to close that
              gap — education technology as infrastructure for ambition, not content for its own sake.
            </p>
          </section>

          <section>
            <h2>What we built</h2>
            <p>
              As COO and founder I secured forty-six thousand dollars in funding, hired and managed a team of twenty-two
              educators and staff, and networked more than one hundred twenty colleges into the community. We lectured
              eleven hundred students with nationwide reach, funded student-led research, and brought in speakers who
              could turn advice into projects with real stakes.
            </p>
            <p>
              The public face of that work shows up in admissions stories — Duke Kunshan, Washington, Pace, Syracuse —
              and in the testimonials of students who could not have mapped those applications alone.
            </p>
          </section>
        </div>

        <div className="case-gallery">
          <div className="case-gallery-pair">
            <figure className="case-plate">
              <img src="/paper-assets/hur-fb-01.jpg" alt="" />
              <figcaption>Duke Kunshan · RD acceptance</figcaption>
            </figure>
            <figure className="case-plate">
              <img src="/paper-assets/hur-fb-03.jpg" alt="" />
              <figcaption>University of Washington</figcaption>
            </figure>
          </div>
          <div className="case-gallery-pair">
            <figure className="case-plate">
              <img src="/paper-assets/hur-fb-05.jpg" alt="" />
              <figcaption>Pace · Syracuse</figcaption>
            </figure>
            <figure className="case-plate">
              <img src="/paper-assets/hur-fb-02.jpg" alt="" />
              <figcaption>Admit letter · testimonial</figcaption>
            </figure>
          </div>
        </div>
      </article>
    </LetterShell>
  );
}
