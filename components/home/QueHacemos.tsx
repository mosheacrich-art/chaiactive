import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import ScrollReveal from "@/components/about/ScrollReveal";

const LINES = [
  { key: "comunidades", href: "/comunidades" },
  { key: "colegios", href: "/colegios" },
  { key: "empresas", href: "/empresas" },
] as const;

type Line = { label: string; title: string; body: string; cta: string };

export default function QueHacemos() {
  const t = useTranslations("queHacemos");
  const lines = t.raw("lines") as Record<(typeof LINES)[number]["key"], Line>;

  return (
    <section id="que-hacemos" className="py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <ScrollReveal className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">{t("title")}</h2>
          <p className="mt-5 text-lg leading-relaxed text-ink/70">{t("intro")}</p>
        </ScrollReveal>

        <ol className="flex flex-col divide-y divide-navy/10 border-y border-navy/10">
          {LINES.map(({ key, href }, i) => {
            const line = lines[key];
            return (
              <li key={key}>
                <ScrollReveal delay={i * 0.06} className="grid gap-3 py-8 sm:grid-cols-[3.5rem_1fr]">
                  <span className="text-sm font-semibold text-gold-dark">0{i + 1}</span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-ink/60">{line.label}</p>
                    <h3 className="mt-1 text-2xl font-bold text-navy">{line.title}</h3>
                    <p className="mt-3 leading-relaxed text-ink/70">{line.body}</p>
                    <Link
                      href={href}
                      className="mt-4 inline-flex items-center gap-2 rounded text-sm font-semibold text-navy underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-gold"
                    >
                      {line.cta}
                      <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
                    </Link>
                  </div>
                </ScrollReveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
