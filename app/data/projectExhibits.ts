import type { ModelKind } from '../lib/portfolioModels';

export type OrganizationMark = { name: string; relationship: string; src?: string; wordmark?: string };
export type ResearchSource = { label: string; href: string; language: 'en' | 'mn' | 'ja'; supports: string };
export type ProjectExhibit = {
  context: string; contextDetail?: string; description: string; hero: string; heroAlt: string; position?: string;
  heroCredit?: string; artifact: ModelKind; artifactNote: string; marks: OrganizationMark[];
  sources: ResearchSource[]; researchNote?: string;
};
const csi: OrganizationMark = { name: 'Columbia Space Initiative', relationship: 'University project team', src: '/paper-assets/orgs/csi-logo.png' };
const source = (label: string, href: string, supports: string, language: ResearchSource['language'] = 'en'): ResearchSource => ({ label, href, supports, language });
const supplied = 'Role, dates, and individual contributions are retained from the supplied project archive. Public sources establish organizational context, not independent verification of every personal result.';

/** Editorial decisions and evidence are separate from the retained, unabridged project archive.
 * Reviewed 2026-10-15. A mark describes only the relationship in its label, never endorsement.
 * Wordmarks are explicit text fallbacks where no reliable original logo file is available.
 */
export const projectExhibits: Record<string, ProjectExhibit> = {
  trex: {
    context: 'Space radio astronomy', description: 'An orbiting radio telescope proposal to resolve the changing structure around a black hole.',
    hero: 'trex-sgr-a.jpg', heroAlt: 'EHT observation of Sagittarius A*, the T-REX science target. Credit: EHT Collaboration. This image was not produced by T-REX.', heroCredit: 'EHT Collaboration',
    artifact: 'satellite', artifactNote: 'Illustrative T-REX spacecraft reconstruction; not flight CAD.',
    marks: [{name: 'Brown University', src: '/paper-assets/orgs/brown-shield.svg', relationship: 'Collaborating institution, listed by T-REX'}, {name: 'MIT Lincoln Laboratory', src: '/paper-assets/orgs/mit-red.svg', relationship: 'Collaboration context documented in the supplied T-REX archive'}],
    sources: [source('Sagittarius A*: EHT Collaboration / ESO', 'https://www.eso.org/public/images/eso2208-eht-mwh/', 'Cover: EHT Collaboration, CC BY 4.0. Cropped for display. An existing observation of the target, not T-REX mission data.'), source('T-REX mission and team', 'https://www.t-rexsat.org/', 'Student-developed NASA Pioneers proposal; 86 GHz, 87 kg mission concept and collaborating institutions.')], researchNote: supplied
  },
  ares: {
    context: 'Columbia · NASA RASC-AL', description: 'An autonomous Mars habitat study linking local resources, robotic construction, and crew survival.',
    hero: 'ares-outside.jpg', heroAlt: 'Original ARES architectural study of the Martian enclosure', artifact: 'habitat', artifactNote: 'Reconstruction of the team’s habitat drawings, with an illustrative enclosure and interior.',
    marks: [csi], sources: [source('Columbia Space Initiative', 'https://columbiaspace.org/about/', 'University team and mission-design program.'), source('ARES team account', 'https://www.linkedin.com/in/joeramon-tijerina', 'Team member describes the 2025 ARES submission and bistable auxetic dome.')],
    researchNote: 'The public team account describes a 2040 precursor mission; the supplied study uses a 2037 design horizon. These are distinct design references, not a verified deployment date.'
  },
  halo: {
    context: 'Spacecraft mechanisms', description: 'A three-arm pointing platform for CubeSat solar arrays, built and wired as a bench prototype.',
    hero: 'halo-hero.jpg', heroAlt: 'Earlier HALO design rendering of the spacecraft solar-array pointing mechanism', position: '50% 45%', artifact: 'gimbal', artifactNote: 'Illustrative reconstruction of the supplied linkage CAD; powered tracking remains unvalidated.',
    marks: [{name: 'Helios Precision', wordmark: 'HELIOS', relationship: 'Project identity in the supplied archive'}], sources: [], researchNote: 'English and Mongolian searches found no reliable independent project-specific coverage. The original CAD, photographs, and bench film are the evidence for this entry.'
  },
  nomos: {
    context: 'Space infrastructure', description: 'A space infrastructure company connecting satellite, ground-station, and cloud capabilities.',
    hero: 'nomos-card-hero.png', heroAlt: 'Original galaxy and classical columns artwork from the Nomos website', artifact: 'record', artifactNote: 'Golden Record study referencing Nomos’s published design lineage.',
    marks: [{name: 'Nomos Orbital', src: '/paper-assets/orgs/nomos-clean.svg', relationship: 'Founded company'}], sources: [source('Nomos: company and thesis', 'https://nomosorbital.com/about', 'Space infrastructure context, current software capabilities, and Golden Record design lineage.')], researchNote: supplied
  },
  'trend-mart': {
    context: 'Independent retail · Ulaanbaatar', description: 'A self-funded retail group spanning toys, literacy, and home products across four locations.',
    hero: 'trend-hero.jpg', heroAlt: 'Toy inventory, a retail reference photograph from the supplied archive', artifact: 'retail', artifactNote: 'Illustrative wooden construction toy, referencing the group’s toy retail origins.',
    marks: [{name: 'Trend Home', relationship: 'Retail brand in Trend Mart Group', src: '/paper-assets/orgs/trend-home-compact.png'}], sources: [], researchNote: 'English and Mongolian searches did not identify a reliable public record specific to this business. Operating metrics and dates remain attributed to the supplied archive.'
  },
  micc: {
    context: 'Investment banking · Mongolia', description: 'Equity research, company valuation, and transaction materials at Mongolia’s pioneering investment bank.',
    hero: 'micc-hero.jpg', heroAlt: 'Financial district architecture, a capital-markets reference photograph', artifact: 'finance', artifactNote: 'Illustrative research folio, referencing equity reports and valuation work.',
    marks: [{name: 'MICC', relationship: 'Internship host', src: '/paper-assets/micc-logo.png'}], sources: [source('MICC: company overview', 'https://en.micc.mn/about-us', 'Founded in 2005; investment banking, brokerage, and capital-markets advisory.'), source('MICC: Mongolian site', 'https://micc.mn/', 'Research and investment services.', 'mn')], researchNote: supplied
  },
  'mars-v': {
    context: 'Mars analog research · Mongolia', description: 'Mars analog field research, EVA suit studies, and public campaigns for a Mongolian space initiative.',
    hero: 'marsv-crew-field.jpg', heroAlt: 'MARS-V analog crew photographed in the field', artifact: 'suit', artifactNote: 'Illustrative analog EVA helmet and life-support pack; not certified flight hardware.',
    marks: [{name: 'MARS-V', wordmark: 'MARS-V', relationship: 'Project team'}], sources: [], researchNote: supplied
  },
  ondo: {
    context: 'Satellite & telecom infrastructure', description: 'A terrain-aware telecom siting concept and investor materials for Mongolia’s satellite industry.',
    hero: 'pub-ondo-cleanroom.jpg', heroAlt: 'Original ONDO Space cleanroom photography', artifact: 'cubesat', artifactNote: 'Illustrative CubeSat for company context. ONDO’s hardware, not a personal satellite design.',
    marks: [{name: 'ONDO Space', wordmark: 'ONDO', relationship: 'Internship host'}], sources: [], researchNote: supplied
  },
  thrive: {
    context: 'Horticultural lighting · YC S15', contextDetail: 'Thrive’s product range includes Strata lighting for multi-tier growing, Altus greenhouse fixtures, and remote power systems. The company participated in Y Combinator’s Summer 2015 batch. The Canadian entry study concerned grower economics and routes to local reference installations.', description: 'LED grow-light technology for commercial farms, with Canadian market-entry and grower research.',
    hero: 'thrive-altus-hero.jpg', heroAlt: 'Thrive lighting installed in a commercial greenhouse', artifact: 'growlight', artifactNote: 'Illustrative finned LED grow-light fixture, informed by Thrive product photographs.',
    marks: [{name: 'Thrive Agritech', relationship: 'Internship host', src: '/paper-assets/orgs/thrive-logo.png'}, {name: 'Y Combinator', relationship: 'Thrive participated in Summer 2015', src: '/paper-assets/orgs/y-combinator.svg'}],
    sources: [source('Thrive Agritech product range', 'https://www.thriveagritech.com/', 'Commercial horticultural LEDs, Strata, Altus, and remote power systems.'), source('Y Combinator company profile', 'https://www.ycombinator.com/companies/thrive-agritech', 'Summer 2015 participation and company context.')], researchNote: supplied
  },
  csi: {
    context: 'Columbia · Hybrid rocketry', description: 'Phenolic chamber liners and thermal-test instrumentation for a six-inch hybrid rocket.',
    hero: 'csi-field.jpg', heroAlt: 'Columbia Space Initiative team in the field', artifact: 'rocket', artifactNote: 'Illustrative cutaway chamber liner, referencing the documented thermal-protection work.',
    marks: [csi], sources: [source('Columbia: hybrid rocketry', 'https://www.engineering.columbia.edu/about/news/columbia-students-reach-new-heights-hybrid-rocketry', 'University coverage establishes the team’s hybrid-rocket program; the reported launch is a team result.')], researchNote: supplied
  },
  hur: {
    context: 'Education & research mentorship', description: 'A student network connecting mentorship, research opportunities, lectures, and funding.',
    hero: 'hur-hero.jpg', heroAlt: 'Original HUR education and mentorship program artwork', artifact: 'learning', artifactNote: 'Illustrative open research notebook. No AI product capability is implied.',
    marks: [{name: 'HUR. Education', relationship: 'Founded organization', src: '/paper-assets/orgs/hur-compact.png'}], sources: [source('HUR Education', 'https://all-hur.com/', 'Public education site and organization identity; limited indexable program detail.')], researchNote: supplied
  },
  'balloon-summit': {
    context: 'Japan–Mongolia · Science outreach', contextDetail: 'The original 2024 program names MARSA as general organizer and Wakayama University among the co-organizers. Kagawa College’s annual report documents a summit presentation at the Mongolian University of Science and Technology. The program schedules a March 22 launch and March 23 symposium; the supplied archive originally listed March 21–22.', description: 'A public balloon launch and scientific conference connecting researchers and universities in Ulaanbaatar.',
    hero: 'balloon-summit-launch.jpg', heroAlt: 'Balloon launch field photograph from the summit archive', artifact: 'balloon', artifactNote: 'Illustrative stratospheric balloon, suspension lines, and instrument payload.',
    marks: [{name: 'Mongolian Aerospace Research and Science Association', src: '/paper-assets/orgs/marsa-clean.svg', relationship: 'General organizer on the original 2024 program'}, {name: 'Wakayama University', src: '/paper-assets/orgs/wakayama-symbol.svg', relationship: 'Co-organizer on the original 2024 program'}],
    sources: [source('MONTSAME: 2024 balloon launch', 'https://montsame.mn/mn/read/340211', 'Japan–Mongolia balloon experiment and Wakayama University involvement.', 'mn'), source('Kagawa College annual report', 'https://www.kagawa-nct.ac.jp/prospectus/publication/nenpou/nenpou2023_4.pdf', '2024 summit presentation at Mongolian University of Science and Technology.', 'ja'), source('JICA: HAPS research presentation', 'https://www.jica.go.jp/information/n_files/06_240829.pdf', 'Research presentation documents the 2024 Ulaanbaatar summit.')],
    researchNote: 'The original program identifies MARSA as organizer. Institutional records document Kagawa College and the Mongolian University of Science and Technology; MONTSAME quotes Wakayama University’s Hiroaki Akiyama. These are event relationships, not separate personal university affiliations.'
  },
  'starry-tours': {
    context: 'Dark-sky tourism · Mongolia', description: 'Guided telescope observations connecting astronomy with Mongolian traditions of the night sky.',
    hero: 'starry-tours-hero.jpg', heroAlt: 'Illuminated tent under the Milky Way from the project archive', artifact: 'camp', artifactNote: 'Illustrative dark-sky campsite and observing telescope.',
    marks: [{name: 'Starry Tours Mongolia', wordmark: 'STARRY', relationship: 'Founded project'}], sources: [], researchNote: 'English and Mongolian searches did not locate an independently attributable project record. No tourism partners or “first in Mongolia” claims have been added.'
  },
  cfa: {
    context: 'Harvard & Smithsonian · Exoplanets', description: 'K2-18b and host-star modeling using TESS light curves, archival observations, and EXOFAST.',
    hero: 'cfa-k218b.jpg', heroAlt: 'Artist’s illustration of K2-18b, not an observational photograph', artifact: 'exoplanet', artifactNote: 'Illustrative orbital system. Cloud imagery uses NASA/JPL/Space Science Institute’s Cassini map of Jupiter as a visual reference, not an observation of K2-18b. Orbital scale is illustrative.',
    marks: [{name: 'Center for Astrophysics | Harvard & Smithsonian', relationship: 'Research host', src: '/paper-assets/orgs/cfa-logo.png'}, {name: 'Harvard University', relationship: 'CfA parent institution', src: '/paper-assets/orgs/harvard-shield.svg'}], sources: [source('Cloud texture: NASA/JPL/Space Science Institute', 'https://science.nasa.gov/photojournal/cassinis-best-maps-of-jupiter-cylindrical-map/', 'Cassini Jupiter map used only as an illustrative cloud texture.'), source('Center for Astrophysics', 'https://www.cfa.harvard.edu/', 'Institutional context and exoplanet research program.')], researchNote: supplied
  },
  kublai: {
    context: 'Observational astronomy · Mongolia', description: 'Lunar-eclipse time-series research alongside public planetarium interpretation.',
    hero: 'kublai/observatory-dome.jpg', heroAlt: 'Original photograph of the observatory dome and telescope', artifact: 'telescope', artifactNote: 'Illustrative observatory telescope inspired by the supplied equipment photographs.',
    marks: [{name: 'Kublai Institute', wordmark: 'KUBLAI', relationship: 'Research host named in the supplied archive'}], sources: [], researchNote: 'English and Mongolian searches returned similarly named institutions without enough evidence to resolve the exact legal identity. No Academy of Sciences logo or institutional relationship has been inferred.'
  },
  piano: {
    context: 'International performance', contextDetail: 'Mongolian coverage of the 17th international junior piano competition in France names Enkhbat’s Tsogt and Amarsanaa Ganbaatar as the junior four-hands Grand Prix pair. This earlier record complements the selected performances below.', description: 'Eleven years of piano training, international competition, and concert performances.',
    hero: 'piano-hero.png', heroAlt: 'Concert grand piano and performer from the supplied archive', artifact: 'piano', artifactNote: 'Illustrative concert grand piano, with individual keys, lid, strings, and pedals.',
    marks: [{name: 'Mongolian State Philharmonic', src: '/paper-assets/orgs/philharmonic.svg', relationship: 'Performance venue in the supplied archive'}], sources: [source('GoGo: international piano competition', 'https://gogo.mn/r/yx52e', 'Reports Enkhbat’s Tsogt in the junior four-hands Grand Prix in France.', 'mn')], researchNote: 'Mongolian coverage records a four-hands Grand Prix shared with Amarsanaa Ganbaatar. The supplied 2016–2018 selection remains intact; this earlier competition is additional archival context.'
  }
};
