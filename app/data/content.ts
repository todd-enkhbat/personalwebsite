export type LinkItem = {
  label: string;
  href: string;
  external?: boolean;
  note?: string;
};

export type WorkItem = {
  id: string;
  title: string;
  role: string;
  place?: string;
  dates?: string;
  blurb: string;
  summary: string;
  achievements: string[];
  tags: string[];
  featured?: boolean;
  href?: string;
  externalHref?: string;
};

export type PortfolioCard = {
  id: string;
  title: string;
  role: string;
  label: string;
  description: string;
  image?: string;
  imagePosition?: string;
  href?: string;
};

export type PortfolioRow = {
  year: string;
  cards: PortfolioCard[];
};

export type PublicationFeatureLayout = "inset" | "letterbox" | "square";

export type PublicationRelatedLink = {
  label: string;
  href: string;
};

export type PublicationFigure = {
  image: string;
  caption: string;
  kicker?: string;
};

export type PublicationPiece = {
  id: string;
  title: string;
  titleLines?: string[];
  date: string;
  /** Display month for the rail, e.g. "MAY". */
  month: string;
  year: string;
  category: string;
  meta: string;
  /** Short left-rail line under the title. */
  summary: string;
  /** Two–three sentence lead for the feature panel. */
  intro: string;
  /** Longer grounding paragraph for readers who want more context. */
  body: string;
  tags: string[];
  image: string;
  href?: string;
  linkLabel?: string;
  reach?: string;
  /** Optional in-panel video embed URL (YouTube, etc.). */
  videoEmbed?: string;
  relatedLinks?: PublicationRelatedLink[];
  figures?: PublicationFigure[];
  /** Featured spotlight orientation — varies so soft images are never forced full-bleed. */
  featureLayout?: PublicationFeatureLayout;
};

export type MindColumn = {
  label: string;
  items: string[];
};

export type ShelfBook = {
  id: string;
  title: string;
  author: string;
  cover: string;
  spineLabel?: string;
};

export type MindShelf = {
  id: string;
  label: string;
  code: string;
  meta: string;
  books: ShelfBook[];
};

export type CalendarLane = {
  label: string;
  title: string;
  note: string;
  tone: "solid" | "dashed" | "event";
  dates?: string;
  open?: boolean;
  href?: string;
  logo?: string;
  image?: string;
  org?: string;
};

export const meetInvite = {
  eyebrow: "Open door",
  headline: "Very open to meeting new people.",
  body: "If you're nearby — conversation, coffee, a walk, whatever feels natural — say hello. I'm easy to reach and glad to make time.",
  window: "Especially free in New York from Aug 2–8, before I head west.",
  cta: "Let's grab coffee",
  ctaHref: "/contact"
};

export const person = {
  name: "Tsogt (Todd) Enkhbat",
  shortName: "Todd",
  formalName: "Tsogt Enkhbat",
  location: "New York",
  tagline: "Physics, space systems, and building things that last",
  opener: "Hi, I'm Todd and",
  openerEmphasis: "Nomos",
  openerTail: "takes all my attention, currently",
  letter:
    "I study Philosophy and Physics at Columbia University as a John Jay Scholar, aspiring to establish intelligence in space and expand our conscious timescale in the universe. I take inspiration from Brendan Mccord's idea of a Benjamin-Franklin-like figure who is a philosopher founder. During my entrepreneurial quests, I've accumulated $1M in profits across 4–5 businesses in Central Asia as a teen founder. Previously Harvard Smithsonian and ONDO Space (Seraphim-backed) and collaborating with Princeton Space Physics, NASA JPL, and Brown.",
  education:
    "Education — Columbia College, B.A. Physics; minors Philosophy & AI · John Jay Scholar · Funded research: Black Hole Explorer",
  emails: {
    academic: "tsogt.e@columbia.edu",
    academicAlt: "te2346@columbia.edu",
    personal: "todd.enkhbat@gmail.com"
  },
  social: {
    linkedin: "https://www.linkedin.com/in/tsogt-enkhbat",
    x: "https://x.com/the_tallerpoppy",
    instagramPersonal: "https://www.instagram.com/tsokue___/?hl=en",
    instagramPro: "https://www.instagram.com/todd.enk/",
    goodreads: "https://www.goodreads.com/user/show/189398350-tsogt-enkhbat",
    letterboxd: "https://letterboxd.com/",
    nomos: "https://nomosorbital.com"
  }
};

export const nav: LinkItem[] = [
  { label: "Main", href: "/" },
  { label: "Portfolio", href: "/work" },
  { label: "Nomos", href: "/nomos" },
  { label: "Publications", href: "/publications" },
  { label: "Feeding the Mind", href: "/feeding-the-mind" },
  { label: "Calendar", href: "/calendar" },
  { label: "Contact", href: "/contact" }
];

export const linkedReferences: LinkItem[] = [
  { label: "Columbia", href: "https://college.columbia.edu", external: true },
  {
    label: "John Jay Scholar",
    href: "https://college.columbia.edu/alumni/jj-scholars-program",
    external: true
  },
  { label: "Brendan Mccord", href: "https://brendanmccord.com", external: true },
  { label: "Harvard Smithsonian", href: "https://cfa.harvard.edu", external: true },
  { label: "ONDO Space", href: "https://ondospace.com", external: true },
  { label: "Seraphim", href: "https://seraphim.vc", external: true },
  {
    label: "Princeton Space Physics",
    href: "https://spacephysics.princeton.edu",
    external: true
  },
  { label: "NASA JPL", href: "https://jpl.nasa.gov", external: true },
  { label: "Brown", href: "https://brown.edu", external: true }
];

export const sections: LinkItem[] = [
  { label: "Portfolio", href: "/work" },
  { label: "Nomos", href: "/nomos" },
  { label: "Publications", href: "/publications" },
  { label: "Feeding the Mind", href: "/feeding-the-mind" },
  { label: "Calendar", href: "/calendar" },
  { label: "Contact", href: "/contact" }
];

