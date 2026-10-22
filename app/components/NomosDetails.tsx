"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";

type ReferenceImage = { src: string; alt: string; caption: string; width: number; height: number };
const recordImages: ReferenceImage[] = [
  { src: "/paper-assets/nomos-reference/production.webp", alt: "Gloved technician handling two golden phonograph records", caption: "Making the record: a physical artifact carrying sounds and images of Earth.", width: 1280, height: 1296 }
];
const productImage: ReferenceImage = {
  src: "/paper-assets/nomos-product.png", alt: "Nomos network atlas interface showing orbital geometry and ground-station infrastructure", caption: "Nomos network atlas. The demo combines infrastructure records and orbital calculations; compute execution is simulated.", width: 1280, height: 720
};

function NomosLightbox({ images, index, onBrowse, onClose, label }: { images: ReferenceImage[]; index: number; onBrowse: (offset: number) => void; onClose: () => void; label: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const captionId = useId();
  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    const previous = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = "hidden";
    return () => { element.close(); document.body.style.overflow = previous; };
  }, []);
  const current = images[index];
  return <dialog ref={dialog} className="nomos-photo-lightbox" style={{ width: `min(96vw, ${70 * current.width / current.height}dvh)` }} aria-label={label} aria-describedby={captionId}
    onCancel={event => { event.preventDefault(); onClose(); }}
    onClick={event => { if (event.target === event.currentTarget) onClose(); }}
    onKeyDown={event => { if (images.length > 1 && ["ArrowLeft", "ArrowRight"].includes(event.key)) { event.preventDefault(); onBrowse(event.key === "ArrowLeft" ? -1 : 1); } }}>
    <button type="button" className="nomos-photo-close" onClick={onClose}>Close image ×</button>
    <figure><Image src={current.src} alt={current.alt} width={current.width} height={current.height} sizes="95vw" /><figcaption id={captionId} aria-live="polite">{current.caption}</figcaption></figure>
    {images.length > 1 ? <div className="nomos-photo-pagination"><button type="button" onClick={() => onBrowse(-1)}>← Previous</button><span>{index + 1} / {images.length}</span><button type="button" onClick={() => onBrowse(1)}>Next →</button></div> : null}
  </dialog>;
}

export function NomosRecordGallery() {
  const [enlarged, setEnlarged] = useState(false);
  const current = recordImages[0];
  return <div className="nomos-record-gallery" aria-label="Golden Record archive">
    <figure>
      <button type="button" className="nomos-record-stage" onClick={() => setEnlarged(true)} aria-label={`Enlarge: ${current.caption}`}>
        <Image src={current.src} alt={current.alt} width={current.width} height={current.height} sizes="(max-width: 760px) 90vw, 60vw" />
        <span aria-hidden="true">Enlarge ↗</span>
      </button>
      <figcaption aria-live="polite">{current.caption}</figcaption>
    </figure>
    {enlarged ? <NomosLightbox images={recordImages} index={0} onBrowse={() => {}} onClose={() => setEnlarged(false)} label="Golden Record reference image" /> : null}
  </div>;
}

export function NomosProductPreview() {
  const [open, setOpen] = useState(false);
  return <div className="nomos-continuity__image nomos-product-preview">
    <button type="button" className="nomos-atlas-trigger" onClick={() => setOpen(true)}>
      <Image src={productImage.src} alt="" width={180} height={112} sizes="180px" />
      <span>Inspect the network atlas <b aria-hidden="true">↗</b></span>
    </button>
    {open ? <NomosLightbox images={[productImage]} index={0} onBrowse={() => {}} onClose={() => setOpen(false)} label="Nomos network atlas" /> : null}
  </div>;
}

export function NomosSelectableRows({ items, variant }: { items: string[][]; variant: "workflow" | "product" }) {
  const [active, setActive] = useState(0);
  const id = useId();
  const rowClass = variant === "workflow" ? "nomos-loop" : "nomos-program-row";
  return <div className={variant === "workflow" ? "nomos-loop-list" : "nomos-program__list"}>
    {items.map(([title, description], index) => <div className={`${rowClass} nomos-selectable-row${active === index ? " is-active" : ""}`} key={title}>
      <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
      <div><h3><button type="button" className="nomos-row-trigger" aria-expanded={active === index} aria-controls={`${id}-${index}`} onClick={() => setActive(index)}>{title}<span aria-hidden="true">{active === index ? "−" : "+"}</span></button></h3><p id={`${id}-${index}`} hidden={active !== index}>{description}</p></div>
    </div>)}
  </div>;
}
