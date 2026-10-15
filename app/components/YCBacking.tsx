import Image from "next/image";

export function YCBacking({ linked = false }: { linked?: boolean }) {
  const content = <><Image src="/paper-assets/orgs/y-combinator.svg" alt="Y Combinator" width={34} height={34} /><span><strong>YC-backed startup</strong></span></>;
  return linked ? <a className="yc-backing" href="https://www.ycombinator.com/companies/thrive-agritech" target="_blank" rel="noopener noreferrer">{content}</a> : <span className="yc-backing">{content}</span>;
}
