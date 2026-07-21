import { useTranslations } from "next-intl";
import BrowserFrame from "./BrowserFrame";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative overflow-hidden bg-navy pb-16 pt-14 text-cream sm:pb-24 sm:pt-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--color-gold) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <p className="mb-4 inline-flex rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-sm font-medium text-gold-light">
            {t("eyebrow")}
          </p>
          <h1 className="font-serif text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-cream/85">{t("subtitle")}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#servicios"
              className="rounded-full bg-gold px-6 py-3 text-center text-sm font-semibold text-navy-dark transition hover:bg-gold-light"
            >
              {t("ctaPrimary")}
            </a>
            <a
              href="#contacto"
              className="rounded-full border border-cream/30 px-6 py-3 text-center text-sm font-semibold text-cream transition hover:bg-cream/10"
            >
              {t("ctaSecondary")}
            </a>
          </div>

          <p className="mt-6 text-sm text-cream/60">{t("trust")}</p>
        </div>

        <div className="lg:pl-6">
          <BrowserFrame src="kehal-inicio.png" alt={t("imageAlt")} priority />
        </div>
      </div>
    </section>
  );
}
