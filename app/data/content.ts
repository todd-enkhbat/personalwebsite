export type LinkItem = {
  label: string;
  href: string;
  external?: boolean;
};

export type WorkItem = {
  id: string;
  title: string;
  role: string;
  place: string;
  dates: string;
  summary: string;
  achievements: string[];
  tags: string[];
  href?: string;
};

export type Publication = {
  title: string;
  source: string;
  date?: string;
  href: string;
};

export type MindItem = {
  title: string;
  kind: string;
  note: string;
  href?: string;
};

export type CalendarItem = {
  title: string;
  when: string;
  where: string;
  note: string;
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
  letter: `I study Philosophy and Physics at Columbia University as a John Jay Scholar, aspiring to establish intelligence in space and expand our conscious timescale in the universe. I take inspiration from Brendan Mccord's idea of a Benjamin-Franklin-like figure who is a philosopher founder. During my entrepreneurial quests, I've accumulated $1M in profits across 4–5 businesses in Central Asia as a teen founder. Previously Harvard Smithsonian and ONDO Space (Seraphim-backed) and collaborating with Princeton Space Physics, NASA JPL, and Brown.`,
  education:
    "Columbia College, B.A. Physics; minors Philosophy & AI · John Jay Scholar · Funded research: Black Hole Explorer",
  emails: {
    academic: "te2346@columbia.edu",
    academicAlt: "tsogt.e@columbia.edu",
    personal: "todd.enkhbat@gmail.com"
  },
  social: {
    linkedin: "https://www.linkedin.com/in/tsogt-enkhbat",
    x: "https://x.com/the_tallerpoppy",
    instagram: "https://www.instagram.com/tsokue___/?hl=en",
    threads: "https://www.threads.com/@tsokue___",
    goodreads: "https://www.goodreads.com/user/show/189398350-tsogt-enkhbat",
    facebook: "https://www.facebook.com/profile.php?id=61580637770769"
  }
};

export const nav: LinkItem[] = [
  { label: "Main", href: "/" },
  { label: "Work", href: "/work" },
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
  { label: "Work", href: "/work" },
  { label: "Nomos", href: "/nomos" },
  { label: "Publications", href: "/publications" },
  { label: "Feeding the Mind", href: "/feeding-the-mind" },
  { label: "Calendar", href: "/calendar" },
  { label: "Contact", href: "/contact" }
];