export const work: WorkItem[] = [
  {
    id: "nomos",
    title: "Nomos Orbital",
    role: "Founder",
    place: "New York, NY",
    dates: "June 2026 – Present",
    featured: true,
    blurb: "Solo founder — source-backed mission planning across satellite, ground & cloud",
    summary:
      "Building Nomos Orbital: a source-backed mission planner that turns space-data objectives into infrastructure plans across satellite, ground, and cloud — with labeled gaps instead of false execution claims. Solo founder across research, product, and engineering.",
    achievements: [
      "Shipped full-stack MVP: FastAPI, Next.js, Python SDK, PostGIS; real SGP4/Skyfield contact windows",
      "Columbia 30-page policy, research, and technology review set the capability boundary before product claims",
      "Secured $25,000 in grant funding; live planning + provenance; provider execution labeled until integrated"
    ],
    tags: [
      "Founder · solo",
      "Mission planning",
      "SGP4 · provenance",
      "FastAPI · Next.js · SDK",
      "$25k grant"
    ],
    href: "/nomos",
    externalHref: "https://nomosorbital.com"
  },
  {
    id: "trex",
    title: "T-REX Black Hole Explorer",
    role: "Founding Engineer",
    place: "Providence / distributed",
    dates: "April 2025 – Present",
    featured: true,
    blurb:
      "Founding engineer on T-REX — LEO VLBI SmallSat for the first video of a black hole. NASA NIAC final round. CAD, thermal/structural, and subsystem integration across Brown, JPL, Princeton, MIT Lincoln Lab, Columbia, and Utah State.",
    summary:
      "Helped secure $175,000 in NASA NIAC funding for T-REX (Time-Resolving Explorer): an 86 GHz LEO VLBI SmallSat mission aiming to capture time-resolved videos of Sgr A*. Collaboration spans NASA JPL, Princeton Space Physics, MIT Lincoln Lab, Brown, Columbia, and Utah State.",
    achievements: [
      "Lead CAD modeling of subsystems from T-REX published research: thermal and structural analyses, quantum-link architectures, observation simulations, data-downlink calculations, and multi-institution integration",
      "Mission targets ≤10% spin/mass constraints on Sgr A* via ~22-minute temporal resolution at 86 GHz"
    ],
    tags: [
      "NASA NIAC — $175k",
      "LEO VLBI · BH video",
      "CAD · thermal · structural",
      "86 GHz · ~87 kg",
      "Multi-institution collaboration"
    ],
    href: "/work/trex",
    externalHref: "https://www.t-rexsat.org"
  },
  {
    id: "plasma",
    title: "Columbia Plasma Physics Laboratory",
    role: "Undergraduate Researcher",
    blurb: "Undergraduate Researcher — stellarator coils & turbulence",
    summary:
      "Undergraduate research on stellarator coils and plasma turbulence at Columbia’s Plasma Physics Laboratory.",
    achievements: [],
    tags: ["Stellarator", "Turbulence", "Plasma"]
  },
  {
    id: "ares",
    title: "Autonomous Red-Planet Experimental Shelter",
    role: "NASA RASC-AL · ARES",
    place: "NASA RASC-AL",
    dates: "2025",
    blurb:
      "Columbia ARES — autonomous Martian habitat for 2037: ISRU, AERODOME, site selection, mass/power budgets.",
    summary:
      "As part of Columbia’s ARES project for NASA RASC-AL, I worked across mission architecture, ISRU systems, materials engineering, and scientific modeling to help design a fully autonomous Martian habitat deployable by 2037. I contributed to the mission’s two-phase structure, site-selection logic, and scientific rationale — integrating radar mapping, cryospheric analysis, and terrain constraints for an ice-rich landing zone. Technical work centered on ISRU (scaling NASA’s MOXIE for atmospheric generation, adapting Aqua Factorem for Martian ice, regolith chemistry for geopolymer cement), the auxetic AERODOME (TPU–aerogel–ETFE layering, pressurization, thermal/radiation performance), Kilopower reasoning, and failure-mode logic for robotics, autonomy, thermal loops, and regolith-printing. Beyond subsystems, I helped validate integrated mass/power budgets, TRL assessments, risk mitigation, and the end-to-end construction sequence (SPEAR, RASSOR, continuous 3D printing under the pressurized dome) under Starship payload limits and NASA’s Moon-to-Mars objectives.",
    achievements: [
      "Mission architecture: two-phase structure, site-selection logic, radar/cryosphere/terrain constraints for ice-rich landing",
      "ISRU: MOXIE scaling, Aqua Factorem ice extraction, regolith chemistry for geopolymer cement in 3D-printed interiors",
      "AERODOME: TPU–aerogel–ETFE layering, pressurization behavior, thermal/radiation performance",
      "Systems: Kilopower reasoning; failure modes for robotics, autonomy, thermal loops, regolith-printing",
      "Integration: mass/power budgets, TRL assessments, SPEAR / RASSOR / dome printing sequence"
    ],
    tags: ["ISRU", "AERODOME", "RASC-AL", "2037"],
    href: "/work/ares"
  },
  {
    id: "halo",
    title: "HALO Space Solar Gimbal",
    role: "Design & Engineering — Helios Precision",
    dates: "2026",
    blurb: "3-DOF parallel pointing platform for CubeSat solar arrays",
    summary:
      "Designed and assembled a 3-arm parallel pointing platform for CubeSat solar arrays — tip, tilt, and heave from base-mounted steppers. Mechanism built and wired; firmware blocked before powered actuation.",
    achievements: [
      "Onshape CAD through multiple iterations; PLA 3-arm frame printed and assembled",
      "3× NEMA 17 + A4988 breadboard wiring; LDR quad-array mounted",
      "Retired sub-100g mass claim; reclassified from 2-axis gimbal to 3-DOF parallel manipulator"
    ],
    tags: ["Parallel kinematics", "CubeSat", "Rapid prototyping"],
    href: "/work/halo"
  },
  {
    id: "rocketry",
    title: "Columbia Space Initiative Rocketry",
    role: "Mechanical Engineer · Ablatives",
    dates: "2025",
    blurb: "Ablative-engineering pipeline for 6-inch hybrid — phenolic liners, regression rigs, DAQ",
    summary:
      "At CSI Rockets I helped transform the propulsion program by building a real ablative-engineering pipeline—moving from slow, inconsistent homemade materials to a research-grade thermal protection system for our 6-inch hybrid rocket. I led the shift to phenolic chamber liners, designed the bonding and interface architecture for the CC–nozzle transition, and developed testing infrastructure: ablative regression rigs, mold/CAD tooling, resin-mixing protocols, and thermocouple-instrumented heat-flux characterization. This established the team’s first reproducible, data-driven method for measuring ablation rate, char formation, and thermal penetration under high pressure and extreme heat.",
    achievements: [
      "Phenolic chamber liners and CC–nozzle bonding / interface architecture",
      "Ablative regression rigs, mold/CAD tooling, resin-mixing protocols (resole/novolac, microballoon fillers)",
      "Thermocouple-instrumented heat-flux characterization (K-type TC, MAX31855, Arduino DAQ)",
      "First reproducible ablation-rate / char / thermal-penetration measurement method for the team"
    ],
    tags: ["Ablatives", "Hybrid", "500-psi class", "Materials"],
    href: "/work/csi",
    externalHref: "https://columbiaspace.org/missions/rockets/"
  },
  {
    id: "thrive",
    title: "Thrive Agritech (YC)",
    role: "GTM Strategy Intern",
    place: "New York / remote",
    dates: "October 26, 2025 – December 14, 2025",
    featured: true,
    blurb: "GTM Strategy Intern — Leamington expansion, 100+ calls, infrastructure positioning",
    summary:
      "Led market intelligence and GTM strategy for Thrive’s expansion into Canadian controlled-environment agriculture at a critical inflection point. Through 100+ calls, primary research, and an expert interview, I mapped Leamington—the largest greenhouse cluster in North America—as a concentrated power structure with specific gatekeepers (OGVG, BioPhi), trust networks, and decision-making patterns that structurally block cold outreach. I developed a GTM strategy centered on positioning Thrive as greenhouse power infrastructure rather than a lighting vendor competing head-on with Philips, plus a lighthouse-customer path: land 2–3 credible installs, use validators to de-risk, then scale through local partners.",
    achievements: [
      "Mapped Leamington market structure: gatekeepers (OGVG, BioPhi), trust networks, relationship-gated outreach",
      "Strategic reframe: position as greenhouse power infrastructure, not fixture brand vs Philips",
      "Lighthouse customer strategy: 2–3 credible installs → validators → local partners",
      "100+ calls, primary research, and expert interview for expansion diligence"
    ],
    tags: ["GTM", "YC S15", "Leamington", "CEA"],
    href: "/work/thrive",
    externalHref: "https://www.thriveagritech.com"
  },
  {
    id: "ondo",
    title: "ONDO Space · GerGrid",
    role: "Intern · CEO shadowing & product",
    place: "ONDO Space",
    dates: "Summer 2025",
    featured: true,
    blurb: "CEO-level shadowing with Nami Bold; GerGrid RF/GIS network-planning platform",
    summary:
      "As an intern at ONDO Space I worked directly under CEO Nami Bold—shadowing strategic negotiations, partner discussions, and internal decision-making while contributing to research, design validation, technical documentation, and geospatial tool architecture. I educated the broader team on space-tech, satellite infrastructure, and telecom principles; co-developed investor pitches and financial projections; and participated in C-suite conversations shaping long-term strategy. On GerGrid, I helped design an AI-driven telecom network-planning platform fusing ArcGIS terrain models, satellite imagery, population density, and usage data for tower placement and coverage simulations—spanning geospatial modeling, RF optimization with 3D ray-tracing, data engineering, and B2B/B2G SaaS positioning.",
    achievements: [
      "CEO shadowing (Nami Bold): negotiations, partner discussions, pivot planning, investor pitches",
      "Team education on space industry, satellite coverage, and RF fundamentals",
      "GerGrid: ArcGIS DEM/DSM, land-use, RF propagation, 3D ray-tracing, spatial analytics",
      "Differentiator: automated planning replacing slow manual workflows; CAPEX/coverage simulation",
      "ONDO Holding investor pitch (Aug 18, 2025) — research experience incorporating ONDO Space"
    ],
    tags: ["ONDO", "GerGrid", "RF", "GIS", "Seraphim"],
    href: "/work/ondo",
    externalHref: "https://ondospace.com"
  },
  {
    id: "micc",
    title: "MICC Capital",
    role: "IB Summer Analyst · Industrials",
    place: "Mongolia",
    dates: "2025",
    featured: true,
    blurb: "8-week IB program — nine deliverables; Gobi HK & Erdenes Tavan Tolgoi on Capital IQ",
    summary:
      "Over an intensive 8-week program I produced nine research deliverables—including two full professional equity research reports on Gobi HK and Erdenes Tavan Tolgoi, both published on S&P Capital IQ—with financial modeling, forecasting, valuation, and ESG analysis. I ran weekly global and domestic market updates, deep dives across Mongolia’s major sectors (commodities, mining, dairy, beverages, fintech, retail, consumer goods), and contributed to Information Memoranda for StorePay and Sartoria. Work spanned DCF, comps, bond-issuance exercises, negotiation workshops, and Business Model Canvas practice, including negotiation case studies with INSEAD MBAs.",
    achievements: [
      "Nine research deliverables; two equity reports (Gobi HK, Erdenes Tavan Tolgoi) on S&P Capital IQ",
      "Weekly market updates; sector deep dives across commodities, mining, dairy, beverages, fintech, retail, consumer",
      "IM drafting for StorePay and Sartoria; bond issuance exercises; negotiation workshops",
      "DCF, comps, ESG/risk analysis, executive-ready research writing"
    ],
    tags: ["IB", "Capital IQ", "Industrials", "DCF"],
    href: "/work/micc",
    externalHref: "https://en.micc.mn"
  },
  {
    id: "mars-v",
    title: "MARS-V",
    role: "Core Member · Design & Engineering",
    place: "Mongolia / MDRS Utah",
    dates: "September 2023 – February 2025",
    featured: true,
    blurb: "EVA suit engineering for MDRS; raised $5.8M for Mars-analog infrastructure",
    summary:
      "Led EVA-suit prototyping with UCCS collaborators for Utah’s MDRS; raised $5.8M via investment proposals and in-person campaigns for a Mars-analog effort.",
    achievements: [
      "Led EVA suit research and engineering with UCCS scientists for MDRS",
      "Raised $5.8M in commitments across 4,500+ stakeholders and 8,000 km of campaigns",
      "Public lecture (MARS-V Spot, 1,000+ attendees) and national documentary coverage"
    ],
    tags: ["EVA", "MDRS", "Mars analog", "$5.8M"],
    href: "/work/mars-v",
    externalHref: "https://www.mars-v.com"
  },
  {
    id: "balloon-summit",
    title: "International Space Balloon Summit",
    role: "Organizer",
    place: "Ulaanbaatar, Mongolia",
    dates: "March 21–22, 2024",
    featured: true,
    blurb:
      "Two-day summit under presidential patronage — public balloon launch + scientific conference",
    summary:
      "The Mongolian Space Research and Science Agency organized the International Space Balloon Summit on March 21–22, 2024, under the patronage of the President of Mongolia. Co-organized with the Ministry of Digital Development, Innovation, and Communications, Koosen Technology College of MUST, New Mongol Technology College, Mongol Koosen, and partner institutions. Day 1: public space balloon launch at the 360 Archery Range of the National Park (10AM, March 21). Day 2: Space Balloon Scientific Conference.",
    achievements: [
      "Summit under patronage of the President of Mongolia",
      "Co-organized with Ministry of Digital Development, Innovation, and Communications and academic partners",
      "Public Day-1 balloon launch at National Park; Day-2 scientific conference"
    ],
    tags: ["Balloon", "Outreach", "Conference", "Mongolia"],
    href: "/work/balloon-summit",
    externalHref: "https://www.facebook.com/marsapage/videos/646521701496242/"
  },
  {
    id: "starry-tours",
    title: "Starry Tours Mongolia",
    role: "Founder",
    place: "Mongolia",
    dates: "2023–2024",
    blurb: "First establishment of astro-tourism in Mongolia — dark skies, telescopes, nomadic sky culture",
    summary:
      "Founded Starry Tours Mongolia — the country’s first dedicated astro-tourism project — to bring astronomy engagement and unconventional night-sky experiences to travelers and local audiences under some of Asia’s darkest skies.",
    achievements: [
      "Established Mongolia’s first dedicated astro-tourism offering",
      "Designed experiences around dark-sky viewing, astronomy engagement, and nomadic sky culture",
      "Connected public outreach with observational astronomy in steppe and desert settings"
    ],
    tags: ["Astro-tourism", "Outreach", "Dark skies", "Mongolia"],
    href: "/work/starry-tours"
  },
  {
    id: "kublai",
    title: "Kublai Institute of Astrophysics",
    role: "Astrophysics Research Intern",
    place: "Mongolia",
    dates: "June 2023 – March 2024",
    blurb: "Sole research intern — penumbral lunar eclipses under cosmonaut Gurragchaa",
    summary:
      "Only research intern at Mongolia’s astronomy observatory under guidance of the first cosmonaut from Mongolia, Mr. Gurragchaa — penumbral lunar eclipse studies and planetarium commentary.",
    achievements: [
      "Penumbral lunar eclipse observational studies and time-series analysis",
      "Research assistant and planetarium commentator",
      "Sole research intern under cosmonaut Gurragchaa"
    ],
    tags: ["Astronomy", "Eclipses", "Planetarium"],
    href: "/work/kublai"
  },
  {
    id: "cfa",
    title: "Harvard & Smithsonian CfA",
    role: "Exoplanet Research Apprentice",
    place: "Massachusetts, United States",
    dates: "2022",
    featured: true,
    blurb: "Exoplanet habitability — TESS; K2-18b; Exofast on Canon cluster",
    summary:
      "Assessed habitability of K2-18b (temperate super-Earth, 124 ly) using TESS data and Exofast modeling on Harvard’s Canon cluster; sourced NASA Exoplanet Archive and ExoFOP.",
    achievements: [
      "Analyzed K2-18b mass, orbit, and atmospheric conditions with Exofast",
      "Examined planetary and stellar properties of the host star",
      "Ran computations on Harvard’s Canon cluster using NASA archive / ExoFOP data"
    ],
    tags: ["Exoplanets", "TESS", "CfA", "K2-18b"],
    href: "/work/cfa",
    externalHref: "https://cfa.harvard.edu"
  },
  {
    id: "hur",
    title: "HUR. (EdTech)",
    role: "COO & Founder",
    place: "Ulaanbaatar, Mongolia",
    dates: "April 2024 – November 2025",
    featured: true,
    blurb: "COO & Founder — $46k funding, 120+ colleges, student research hub",
    summary:
      "Founded and scaled an education and research startup building a global student community across 120+ colleges — mentorship, funding access, and peer collaboration.",
    achievements: [
      "Secured $46,000 in funding; built a team of 22 educators and staff",
      "Networked 120+ colleges; lectured 1,100 students with nationwide reach",
      "Funded student-led research and hosted speakers for real-world projects"
    ],
    tags: ["EdTech", "Founder", "$46k"],
    href: "/work/hur",
    externalHref: "https://all-hur.com"
  },
  {
    id: "trend-mart",
    title: "Trend Mart Group",
    role: "Founder & CEO",
    place: "Ulaanbaatar, Mongolia",
    dates: "2017 – 2024",
    featured: true,
    blurb: "Founder from age 12 — $1M+ revenue, #1 toy seller, 4 locations, zero funding",
    summary:
      "Bootstrapped Trend Mart Group as a vertically integrated, omnichannel consumer retail company across three brand verticals in Ulaanbaatar. Founded in 2017 and strategically wound down in 2024 when I transitioned to Columbia. At peak: $1M+ lifetime revenue over 7 years, ~50% gross margins, entirely self-funded, 50 employees hired (peak headcount 15), 60+ SKUs, 100K+ organic social followers, 4 retail locations (Shangrilla Mall, Hunnu Mall, Urgoo 2 Cinema district, Sukhbaatar Square), and #1 toy seller in Mongolia in a single calendar year. Brands: Trend Mart (toys), Smart Kids (English literacy bookstore), Home Essentials (home/lifestyle). Product sourcing was hands-on in China without speaking Chinese—manufacturer negotiation, SKU curation, and supplier relationships built on the ground.",
    achievements: [
      "$1M+ lifetime revenue; ~50% gross margins; zero external funding",
      "#1 toy seller in Mongolia in a single calendar year; 60+ SKUs",
      "4 flagship locations including Shangrilla and Hunnu Mall; peak team of 15",
      "Omnichannel + Facebook Live commerce; China sourcing without speaking Chinese",
      "Strategic wind-down for Columbia — exit on own terms, not failure"
    ],
    tags: ["Retail", "Founder", "$1M+", "Toys"],
    href: "/work/trend"
  }
];

