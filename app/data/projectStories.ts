import type { ModelKind } from "../lib/portfolioModels";
import retainedProjectMedia from "./retainedProjectMedia.json";

export type ProjectMetric = { value: string; label: string; context?: string };
export type ProjectImage = { src: string; alt: string; caption: string };
export type ProjectChapter = { title: string; paragraphs: string[]; image?: number; supportingImages?: number[]; film?: boolean };
export type ProjectStory = {
  id: string; title: string; shortTitle?: string; lead: string; role: string; year: string;
  category: "Space" | "Business" | "Science" | "Culture";
  status: string; skills: string[]; metrics: ProjectMetric[];
  introduction: string; chapters: ProjectChapter[]; images: ProjectImage[];
  links: { label: string; href: string }[];
  model?: ModelKind; modelNote?: string;
  film?: { src: string; poster: string; caption: string };
  cover?: ProjectImage;
  website?: { href: string; label: string };
  sequence?: { title: string; steps: { title: string; text: string }[] };
};
const asset = (name: string, caption: string, alt = caption): ProjectImage => ({ src: `/paper-assets/${name}`, caption, alt });

export const projectStories: Record<string, ProjectStory> = {
  nomos: {
    id: "nomos", title: "Nomos Orbital", year: "2026–present", category: "Space", role: "Founder · product & engineering",
    status: "Space infrastructure company", skills: ["Orbital mechanics", "Full-stack engineering", "Product design", "Research"],
    lead: "A space infrastructure company connecting satellite, ground-station, and cloud capabilities.",
    introduction: "Nomos Orbital is a space infrastructure company spanning satellite, ground, and cloud systems. Its current software brings infrastructure catalogs, orbital contact calculations, and compute options into one interface, API, and Python SDK.",
    metrics: [{ value: "$25k", label: "grant funding secured" }, { value: "30 pages", label: "foundational research", context: "Policy, technology, and capability review at Columbia" }],
    chapters: [
      { title: "From research to a working planner", paragraphs: ["The product spans capability assessment, a planning interface, an API, and a Python SDK. The stack combines Next.js, FastAPI, and PostGIS; SGP4 and Skyfield calculate orbital passes and contact windows.", "The workflow compares public satellite catalogs, ground access, and compute options. Each recommendation includes the source records and constraints used to produce it."], image: 0 },
      { title: "Calculated contact windows and provider integration", paragraphs: ["The live product produces ranked, source-backed plans. It distinguishes calculated windows from catalog information and keeps missing provider capabilities visible. Booking infrastructure and executing a mission depend on provider integrations; the planner does not claim those actions have happened.", "Users can review and compare a plan before pursuing service access with providers."] }
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
    lead: "Spacecraft CAD, thermal analysis, and downlink studies for an 86 GHz radio telescope proposed to image Sagittarius A*.",
    introduction: "Sagittarius A* changes on timescales too short for a conventional static image to capture. T-REX proposes adding a radio telescope in low Earth orbit to a ground-based network, using very-long-baseline interferometry to follow that motion. The spacecraft concept translates those science requirements into engineering constraints.",
    metrics: [ { value: "86 GHz", label: "observing frequency", context: "Radio-band mission design" }, { value: "~22 min", label: "target time resolution", context: "Proposed black-hole imaging cadence" }, { value: "87 kg", label: "spacecraft mass", context: "Current mission concept" }, { value: "2.5 m", label: "reflector diameter", context: "January 2026 proposal" } ],
    chapters: [
      { title: "Reflector, thermal, and downlink design", paragraphs: ["Subsystem CAD models are developed alongside the analyses that determine how the spacecraft fits together. The reflector, receiver, structure, thermal environment, and downlink cannot be designed independently: a change in one alters the mission the others can support.", "Design studies cover thermal and structural performance, observation simulations, link architectures, and data-downlink calculations. The collaboration brings together university researchers and specialists across Brown, Columbia, Princeton, JPL, MIT Lincoln Laboratory, and Utah State."], image: 0 },
      { title: "86 GHz observations at a 22-minute cadence", paragraphs: ["The proposed 86 GHz observations combine an orbiting telescope with ground stations to sample the black hole as it evolves. The spacecraft’s orbit, sensitivity, and data handling all have to support the roughly 22-minute imaging goal.", "T-REX is being developed as a proposal for NASA Pioneers. The mission website and technical proposal provide the current design, science case, and simulation notebooks."], image: 1 }
    ],
    images: [asset("trex-sat.jpg", "T-REX operations architecture — observation, spacecraft, and ground systems"), asset("trex-antenna.jpg", "Space-to-ground interferometry and the observing concept"), asset("trex-diagram.jpg", "Antenna design constraints from the mission study"), asset("trex-fig2.jpg", "Scientific analysis from the T-REX study")],
    links: [{ label: "Visit T-REX", href: "https://www.t-rexsat.org/" }, { label: "Read the mission proposal", href: "https://cdn.b12.io/client_media/PDpwHsnx/e3533923-ed03-11f0-b7d6-0242ac110002-T_REX_Proposal_Jan2026_2.pdf" }],
    model: "satellite", modelNote: "A geometric reconstruction of the radio-telescope concept, informed by the mission diagrams and reflector reference. Component placement is illustrative; this is not flight CAD."
  },
  ares: {
    id: "ares", title: "Autonomous Red-Planet Experimental Shelter", shortTitle: "ARES · Mars habitat", year: "2025", category: "Space", role: "Mission architecture · Columbia ARES / NASA RASC-AL",
    status: "Mission and habitat design study", skills: ["Systems engineering", "ISRU", "Materials research", "Mass & power budgets"],
    lead: "A robotic Mars habitat proposal combining ice extraction, regolith construction, and power systems before crew arrival.",
    introduction: "Before a crew can land, a habitat needs power, shelter, water, and a way to survive failures without immediate human help. Columbia’s ARES proposal for NASA RASC-AL studies an autonomous construction mission for an ice-rich site on Mars. The proposal connects the landing site to the machinery, materials, and sequence needed to make it habitable.",
    metrics: [{ value: "2037", label: "design deployment horizon", context: "Mission study target" }, { value: "2 phases", label: "deployment → occupancy", context: "Robotic preparation before crew arrival" }],
    chapters: [
      { title: "Ice extraction and landing-site selection", paragraphs: ["The two-phase mission architecture and site-selection logic combine radar mapping, cryospheric analysis, and terrain constraints. Accessible ice matters because the habitat’s water supply and construction process depend on resources already present at the landing site.", "The ISRU work connected MOXIE-derived oxygen production, Aqua Factorem ice extraction, and regolith chemistry for geopolymer cement. Those systems had to support each other under the mission’s mass, power, and payload limits."], image: 0 },
      { title: "AERODOME enclosure and regolith-printed interior", paragraphs: ["The AERODOME study explored a layered TPU, aerogel, and ETFE enclosure with an auxetic structure. The materials and systems study considered pressurization, insulation, radiation exposure, and how the shell would protect construction inside it.", "SPEAR and RASSOR robotics prepare the site and handle regolith; continuous printing forms the interior. That construction sequence depends on Kilopower, thermal loops, and failure-mode analysis."], image: 1 },
      { title: "Mass, power, deployment order, and failure analysis", paragraphs: ["The integrated study evaluates mass and power budgets, technology readiness, risk mitigation, and construction order under Starship payload limits. Each subsystem had to fit into an autonomous deployment sequence, including a response to failures in robotics, thermal loops, or regolith printing."], image: 2 }
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
    lead: "A 3D-printed, motor-driven platform for pointing CubeSat solar arrays through tip, tilt, and vertical motion.",
    introduction: "A satellite’s solar panel needs to face the light while the spacecraft’s orientation changes. HALO explores a compact parallel mechanism for that problem: three arms supporting a platform that can tip, tilt, and move vertically. The physical prototype combines Onshape geometry, iterated printed parts, assembled hardware, and wired motors and light sensors.",
    metrics: [{ value: "3 DOF", label: "platform motion", context: "Tip, tilt, and heave" }, { value: "3 × NEMA 17", label: "stepper-motor actuation", context: "Paired with A4988 drivers" }],
    chapters: [
      { title: "Three-arm linkage and printed joints", paragraphs: ["Three motor-driven arms support the same platform. Moving their attachment points changes the platform’s tip, tilt, and height. The links need enough clearance to move without colliding, while the joints must fit the printed mounts and fasteners.", "The assembly was modeled in Onshape, with PLA parts iterated before assembly. The photographs show the motor mounts, paired links, and platform attachments; the CAD view shows how those components fit together."], image: 0, supportingImages: [7] },
      { title: "Motor drivers, sensing, and bench integration", paragraphs: ["The prototype uses three NEMA 17 stepper motors, A4988 drivers, an Arduino, and light sensors. The motors and sensors are wired into the assembled mechanism; the breadboards and bench supply are shown alongside the hardware.", "The video records the assembled prototype on the bench. Firmware remained a blocker before powered tracking, so the documented result is an assembled and wired mechanism, with closed-loop control still to validate."], film: true, supportingImages: [2, 4, 6] },
      { title: "Ring gimbal and lab presentation", paragraphs: ["The larger test rig suspends an assembly inside nested rings, with an aluminum frame supporting the outer axis. The lab photograph shows the rig’s physical size and mounting arrangement.", "The presentation describes an attitude-control test platform using fan actuation, an IMU, and a 12 V power supply. The proposed test sequence isolates individual axes before attempting coupled motion."], image: 3, supportingImages: [5] }
    ],
    images: [
      asset("halo/linkage-photo.jpg", "HALO’s assembled three-arm mechanism — printed links, motor mounts, and moving platform"),
      asset("halo/platform-photo.jpg", "Top view of the printed platform and its three supporting arms"),
      asset("halo/electronics-photo.jpg", "Arduino, breadboard wiring, and bench power equipment used during integration"),
      asset("halo/ring-gimbal.jpg", "The larger ring gimbal on the laboratory bench"),
      asset("halo/bench-photo.jpg", "The assembled platform alongside its bench electronics"),
      asset("halo/presentation.jpg", "Presenting the gimbal hardware and test context in the lab"),
      asset("halo/assembly.jpg", "Assembly work: motor hardware, fasteners, and hand tools"),
      asset("halo-cad.jpg", "The CAD assembly and linkage geometry"),
      asset("halo-hero.jpg", "Original design rendering of the HALO mechanism")
    ],
    film: { src: "/paper-assets/halo/bench-film.mp4", poster: "/paper-assets/halo/film-poster.jpg", caption: "On the bench — original prototype footage, with audio removed." },
    links: [], model: "gimbal", modelNote: "A reconstruction of the three-arm assembly shown in the project CAD. Separate the components to inspect the geometry; this is not a simulation of measured actuation."
  },
  "trend-mart": {
    id: "trend-mart", title: "Trend Mart Group", year: "2017–2024", category: "Business", role: "Founder & CEO",
    status: "Operated for seven years", skills: ["Product sourcing", "Retail operations", "Hiring", "Supply-chain management"],
    lead: "A self-funded retail group spanning toys, literacy, and home products, developed over seven years.",
    introduction: "Trend Mart grew from a small toy business into three brands spanning toys, literacy, and home products. The operation grew without outside funding, sourcing products from manufacturers in China and selling online and through physical locations in Ulaanbaatar. Each expansion had to be paid for by the business itself.",
    metrics: [{ value: "$1M+", label: "lifetime revenue", context: "Across seven years of operation" }, { value: "4", label: "retail locations", context: "Ulaanbaatar" }, { value: "~50%", label: "gross margin", context: "At peak operation" }, { value: "$0", label: "external funding", context: "Built from operating cash flow" }],
    chapters: [
      { title: "Sourcing, inventory, sales, and staffing", paragraphs: ["Operations covered sourcing, supplier negotiations, product selection, logistics, and sales. The catalog grew to more than 60 SKUs, supported by an online audience of over 100,000 followers and a physical retail presence.", "As the business expanded, so did the operating work: inventory, customer service, hiring, and coordination across locations. The team reached 15 staff at peak, with more than 50 people hired over the life of the company."], image: 0 },
      { title: "Three retail brands and the 2024 closure", paragraphs: ["The group’s three brands served distinct customer needs through a shared retail operation. The same operation handled product sourcing, shipping, inventory, and sales across the three brands.", "The business closed in 2024 when its founder began studying at Columbia."] }
    ], images: [asset("trend-store.jpg", "Trend Home — brand material from the retail group")], links: []
  },
  micc: {
    id: "micc", title: "MICC Capital", year: "2025", category: "Business", role: "Investment banking summer analyst",
    status: "Research published on S&P Capital IQ", skills: ["Financial modeling", "DCF & comparable valuation", "Equity research", "Investment memoranda"],
    lead: "Nine investment research deliverables in eight weeks, including two equity reports published on S&P Capital IQ.",
    introduction: "MICC’s eight-week analyst program covered company valuation, equity research, and transaction materials at the Mongolian investment banking and brokerage firm. The work moved from gathering information to forming a defensible view of a business and explaining it to an investor.",
    metrics: [{ value: "9", label: "research deliverables", context: "Completed during the analyst program" }, { value: "2", label: "published equity reports", context: "Gobi HK and Erdenes Tavan Tolgoi · S&P Capital IQ" }, { value: "8 weeks", label: "analyst program" }],
    chapters: [
      { title: "DCF models and published equity reports", paragraphs: ["The financial models used discounted cash flow and comparable-company analysis, alongside sector and ESG research. The analysis needed a clear chain from business assumptions to valuation.", "Two full equity research reports—on Gobi HK and Erdenes Tavan Tolgoi—were published on S&P Capital IQ. The broader set of nine deliverables included market updates, sector research, and transaction-oriented work."] },
      { title: "StorePay and Sartoria information memoranda", paragraphs: ["Information memoranda covered StorePay and Sartoria. That meant adapting the depth of the research to the question at hand: what matters about this company, how does it earn money, and what would a potential investor need to understand?", "The deliverables combined company models, valuation, sector and ESG research, weekly market updates, and investor-facing writing."] }
    ], images: [asset("micc-logo.png", "MICC — Mongolian International Capital Corporation")], links: [{ label: "Visit MICC", href: "https://en.micc.mn/" }]
  },
  "mars-v": {
    id: "mars-v", title: "MARS-V", year: "2023–2025", category: "Space", role: "Core member · design, engineering & fundraising",
    status: "Mars analog research and field campaigns", skills: ["EVA suit research", "Prototyping", "Fundraising", "Public communication"],
    lead: "EVA suit research and prototyping for Mars analog field work, plus campaigns that secured $5.8 million in investment commitments.",
    introduction: "MARS-V connects Mars research with the conditions and opportunities of the Mongolian landscape. The effort combines technical and organizational work: EVA suit research and prototyping, collaboration with UCCS for MDRS work, investment proposals, and public campaigns.",
    metrics: [{ value: "$5.8M", label: "investment commitments", context: "Campaigns for Mars analog infrastructure" }, { value: "4,500+", label: "stakeholders reached", context: "Across investment and outreach campaigns" }, { value: "8,000 km", label: "campaign travel" }, { value: "1,000+", label: "lecture audience", context: "MARS-V Spot event" }],
    chapters: [
      { title: "Equipment for work outside the habitat", paragraphs: ["EVA suit research and prototyping involved UCCS collaborators for MDRS. The project connected design choices with the practical requirements of analog field work: people need equipment that supports observation, movement, and operations in a demanding environment."], image: 0 },
      { title: "Fundraising and public presentations", paragraphs: ["Investment proposals and in-person campaigns supported the technical work. Those campaigns reached more than 4,500 stakeholders, covered roughly 8,000 kilometers, and helped secure $5.8 million in investment commitments for analog infrastructure.", "MARS-V Spot brought the effort to an audience of more than 1,000 people, alongside national media appearances. Explaining the project clearly was part of building the support it needed."], image: 1, supportingImages: [4, 5] }
    ],
    images: [asset("mars-v/spacesuit-cutout.png", "EVA suit design study — isolated concept render"), asset("marsv-crew-field.jpg", "MARS-V analog field crew"), asset("marsv-habitat-render.jpg", "Mars analog habitat concept"), asset("marsv-analog-terrain.jpg", "The analog terrain"), asset("mars-v/project-office-sign.jpg", "MARS-V signage in the project workspace"), asset("mars-v/project-office-artwork.jpg", "Mars exploration artwork displayed beneath MARS-V signage"), asset("mars-v/space-exploration-reference.jpg", "Space-exploration reference artwork")], links: [{ label: "Visit MARS-V", href: "https://www.mars-v.com/" }]
  },
  ondo: {
    id: "ondo", title: "ONDO Space / GerGrid", shortTitle: "ONDO Space", year: "2025", category: "Space", role: "Product & strategy intern",
    status: "Telecom planning concept and investor work", skills: ["Geospatial analysis", "RF propagation", "Product strategy", "Investor communication"],
    lead: "A telecom tower-siting concept using terrain, population data, and 3D radio propagation, plus investor materials for ONDO.",
    introduction: "The ONDO summer placement covered product strategy and investor materials alongside CEO Nami Bold. A central project was GerGrid: a concept for deciding where telecom towers should go by bringing terrain, population, demand, and radio propagation into a shared planning workflow.",
    metrics: [{ value: "3D", label: "RF propagation analysis", context: "Ray-tracing in the proposed GerGrid workflow" }],
    chapters: [
      { title: "Where should the next tower go?", paragraphs: ["A useful site is more than a point on a map. The proposed workflow combines ArcGIS terrain and surface models, satellite imagery, population and usage data, and radio-frequency ray tracing. The aim was to compare coverage and capital requirements before committing to a location.", "GerGrid brought a technical question—where a signal can travel—together with the commercial question of which coverage is worth building."], image: 0 },
      { title: "ONDO investor materials and technical briefings", paragraphs: ["ONDO Holding’s investor pitch and technical briefings connected satellite and telecom engineering to company decisions: what the product does, why it matters, and how to describe its value precisely."], image: 1 }
    ], images: [asset("pub-ondo-cleanroom.jpg", "ONDO Space cleanroom — company project photography"), asset("pub-ondo-flag.jpg", "The ONDO Space team with its satellites"), asset("pub-ondo-satellite.jpg", "ONDO satellite reference image")],
    links: [{ label: "Visit ONDO Space", href: "https://ondospace.com/" }], model: "cubesat", modelNote: "A simplified reconstruction of the CubeSat in ONDO’s project imagery. Included to explain the hardware context; the satellite is ONDO’s work, not an independently designed satellite.",
    sequence: { title: "GerGrid: from terrain to a siting decision", steps: [ { title: "Terrain", text: "Bring together elevation, surface models, and satellite imagery." }, { title: "Demand", text: "Locate population and expected network usage." }, { title: "Coverage", text: "Model RF propagation and compare candidate tower locations." }, { title: "Investment", text: "Weigh coverage against infrastructure and capital requirements." } ] }
  },
  thrive: {
    id: "thrive", title: "Thrive Agritech", year: "2025", category: "Business", role: "Go-to-market strategy intern",
    status: "Canadian market-entry strategy", skills: ["Primary research", "Market entry", "Customer discovery", "Partnership strategy"],
    lead: "A Y Combinator-backed horticultural lighting startup. Canadian market-entry research included more than 100 grower and partner calls.",
    introduction: "Thrive makes horticultural LED lighting. Its Canadian market-entry study focused on Leamington, Ontario, a major greenhouse cluster where technical performance alone would not win a first installation. The company needed a way into the local decision-making network.",
    metrics: [{ value: "YC-backed", label: "Y Combinator-backed startup", context: "Go-to-market strategy internship" }, { value: "100+", label: "primary research calls", context: "Growers, partners, and market stakeholders" }],
    chapters: [
      { title: "Grower interviews and local distribution partners", paragraphs: ["Primary research identified the decision makers, industry gatekeepers, and partner relationships that shape purchasing. Organizations such as OGVG and BioPhi mattered as potential validators and routes to trusted conversations.", "The positioning strategy connected Thrive’s lighting to greenhouse power infrastructure and facility economics, connecting the product to the investment growers were considering."], image: 0 },
      { title: "Proposal for two or three reference installations", paragraphs: ["The proposed market-entry sequence centered on local partners and two or three reference installations. Those installations were a strategy target, not booked sales. The recommendation gave the team a practical way to demonstrate value, build trust, and earn the next customer."], image: 1 }
    ], images: [asset("thrive-product.jpg", "Thrive’s horticultural lighting hardware"), asset("thrive-facility.jpg", "Greenhouse environment for the market-entry work")], links: [{ label: "Visit Thrive Agritech", href: "https://www.thriveagritech.com/" }]
  },
  csi: {
    id: "csi", title: "CSI Rocketry", shortTitle: "CSI · Ablative liners", year: "2025", category: "Space", role: "Mechanical engineer · Columbia Space Initiative",
    status: "Liner development and test instrumentation", skills: ["Thermal protection", "Fabrication", "Test-rig design", "Data acquisition"],
    lead: "Phenolic liners for a six-inch hybrid rocket, with thermocouple instrumentation to measure ablation and heat penetration.",
    introduction: "Columbia Space Initiative’s six-inch hybrid rocket requires phenolic chamber liners and a repeatable way to evaluate them. The work connected material preparation and mechanical interfaces to the measurements needed to judge thermal protection.",
    metrics: [{ value: "6 in", label: "hybrid rocket diameter", context: "Chamber-liner application" }, { value: "3", label: "thermal-response measurements", context: "Ablation, char, and heat penetration" }],
    chapters: [
      { title: "The liner and its interfaces", paragraphs: ["The chamber-liner design includes nozzle-transition bonding, where the material and mechanical interface both affect performance. Fabrication included molds, resin-mixing procedures, and regression-test rigs.", "A repeatable process matters because inconsistent specimens make test results hard to compare. The test program established the team’s first reproducible method for evaluating ablation, char formation, and thermal penetration."] },
      { title: "Thermocouple instrumentation and data acquisition", paragraphs: ["Heat-flux tests use thermocouples, MAX31855 interfaces, and Arduino data acquisition. The aim was to connect the observed condition of a specimen with its thermal history, so the next design decision could be based on measurements."], image: 1 }
    ], images: [asset("csi-field.jpg", "Columbia Space Initiative team in the field"), asset("csi-thermal-review.jpg", "Design review slide outlining thermal-property and regression-rate tests for an ablative sample")], links: [{ label: "Visit CSI Rocketry", href: "https://columbiaspace.org/missions/rockets/" }]
  },
  hur: {
    id: "hur", title: "HUR. Education", year: "2024–2025", category: "Business", role: "Founder & COO",
    status: "Student research and mentorship network", skills: ["Team building", "Program operations", "Fundraising", "Education"],
    lead: "A student mentorship and research network supported by $46,000 in funding and a 22-person team of educators and staff.",
    introduction: "HUR is an education network connecting students with mentors, research projects, and funding. The operating challenge was to turn individual connections into a program that a larger community could use.",
    metrics: [{ value: "$46k", label: "funding secured" }, { value: "22", label: "educators and staff" }, { value: "120+", label: "colleges connected" }, { value: "1,100", label: "students reached", context: "Through lectures" }],
    chapters: [
      { title: "Funding and a 22-person operating team", paragraphs: ["A 22-person team of educators and staff operated with $46,000 in funding. The network reached more than 120 colleges, connecting students with people and projects beyond their immediate institutions.", "Program operations spanned mentorship, research opportunities, and student funding."], image: 0 },
      { title: "Lectures for 1,100 students", paragraphs: ["Lectures reached roughly 1,100 students, alongside invited speakers and mentorship activity. HUR’s community posts include university admission announcements and student milestones."], image: 1 }
    ], images: [asset("hur-hero.jpg", "HUR’s education and mentorship program"), asset("hur-fb-01.jpg", "A student milestone published by HUR"), asset("hur-fb-03.jpg", "A university admission announcement from the HUR community")], links: [{ label: "Visit HUR", href: "https://all-hur.com/" }]
  },
  "balloon-summit": {
    id: "balloon-summit", title: "International Space Balloon Summit", shortTitle: "Space Balloon Summit", year: "2024", category: "Space", role: "Organizer",
    status: "Ulaanbaatar · March 21–22, 2024", skills: ["Event operations", "Institutional coordination", "Science outreach"],
    lead: "A public balloon launch and scientific conference connecting space researchers, universities, and government in Ulaanbaatar, March 21–22, 2024.",
    introduction: "The International Space Balloon Summit in Mongolia brought government, universities, and space researchers together around a public launch and a scientific program. The event took place under presidential patronage with ministry and university partners.",
    metrics: [{ value: "21–22 Mar", label: "2024 summit dates", context: "Ulaanbaatar, Mongolia" }],
    chapters: [
      { title: "National Park launch and scientific conference", paragraphs: ["The first day centered on a public balloon launch at National Park in Ulaanbaatar; the next day brought participants into a scientific conference. Coordination linked the participants and program across those two settings.", "The work was organizational: align institutions, support a public-facing event, and give researchers and students a reason to meet around the same project."], image: 0 }
    ], images: [asset("balloon-summit-poster.jpg", "The summit program and participating organizations")], links: [{ label: "Watch the summit coverage", href: "https://www.facebook.com/marsapage/videos/646521701496242/" }]
  },
  "starry-tours": {
    id: "starry-tours", title: "Starry Tours Mongolia", year: "2023–2024", category: "Culture", role: "Founder",
    status: "Astronomy tourism and public outreach", skills: ["Experience design", "Astronomy communication", "Tourism", "Entrepreneurship"],
    lead: "Guided telescope observations and dark-sky tours combining astronomy with Mongolian sky traditions.",
    introduction: "Starry Tours brings telescope viewing, astronomy, and Mongolian sky culture into a shared experience. The project served travelers and local communities, offering guided observation and astronomy outreach.", metrics: [],
    chapters: [
      { title: "Guided telescope observation and astronomy outreach", paragraphs: ["Dark-sky viewing and guided telescope experiences connect the scientific account of the sky with the cultural traditions of the people who live beneath it.", "The project combined guided observation with astronomy outreach for both travelers and local communities."], image: 0 }
    ], images: [asset("starry-tours-hero.jpg", "Dark-sky setting for the astronomy tourism project")], links: []
  },
  cfa: {
    id: "cfa", title: "Harvard & Smithsonian CfA", shortTitle: "CfA · Exoplanet research", year: "2022", category: "Science", role: "Exoplanet research apprentice",
    status: "K2-18b and host-star modeling", skills: ["Light-curve analysis", "EXOFAST", "Scientific computing", "Exoplanet research"],
    lead: "Modeling K2-18b and its host star with TESS light curves, archival data, and EXOFAST on Harvard’s Canon cluster.",
    introduction: "This Center for Astrophysics | Harvard & Smithsonian research project studied K2-18b and its host star using TESS observations and archive data to investigate planetary properties and potential habitability.", metrics: [],
    chapters: [
      { title: "TESS photometry and EXOFAST fitting", paragraphs: ["The analysis combined TESS, NASA Exoplanet Archive, and ExoFOP data with EXOFAST computations on Harvard’s Canon cluster. The task was to connect observations with a model of the planet and star, while understanding the assumptions involved.", "The analysis focused on the planet and its host star, using the fitted properties to investigate questions of potential habitability."], image: 0 }
    ], images: [asset("cfa-k218b.jpg", "K2-18b — artist’s illustration of the research subject, not an observation")], links: [{ label: "Visit the Center for Astrophysics", href: "https://cfa.harvard.edu/" }],
    sequence: { title: "The research process", steps: [ { title: "Observations", text: "TESS photometry and archival information provide the starting measurements." }, { title: "Model", text: "EXOFAST computations connect the light-curve data to properties of the planet and its host star." }, { title: "Interpret", text: "Inspect the results and assumptions before relating them to questions of planetary habitability." } ] }
  },
  kublai: {
    id: "kublai", title: "Kublai Institute of Astrophysics", shortTitle: "Kublai Institute", year: "2023–2024", category: "Science", role: "Astrophysics research intern",
    status: "Research and planetarium work", skills: ["Time-series analysis", "Observational astronomy", "Science communication"],
    lead: "Penumbral lunar-eclipse time-series research and public planetarium commentary under cosmonaut J. Gurragchaa.",
    introduction: "The research placement under cosmonaut J. Gurragchaa combined research assistance and planetarium commentary. The role joined the analysis of astronomical observations with explaining them to a public audience.", metrics: [],
    chapters: [
      { title: "Lunar-eclipse time-series research", paragraphs: ["The research focused on time-series observations of a penumbral lunar eclipse under cosmonaut J. Gurragchaa.", "The telescope photographs document the institute’s observing equipment: the mount and optical assembly inside the dome, and the detector and cabling attached to the instrument."], image: 1, supportingImages: [3] },
      { title: "Observatory and public astronomy", paragraphs: ["Planetarium commentary explained astronomical objects and events to visitors alongside the research program.", "These exterior photographs show the institute’s observatory dome and hillside setting. The open dome exposes the telescope to the sky during observations."], image: 4, supportingImages: [0, 2] },
      { title: "Solar observation reference images", paragraphs: ["The institute photographs supplied here also include a sunspot, prominences above the solar limb, and the corona during a solar eclipse. They show different structures visible when observing the Sun.", "These are institute reference images, separate from the penumbral lunar-eclipse research. The website copies have been lightly enhanced for display; they are not calibrated measurement data."], image: 5, supportingImages: [6, 7] }
    ],
    images: [
      asset("kublai/observatory-aerial.jpg", "Aerial view of the observatory dome, telescope opening, and surrounding hillside"),
      asset("kublai/telescope-monochrome.jpg", "Telescope and mount inside the observatory dome"),
      asset("kublai/observatory-hillside.jpg", "The observatory’s hillside setting"),
      asset("kublai/telescope-detector.jpg", "Detector assembly and cabling attached to the telescope"),
      asset("kublai/observatory-dome.jpg", "Open observatory dome with the telescope visible inside"),
      asset("kublai/solar-sunspot.jpg", "Sunspot and surrounding solar structure — institute reference image"),
      asset("kublai/solar-prominence.jpg", "Prominences above the solar limb — institute reference image"),
      asset("kublai/solar-eclipse.jpg", "Solar corona during an eclipse — institute reference image")
    ], links: []
  },
  piano: {
    id: "piano", title: "Concert Piano", year: "2016–2018 · selected performances", category: "Culture", role: "Concert pianist",
    status: "International performance and competition", skills: ["Performance", "Musical interpretation", "Long-term practice"],
    lead: "Eleven years of training, international competition, and performances at Windsor Castle and the Mongolian Philharmonic.",
    introduction: "Eleven years of training under pianist Saya Sangidorj included performances and competitions across Europe and Asia. Selected performances and competition results from 2016–2018 are collected here.",
    metrics: [{ value: "11 years", label: "piano training", context: "Under Saya Sangidorj" }, { value: "6 countries", label: "international competitions", context: "France, Spain, Italy, England, South Korea, and Russia" }],
    chapters: [
      { title: "From the practice room to the stage", paragraphs: ["Competition results include Grand Prix, gold, and silver awards. Performances included Windsor Castle and the Mongolian Philharmonic, with invitations from Carnegie Hall and the Mongolian Musical Conservatory.", "Competition venues spanned France, Spain, Italy, England, South Korea, and Russia."], image: 0 }
    ], images: [asset("piano-hero.png", "Concert piano")], links: []
  }
};

// Preserve the galleries assigned to each experience before the portfolio redesign.
for (const [id, images] of Object.entries(retainedProjectMedia)) {
  const story = projectStories[id];
  if (!story) continue;
  const existing = new Set(story.images.map(image => image.src));
  for (const image of images) {
    if (!existing.has(image.src)) { story.images.push(image); existing.add(image.src); }
  }
}

projectStories.micc.cover = asset("micc-hero.jpg", "Financial district architecture — capital-markets reference photograph");
projectStories["trend-mart"].cover = asset("trend-hero.jpg", "Toy inventory — retail reference photograph");
projectStories.thrive.cover = asset("thrive-altus-hero.jpg", "Thrive lighting installed inside an Altus greenhouse");
projectStories.nomos.cover = asset("nomos-card-hero.png", "Nomos website — galaxy and classical columns");
projectStories.nomos.shortTitle = "Nomos";
projectStories.nomos.links.unshift({ label: "Open Nomos", href: "/nomos" });
projectStories.nomos.images.push(asset("nomos-card-hero.png", "Galaxy and columns illustration used on the Nomos website"), asset("nomos-bg-still.png", "Nomos website background artwork"));

const projectWebsites: Record<string, { href: string; label: string }> = {
  nomos: { href: "/nomos", label: "Nomos" },
  trex: { href: "https://www.t-rexsat.org/", label: "T-REX" },
  micc: { href: "https://en.micc.mn/", label: "MICC Capital" },
  thrive: { href: "https://www.thriveagritech.com/", label: "Thrive Agritech" },
  ondo: { href: "https://ondospace.com/", label: "ONDO Space" },
  "mars-v": { href: "https://www.mars-v.com/", label: "MARS-V" },
  csi: { href: "https://columbiaspace.org/missions/rockets/", label: "CSI Rocketry" },
  hur: { href: "https://all-hur.com/", label: "HUR Education" },
  cfa: { href: "https://cfa.harvard.edu/", label: "Harvard & Smithsonian CfA" }
};
for (const [id, website] of Object.entries(projectWebsites)) projectStories[id].website = website;

export const projectOrder = ["trex", "ares", "halo", "nomos", "trend-mart", "micc", "mars-v", "ondo", "thrive", "csi", "hur", "balloon-summit", "starry-tours", "cfa", "kublai", "piano"];
export const projectPath = (id: string) => `/work/${id === "trend-mart" ? "trend" : id}`;
