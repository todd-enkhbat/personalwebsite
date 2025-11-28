import Link from "next/link";

const workItems = [
  {
    title: "Time Resolving Explorer (T-REX)",
    role: "Systems · Partnerships",
    description:
      "Coordinating research between NASA JPL, MIT Lincoln Labs, Princeton Space Physics Lab, and Columbia to capture dynamic imagery of black holes.",
    stack: ["Space Systems", "VLBI", "Photonics"],
    link: "https://t-rexsat.org/"
  },
  {
    title: "Talos Dispatch",
    role: "Editorial Director",
    description:
      "A philosophy, technology, and business journal escalating the conversation around institutional design at Columbia University.",
    stack: ["Editorial", "Identity", "Community"],
    link: "#"
  },
  {
    title: "Columbia Rocketry",
    role: "Combustion Device Lead",
    description:
      "Designing propellant feed systems and combustion hardware with the Columbia Space Initiative for record-breaking launch attempts.",
    stack: ["Propulsion", "Simulation", "Manufacturing"],
    link: "#"
  }
];

export default function WorkPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <p className="text-xs font-mono uppercase tracking-[0.4em] text-muted">Programs & Experiments</p>
        <h1 className="text-4xl font-semibold uppercase leading-tight">
          Building companies, labs, and writing that rewire how we think about space and finance.
        </h1>
        <p className="max-w-2xl text-base text-muted">
          I split my time between deep-tech hardware, editorial projects, and field research. Each project balances
          systems thinking with aesthetics, and they all ladder back to a long-term plan for a Mongolian renaissance.
        </p>
      </header>

      <div className="space-y-6">
        {workItems.map((item) => (
          <article
            key={item.title}
            className="rounded-3xl border border-black/10 bg-white p-6 shadow-card transition hover:-translate-y-1"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono uppercase tracking-[0.3em] text-muted">
              <span>{item.role}</span>
              <div className="flex flex-wrap gap-2">
                {item.stack.map((chip) => (
                  <span key={chip} className="rounded-full border border-black/20 px-3 py-1 text-[10px] tracking-[0.2em]">
                    {chip}
                  </span>
                ))}
              </div>
            </div>
            <h2 className="mt-4 text-2xl font-semibold uppercase">{item.title}</h2>
            <p className="mt-3 text-sm text-muted">{item.description}</p>
            <Link href={item.link} target="_blank" className="mt-4 inline-flex text-sm uppercase underline">
              Visit →
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}

