import { useTranslations } from "next-intl";

export default function SobreNosotros() {
  const t = useTranslations("sobreNosotros");

  return (
    <section id="nosotros" className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6 sm:py-28">
      <h2 className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
        {t("title")}
      </h2>
      <p className="mt-6 text-lg leading-relaxed text-ink/70">{t("body")}</p>

      <div className="mt-8">
        <p className="font-bold text-navy">{t("founder.name")}</p>
        <p className="text-sm text-ink/50">{t("founder.role")}</p>
      </div>
    </section>
  );
}
