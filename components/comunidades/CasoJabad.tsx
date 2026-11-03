import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import ScreenshotSlideshow from "@/components/casos/ScreenshotSlideshow";
import ScrollReveal from "@/components/about/ScrollReveal";

const SCREENSHOTS = [
  "casos/jabad/login.png",
  "casos/jabad/inicio.png",
  "casos/jabad/calendario.png",
  "casos/jabad/eventos.png",
  "casos/jabad/mikve.png",
  "casos/jabad/donativos.png",
];

export default function CasoJabad() {
  const t = useTranslations("comunidades.caso");

  return (
    <section className="bg-cream py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr]">
        <ScrollReveal className="shot relative aspect-[4/3] bg-white">
          <ScreenshotSlideshow images={SCREENSHOTS} alt={t("screenshotAlt")} />
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <p className="text-sm font-semibold uppercase tracking-wider text-gold-dark">{t("eyebrow")}</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">{t("title")}</h2>
          <p className="mt-4 text-lg leading-relaxed text-ink/70">{t("body")}</p>

          <div className="mt-8 flex items-baseline gap-4 border-t border-navy/10 pt-6">
            <span className="text-5xl font-extrabold text-navy" dir="ltr">{t("stat")}</span>
            <span className="text-ink/70">{t("statLabel")}</span>
          </div>

          <a
            href="https://bcnkehila.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-1.5 rounded text-sm font-semibold text-navy underline underline-offset-4 hover:text-navy-light"
          >
            {t("link")}
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
