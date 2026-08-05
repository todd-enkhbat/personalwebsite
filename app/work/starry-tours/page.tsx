import Link from "next/link";
import { LetterShell } from "../../components/LetterShell";
import { work } from "../../data/content";

const starry = work.find((item) => item.id === "starry-tours")!;

export default function StarryToursPage() {
  return (
    <LetterShell showHeader={false}>
      <article className="case-editorial">
        <header className="case-header">
          <div className="case-header-top">
            <p className="case-kicker">Starry Tours Mongolia · Astro-Tourism</p>
            <Link href="/work" className="open-arrow">
              ← Portfolio
            </Link>
          </div>
          <h1>First dedicated astro-tourism in Mongolia</h1>
        </header>

        <p className="case-byline">
          {starry.role} · Mongolia · dark skies · astronomy engagement
        </p>

        <p className="case-deck">
          An innovative tourism project to foster astronomy engagement and unconventional night-sky
          experiences under some of Asia’s clearest skies.
        </p>
        <p className="case-dateline">
          Astro-tourism · steppe & desert dark skies · outreach · nomadic sky culture
        </p>

        <figure className="case-hero">
          <img
            src="/paper-assets/starry-tours-hero.jpg"
            alt="Camp under the Milky Way in Mongolia"
          />
          <figcaption>
            <span>Dark-sky country</span>
            <span>Milky Way · Mongolia</span>
          </figcaption>
        </figure>

        <div className="case-body">
          <section>
            <h2>The idea</h2>
            <p>
              Mongolia’s high elevation, thin air, and sparse light pollution make it one of the
              best natural planetariums on Earth. Starry Tours was built as the country’s first
              dedicated astro-tourism project: not a generic desert overnight, but a structured way
              to put telescopes, guided sky reading, and unconventional night experiences in front of
              travelers and local audiences.
            </p>
          </section>

          <section>
            <h2>Experience</h2>
            <p>
              The program treated the night sky as both product and heritage: nomadic cultures have
              long used stars for navigation, weather, and time. The work was to translate that into
              contemporary engagement, dark-sky viewing sessions, astronomy outreach, and tourism
              that felt like discovery rather than spectacle.
            </p>
          </section>
        </div>

        <div className="case-gallery">
          <div className="case-gallery-pair">
            <figure className="case-plate">
              <img src="/paper-assets/starry-tours-milkyway.jpg" alt="" />
              <figcaption>Milky Way · dark-sky domain</figcaption>
            </figure>
            <figure className="case-plate">
              <img src="/paper-assets/starry-tours-sky.jpg" alt="" />
              <figcaption>Night sky · open steppe</figcaption>
            </figure>
          </div>
          <figure className="case-plate">
            <img src="/paper-assets/starry-tours-cosmos.jpg" alt="" />
            <figcaption>Deep sky · astronomy engagement</figcaption>
          </figure>
        </div>
      </article>
    </LetterShell>
  );
}
