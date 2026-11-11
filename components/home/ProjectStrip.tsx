import Image from "next/image";
import { useTranslations } from "next-intl";

// Clients we have permission to show, as a band that never stops moving.
// Logos are single-colour (ink) PNGs with transparent ground, made from the
// clients' own files. `h` is the drawn height in px, tuned so wordmarks and
// round marks look the same size. A logo that doesn't spell the name gets
// the name under it.
const CLIENTS: { name: string; src: string; w: number; h: number; showName?: boolean }[] = [
  { name: "Jabad Barcelona", src: "/images/clients/jabad.png", w: 160, h: 46 },
  { name: "Shevat", src: "/images/clients/shevat.png", w: 509, h: 40 },
  { name: "Better Coffee", src: "/images/clients/better-coffee.png", w: 1610, h: 22 },
  { name: "Creative Favours", src: "/images/clients/creative-favours.png", w: 281, h: 46 },
  { name: "Perashapp", src: "/images/clients/perashapp.png", w: 152, h: 40, showName: true },
  { name: "Seven Roots", src: "/images/clients/seven-roots.png", w: 1050, h: 28 },
];

function Logos({ hidden }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-16 pe-16 sm:gap-24 sm:pe-24">
      {CLIENTS.map((c) => (
        <li key={c.name} className="flex shrink-0 flex-col items-center gap-1.5">
          <Image
            src={c.src}
            alt={hidden ? "" : c.name}
            width={Math.round((c.w / 160) * c.h)}
            height={c.h}
            className="w-auto opacity-75 transition-opacity duration-200 hover:opacity-100"
            style={{ height: c.h }}
          />
          {c.showName && (
            <span className="text-xs font-bold tracking-tight text-navy/75" dir="ltr">
              {c.name}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

export default function ProjectStrip() {
  const t = useTranslations("projectStrip");
  return (
    <section aria-label={t("label")} className="overflow-hidden border-y border-navy/10 bg-white py-10">
      <p className="text-center font-mono text-xs font-medium uppercase tracking-[0.22em] text-mist-2">{t("label")}</p>
      {/* Two copies side by side; the track slides by exactly one copy and
          loops. Pauses on hover; still under reduced motion. */}
      <div className="group mt-7 flex [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none rtl:[animation-direction:reverse]" dir="ltr">
          <Logos />
          <Logos hidden />
        </div>
      </div>
    </section>
  );
}