export const work: WorkItem[] = [
  {
    id: "trex",
    title: "T-REX Black Hole Explorer",
    role: "Founding Engineer",
    place: "Providence / distributed",
    dates: "March 2025 – Present",
    summary:
      "Helped secure $175,000 in NASA NIAC funding for a quantum satellite mission aimed at black hole imaging. The collaboration spans NASA JPL, Princeton Space Physics, MIT Lincoln Lab, Brown, Columbia, and Utah State — PhD researchers, engineers, and a founding team still small enough that every drawing matters.",
    achievements: [
      "Lead CAD modeling of subsystems drawn from T-REX published research",
      "Thermal and structural analyses for flight hardware",
      "Quantum-link architectures and observation simulations",
      "Data-downlink calculations and integration work that turns papers into hardware that can fly"
    ],
    tags: [
      "NASA NIAC — $175k",
      "Quantum satellite · BH imaging",
      "CAD · thermal · structural",
      "Quantum-link architecture",
      "Observation & downlink sims",
      "Multi-institution collaboration"
    ],
    href: "/work/trex"
  },
  {
    id: "csi-propulsion",
    title: "Columbia Space Initiative",
    role: "Propulsion Engineer",
    place: "New York, NY",
    dates: "Sep 2025 – Present",
    summary:
      "Ablatives testing, 3D manufacturing, and assembling rockets with Columbia’s collegiate space team.",
    achievements: [
      "Thermal liner and ablative material iteration",
      "DAQ and chamber instrumentation for static fires",
      "Competition-oriented hybrid engine integration"
    ],
    tags: ["Propulsion", "Ablatives", "DAQ", "Hybrid engines"]
  },
  {
    id: "ondo",
    title: "ONDO Space",
    role: "Engineering & Business Development Intern",
    place: "Mongolia / remote",
    dates: "Jul 2025 – Aug 2025",
    summary:
      "Supported Mongolia’s first space-tech startup (Seraphim Mission 15) on SOS satellites and infrastructure; proposed AI + ArcGIS network planning to cut ground-link costs.",
    achievements: [
      "Low-cost satellite bus development support",
      "Ground-link cost reduction concepts",
      "Investor-facing technical narrative"
    ],
    tags: ["Satellites", "Seraphim-backed", "Ground networks"]
  },
  {
    id: "thrive",
    title: "Thrive Agritech",
    role: "GTM Strategy Intern (YC-backed)",
    place: "New York, NY",
    dates: "Sep 2025 – Dec 2025",
    summary:
      "Due diligence, market research, B2B sales, and competitive intelligence for a YC-backed horticulture lighting company.",
    achievements: [
      "Market and competitive intelligence",
      "B2B GTM support",
      "Climate / agtech positioning"
    ],
    tags: ["GTM", "Climate tech", "YC"]
  },
  {
    id: "hur",
    title: "HUR. EdTech",
    role: "COO & Founder",
    place: "Mongolia / global",
    dates: "Apr 2024 – Nov 2025",
    summary:
      "Founded and scaled an education platform connecting Mongolian students with mentorship, funding, and research opportunities across 120+ colleges.",
    achievements: [
      "Reached ~$30K monthly revenue in the first quarter",
      "Built mentorship and funding access loops",
      "Hosted speakers and peer collaboration infrastructure"
    ],
    tags: ["EdTech", "Founder", "Community"]
  },
  {
    id: "mars-v",
    title: "MARS-V / MARSA",
    role: "Design & Engineering Officer",
    place: "Mongolia / MDRS",
    dates: "2023 – 2025",
    summary:
      "Raised commitments for a Mars analog effort and led EVA suit prototyping tested at MDRS with UCCS collaborators.",
    achievements: [
      "$5.8M commitments for Mars analog concepts",
      "EVA suit prototype leadership",
      "Analog research operations"
    ],
    tags: ["Mars analog", "EVA", "MDRS"]
  },
  {
    id: "cfa",
    title: "Harvard & Smithsonian CfA",
    role: "Exoplanet Research Apprentice",
    place: "Cambridge, MA",
    dates: "2022",
    summary:
      "Assessed habitability of K2-18b using TESS data and Exofast modeling on Harvard’s Canon cluster.",
    achievements: [
      "Mass, orbit, and atmosphere analysis for K2-18b",
      "NASA Exoplanet Archive / ExoFOP sourcing",
      "Cluster-scale computation"
    ],
    tags: ["Exoplanets", "TESS", "CfA"]
  },
  {
    id: "trend-mart",
    title: "Trend Mart",
    role: "Founder",
    place: "Central Asia",
    dates: "2018 – 2024",
    summary:
      "Scaled a teen-run retail and e-commerce group across multiple locations, funding schooling and later ventures.",
    achievements: [
      "$800K+ revenue",
      "3 locations, 40+ employees",
      "Capital base for later space and edtech work"
    ],
    tags: ["Retail", "E-commerce", "Teen founder"]
  }
];

export const nomos = {
  title: "Nomos",
  status: "Current focus",
  lede: "Nomos is the venture that currently takes all of Todd’s attention — the long-horizon attempt to establish intelligence in space and expand our conscious timescale in the universe.",
  body: [
    "The name points at law, order, and the rules that make a durable civilization possible — not only on Earth, but wherever humans and machines extend presence.",
    "It sits at the intersection of Todd’s training in physics and philosophy, his founder operating history, and the conviction that space systems need both engineering rigor and a Benjamin-Franklin-like philosopher-founder imagination.",
    "Details remain in motion. This page is the placeholder for the work that is absorbing the present."
  ],
  pillars: [
    {
      title: "Intelligence beyond Earth",
      note: "Systems that perceive, decide, and persist off-world."
    },
    {
      title: "Conscious timescale",
      note: "Expanding the horizon on which civilization can plan and remember."
    },
    {
      title: "Philosopher founder craft",
      note: "Company-building as an intellectual and civilizational project."
    }
  ]
};