export const portfolioRows: PortfolioRow[] = [
  {
    year: "2026",
    cards: [
      {
        id: "nomos",
        title: "Nomos Orbital",
        role: "Founder · Mission Planning",
        label: "Nomos",
        description:
          "Solo founder — source-backed mission planner across satellite, ground & cloud. $25k grant. FastAPI · Next.js · SGP4.",
        image: "/paper-assets/nomos-card-hero.png",
        href: "/nomos"
      },
      {
        id: "trex",
        title: "T-REX Black Hole Explorer",
        role: "Founding Engineer",
        label: "T-REX",
        description:
          "NASA NIAC final round; CAD, thermal/structural analysis, and subsystem integration for LEO VLBI black-hole video mission with Brown, JPL, Princeton, MIT LL, Columbia.",
        image: "/paper-assets/trex-diagram.jpg",
        href: "/work/trex"
      },
      {
        id: "halo",
        title: "HALO Space Solar Gimbal",
        role: "Rapid Prototyping",
        label: "HALO",
        description:
          "3-DOF parallel pointing platform for CubeSat solar arrays — tip, tilt, and heave from one compact mechanism.",
        image: "/paper-assets/halo-hero.jpg",
        href: "/work/halo"
      },
      {
        id: "csi",
        title: "CSI Rocketry, Ablative Liners",
        role: "Mechanical Eng.",
        label: "CSI",
        description:
          "Ablative pipeline for 6-inch hybrid — phenolic liners, regression rigs, TC heat-flux DAQ, CC–nozzle interface.",
        image: "/paper-assets/csi-hero.jpg",
        href: "/work/csi"
      }
    ]
  },
  {
    year: "2025",
    cards: [
      {
        id: "thrive",
        title: "Thrive Agritech, Horticulture (YC-backed Startup)",
        role: "GTM Strategy Intern",
        label: "Thrive",
        description:
          "Leamington CEA expansion — mapped gatekeepers, infrastructure positioning vs lighting vendor, lighthouse installs; 100+ calls.",
        image: "/paper-assets/thrive-hero.jpg",
        href: "/work/thrive"
      },
      {
        id: "ondo",
        title: "ONDO Space · GerGrid",
        role: "Intern · Product",
        label: "GerGrid",
        description:
          "CEO shadowing with Nami Bold; GerGrid AI telecom planning — ArcGIS, RF ray-tracing, tower placement & coverage simulation.",
        image: "/paper-assets/gergrid-hero.jpg",
        href: "/work/ondo"
      },
      {
        id: "micc",
        title: "MICC Capital, Industrials Investment Banking",
        role: "IB Analyst",
        label: "MICC",
        description:
          "Nine deliverables in 8 weeks; Gobi HK & Erdenes Tavan Tolgoi equity reports on Capital IQ; IMs for StorePay & Sartoria.",
        image: "/paper-assets/micc-hero.jpg",
        href: "/work/micc"
      },
      {
        id: "ares",
        title: "NASA Martian Habitat Mission Design",
        role: "NASA RASC-AL",
        label: "ARES",
        description:
          "Columbia ARES — autonomous Martian habitat for 2037: ISRU, AERODOME, site selection, mass/power budgets under Starship limits.",
        image: "/paper-assets/ares-dome.png",
        href: "/work/ares"
      }
    ]
  },
  {
    year: "2024",
    cards: [
      {
        id: "balloon-summit",
        title: "International Space Balloon Summit",
        role: "Organizer",
        label: "Balloon Summit",
        description:
          "March 21–22, 2024 — presidential patronage; public balloon launch at National Park + scientific conference with ministry and university co-organizers.",
        image: "/paper-assets/balloon-summit-launch.jpg",
        href: "/work/balloon-summit"
      },
      {
        id: "hur",
        title: "HUR. EdTech",
        role: "Founder & COO",
        label: "HUR.",
        description:
          "Secured $46k funding; built a team of 22; networked 120+ colleges for student research, mentorship, and real-world projects.",
        image: "/paper-assets/hur-hero.jpg",
        href: "/work/hur"
      },
      {
        id: "mars-v",
        title: "MARS-V",
        role: "Design & Engineering",
        label: "MARS-V",
        description:
          "Led EVA suit engineering for Utah’s MDRS analog station; raised $5.8M via investment proposal and 8,000 km of in-person campaigns.",
        image: "/paper-assets/marsv-hero.png",
        href: "/work/mars-v"
      }
    ]
  },
  {
    year: "2023",
    cards: [
      {
        id: "starry-tours",
        title: "Starry Tours Mongolia",
        role: "Founder · Astro-Tourism",
        label: "Starry Tours",
        description:
          "First dedicated astro-tourism project in Mongolia — dark-sky experiences, astronomy engagement, and nomadic sky culture.",
        image: "/paper-assets/starry-tours-hero.jpg",
        imagePosition: "center 40%",
        href: "/work/starry-tours"
      },
      {
        id: "kublai",
        title: "Kublai Institute",
        role: "Assistant Researcher",
        label: "Kublai",
        description:
          "Sole intern — penumbral lunar eclipses and planetarium work under cosmonaut Gurragchaa.",
        image: "/paper-assets/kublai-stars.jpg",
        href: "/work/kublai"
      }
    ]
  },
  {
    year: "2022",
    cards: [
      {
        id: "cfa",
        title: "Harvard & Smithsonian CfA, Exoplanet Research",
        role: "Exoplanet Researcher",
        label: "CfA",
        description:
          "K2-18b habitability with TESS + Exofast on Harvard’s Canon cluster; NASA Exoplanet Archive / ExoFOP data.",
        image: "/paper-assets/cfa-k218b.jpg",
        href: "/work/cfa"
      }
    ]
  },
  {
    year: "2018",
    cards: [
      {
        id: "trend-mart",
        title: "Trend Mart Group",
        role: "Founder & CEO",
        label: "Trend Mart",
        description:
          "From age 12: $1M+ revenue, #1 toy seller in Mongolia, 4 locations, ~50% margins, zero funding — wound down for Columbia.",
        image: "/paper-assets/trend-hero.jpg",
        href: "/work/trend"
      }
    ]
  }
];

