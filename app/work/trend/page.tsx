import Link from "next/link";
import { LetterShell } from "../../components/LetterShell";
import { work } from "../../data/content";

const trend = work.find((item) => item.id === "trend-mart")!;

export default function TrendPage() {
  return (
    <LetterShell showHeader={false}>
      <article className="case-editorial">
        <header className="case-header">
          <div className="case-header-top">
            <p className="case-kicker">Trend Mart Group · 2017-2024</p>
            <Link href="/work" className="open-arrow">
              ← Portfolio
            </Link>
          </div>
          <h1>A retail empire built at twelve, wound down on purpose</h1>
        </header>

        <p className="case-byline">
          Founder & CEO · Ulaanbaatar → New York · zero external funding
        </p>

        <p className="case-deck">
          From a single-product online operation to Mongolia’s largest toy seller in a calendar year, then a
          deliberate exit for Columbia, not a collapse.
        </p>
        <p className="case-dateline">
          $1M+ revenue · ~50% gross margins · 4 locations · 60+ SKUs · peak team 15 · 100K+ followers
        </p>

        <figure className="case-hero">
          <img src="/paper-assets/trend-hero.jpg" alt="Curated toy retail inventory" />
          <figcaption>
            <span>Trend Mart · toys vertical</span>
            <span>Omnichannel retail</span>
          </figcaption>
        </figure>

        <div className="case-body">
          <section>
            <h2>Why the number matters</h2>
            <p>
              Mongolia’s GDP per capita sits around four to five thousand US dollars. Consumer purchasing power is a
              fraction of the American market. Adjusted for local PPP, a million-plus in Mongolian consumer revenue is
              several million in US-equivalent spending, extracted from a constrained, competitive landscape where
              every dollar is harder to earn.
            </p>
          </section>

          <section>
            <h2>The group</h2>
            <p>
              Trend Mart Group ran three verticals. Trend Mart was the flagship toy brand, sixty-plus SKUs, curated and
              developed through original work, white-labeling, and supplier relationships, and at peak the country’s
              single largest toy retailer by annual volume. Smart Kids was an English-literacy bookstore for young
              families. Home Essentials diversified into home and lifestyle appliances so revenue was not hostage to one
              category.
            </p>
            <p>
              Four storefronts sat in Ulaanbaatar’s highest-traffic hubs: Shangrilla Mall, Hunnu Mall, the Urgoo 2 Cinema
              district, and Sukhbaatar Square. Online and in-person channels shifted with the pandemic, heavier in-store
              before, online and Facebook Live commerce after, live-selling before live-commerce was a global cliché.
            </p>
          </section>

          <section>
            <h2>China without Chinese</h2>
            <p>
              Sourcing was not a catalog click. As a Mongolian founder who did not speak Chinese, I traveled to China to
              work manufacturers and retailers directly, terms, products, supplier relationships, learning culture and
              logistics in real time. That on-the-ground pipeline is where the SKU portfolio was built.
            </p>
          </section>

          <section>
            <h2>Full-stack, then exit</h2>
            <p>
              Early on there was no co-founder to absorb functions. Product, logistics (including deliveries), marketing,
              Live selling, hiring up to fifteen people, and unit economics at roughly fifty percent gross margin all
              sat on one desk. In 2024 the company was strategically wound down as I moved to Columbia, an exit on my
              own terms, reallocating focus rather than abandoning a failed bet.
            </p>
          </section>
        </div>

        <div className="case-gallery">
          <div className="case-gallery-pair">
            <figure className="case-plate">
              <img src="/paper-assets/trend-retail.jpg" alt="" />
              <figcaption>Retail presence</figcaption>
            </figure>
            <figure className="case-plate">
              <img src="/paper-assets/trend-warehouse.jpg" alt="" />
              <figcaption>Supply / ops scale</figcaption>
            </figure>
          </div>
          <div className="case-gallery-pair">
            <figure className="case-plate">
              <img src="/paper-assets/trend-commerce.jpg" alt="" />
              <figcaption>Omnichannel commerce</figcaption>
            </figure>
            <figure className="case-plate">
              <img src="/paper-assets/trend-store.jpg" alt="" />
              <figcaption>Brand surface · Home</figcaption>
            </figure>
          </div>
        </div>
      </article>
    </LetterShell>
  );
}
