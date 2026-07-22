import { useTranslations } from "next-intl";
import HeroSlideshow from "./HeroSlideshow";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative overflow-hidden bg-[#f7f1ec] pb-16 pt-14 sm:pb-24 sm:pt-20">
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.15fr]">
        <div>
          <p className="mb-4 inline-flex rounded-full bg-navy/5 px-4 py-1.5 text-sm font-medium text-navy">
            {t("eyebrow")}
          </p>
          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-navy sm:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-md text-lg text-ink/70">{t("subtitle")}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#servicios"
              className="rounded-full bg-navy px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-navy-light"
            >
              {t("ctaPrimary")}
            </a>
            <a
              href="#contacto"
              className="rounded-full border border-navy/15 px-6 py-3 text-center text-sm font-semibold text-navy transition hover:bg-navy/5"
            >
              {t("ctaSecondary")}
            </a>
          </div>

          <p className="mt-6 text-sm text-ink/40">{t("trust")}</p>
        </div>

        <div>
          <HeroSlideshow />
        </div>
      </div>
    </section>
  );
}