export const organizationLinks: LinkItem[] = [
  { label: "T-REX", href: "https://www.t-rexsat.org", external: true },
  {
    label: "Harvard & Smithsonian CfA",
    href: "https://cfa.harvard.edu",
    external: true
  },
  {
    label: "Columbia Space Initiative",
    href: "https://columbiaspace.org",
    external: true
  },
  { label: "Thrive Agritech", href: "https://www.thriveagritech.com", external: true },
  { label: "ONDO Space", href: "https://ondospace.com", external: true },
  { label: "MICC", href: "https://en.micc.mn", external: true },
  { label: "Seraphim", href: "https://seraphim.vc", external: true },
  { label: "Brown", href: "https://brown.edu", external: true },
  { label: "NASA JPL", href: "https://jpl.nasa.gov", external: true },
  {
    label: "Princeton Space Physics",
    href: "https://spacephysics.princeton.edu",
    external: true
  }
];

export const nomos = {
  hero: {
    label: "NOMOS / NEW YORK / EST. 2026",
    headline: "Intelligence should not end where Earth ends.",
    lede:
      "Nomos develops systems for preserving, extending, and operating intelligence beyond a single planet."
  },
  continuity: {
    label: "01 / THE CONTINUITY PROBLEM",
    headline: "Civilization has no backup.",
    body:
      "Knowledge is distributed across people and machines, but all of it remains exposed to the same planetary failure modes. Preservation requires distance, redundancy, and systems that can act without waiting for Earth."
  },
  cortex: {
    label: "02 / ORBITAL CORTEX / SYSTEM MODEL",
    headline: "A three-loop architecture for independent operation.",
    body:
      "The system is designed around what breaks first beyond Earth: situational awareness, institutional memory, and decisions made across communications delay.",
    loops: [
      ["Sense", "Fuse local sensors and orbital context into a usable model of what is changing now."],
      ["Preserve", "Keep operational context intact across custodians, tools, and time."],
      ["Decide", "Make bounded decisions and act when communication is delayed or unavailable."]
    ]
  },
  requirements: [
    ["Preserve context", "Keep source, provenance, and relationships intact—not just files."],
    ["Operate under delay", "Make bounded decisions without assuming continuous human supervision."],
    ["Distribute failure", "Move critical capability beyond one organization, network, or planet."]
  ],
  research: [
    ["R-01", "Memory under entropy", "How do ideas retain provenance and structure as tools, institutions, and custodians change?", "ACTIVE / FOUNDATION"],
    ["R-02", "Human–machine continuity", "What information must persist for a future intelligence to understand—not merely inherit—human intent?", "ACTIVE / ANALYSIS"],
    ["R-03", "Autonomy with limits", "How should an off-world system decide when communication is delayed, ambiguous, or unavailable?", "BUILD / CORTEX"],
    ["R-04", "Civilizational redundancy", "Which capabilities must exist beyond Earth before distance becomes resilience rather than isolation?", "SCOPING / ORBITAL"],
    ["R-05", "Meaning as infrastructure", "Can a shared narrative coordinate long projects without claiming permanence, authority, or final truth?", "OPEN / SYMPOSIUM"]
  ],
  program: [
    ["Orbital Cortex MVP", "Define the minimum sensing, memory, and decision loops. Status: architecture in development."],
    ["Mission architecture and constraints", "Map what must be independent before distance can become resilience."],
    ["Off-world continuity research", "Test the assumptions that bind memory, autonomy, and operational context."],
    ["External review and test partners", "Build with critique, verification, and real constraints in view."]
  ]
};

