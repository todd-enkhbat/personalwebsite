import Link from "next/link";
import { LetterShell } from "../../components/LetterShell";
import { work } from "../../data/content";

const halo = work.find((item) => item.id === "halo")!;

export default function HaloPage() {
  return (
    <LetterShell showHeader={false}>
      <article className="case-editorial">
        <header className="case-header">
          <div className="case-header-top">
            <p className="case-kicker">Helios Precision · HALO · 2026</p>
            <Link href="/work" className="open-arrow">
              ← Portfolio
            </Link>
          </div>
          <h1>Three degrees of freedom without a serial gimbal stack</h1>
        </header>

        <p className="case-byline">{halo.role} · CubeSat solar pointing · rapid prototyping</p>

        <p className="case-deck">
          Tip, tilt, and heave from one compact parallel platform, designed in Onshape, printed in PLA, wired on the
          bench, stopped short of powered actuation by firmware.
        </p>
        <p className="case-dateline">3× NEMA 17 · A4988 · LDR quad-array · ~600-800 g phase 1 · &lt;400 g phase 2 target</p>

        <figure className="case-hero">
          <img src="/paper-assets/halo-hero.jpg" alt="HALO 3-DOF parallel solar pointing platform" />
          <figcaption>
            <span>SPACE GIMBAL V1, assembled</span>
            <span>Parallel kinematics</span>
          </figcaption>
        </figure>

        <div className="case-body">
          <section>
            <h2>Mechanism</h2>
            <p>
              The brief was to point a CubeSat solar array across tip, tilt, and heave from base-mounted steppers, 
              without stacking serial gimbals. I designed a three-arm parallel pointing platform, iterated the CAD in
              Onshape, printed and assembled the PLA frame, and mounted an LDR quad-array for sensing.
            </p>
          </section>

          <section>
            <h2>Honest scope</h2>
            <p>
              Wiring for three NEMA 17 motors and A4988 drivers reached the breadboard. Firmware upload blocked powered
              tests, so the mechanism remains hand-articulable proof rather than a flown actuator. Along the way I
              retired a sub-100g mass claim and reclassified the device from a two-axis gimbal story to what it actually
              is: a three-DOF parallel manipulator with a phase-two mass target under 400 grams.
            </p>
          </section>
        </div>

        <div className="case-gallery">
          <figure className="case-plate">
            <img src="/paper-assets/halo-cad.jpg" alt="HALO Onshape CAD" />
            <figcaption>Platform · arm links · motor base · full assembly</figcaption>
          </figure>
        </div>
      </article>
    </LetterShell>
  );
}
