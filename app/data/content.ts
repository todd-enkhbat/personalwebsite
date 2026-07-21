export type Project = {
  id: string;
  title: string;
  year: string;
  shortDescription: string;
  overview: string;
  problem: string;
  solution: string;
  role: string[];
  stack: string[];
  impact: string[];
  media: string;
  image: string;
  href?: string;
};

export const about = {
  name: "Tsogt Enkhbat",
  intro:
    "Mongolian-born astrophysics builder at Columbia designing systems for space infrastructure, from propulsion hardware to orbital imaging ventures.",
  now: "Now: Co-authoring a NASA NIAC-backed black hole imaging mission while building product-grade interfaces for complex technical storytelling."
};

export const projects: Project[] = [
  {
    id: "trex",
    title: "T-REX Black Hole Motion Mission",
    year: "2026",
    shortDescription:
      "Mission architecture to stream real-time black hole motion using dual-satellite VLBI and quantum communication.",
    overview:
      "T-REX is a multi-institutional concept mission to capture the first real-time video of Sagittarius A*.",
    problem:
      "Current black hole images are static composites with long observation windows and limited temporal insight.",
    solution:
      "Designed a distributed observation concept with synchronized satellites, robust baseline simulation, and high-rate downlink strategy.",
    role: [
      "Co-authored technical proposal sections for architecture and operations",
      "Modeled communication and observation constraints with cross-lab collaborators",
      "Translated mission complexity into investor and grant-ready narratives"
    ],
    stack: ["Systems Design", "Orbital Modeling", "Python", "Mission Ops"],
    impact: [
      "$200K NASA NIAC Phase I grant support",
      "Cross-institution team alignment across research and industry advisors"
    ],
    media: "Mission architecture and systems simulation",
    image: "/images/project-reference-wide.png"
  },
  {
    id: "rocketry",
    title: "Columbia Rocketry Hybrid Engine Platform",
    year: "2025",
    shortDescription:
      "Thermal protection, DAQ instrumentation, and nozzle integration for a competition-ready hybrid propulsion system.",
    overview:
      "Developed propulsion subsystems focused on repeatable static fire performance under high-pressure conditions.",
    problem:
      "Engine reliability was constrained by liner degradation, incomplete telemetry, and integration risk.",
    solution:
      "Engineered ablative liner iterations, integrated thermocouple telemetry pipelines, and validated nozzle interfaces for safer testing.",
    role: [
      "Built and tested thermal liner material configurations",
      "Implemented DAQ setup for chamber temperature and erosion tracking",
      "Contributed to mechanical integration and static fire readiness"
    ],
    stack: ["Mechanical Engineering", "DAQ", "Testing", "Data Analysis"],
    impact: [
      "Improved engine robustness near 500 psi testing envelope",
      "Enabled data-driven iteration for competition qualification"
    ],
    media: "Propulsion chamber diagnostics",
    image: "/images/panel-b.gif"
  },
  {
    id: "hur",
    title: "HUR. EdTech Access Platform",
    year: "2024",
    shortDescription:
      "Launched a mentorship and funding platform connecting Mongolian students with global education opportunities.",
    overview:
      "A fast-execution product built to reduce information and network barriers for underrepresented students.",
    problem:
      "Students lacked centralized access to mentors, scholarships, and actionable pathways into top institutions.",
    solution:
      "Shipped a lean platform and operating model that connected mentorship, community, and growth loops in weeks.",
    role: [
      "Owned product strategy and end-to-end launch execution",
      "Built demand capture and engagement systems",
      "Led partnerships and growth messaging"
    ],
    stack: ["Product Design", "Growth", "Operations", "Community Systems"],
    impact: [
      "Reached ~$30K monthly revenue in first quarter",
      "Scaled access and support for high-potential students"
    ],
    media: "Growth and engagement matrix",
    image: "/images/headshot-editorial.png",
    href: "https://www.linkedin.com/in/tsogt-enkhbat"
  },
  {
    id: "haven-systems",
    title: "Haven Integration Storytelling Interface",
    year: "2026",
    shortDescription:
      "Built a structured editorial feed that translates complex hardware milestones into investor-readable updates.",
    overview:
      "Designed a publication-ready project system with a horizontal-first visual language to showcase technical integration progress.",
    problem:
      "Deep-tech updates often lose clarity when engineering teams publish fragmented snapshots across multiple channels.",
    solution:
      "Created a unified publishing layer with narrative sequencing, concise metrics, and visual hierarchy optimized for rapid review.",
    role: [
      "Defined interaction model and story architecture",
      "Built frontend components for horizontal scanning and deep dive expansion",
      "Aligned design system with premium aerospace brand references"
    ],
    stack: ["Next.js", "TypeScript", "Design Systems", "Content Architecture"],
    impact: [
      "Improved clarity of milestone communication",
      "Reduced friction between technical and non-technical stakeholders"
    ],
    media: "Editorial timeline interface",
    image: "/images/project-reference-wide.png"
  },
  {
    id: "founder-ops",
    title: "Founder Operations Playbook",
    year: "2025",
    shortDescription:
      "A decision framework for balancing mission-critical engineering timelines with product execution and hiring cadence.",
    overview:
      "Structured strategic and operating models used to pace execution across research, startup product, and cross-functional teams.",
    problem:
      "High-ambiguity environments produce execution drag when tactical decisions are disconnected from mission intent.",
    solution:
      "Developed a compact operating cadence with explicit trade-off checkpoints and communication templates for momentum.",
    role: [
      "Built the framework and implementation cadence",
      "Codified communication templates for team alignment",
      "Tracked iteration quality against execution outcomes"
    ],
    stack: ["Operations", "Product Strategy", "Systems Thinking"],
    impact: [
      "Faster decision cycles across multidisciplinary work",
      "Clearer prioritization during mission-critical periods"
    ],
    media: "Execution model and decision loops",
    image: "/images/panel-a.jpg"
  }
];

export const publications = [
  {
    title: "T-REX Mission Proposal (NASA NIAC)",
    source: "Mission Consortium",
    href: "https://www.t-rexsat.org"
  },
  {
    title: "Elon Musk & Genghis Khan in HR Execution",
    source: "LinkedIn Essay",
    href: "https://www.linkedin.com/in/tsogt-enkhbat"
  },
  {
    title: "MICC Spotlight Feature",
    source: "Mongolia International Capital Corp",
    href: "https://www.facebook.com/profile.php?id=61580637770769"
  }
];

export const writings = [
  {
    title: "Mapping Mission Progress Through Narrative Interfaces",
    source: "Personal Writing",
    date: "April 30, 2026",
    href: "https://www.linkedin.com/in/tsogt-enkhbat"
  },
  {
    title: "Building Systems That Explain Themselves",
    source: "Personal Writing",
    date: "April 18, 2026",
    href: "https://www.linkedin.com/in/tsogt-enkhbat"
  },
  {
    title: "Founders, Hardware, and Time Horizons",
    source: "Personal Writing",
    date: "March 28, 2026",
    href: "https://www.linkedin.com/in/tsogt-enkhbat"
  },
  {
    title: "Why Meaning Matters in Engineering",
    source: "Personal Writing",
    date: "March 12, 2026",
    href: "https://www.linkedin.com/in/tsogt-enkhbat"
  }
];

export const contact = {
  email: "te2346@columbia.edu",
  linkedin: "https://www.linkedin.com/in/tsogt-enkhbat",
  github: "https://github.com"
};
