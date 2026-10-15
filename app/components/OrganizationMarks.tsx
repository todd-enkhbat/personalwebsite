import Image from 'next/image';
import type { OrganizationMark } from '../data/projectExhibits';

export function OrganizationMarks({ marks }: { marks: OrganizationMark[] }) {
  return <span className="organization-marks">{marks.map(mark => <span className="organization-mark" key={mark.name} title={`${mark.name}: ${mark.relationship}`}>
    {mark.src ? <Image src={mark.src} width={90} height={28} alt={`${mark.name}: ${mark.relationship}`} /> : <span role="img" aria-label={`${mark.name}: ${mark.relationship}`}>{mark.wordmark}</span>}
  </span>)}</span>;
}