export const publications: PublicationPiece[] = [
  {
    id: "nova-x-columbia",
    title: "NOVA X Tour #2: Columbia",
    titleLines: ["NOVA X Tour #2:", "Columbia Campus"],
    date: "2026-05-23",
    month: "MAY",
    year: "2026",
    category: "YOUTUBE",
    meta: "May 2026 school tour and interview.\nNOVA X SPACE · Columbia University.",
    summary: "A Mongolian-language campus walkthrough of Columbia — and what US admissions actually weighs.",
    intro:
      "NOVA X SPACE invited me onto campus for a tour built for a Mongolian audience: the quads most people photograph, the dining halls and late libraries that actually set the pace of a week, and the quieter corners official tours skip. The conversation then turns to how a US application gets built — essays, recommendations, and the signals schools at this level quietly care about.",
    body:
      "The piece is less a glossy brochure than a working map. I walk through Columbia as it is lived day to day, then unpack the admissions path that got me there without pretending there is a single hack. Viewers get orientation for life on campus and a candid read on what matters when you are applying from abroad — useful whether you are a student, a parent, or someone still deciding if this kind of school is worth the climb.",
    tags: ["YOUTUBE", "INTERVIEW"],
    image: "/paper-assets/pub-nova-columbia.png",
    href: "https://youtu.be/_CKEw4vLGpM",
    linkLabel: "WATCH ON YOUTUBE ↗",
    reach: "~5K VIEWS",
    featureLayout: "letterbox"
  },
  {
    id: "unread-journal",
    title: "UNREAD Journal",
    date: "2026-03-17",
    month: "MARCH",
    year: "2026",
    category: "PRESS",
    meta: "March 2026 profile.\nUNREAD Today · national print and digital.",
    summary: "National profile in Mongolia’s leading newsroom — Columbia Physics, T-REX, and Sgr A*.",
    intro:
      "UNREAD Today placed me in Journal, the profile slot reserved for people shaping Mongolia’s next chapter. The feature follows a day in New York as a Columbia Physics student and T-REX teammate working toward the first recording of the Milky Way’s black hole, Sagittarius A*.",
    body:
      "The piece sits at the intersection of national press and hard science: how a Mongolian student ends up on a collaboration that touches NASA, MIT, Princeton, and a generation of black-hole imaging work. It ran in newsprint across the country and online for a much wider audience — a rare look at frontier astrophysics told through a day, not a press release. For readers who only know the headlines, it is the grounded version of how that work actually feels.",
    tags: ["PRESS", "JOURNAL"],
    image: "/paper-assets/pub-unread-source.png",
    href: "https://unread.today/c/journal-tsogt",
    linkLabel: "READ ON UNREAD ↗",
    reach: "10K PRINT · ~100K VIEWS",
    figures: [
      {
        image: "/paper-assets/pub-unread-print.png",
        kicker: "Figure · Printed edition",
        caption: "Ran in newsprint — 10,000 copies nationwide."
      }
    ],
    featureLayout: "letterbox"
  },
  {
    id: "deeptech-decoded",
    title: "Deeptech Decoded",
    titleLines: ["Deeptech", "Decoded"],
    date: "2026-01-01",
    month: "JANUARY",
    year: "2026",
    category: "PODCAST",
    meta: "Founding member · ongoing series.\nStartup and frontier intelligence network.",
    summary: "Startup and frontier intelligence network — kitchen-table talks at the deeptech edge.",
    intro:
      "Deeptech Decoded is a founding project I help run: a startup and frontier intelligence network that turns long, honest conversations with builders into a usable reasoning layer. We sit with founders, researchers, and operators who are building what does not yet have a manual — quantum, orbital infrastructure, AGI, and product taste at the frontier.",
    body:
      "The series lives as podcast, newsletter, and video on purpose. Short clips travel; the long form is where the actual judgment sits. Guests are not booked for hype cycles — they are people shipping hard technical work, and the point of the room is to cancel noise between what sounds exciting and what is actually true. If you want the surface-level version of deeptech, this is the wrong feed. If you want the kitchen-table version of how frontier teams think, it is built for that.",
    tags: ["PODCAST", "NEWSLETTER", "FOUNDING"],
    image: "/paper-assets/pub-deeptech-decoded.png",
    href: "https://deeptech-decoded.com/",
    linkLabel: "VISIT DEEPTECH DECODED ↗",
    featureLayout: "letterbox"
  },
  {
    id: "johnathan-bi",
    title: "Johnathan Bi: Machiavelli Lecture",
    titleLines: ["Johnathan Bi:", "Machiavelli Lecture"],
    date: "2025-10-01",
    month: "OCTOBER",
    year: "2025",
    category: "PHILOSOPHY",
    meta: "October 2025 lecture dialogue.\nPolitical philosophy and the history of ideas.",
    summary: "A dialogue on Machiavelli, stability, and the politics of expansion.",
    intro:
      "A lecture dialogue with Johnathan Bi on Machiavelli and the history of political thought — less a book report than a live argument about how states hold together. We move through Spartan institutional stasis, Roman perpetual growth, and Machiavelli’s willingness to use calculated disorder as a tool of rule.",
    body:
      "The conversation is about the trade-offs every political order eventually faces: conserve what works and risk stagnation, or expand and risk tearing the fabric that made expansion possible. Machiavelli sits in the middle of that tension, and the lecture treats him as a strategist of institutions rather than a cartoon of ruthlessness. It is philosophy for people who care about power as it is practiced — and about what kind of disorder a republic can survive.",
    tags: ["PHILOSOPHY", "LECTURE"],
    image: "/paper-assets/pub-1.png",
    linkLabel: "WATCH ON YOUTUBE ↗",
    featureLayout: "letterbox"
  },
  {
    id: "coolppl",
    title: "Coolppldoingcoolthings",
    date: "2025-08-01",
    month: "AUGUST",
    year: "2025",
    category: "INTERVIEWS",
    meta: "August 2025 interview series.\nColumbia Entrepreneurship media.",
    summary: "Columbia Entrepreneurship series filming builders in motion.",
    intro:
      "Coolppldoingcoolthings is Columbia Entrepreneurship’s interview series for builders who are mid-flight — not polished after the fact. Long conversations about projects, timelines, and the rhythm of space-tech work get cut into something a social audience will actually finish.",
    body:
      "The format is deliberate: enough length to hear how someone actually thinks, enough edit to survive Instagram. My segment sits inside that larger series — future plans, the work on the table, and the less glamorous cadence of shipping under uncertainty. It is less a highlight reel than a working portrait of how early builders talk when the camera is rolling and the next milestone is still unearned.",
    tags: ["INTERVIEWS", "ENTREPRENEURSHIP"],
    image: "/paper-assets/pub-2.png",
    href: "https://www.instagram.com/reel/DWfFiXGChkw",
    linkLabel: "VIEW ON INSTAGRAM ↗",
    reach: "~20K TOTAL VIEWS",
    featureLayout: "letterbox"
  },
  {
    id: "ondo-space",
    title: "ONDO Space on CNN",
    titleLines: ["ONDO Space", "on CNN"],
    date: "2025-02-03",
    month: "FEBRUARY",
    year: "2025",
    category: "CNN",
    meta: "February 2025 · CNN World.\nMongolia’s first commercial space startup.",
    summary: "CNN on Mongolia’s first commercial space startup — satellites for the steppe.",
    intro:
      "CNN’s World desk featured ONDO Space — Mongolia’s first commercial space startup — and the bet that CubeSats can bring real connectivity to herders across the steppe. The segment follows the company from cleanroom to orbit: Mongolia’s flag on signed flight hardware, partners on Transporter rideshares, and a system meant for livestock tracking where terrestrial networks simply end.",
    body:
      "ONDO Space is building affordable satellite connectivity out of Ulaanbaatar with operations that already reach the US and Japan. The company put Mongolia’s first commercial satellites on a SpaceX Falcon 9 in March 2024 and is working toward a much larger constellation — the CNN piece is the public face of that arc. Around the headline sit the partnerships that make the hardware real: Exolaunch and Spire on the launch path, plus strategic MOUs with New Space Intelligence on integrated space data and connectivity, and with ispace on future lunar collaboration from Mongolia. The materials below are for anyone who wants the press cut, the partner announcements, or the launch footage beyond the CNN frame.",
    tags: ["CNN", "SPACE", "MONGOLIA"],
    image: "/paper-assets/pub-ondo-flag.jpg",
    href: "https://edition.cnn.com/2025/02/03/world/video/mongolia-ondo-space-satellite-spc-hnk",
    linkLabel: "WATCH ON CNN ↗",
    // CNN’s player is not iframe-embeddable; launch footage plays on-page, CNN is the headline link.
    videoEmbed: "https://www.youtube.com/embed/XYtd6zP3DHQ",
    figures: [
      {
        image: "/paper-assets/pub-ondo-cleanroom.jpg",
        kicker: "Figure · Cleanroom",
        caption:
          "Cleanroom integration ahead of a Transporter rideshare — ONDO CubeSats on the bench with Exolaunch and Spire."
      },
      {
        image: "/paper-assets/pub-ondo-satellite.jpg",
        kicker: "Figure · Flight hardware",
        caption:
          "ONDO CubeSat chassis — the commercial hardware behind Mongolia’s first private satellites."
      }
    ],
    relatedLinks: [
      {
        label: "New Space Intelligence × ONDO MoU",
        href: "https://www.newspaceint.com/post/ondospace"
      },
      {
        label: "ispace × ONDO lunar collaboration",
        href: "https://www.ispace-inc.com/2024/12/04/ispace-signs-memorandum-of-understanding-with-ondo-space-to-strategically-collaborate-for-future-lunar-programs-in-mongolia/"
      },
      {
        label: "ONDO satellite launch footage",
        href: "https://youtu.be/XYtd6zP3DHQ?si=X_RpIeefF3VtgNfz"
      }
    ],
    featureLayout: "letterbox"
  },
  {
    id: "mars-v-spot",
    title: "MARS V SPOT",
    date: "2024-06-01",
    month: "JUNE",
    year: "2024",
    category: "LECTURE",
    meta: "June 2024 public lecture.\nGovernment of Mongolia collaboration.",
    summary: "Public science lecture on Mars ambition — 1,000+ in the room, national TV after.",
    intro:
      "MARS V SPOT was a public scientific lecture tying research work to humanity’s longer bet on Mars. Delivered with the Government of Mongolia to an official audience of more than a thousand people, then carried further by Mongolian National Television.",
    body:
      "The talk was built for a room that was not already inside the aerospace bubble: why analog programs matter, what a national audience should take from Mars as more than a slogan, and how scientific work on Earth connects to that horizon. Speaking to a thousand people under government partnership, then watching the same material travel on national broadcast, is a different kind of publication than a paper — it is science as public argument.",
    tags: ["LECTURE", "MARS"],
    image: "/paper-assets/pub-4.png",
    href: "https://www.mars-v.com",
    linkLabel: "VISIT MARS-V ↗",
    reach: "1,000+ ATTENDEES",
    featureLayout: "inset"
  },
  {
    id: "mars-is-not-far",
    title: "Mars is not far II",
    titleLines: ["Mars is", "not far II"],
    date: "2024-04-01",
    month: "APRIL",
    year: "2024",
    category: "DOCUMENTARY",
    meta: "April 2024 documentary.\nNational broadcast on 13 TV outlets.",
    summary: "Documentary on the MARS-V analog program — aired on thirteen national outlets.",
    intro:
      "Mars is not far II follows the MARS-V analog program and the people trying to turn Mars from a headline into something you can train for. The film treats the desert as a rehearsal space — logistics, stress, and the human texture of a frontier that is still mostly imagination.",
    body:
      "Rather than a tech demo, the documentary stays with the crew and the country around them: why Mongolia hosts this kind of work, what an analog mission asks of people, and how a national audience meets space when it arrives as television instead of a TED talk. It aired across thirteen outlets — a wide net for a story that is usually locked inside specialist circles.",
    tags: ["DOCUMENTARY", "MONGOLIA"],
    image: "/paper-assets/pub-3.png",
    linkLabel: "WATCH DOCUMENTARY ↗",
    featureLayout: "inset"
  }
];

