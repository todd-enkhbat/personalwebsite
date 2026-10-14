import Image from "next/image";
import { ContactVortex } from "./ContactVortex";

export function ContactEmblem() {
  return (
    <div className="contact-map__emblem" aria-hidden="true">
      <ContactVortex />
      <div className="contact-map__emblem-ring">
        <Image
          src="/paper-assets/contact-emblem.png"
          alt=""
          width={497}
          height={507}
          priority
          unoptimized
        />
      </div>
    </div>
  );
}
