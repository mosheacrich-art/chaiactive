import { useTranslations } from "next-intl";
import { ArrowRight, Briefcase, GraduationCap, Users } from "lucide-react";
import { Link } from "@/i18n/navigation";

const AUDIENCES = [
  { key: "comunidad", href: "/comunidades", Icon: Users },
  { key: "colegio", href: "/colegios", Icon: GraduationCap },
  { key: "empresa", href: "/empresas", Icon: Briefcase },
] as const;

type Card = { title: string; body: string; note: string; cta: string };

export default function Hero() {
  const t = useTranslations("hero");
  const cards = t.raw("cards") as Record<(typeof AUDIENCES)[number]["key"], Card>;

  return (
    <section className="relative overflow-hidden bg-[#f7f1ec] pb-16 pt-16 sm:pb-24 sm:pt-24">
      {/* "חי" (chai, life): the idea behind the name, as a quiet backdrop. */}
      <span
        aria-hidden="true"
        className="font-hebrew pointer-events-none absolute -top-10 end-[-2rem] select-none text-[16rem] leading-none text-gold/10 sm:text-[22rem]"
      >
        חי
      </span>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl">
            <span className="block text-navy">{t("titleStart")}</span>
            <span className="mt-2 block text-gold-dark">{t("titleEnd")}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink/70 sm:text-xl">{t("subtitle")}</p>
        </div>

        <h2 className="mt-14 text-sm font-semibold uppercase tracking-wider text-ink/60">
          {t("selectorTitle")}
        </h2>
        <ul className="mt-4 grid gap-4 md:grid-cols-3">
          {AUDIENCES.map(({ key, href, Icon }) => {
            const card = cards[key];
            return (
              <li key={key}>
                <Link
                  href={href}
                  className="group flex h-full flex-col rounded-3xl border border-navy/10 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-navy/25 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-7"
                >
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-navy text-white">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <span className="mt-5 text-xl font-bold text-navy">{card.title}</span>
                  <span className="mt-2 flex-1 text-[15px] leading-relaxed text-ink/70">{card.body}</span>
                  <span className="mt-4 text-xs font-semibold uppercase tracking-wider text-gold-dark">
                    {card.note}
                  </span>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-navy">
                    {card.cta}
                    <ArrowRight
                      className="size-4 transition group-hover:translate-x-1 motion-reduce:transition-none rtl:rotate-180 rtl:group-hover:-translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