export const feedingTheMind: MindColumn[] = [
  {
    label: "Reading",
    items: [
      "Buddhist & classic philosophy",
      "Political philosophy",
      "Jazz scores & composition notes",
      "Visual arts references"
    ]
  },
  {
    label: "Projects",
    items: [
      "Black Hole Explorer research",
      "Stellarator coil experiments",
      "Music composition sketches"
    ]
  }
];

/** Columbia Contemporary Civilization shelves (CC1101 / CC1102). */
export const mindShelves: MindShelf[] = [
  {
    id: "fall",
    label: "Fall",
    code: "CC1101",
    meta: "Ancient to early modern",
    books: [
      {
        id: "republic",
        title: "Republic",
        author: "Plato",
        cover: "/paper-assets/books/republic.jpg"
      },
      {
        id: "nicomachean-ethics",
        title: "Nicomachean Ethics",
        author: "Aristotle",
        cover: "/paper-assets/books/nicomachean-ethics.jpg"
      },
      {
        id: "politics",
        title: "Politics",
        author: "Aristotle",
        cover: "/paper-assets/books/politics.jpg"
      },
      {
        id: "letter-to-menoeceus",
        title: "Letter to Menoeceus",
        author: "Epicurus",
        cover: "/paper-assets/books/letter-to-menoeceus.jpg",
        spineLabel: "Menoeceus"
      },
      {
        id: "handbook",
        title: "Handbook",
        author: "Epictetus",
        cover: "/paper-assets/books/handbook.jpg"
      },
      {
        id: "meditations",
        title: "Meditations",
        author: "Marcus Aurelius",
        cover: "/paper-assets/books/meditations.jpg"
      },
      {
        id: "city-of-god",
        title: "City of God",
        author: "Augustine",
        cover: "/paper-assets/books/city-of-god.jpg"
      },
      {
        id: "quran",
        title: "The Qur'an",
        author: "",
        cover: "/paper-assets/books/quran.jpg",
        spineLabel: "The Qur'an"
      },
      {
        id: "hayy-ibn-yaqzan",
        title: "Hayy Ibn Yaqzan",
        author: "Ibn Tufayl",
        cover: "/paper-assets/books/hayy-ibn-yaqzan.jpg",
        spineLabel: "Hayy Ibn Yaqzan"
      },
      {
        id: "rescuer-from-error",
        title: "The Rescuer from Error",
        author: "Al-Ghazali",
        cover: "/paper-assets/books/rescuer-from-error.jpg",
        spineLabel: "Rescuer from Error"
      },
      {
        id: "muqaddimah",
        title: "Muqaddimah",
        author: "Ibn Khaldun",
        cover: "/paper-assets/books/muqaddimah.jpg"
      },
      {
        id: "city-of-ladies",
        title: "The Book of the City of Ladies",
        author: "Christine de Pizan",
        cover: "/paper-assets/books/city-of-ladies.jpg",
        spineLabel: "City of Ladies"
      },
      {
        id: "prince",
        title: "The Prince",
        author: "Machiavelli",
        cover: "/paper-assets/books/prince.jpg",
        spineLabel: "The Prince"
      },
      {
        id: "discourse-on-method",
        title: "Discourse on Method",
        author: "Descartes",
        cover: "/paper-assets/books/discourse-on-method.jpg",
        spineLabel: "Discourse"
      },
      {
        id: "leviathan",
        title: "Leviathan",
        author: "Hobbes",
        cover: "/paper-assets/books/leviathan.jpg"
      },
      {
        id: "second-treatise",
        title: "Second Treatise of Government",
        author: "Locke",
        cover: "/paper-assets/books/second-treatise.jpg",
        spineLabel: "Second Treatise"
      },
      {
        id: "discourse-on-inequality",
        title: "Discourse on Inequality",
        author: "Rousseau",
        cover: "/paper-assets/books/discourse-on-inequality.jpg",
        spineLabel: "Inequality"
      },
      {
        id: "social-contract",
        title: "The Social Contract",
        author: "Rousseau",
        cover: "/paper-assets/books/social-contract.jpg",
        spineLabel: "Social Contract"
      }
    ]
  },
  {
    id: "spring",
    label: "Spring",
    code: "CC1102",
    meta: "Modern political thought",
    books: [
      {
        id: "wealth-of-nations",
        title: "The Wealth of Nations",
        author: "Adam Smith",
        cover: "/paper-assets/books/wealth-of-nations.jpg",
        spineLabel: "Wealth of Nations"
      },
      {
        id: "groundwork",
        title: "Groundwork of the Metaphysics of Morals",
        author: "Immanuel Kant",
        cover: "/paper-assets/books/groundwork.jpg",
        spineLabel: "Groundwork"
      },
      {
        id: "what-is-enlightenment",
        title: "What is Enlightenment?",
        author: "Immanuel Kant",
        cover: "/paper-assets/books/what-is-enlightenment.jpg",
        spineLabel: "Enlightenment"
      },
      {
        id: "vindication",
        title: "A Vindication of the Rights of Woman",
        author: "Mary Wollstonecraft",
        cover: "/paper-assets/books/vindication.jpg",
        spineLabel: "Vindication"
      },
      {
        id: "democracy-in-america",
        title: "Democracy in America",
        author: "Alexis de Tocqueville",
        cover: "/paper-assets/books/democracy-in-america.jpg",
        spineLabel: "Democracy"
      },
      {
        id: "narrative-douglass",
        title: "Narrative of the Life of Frederick Douglass",
        author: "Frederick Douglass",
        cover: "/paper-assets/books/narrative-douglass.jpg",
        spineLabel: "Douglass"
      },
      {
        id: "on-liberty",
        title: "On Liberty",
        author: "John Stuart Mill",
        cover: "/paper-assets/books/on-liberty.jpg"
      },
      {
        id: "marx-engels-reader",
        title: "The Marx-Engels Reader",
        author: "Karl Marx & Friedrich Engels",
        cover: "/paper-assets/books/marx-engels-reader.jpg",
        spineLabel: "Marx-Engels"
      },
      {
        id: "genealogy-of-morals",
        title: "On the Genealogy of Morals",
        author: "Friedrich Nietzsche",
        cover: "/paper-assets/books/genealogy-of-morals.jpg",
        spineLabel: "Genealogy"
      },
      {
        id: "civilization-and-its-discontents",
        title: "Civilization and Its Discontents",
        author: "Sigmund Freud",
        cover: "/paper-assets/books/civilization-and-its-discontents.jpg",
        spineLabel: "Civilization"
      },
      {
        id: "souls-of-black-folk",
        title: "The Souls of Black Folk",
        author: "W.E.B. Du Bois",
        cover: "/paper-assets/books/souls-of-black-folk.jpg"
      },
      {
        id: "annihilation-of-caste",
        title: "Annihilation of Caste",
        author: "B.R. Ambedkar",
        cover: "/paper-assets/books/annihilation-of-caste.jpg",
        spineLabel: "Ambedkar"
      },
      {
        id: "hind-swaraj",
        title: "Hind Swaraj",
        author: "M.K. Gandhi",
        cover: "/paper-assets/books/hind-swaraj.jpg"
      },
      {
        id: "second-sex",
        title: "The Second Sex",
        author: "Simone de Beauvoir",
        cover: "/paper-assets/books/second-sex.jpg",
        spineLabel: "Second Sex"
      },
      {
        id: "wretched-of-the-earth",
        title: "The Wretched of the Earth",
        author: "Frantz Fanon",
        cover: "/paper-assets/books/wretched-of-the-earth.jpg",
        spineLabel: "Fanon"
      },
      {
        id: "human-condition",
        title: "The Human Condition",
        author: "Hannah Arendt",
        cover: "/paper-assets/books/human-condition.jpg",
        spineLabel: "Arendt"
      },
      {
        id: "letter-birmingham",
        title: "Letter from Birmingham Jail",
        author: "Martin Luther King Jr.",
        cover: "/paper-assets/books/letter-birmingham.jpg",
        spineLabel: "Birmingham Jail"
      },
      {
        id: "discipline-and-punish",
        title: "Discipline and Punish",
        author: "Michel Foucault",
        cover: "/paper-assets/books/discipline-and-punish.jpg",
        spineLabel: "Foucault"
      }
    ]
  }
];

