import { useTranslations } from "next-intl";

export default function SobreNosotros() {
  const t = useTranslations("sobreNosotros");

  return (
    <section id="nosotros" className="bg-cream-dark/40 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-gold">
          {t("eyebrow")}
        </p>
        <h2 className="mt-3 font-serif text-3xl font-bold text-navy sm:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-navy/75">{t("body")}</p>

        <div className="mt-8 inline-flex flex-col items-center">
          <p className="font-serif text-lg font-semibold text-navy">
            {t("founder.name")}
          </p>
          <p className="text-sm text-navy/60">{t("founder.role")}</p>
        </div>
      </div>
    </section>
  );
}
