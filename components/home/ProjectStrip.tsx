import Image from "next/image";
import { useTranslations } from "next-intl";

// Projects we have permission to show, in quiet monochrome. Logo where we
// have one, otherwise just the name. No client quotes here (by design).
const PROJECTS: { name: string; logo?: { src: string; w: number; h: number } }[] = [
  { name: "Jabad Barcelona", logo: { src: "/images/logos/jabad.png", w: 750, h: 875 } },
  { name: "Shevat" },
  { name: "Better Coffee" },
  { name: "Creative Favours", logo: { src: "/images/logos/creative-favours.png", w: 585, h: 336 } },
  { name: "Perashapp", logo: { src: "/images/logos/perashapp.png", w: 1254, h: 1254 } },
];

export default function ProjectStrip() {
  const t = useTranslations("projectStrip");
  return (
    <section aria-label={t("label")} className="border-b border-navy/10 bg-white py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-ink/65">{t("label")}</p>
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-5 sm:gap-x-14">
          {PROJECTS.map((p) => (
            <li key={p.name} className="flex items-center gap-2.5 text-ink/70">
              {p.logo && (
                <Image
                  src={p.logo.src}
                  alt=""
                  width={p.logo.w}
                  height={p.logo.h}
                  sizes="40px"
                  className="h-8 w-auto opacity-70 mix-blend-multiply grayscale"
                />
              )}
              <span className="font-display text-lg font-semibold" dir="ltr">
                {p.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