export const calendarLanes: CalendarLane[] = [
  {
    label: "Now",
    dates: "Aug 2 – 8",
    title: "New York, NY",
    note: "Around Columbia. Very open to coffee, walks, and first conversations before the West Coast trip.",
    tone: "solid",
    open: true
  },
  {
    label: "Next",
    dates: "Aug 8 – 20",
    title: "San Francisco, CA",
    note: "In the Bay — happy to meet founders, researchers, and curious people while I'm there.",
    tone: "dashed",
    open: true
  },
  {
    label: "Then",
    dates: "Aug 20 – 26",
    title: "Los Angeles, CA",
    note: "Down in LA. Reach out if you're around — conversation or coffee welcome.",
    tone: "dashed",
    open: true
  },
  {
    label: "After",
    dates: "Aug 26 – Sep 1",
    title: "Seattle · Redmond · Washington",
    note: "Pacific Northwest stretch across Seattle, Redmond, and the broader Washington area.",
    tone: "dashed",
    open: true
  },
  {
    label: "Later",
    dates: "Sep 23 – 24",
    title: "Off World — Houston",
    note: "I'll be at Payload's Off World summit at NASA's Space Center Houston — the annual gathering on the businesses of the space frontier (lunar economy, cislunar infrastructure, and what's next beyond Earth).",
    tone: "event",
    open: true,
    org: "Payload",
    href: "https://payloadspace.com/event/off-world/",
    logo: "/paper-assets/events/payload-logo-pro.svg",
    image: "/paper-assets/events/off-world-summit.jpg"
  }
];

