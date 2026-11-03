import { useTranslations } from "next-intl";
import ScrollReveal from "@/components/about/ScrollReveal";

// Full-width closing line before the footer, on every page.
// Options considered (es), first one in use (messages/*.json → closing.quote):
//   1. "La tecnología, cuando está bien hecha, deja más tiempo para la vida."
//   2. "Construimos herramientas que se parecen a quien las usa."
//   3. "Chai significa vida. Todo lo demás es código."
export default function ClosingQuote() {
  const t = useTranslations("closing");
  return (
    <section className="relative overflow-hidden bg-navy px-4 py-24 text-center sm:py-32">
      <span
        aria-hidden="true"
        className="font-hebrew pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-[14rem] leading-none text-white/[0.04] sm:text-[20rem]"
      >
        חי
      </span>
      <ScrollReveal className="relative mx-auto max-w-4xl">
        <blockquote>
          <p className="font-display text-3xl font-semibold leading-snug text-white sm:text-5xl sm:leading-tight">
            {t("quote")}
          </p>
        </blockquote>
        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-gold-light">Chai Active</p>
      </ScrollReveal>
    </section>
  );
}
