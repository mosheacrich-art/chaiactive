import { useTranslations } from "next-intl";
import { ArrowRight, Briefcase, GraduationCap, Users } from "lucide-react";
import { Link } from "@/i18n/navigation";
import ScrollReveal from "@/components/about/ScrollReveal";

const AUDIENCES = [
  { key: "comunidad", href: "/comunidades", Icon: Users },
  { key: "colegio", href: "/colegios", Icon: GraduationCap },
  { key: "empresa", href: "/empresas", Icon: Briefcase },
] as const;

type Card = { title: string; line: string };

export default function AudienceCards() {
  const t = useTranslations("audiences");
  const cards = t.raw("cards") as Record<(typeof AUDIENCES)[number]["key"], Card>;

  return (
    <section aria-labelledby="audiences-title" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 id="audiences-title" className="text-center text-3xl font-bold text-navy sm:text-4xl">
          {t("title")}
        </h2>
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {AUDIENCES.map(({ key, href, Icon }, i) => (
            <li key={key}>
              <ScrollReveal delay={i * 0.06} className="h-full">
                <Link
                  href={href}
                  className="group flex h-full flex-col rounded-[var(--radius-shot)] border border-navy/10 bg-white p-8 transition hover:border-navy/25 hover:shadow-[var(--shadow-shot)] motion-reduce:transition-none sm:p-10"
                >
                  <Icon className="size-8 text-navy" strokeWidth={1.5} aria-hidden="true" />
                  <span className="mt-8 font-display text-2xl font-bold text-navy">{cards[key].title}</span>
                  <span className="mt-2 flex-1 text-ink/70">{cards[key].line}</span>
                  <ArrowRight
                    className="mt-8 size-5 text-gold-dark transition group-hover:translate-x-1 motion-reduce:transition-none rtl:rotate-180 rtl:group-hover:-translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
