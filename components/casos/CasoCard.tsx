import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import type { CasoConfig } from "./data";
import ScreenshotSlideshow from "./ScreenshotSlideshow";
import PhotoPlaceholder from "./PhotoPlaceholder";

type CasoText = { name: string; sector: string; reto: string; solucion: string; resultado: string };

// One success story: screenshot, then reto / solución / resultado.
// `compact` is the smaller variant used on /empresas.
export default function CasoCard({ config, compact = false }: { config: CasoConfig; compact?: boolean }) {
  const t = useTranslations("casos");
  const text = t.raw(`items.${config.slug}`) as CasoText;
  const host = config.url.replace(/^https?:\/\//, "");

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-navy/10 bg-white shadow-sm">
      <div className="relative aspect-[4/3] bg-cream">
        {config.screenshots.length > 0 ? (
          <ScreenshotSlideshow images={config.screenshots} alt={t("screenshotAlt", { name: text.name })} />
        ) : (
          <PhotoPlaceholder label={t("screenshotPending")} />
        )}
        {config.logo && (
          <div className="absolute start-4 top-4 flex size-11 items-center justify-center rounded-xl bg-white p-1.5 shadow-md">
            <Image src={`/images/${config.logo}`} alt="" width={36} height={36} className="size-full object-contain" />
          </div>
        )}
      </div>

      <div className={`flex flex-1 flex-col ${compact ? "p-6" : "p-7"}`}>
        <p className="text-xs font-semibold uppercase tracking-wider text-gold-dark">{text.sector}</p>
        <h3 className="mt-1 text-xl font-bold text-navy">{text.name}</h3>

        <dl className={`mt-4 flex-1 space-y-3 ${compact ? "text-sm" : "text-[15px]"}`}>
          {(["reto", "solucion", "resultado"] as const).map((key) => (
            <div key={key}>
              <dt className="text-xs font-bold uppercase tracking-wider text-ink/70">{t(`labels.${key}`)}</dt>
              <dd className="mt-0.5 leading-relaxed text-ink/75">{text[key]}</dd>
            </div>
          ))}
        </dl>

        <a
          href={config.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-1.5 self-start rounded text-sm font-semibold text-navy underline underline-offset-4 hover:text-navy-light"
          dir="ltr"
        >
          {host}
          <ArrowUpRight className="size-4" aria-hidden="true" />
          <span className="sr-only">{t("opensNewTab")}</span>
        </a>
      </div>
    </article>
  );
}
