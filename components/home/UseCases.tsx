import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import ScrollReveal from "@/components/about/ScrollReveal";

type Line = "comunidades" | "colegios" | "empresas";
type Card = { title: string; body: string };

const ORDER: Line[] = ["comunidades", "colegios", "empresas"];

// Use-case cards with action titles, each linking to its line's page.
// School cards carry "Diseño conceptual": that product is designed, not in use.
export default function UseCases() {
  const t = useTranslations("useCases");
  return (
    <section aria-labelledby="usecases-title" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 id="usecases-title" className="max-w-2xl text-3xl font-bold text-navy sm:text-4xl">
          {t("title")}
        </h2>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ORDER.flatMap((line) =>
            (t.raw(`items.${line}`) as Card[]).map((card, i) => (
              <li key={card.title}>
                <ScrollReveal delay={i * 0.05} className="h-full">
                  <Link
                    href={`/${line}`}
                    className="group flex h-full flex-col rounded-[var(--radius-shot)] bg-cream p-7 transition hover:bg-[#f2efe8] motion-reduce:transition-none"
                  >
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-ink/65">
                        {t(`tags.${line}`)}
                      </span>
                      {line === "colegios" && (
                        <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[11px] font-semibold text-gold-dark">
                          {t("concept")}
                        </span>
                      )}
                    </span>
                    <span className="mt-4 text-xl font-bold leading-snug text-navy">{card.title}</span>
                    <span className="mt-2 flex-1 text-[15px] text-ink/70">{card.body}</span>
                    <ArrowRight
                      className="mt-6 size-4 text-navy transition group-hover:translate-x-1 motion-reduce:transition-none rtl:rotate-180 rtl:group-hover:-translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </ScrollReveal>
              </li>
            ))
          )}
        </ul>
      </div>
    </section>
  );
}
