import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "./about/ScrollReveal";

export default function IdeaSection() {
  const t = useTranslations("idea");
  const headlineLines = t.raw("headlineLines") as string[];
  const chips = t.raw("chips") as string[];

  return (
    <section id="idea" className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <ScrollReveal>
          <h2 className="text-3xl font-extrabold leading-[1.15] tracking-tight sm:text-4xl">
            <span className="block text-navy">{headlineLines[0]}</span>
            <span className="block text-gold">{headlineLines[1]}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-ink/60">{t("subhead")}</p>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {chips.map((chip, i) => {
            const isLast = i === chips.length - 1;
            return (
              <span
                key={chip}
                className={`rounded-full border px-4 py-2 text-sm font-medium ${
                  isLast ? "border-gold text-navy" : "border-navy/15 text-ink/70"
                }`}
              >
                {chip}
              </span>
            );
          })}
        </ScrollReveal>

        <ScrollReveal delay={0.2} className="mt-10">
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-navy-light"
          >
            {t("cta")}
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
