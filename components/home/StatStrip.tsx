import { useTranslations } from "next-intl";
import ScrollReveal from "@/components/about/ScrollReveal";

// Confirmed figures only. Today that is a single one; add more here only
// when they are verified.
export default function StatStrip() {
  const t = useTranslations("stats");
  return (
    <section className="bg-cream py-16 sm:py-20">
      <ScrollReveal className="mx-auto flex max-w-4xl flex-col items-center gap-3 px-4 text-center sm:flex-row sm:justify-center sm:gap-8 sm:text-start">
        <span className="font-display text-6xl font-bold text-navy sm:text-7xl" dir="ltr">
          {t("value")}
        </span>
        <span className="max-w-xs text-lg text-ink/75">
          {t("label")}
          <span className="mt-1 block text-sm font-semibold text-gold-dark">{t("source")}</span>
        </span>
      </ScrollReveal>
    </section>
  );
}
