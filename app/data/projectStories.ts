import type { ModelKind } from "../lib/portfolioModels";

export type ProjectMetric = { value: string; label: string; context?: string };
export type ProjectImage = { src: string; alt: string; caption: string };
export type ProjectChapter = { title: string; paragraphs: string[]; image?: number };
export type ProjectStory = {
  id: string; title: string; shortTitle?: string; lead: string; role: string; year: string;
  category: "Space" | "Business" | "Science" | "Culture";
  status: string; skills: string[]; metrics: ProjectMetric[];
  introduction: string; chapters: ProjectChapter[]; images: ProjectImage[];
  links: { label: string; href: string }[];
  model?: ModelKind; modelNote?: string;
  sequence?: { title: string; steps: { title: string; text: string }[] };
};
const asset = (name: string, caption: string, alt = caption): ProjectImage => ({ src: `/paper-assets/${name}`, caption, alt });

export const projectStories: Record<string, ProjectStory> = {
  nomos: {
    id: "nomos", title: "Nomos Orbital", year: "2026–present", category: "Space", role: "Founder · product & engineering",
    status: "Live mission-planning product", skills: ["Orbital mechanics", "Full-stack engineering", "Product design", "Research"],
    lead: "Space missions begin with a question. Nomos works out the infrastructure needed to answer it.",
    introduction: "A satellite, a ground station, and a cloud service each solve part of a mission. Planning across all three is still a separate problem. I founded Nomos Orbital to connect those decisions: start with a space-data objective, compare feasible paths, and see the evidence behind a plan.",
    metrics: [{ value: "$25k", label: "grant funding secured" }, { value: "30 pages", label: "foundational research", context: "Policy, technology, and capability review at Columbia" }],
    chapters: [
      { title: "From research to a working planner", paragraphs: ["I built the product as a solo founder, from the initial research and capability assessment through the interface, API, and Python SDK. The stack combines Next.js, FastAPI, and PostGIS; SGP4 and Skyfield calculate orbital passes and contact windows.", "The planning workflow brings public satellite catalogs, ground access, and compute choices into the same conversation. A user can inspect the sources and constraints behind a recommendation instead of receiving an unexplained answer."], image: 0 },
      { title: "Making the limits visible", paragraphs: ["The live product produces ranked, source-backed plans. It distinguishes calculated windows from catalog information and keeps missing provider capabilities visible. Booking infrastructure and executing a mission depend on provider integrations; the planner does not claim those actions have happened.", "This boundary shaped both the engineering and the interface. The useful output is a plan someone can examine, challenge, and improve."] }
    ],
    images: [asset("nomos-product.png", "The live Nomos network atlas — sourced ground stations, orbital geometry, and contact windows")],
    links: [{ label: "Open Nomos Orbital", href: "https://nomosorbital.com/" }, { label: "Explore the network atlas", href: "https://nomosorbital.com/network" }, { label: "Read the founding thesis", href: "/nomos" }],
    sequence: { title: "Inside the planning workflow", steps: [
      { title: "Objective", text: "Define the observation or space-data task and the constraints that matter to it." },
      { title: "Orbit", text: "Inspect public satellite catalogs and calculate plausible passes using SGP4 and Skyfield." },
      { title: "Ground & cloud", text: "Compare contact windows and the infrastructure needed to move and process the data." },
      { title: "Plan", text: "Review ranked options with their sources, assumptions, and unresolved provider gaps." }
    ] }
  },
  trex: {
    id: "trex", title: "T-REX Black Hole Explorer", shortTitle: "T-REX", year: "2025–present", category: "Space", role: "Founding engineer",
    status: "Student-developed mission proposal", skills: ["Satellite CAD", "Thermal & structural analysis", "Mission simulation", "Subsystem integration"],
    lead: "A small space telescope with an ambitious target: a moving image of the black hole at the center of our galaxy.",
    introduction: "Sagittarius A* changes on timescales too short for a conventional static image to capture. T-REX proposes adding a radio telescope in low Earth orbit to a ground-based network, using very-long-baseline interferometry to follow that motion. I joined as a founding engineer, translating the science requirements into a spacecraft concept.",
    metrics: [ { value: "86 GHz", label: "observing frequency", context: "Radio-band mission design" }, { value: "~22 min", label: "target time resolution", context: "Proposed black-hole imaging cadence" }, { value: "87 kg", label: "spacecraft mass", context: "Current mission concept" }, { value: "2.5 m", label: "reflector diameter", context: "January 2026 proposal" } ],
    chapters: [
      { title: "Turning an observation into a spacecraft", paragraphs: ["My work centers on CAD models of the satellite subsystems and the analyses that make them fit together. The reflector, receiver, structure, thermal environment, and downlink cannot be designed independently: a change in one alters the mission the others can support.", "I work across thermal and structural studies, observation simulations, link architectures, and data-downlink calculations. The collaboration brings together university researchers and specialists across Brown, Columbia, Princeton, JPL, MIT Lincoln Laboratory, and Utah State."], image: 0 },
      { title: "A mission built around timing", paragraphs: ["The proposed 86 GHz observations combine an orbiting telescope with ground stations to sample the black hole as it evolves. The spacecraft’s orbit, sensitivity, and data handling all have to support the roughly 22-minute imaging goal.", "T-REX is being developed as a proposal for NASA Pioneers. The mission website and technical proposal provide the current design, science case, and simulation notebooks."], image: 1 }
    ],
    images: [asset("trex-sat.jpg", "T-REX operations architecture — observation, spacecraft, and ground systems"), asset("trex-antenna.jpg", "Space-to-ground interferometry and the observing concept"), asset("trex-diagram.jpg", "Antenna design constraints from the mission study"), asset("trex-fig2.jpg", "Scientific analysis from the T-REX study")],
    links: [{ label: "Visit T-REX", href: "https://www.t-rexsat.org/" }, { label: "Read the mission proposal", href: "https://cdn.b12.io/client_media/PDpwHsnx/e3533923-ed03-11f0-b7d6-0242ac110002-T_REX_Proposal_Jan2026_2.pdf" }],
    model: "satellite", modelNote: "A geometric reconstruction of the radio-telescope concept, informed by the mission diagrams and reflector reference. Component placement is illustrative; this is not flight CAD."
  },
  ares: {
    id: "ares", title: "Autonomous Red-Planet Experimental Shelter", shortTitle: "ARES · Mars habitat", year: "2025", category: "Space", role: "Mission architecture · Columbia ARES / NASA RASC-AL",
    status: "Mission and habitat design study", skills: ["Systems engineering", "ISRU", "Materials research", "Mass & power budgets"],
    lead: "A Mars habitat that prepares itself for the people who will eventually live there.",
    introduction: "Before a crew can land, a habitat needs power, shelter, water, and a way to survive failures without immediate human help. With Columbia’s ARES team for NASA RASC-AL, I helped design an autonomous construction mission for an ice-rich site on Mars. The proposal connects the landing site to the machinery, materials, and sequence needed to make it habitable.",
    metrics: [{ value: "2037", label: "design deployment horizon", context: "Mission study target" }, { value: "2 phases", label: "deployment → occupancy", context: "Robotic preparation before crew arrival" }],
    chapters: [
      { title: "The site determines the system", paragraphs: ["I contributed to the two-phase mission architecture and site-selection logic, combining radar mapping, cryospheric analysis, and terrain constraints. Accessible ice matters because the habitat’s water supply and construction process depend on resources already present at the landing site.", "The ISRU work connected MOXIE-derived oxygen production, Aqua Factorem ice extraction, and regolith chemistry for geopolymer cement. Those systems had to support each other under the mission’s mass, power, and payload limits."], image: 0 },
      { title: "A protective shell. A printable interior.", paragraphs: ["The AERODOME study explored a layered TPU, aerogel, and ETFE enclosure with an auxetic structure. My materials and systems work considered pressurization, insulation, radiation exposure, and how the shell would protect construction inside it.", "SPEAR and RASSOR robotics prepare the site and handle regolith; continuous printing forms the interior. I helped connect that construction sequence to Kilopower reasoning, thermal loops, and failure-mode analysis."], image: 1 },
      { title: "Closing the engineering loop", paragraphs: ["I helped validate the integrated mass and power budgets, technology readiness, risk mitigation, and construction order under Starship payload limits. Each subsystem had to fit into an autonomous deployment sequence, including a response to failures in robotics, thermal loops, or regolith printing."], image: 2 }
    ],
    images: [asset("ares-dome.png", "AERODOME exterior — the team’s original Mars habitat rendering"), asset("ares-section.jpg", "Habitat section: the enclosure and the interior construction system"), asset("ares-baseaxo.jpg", "Axonometric view of the habitat arrangement"), asset("ares-topview.jpg", "Site and habitat plan"), asset("ares-flpl.jpg", "Interior floor plan"), asset("ares-elevation.jpg", "Habitat elevation"), asset("ares-outside.jpg", "Exterior architectural study")],
    links: [], model: "habitat", modelNote: "A spatial reconstruction of the project drawings: geodesic enclosure, printed modules, airlock, and surface equipment. Separate the shell to inspect the interior; dimensions are illustrative.",
    sequence: { title: "Building before the crew arrives", steps: [
      { title: "Select", text: "Use ice, terrain, and radar evidence to choose a site that supports resource extraction and landing." },
      { title: "Prepare", text: "Establish power and use SPEAR / RASSOR robotics to prepare the site and move regolith." },
      { title: "Enclose", text: "Deploy the protective AERODOME and establish the environment needed for interior construction." },
      { title: "Build", text: "Print the habitat interior and commission life-support resources before crew occupancy." }
    ] }
  },
  halo: {
    id: "halo", title: "HALO Space Solar Gimbal", shortTitle: "HALO", year: "2026", category: "Space", role: "Design & engineering · Helios Precision",
    status: "Assembled and wired prototype", skills: ["Onshape", "Mechanical design", "3D printing", "Electromechanical assembly"],
    lead: "A compact parallel mechanism for pointing a small satellite’s solar panel.",
    introduction: "HALO began with a mechanical question: could a lightweight platform point a CubeSat solar panel using three coordinated arms? I modeled the mechanism in Onshape, iterated the printed parts, assembled the structure, and wired the motors and light sensors into a physical prototype.",
    metrics: [{ value: "3 DOF", label: "platform motion", context: "Tip, tilt, and heave" }, { value: "3 × NEMA 17", label: "stepper-motor actuation", context: "Paired with A4988 drivers" }],
    chapters: [
      { title: "From CAD to the bench", paragraphs: ["The three arms connect a fixed base to a moving solar platform. The geometry, joint clearances, and printed components had to work as an assembly, so the design went through mechanical iterations before wiring.", "The prototype uses PLA parts, NEMA 17 steppers, A4988 drivers, and light sensing. Bringing those pieces together made the practical constraints of a compact pointing mechanism visible."], image: 0 },
      { title: "What the prototype established", paragraphs: ["The mechanism was assembled and wired. Powered actuation remained blocked by firmware, so I do not claim demonstrated tracking accuracy or flight readiness.", "Reviewing the geometry also corrected the initial classification: the platform supports three degrees of freedom—tip, tilt, and vertical motion. That distinction matters when defining what a controller must actually command."], image: 1 }
    ],
    images: [asset("halo-hero.jpg", "HALO mechanism — original design rendering"), asset("halo-cad.jpg", "The CAD assembly and linkage geometry")], links: [], model: "gimbal", modelNote: "A reconstruction of the three-arm assembly shown in the project CAD. The exploded view explains the mechanism; it is not a simulation of measured actuation."
  },
  "trend-mart": {
    id: "trend-mart", title: "Trend Mart Group", year: "2017–2024", category: "Business", role: "Founder & CEO",
    status: "Operated for seven years", skills: ["Product sourcing", "Retail operations", "Hiring", "Supply-chain management"],
    lead: "I started selling toys at twelve. Over seven years, that became a self-funded retail group.",
    introduction: "Trend Mart grew from a small toy business into three brands spanning toys, literacy, and home products. I built it without outside funding: selecting products, negotiating with manufacturers in China, running online sales, and opening physical locations in Ulaanbaatar. Each expansion had to be paid for by the business itself.",
    metrics: [{ value: "$1M+", label: "lifetime revenue", context: "Across seven years of operation" }, { value: "4", label: "retail locations", context: "Ulaanbaatar" }, { value: "~50%", label: "gross margin", context: "At peak operation" }, { value: "$0", label: "external funding", context: "Built from operating cash flow" }],
    chapters: [
      { title: "Learning every part of the business", paragraphs: ["I handled sourcing, supplier negotiations, product selection, logistics, and sales. The catalog grew to more than 60 SKUs, supported by an online audience of over 100,000 followers and a physical retail presence.", "As the business expanded, so did the operating work: inventory, customer service, hiring, and coordination across locations. The team reached 15 staff at peak, with more than 50 people hired over the life of the company."], image: 0 },
      { title: "Building, then choosing what came next", paragraphs: ["The group’s three brands let me serve distinct customer needs while applying the same sourcing and operating experience. It was an early education in how a product moves from a factory to a customer—and how little room there is for a mistake when the capital is your own.", "I wound down the business in 2024 to attend Columbia."] }
    ], images: [asset("trend-store.jpg", "Trend Home — brand material from the retail group")], links: []
  },
  micc: {
    id: "micc", title: "MICC Capital", year: "2025", category: "Business", role: "Investment banking summer analyst",
    status: "Research published on S&P Capital IQ", skills: ["Financial modeling", "DCF & comparable valuation", "Equity research", "Investment memoranda"],
    lead: "Turning company research into investment analysis that other people could use.",
    introduction: "At MICC, Mongolia’s investment banking and brokerage firm, I worked through an eight-week analyst program across company valuation, equity research, and transaction materials. The work moved from gathering information to forming a defensible view of a business and explaining it to an investor.",
    metrics: [{ value: "9", label: "research deliverables", context: "Completed during the analyst program" }, { value: "2", label: "published equity reports", context: "Gobi HK and Erdenes Tavan Tolgoi · S&P Capital IQ" }, { value: "8 weeks", label: "analyst program" }],
    chapters: [
      { title: "Building a view of the company", paragraphs: ["I built and interpreted financial models using discounted cash flow and comparable-company analysis, alongside sector and ESG research. The analysis needed a clear chain from business assumptions to valuation.", "Two full equity research reports—on Gobi HK and Erdenes Tavan Tolgoi—were published on S&P Capital IQ. The broader set of nine deliverables included market updates, sector research, and transaction-oriented work."] },
      { title: "Research at the pace of a deal", paragraphs: ["I also contributed to information memoranda for StorePay and Sartoria. That meant adapting the depth of the research to the question at hand: what matters about this company, how does it earn money, and what would a potential investor need to understand?", "The deliverables combined company models, valuation, sector and ESG research, weekly market updates, and investor-facing writing."] }
    ], images: [asset("micc-logo.png", "MICC — Mongolian International Capital Corporation")], links: [{ label: "Visit MICC", href: "https://en.micc.mn/" }]
  },
  "mars-v": {
    id: "mars-v", title: "MARS-V", year: "2023–2025", category: "Space", role: "Core member · design, engineering & fundraising",
    status: "Mars analog research and field campaigns", skills: ["EVA suit research", "Prototyping", "Fundraising", "Public communication"],
    lead: "Developing the equipment—and the support—for a Mars analog effort in Mongolia.",
    introduction: "MARS-V connects Mars research with the conditions and opportunities of the Mongolian landscape. My work crossed the technical and organizational sides of the effort: EVA suit research and prototyping, collaboration with UCCS for MDRS work, investment proposals, and public campaigns.",
    metrics: [{ value: "$5.8M", label: "investment commitments", context: "Campaigns for Mars analog infrastructure" }, { value: "4,500+", label: "stakeholders reached", context: "Across investment and outreach campaigns" }, { value: "8,000 km", label: "campaign travel" }, { value: "1,000+", label: "lecture audience", context: "MARS-V Spot event" }],
    chapters: [
      { title: "Equipment for work outside the habitat", paragraphs: ["I led EVA suit research and prototyping with UCCS collaborators for MDRS. The project connected design choices with the practical requirements of analog field work: people need equipment that supports observation, movement, and operations in a demanding environment."], image: 0 },
      { title: "Making the research possible", paragraphs: ["Alongside the technical work, I wrote proposals and joined in-person investment campaigns. Those campaigns reached more than 4,500 stakeholders, covered roughly 8,000 kilometers, and helped secure $5.8 million in investment commitments for analog infrastructure.", "At MARS-V Spot, I presented the effort to an audience of more than 1,000 people, alongside national media appearances. Explaining the project clearly was part of building the support it needed."], image: 1 }
    ],
    images: [asset("marsv-suit-render.jpg", "EVA suit design study"), asset("marsv-crew-field.jpg", "MARS-V analog field crew"), asset("marsv-habitat-render.jpg", "Mars analog habitat concept"), asset("marsv-analog-terrain.jpg", "The analog terrain")], links: [{ label: "Visit MARS-V", href: "https://www.mars-v.com/" }]
  },
  ondo: {
    id: "ondo", title: "ONDO Space / GerGrid", shortTitle: "ONDO Space", year: "2025", category: "Space", role: "Product & strategy intern",
    status: "Telecom planning concept and investor work", skills: ["Geospatial analysis", "RF propagation", "Product strategy", "Investor communication"],
    lead: "Connecting the physics of a communications network to the decisions that get it built.",
    introduction: "During a summer with ONDO, I worked alongside CEO Nami Bold on product strategy and investor materials. A central project was GerGrid: a concept for deciding where telecom towers should go by bringing terrain, population, demand, and radio propagation into a shared planning workflow.",
    metrics: [{ value: "3D", label: "RF propagation analysis", context: "Ray-tracing in the proposed GerGrid workflow" }],
    chapters: [
      { title: "Where should the next tower go?", paragraphs: ["A useful site is more than a point on a map. I helped shape a workflow combining ArcGIS terrain and surface models, satellite imagery, population and usage data, and radio-frequency ray tracing. The aim was to compare coverage and capital requirements before committing to a location.", "GerGrid brought a technical question—where a signal can travel—together with the commercial question of which coverage is worth building."], image: 0 },
      { title: "From technical systems to an investor story", paragraphs: ["I supported ONDO Holding’s investor pitch and helped explain satellite and telecom principles to the team. Shadowing the CEO connected the engineering work to company decisions: what the product does, why it matters, and how to describe its value precisely."], image: 1 }
    ], images: [asset("pub-ondo-cleanroom.jpg", "ONDO Space cleanroom — company project photography"), asset("pub-ondo-flag.jpg", "The ONDO Space team with its satellites"), asset("pub-ondo-satellite.jpg", "ONDO satellite reference image")],
    links: [{ label: "Visit ONDO Space", href: "https://ondospace.com/" }], model: "cubesat", modelNote: "A simplified reconstruction of the CubeSat in ONDO’s project imagery. Included to explain the hardware context; the satellite is ONDO’s work, not a claim of my hardware authorship.",
    sequence: { title: "GerGrid: from terrain to a siting decision", steps: [ { title: "Terrain", text: "Bring together elevation, surface models, and satellite imagery." }, { title: "Demand", text: "Locate population and expected network usage." }, { title: "Coverage", text: "Model RF propagation and compare candidate tower locations." }, { title: "Investment", text: "Weigh coverage against infrastructure and capital requirements." } ] }
  },
  thrive: {
    id: "thrive", title: "Thrive Agritech", year: "2025", category: "Business", role: "Go-to-market strategy intern",
    status: "Canadian market-entry strategy", skills: ["Primary research", "Market entry", "Customer discovery", "Partnership strategy"],
    lead: "Finding a path into Canada’s greenhouse industry began with understanding who growers trust.",
    introduction: "Thrive makes horticultural LED lighting. For its Canadian expansion, I focused on Leamington, Ontario, a major greenhouse cluster where technical performance alone would not win a first installation. The company needed a way into the local decision-making network.",
    metrics: [{ value: "100+", label: "primary research calls", context: "Growers, partners, and market stakeholders" }],
    chapters: [
      { title: "Mapping the people behind the market", paragraphs: ["I used primary research to identify the decision makers, industry gatekeepers, and partner relationships that shape purchasing. Organizations such as OGVG and BioPhi mattered as potential validators and routes to trusted conversations.", "I used the research to position Thrive’s lighting around greenhouse power infrastructure and facility economics, connecting the product to the investment growers were considering."], image: 0 },
      { title: "A credible first installation", paragraphs: ["I proposed a market-entry sequence built around local partners and two or three reference installations. Those installations were a strategy target, not booked sales. The recommendation gave the team a practical way to demonstrate value, build trust, and earn the next customer."], image: 1 }
    ], images: [asset("thrive-product.jpg", "Thrive’s horticultural lighting hardware"), asset("thrive-facility.jpg", "Greenhouse environment for the market-entry work")], links: [{ label: "Visit Thrive Agritech", href: "https://www.thriveagritech.com/" }]
  },
  csi: {
    id: "csi", title: "CSI Rocketry", shortTitle: "CSI · Ablative liners", year: "2025", category: "Space", role: "Mechanical engineer · Columbia Space Initiative",
    status: "Liner development and test instrumentation", skills: ["Thermal protection", "Fabrication", "Test-rig design", "Data acquisition"],
    lead: "A rocket liner is useful only if you understand how it fails under heat.",
    introduction: "For Columbia Space Initiative’s six-inch hybrid rocket, I worked on phenolic chamber liners and a repeatable way to evaluate them. The work connected material preparation and mechanical interfaces to the measurements needed to judge thermal protection.",
    metrics: [{ value: "6 in", label: "hybrid rocket diameter", context: "Chamber-liner application" }, { value: "3", label: "thermal-response measurements", context: "Ablation, char, and heat penetration" }],
    chapters: [
      { title: "The liner and its interfaces", paragraphs: ["I contributed to the chamber-liner design and nozzle-transition bonding, where the material and mechanical interface both affect performance. Fabrication included molds, resin-mixing procedures, and regression-test rigs.", "A repeatable process matters because inconsistent specimens make test results hard to compare. I helped establish the team’s first reproducible method for evaluating ablation, char formation, and thermal penetration."] },
      { title: "Turning a hot test into useful data", paragraphs: ["I instrumented heat-flux tests with thermocouples, MAX31855 interfaces, and Arduino data acquisition. The aim was to connect the observed condition of a specimen with its thermal history, so the next design decision could be based on measurements."], image: 0 }
    ], images: [asset("csi-field.jpg", "Columbia Space Initiative team in the field")], links: [{ label: "Visit CSI Rocketry", href: "https://columbiaspace.org/missions/rockets/" }]
  },
  hur: {
    id: "hur", title: "HUR. Education", year: "2024–2025", category: "Business", role: "Founder & COO",
    status: "Student research and mentorship network", skills: ["Team building", "Program operations", "Fundraising", "Education"],
    lead: "Giving students a route from academic ambition to mentors, research, and opportunity.",
    introduction: "I founded HUR and served as COO, building an education network that connected students with mentors, research projects, and funding. The operating challenge was to turn individual connections into a program that a larger community could use.",
    metrics: [{ value: "$46k", label: "funding secured" }, { value: "22", label: "educators and staff" }, { value: "120+", label: "colleges connected" }, { value: "1,100", label: "students reached", context: "Through lectures" }],
    chapters: [
      { title: "Building the organization", paragraphs: ["I assembled a 22-person team of educators and staff and helped secure $46,000 in funding. The network reached more than 120 colleges, connecting students with people and projects beyond their immediate institutions.", "As COO, I coordinated the team and program operations across mentorship, research opportunities, and student funding."], image: 0 },
      { title: "Opening the conversation", paragraphs: ["Lectures reached roughly 1,100 students, alongside invited speakers and mentorship activity. HUR’s published community posts record student milestones and program activity; they make the work visible at the scale of individual people."], image: 1 }
    ], images: [asset("hur-hero.jpg", "HUR’s education and mentorship program"), asset("hur-fb-01.jpg", "A student milestone published by HUR"), asset("hur-fb-03.jpg", "A university admission announcement from the HUR community")], links: [{ label: "Visit HUR", href: "https://all-hur.com/" }]
  },
  "balloon-summit": {
    id: "balloon-summit", title: "International Space Balloon Summit", shortTitle: "Space Balloon Summit", year: "2024", category: "Space", role: "Organizer",
    status: "Ulaanbaatar · March 21–22, 2024", skills: ["Event operations", "Institutional coordination", "Science outreach"],
    lead: "A public launch and a scientific conference brought space research into the city.",
    introduction: "I helped organize the International Space Balloon Summit in Mongolia, bringing government, universities, and space researchers together around a public launch and a scientific program. The event took place under presidential patronage with ministry and university partners.",
    metrics: [{ value: "21–22 Mar", label: "2024 summit dates", context: "Ulaanbaatar, Mongolia" }],
    chapters: [
      { title: "Science in public", paragraphs: ["The first day centered on a public balloon launch at National Park in Ulaanbaatar; the next day brought participants into a scientific conference. I helped coordinate the people and program across those two settings.", "The work was organizational: align institutions, support a public-facing event, and give researchers and students a reason to meet around the same project."], image: 0 }
    ], images: [asset("balloon-summit-poster.jpg", "The summit program and participating organizations")], links: [{ label: "Watch the summit coverage", href: "https://www.facebook.com/marsapage/videos/646521701496242/" }]
  },
  "starry-tours": {
    id: "starry-tours", title: "Starry Tours Mongolia", year: "2023–2024", category: "Culture", role: "Founder",
    status: "Astronomy tourism and public outreach", skills: ["Experience design", "Astronomy communication", "Tourism", "Entrepreneurship"],
    lead: "Mongolia’s night sky became the starting point for an astronomy tourism project.",
    introduction: "I founded Starry Tours to bring telescope viewing, astronomy, and Mongolian sky culture into a shared experience. The project served travelers and local communities, making the sky a place to learn as well as a place to visit.", metrics: [],
    chapters: [
      { title: "An experience built around looking up", paragraphs: ["I developed dark-sky viewing and guided telescope experiences, connecting the scientific account of the sky with the cultural traditions of the people who live beneath it.", "The project combined guided observation with astronomy outreach for both travelers and local communities."], image: 0 }
    ], images: [asset("starry-tours-hero.jpg", "Dark-sky setting for the astronomy tourism project")], links: []
  },
  cfa: {
    id: "cfa", title: "Harvard & Smithsonian CfA", shortTitle: "CfA · Exoplanet research", year: "2022", category: "Science", role: "Exoplanet research apprentice",
    status: "K2-18b and host-star modeling", skills: ["Light-curve analysis", "EXOFAST", "Scientific computing", "Exoplanet research"],
    lead: "Learning to study a distant planet through the measurements of its star.",
    introduction: "At the Center for Astrophysics | Harvard & Smithsonian, I studied K2-18b and its host star using TESS observations and archive data. The project introduced me to the computational work behind questions of planetary properties and potential habitability.", metrics: [],
    chapters: [
      { title: "From observations to a model", paragraphs: ["I worked with data from TESS, the NASA Exoplanet Archive, and ExoFOP, and ran EXOFAST computations on Harvard’s Canon cluster. The task was to connect observations with a model of the planet and star, while understanding the assumptions involved.", "The analysis focused on the planet and its host star, using the fitted properties to investigate questions of potential habitability."], image: 0 }
    ], images: [asset("cfa-k218b.jpg", "K2-18b — artist’s illustration of the research subject, not an observation")], links: [{ label: "Visit the Center for Astrophysics", href: "https://cfa.harvard.edu/" }],
    sequence: { title: "The research process", steps: [ { title: "Observations", text: "TESS photometry and archival information provide the starting measurements." }, { title: "Model", text: "EXOFAST computations connect the light-curve data to properties of the planet and its host star." }, { title: "Interpret", text: "Inspect the results and assumptions before relating them to questions of planetary habitability." } ] }
  },
  kublai: {
    id: "kublai", title: "Kublai Institute of Astrophysics", shortTitle: "Kublai Institute", year: "2023–2024", category: "Science", role: "Astrophysics research intern",
    status: "Research and planetarium work", skills: ["Time-series analysis", "Observational astronomy", "Science communication"],
    lead: "Research at the telescope and explanation in the planetarium belonged to the same apprenticeship.",
    introduction: "As the institute’s sole research intern during the placement, I worked under cosmonaut J. Gurragchaa as a research assistant and planetarium commentator. The role joined the analysis of astronomical observations with explaining them to a public audience.", metrics: [],
    chapters: [
      { title: "Following a lunar eclipse", paragraphs: ["My research focused on observations of a penumbral lunar eclipse over time. The work developed my experience with time-series analysis and the connection between an observed event and the data used to describe it."] },
      { title: "Making astronomy understandable", paragraphs: ["In the planetarium, I worked as a commentator, explaining astronomical objects and events to visitors. This public-facing role ran alongside my research-assistant work at the institute."] }
    ], images: [], links: []
  },
  piano: {
    id: "piano", title: "Concert Piano", year: "2016–2018 · selected performances", category: "Culture", role: "Concert pianist",
    status: "International performance and competition", skills: ["Performance", "Musical interpretation", "Long-term practice"],
    lead: "Eleven years of training, international competition, and performances at Windsor Castle and the Mongolian Philharmonic.",
    introduction: "I trained under pianist Saya Sangidorj for eleven years, performing and competing across Europe and Asia. Selected performances and competition results from 2016–2018 are collected here.",
    metrics: [{ value: "11 years", label: "piano training", context: "Under Saya Sangidorj" }, { value: "6 countries", label: "international competitions", context: "France, Spain, Italy, England, South Korea, and Russia" }],
    chapters: [
      { title: "From the practice room to the stage", paragraphs: ["My competition results include Grand Prix, gold, and silver awards. I performed at Windsor Castle and the Mongolian Philharmonic and received invitations from Carnegie Hall and the Mongolian Musical Conservatory.", "Competitions took me to France, Spain, Italy, England, South Korea, and Russia."], image: 0 }
    ], images: [asset("piano-hero.png", "Concert piano")], links: []
  }
};

export const projectOrder = ["trex", "ares", "halo", "nomos", "trend-mart", "micc", "mars-v", "ondo", "thrive", "csi", "hur", "balloon-summit", "starry-tours", "cfa", "kublai", "piano"];
export const projectPath = (id: string) => `/work/${id === "trend-mart" ? "trend" : id}`;