export const contactChannels: LinkItem[] = [
  {
    label: "Academic Email",
    note: "tsogt.e@columbia.edu",
    href: "mailto:tsogt.e@columbia.edu"
  },
  {
    label: "LinkedIn",
    note: "Professional profile",
    href: "https://www.linkedin.com/in/tsogt-enkhbat",
    external: true
  },
  {
    label: "X",
    note: "@the_tallerpoppy",
    href: "https://x.com/the_tallerpoppy",
    external: true
  },
  {
    label: "Instagram · Personal",
    note: "@tsokue___",
    href: "https://www.instagram.com/tsokue___/?hl=en",
    external: true
  },
  {
    label: "Instagram · Professional",
    note: "@todd.enk",
    href: "https://www.instagram.com/todd.enk/",
    external: true
  },
  {
    label: "Nomos Orbital",
    note: "Company site",
    href: "https://nomosorbital.com",
    external: true
  },
  {
    label: "Goodreads",
    note: "Reading list",
    href: "https://www.goodreads.com/user/show/189398350-tsogt-enkhbat",
    external: true
  },
  {
    label: "Letterboxd",
    note: "Film diary",
    href: "https://letterboxd.com/",
    external: true
  }
];

export type ContactMapItem = LinkItem & { glyph: string };

export const contactMap: { left: ContactMapItem[]; right: ContactMapItem[] } = {
  left: [
    {
      label: "Academic Email",
      note: "tsogt.e@columbia.edu",
      href: "mailto:tsogt.e@columbia.edu",
      glyph: "@"
    },
    {
      label: "LinkedIn",
      note: "Professional profile",
      href: "https://www.linkedin.com/in/tsogt-enkhbat",
      external: true,
      glyph: "in"
    },
    {
      label: "Instagram · Personal",
      note: "@tsokue___",
      href: "https://www.instagram.com/tsokue___/?hl=en",
      external: true,
      glyph: "◎"
    },
    {
      label: "Goodreads",
      note: "Reading list",
      href: "https://www.goodreads.com/user/show/189398350-tsogt-enkhbat",
      external: true,
      glyph: "G"
    }
  ],
  right: [
    {
      label: "X Profile",
      note: "@the_tallerpoppy",
      href: "https://x.com/the_tallerpoppy",
      external: true,
      glyph: "𝕏"
    },
    {
      label: "Instagram · Professional",
      note: "@todd.enk",
      href: "https://www.instagram.com/todd.enk/",
      external: true,
      glyph: "◎"
    },
    {
      label: "Nomos Orbital",
      note: "Company site",
      href: "https://nomosorbital.com",
      external: true,
      glyph: "N"
    },
    {
      label: "Letterboxd",
      note: "Film diary",
      href: "https://letterboxd.com/",
      external: true,
      glyph: "LB"
    }
  ]
};

export const trainings = [
  {
    id: "philosophy",
    title: "Philosophical Training",
    subtitle: "Philosophy Foundation + Interest",
    body: "Contemporary Civilization and the history of ideas — reading for institutions, power, and what a civilization must remember to remain free.",
    image: "/paper-assets/train-armillary.png"
  },
  {
    id: "physics",
    title: "Physics Training",
    subtitle: "Physics Foundation + Interest",
    body: "Columbia Physics with research toward black-hole observation, plasma systems, and the engineering constraints of putting instruments off Earth.",
    image: "/paper-assets/train-column.png"
  }
];