export const publications: Publication[] = [
  {
    title: "T-REX Mission Proposal (NASA NIAC)",
    source: "Mission Consortium",
    date: "2025",
    href: "https://www.t-rexsat.org"
  },
  {
    title: "Elon Musk & Genghis Khan in HR Execution",
    source: "LinkedIn Essay",
    date: "Nov 2025",
    href: "https://www.linkedin.com/in/tsogt-enkhbat"
  },
  {
    title: "Notes from the NYSE Space Summit",
    source: "LinkedIn",
    date: "2026",
    href: "https://www.linkedin.com/in/tsogt-enkhbat"
  },
  {
    title: "MICC Spotlight Feature",
    source: "Mongolia International Capital Corp",
    date: "Aug 2025",
    href: "https://www.facebook.com/profile.php?id=61580637770769"
  },
  {
    title: "Deeptech Decoded — conversations on space infrastructure",
    source: "Series / events",
    date: "2026",
    href: "https://www.linkedin.com/in/tsogt-enkhbat"
  }
];

export const feedingTheMind: MindItem[] = [
  {
    title: "UNREAD",
    kind: "Shelf",
    note: "A living stack of books and papers waiting for attention — philosophy, physics, and founder craft."
  },
  {
    title: "Mars is not far II",
    kind: "Essay thread",
    note: "Continuing thoughts on proximity, absurdity, and the cultural shock of becoming multi-planetary."
  },
  {
    title: "Coolppl",
    kind: "People",
    note: "Thinkers and builders worth studying — from Brendan Mccord’s philosopher-founder ideal to peers in space systems."
  },
  {
    title: "MARS V SPOT",
    kind: "Field note",
    note: "Analog research, EVA culture, and what harsh terrain teaches about durable systems."
  },
  {
    title: "Origins and Meaning",
    kind: "Notebook",
    note: "Explanation, entropy, spacetime, mind, language, belief, art, and the search for meaning."
  },
  {
    title: "Goodreads",
    kind: "Library",
    note: "Public reading trail.",
    href: "https://www.goodreads.com/user/show/189398350-tsogt-enkhbat"
  }
];

export const philosophyTopics = [
  "Explanation, Truth, Inevitability",
  "Entropy and Time",
  "Time, Space, and Einstein",
  "The Origin of the Universe",
  "The Quantum Revolution and the Nature of the Future",
  "Evolution and Life",
  "The Origin of Mind",
  "Language and Story",
  "Brains and Belief",
  "Art and Transcendence",
  "The Future",
  "In Search of Meaning"
];

export const calendar: CalendarItem[] = [
  {
    title: "GLOBES — University of Cambridge",
    when: "Summer 2026",
    where: "Corpus Christi, Cambridge",
    note: "Global Behavioral Science program on whether AI can reduce climate skepticism and inspire action."
  },
  {
    title: "T-REX mission development",
    when: "Ongoing",
    where: "Providence / distributed",
    note: "CAD, thermal/structural work, quantum-link architecture, and multi-lab coordination."
  },
  {
    title: "Columbia Space Initiative propulsion",
    when: "Academic year",
    where: "Columbia University",
    note: "Ablatives, manufacturing, and hybrid engine testing cadence."
  },
  {
    title: "Deeptech Decoded conversations",
    when: "Seasonal",
    where: "New York / online",
    note: "Public conversations on space infrastructure, founders, and commercial viability."
  }
];

export const contactChannels: LinkItem[] = [
  { label: "Email (Columbia)", href: "mailto:te2346@columbia.edu" },
  { label: "Email (personal)", href: "mailto:todd.enkhbat@gmail.com" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/tsogt-enkhbat",
    external: true
  },
  { label: "X", href: "https://x.com/the_tallerpoppy", external: true },
  {
    label: "Instagram",
    href: "https://www.instagram.com/tsokue___/?hl=en",
    external: true
  },
  { label: "Threads", href: "https://www.threads.com/@tsokue___", external: true },
  {
    label: "Goodreads",
    href: "https://www.goodreads.com/user/show/189398350-tsogt-enkhbat",
    external: true
  }
];
