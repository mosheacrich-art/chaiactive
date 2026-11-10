import { useTranslations } from "next-intl";
import { BadgeCheck, Cloud, Globe2, Lock, Scale, ShieldCheck } from "lucide-react";
import ScrollReveal from "@/components/about/ScrollReveal";

type Seal = { value: string; label: string };
type Item = { title: string; body: string };

// Same order as `seguridad.items` in messages/*.json.
const ICONS = [Lock, ShieldCheck, Cloud, Globe2, Scale, BadgeCheck];

// Security section of the home page, on the same cream background as the
// sections around it.
export default function Seguridad() {
  const t = useTranslations("seguridad");
  const seals = t.raw("seals") as Seal[];
  const items = t.raw("items") as Item[];

  return (
    <section
      id="seguridad"
      aria-labelledby="seguridad-title"
      className="relative scroll-mt-20 overflow-hidden bg-cream py-20 sm:py-28"
    >
      <span
        aria-hidden="true"
        className="font-hebrew pointer-events-none absolute -bottom-16 end-[-1rem] select-none text-[18rem] leading-none text-navy/[0.04]"
      >
        שמירה
      </span>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <ScrollReveal className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-gold-dark">{t("eyebrow")}</p>
          <h2 id="seguridad-title" className="mt-2 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-ink/70">{t("intro")}</p>
        </ScrollReveal>

        <ul className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {seals.map((seal, i) => (
            <li key={seal.value}>
              <ScrollReveal
                delay={i * 0.06}
                className="flex h-full flex-col items-center justify-center rounded-3xl border border-navy/10 bg-white px-4 py-8 text-center"
              >
                <span className="font-display text-3xl font-bold text-navy sm:text-4xl" dir="ltr">
                  {seal.value}
                </span>
                <span className="mt-2 text-sm text-ink/70">{seal.label}</span>
              </ScrollReveal>
            </li>
          ))}
        </ul>

        <ul className="mt-6 grid gap-px overflow-hidden rounded-3xl bg-navy/10 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const Icon = ICONS[i] ?? ShieldCheck;
            return (
              <li key={item.title} className="bg-white p-7">
                <Icon className="size-6 text-gold-dark" aria-hidden="true" />
                <h3 className="mt-4 font-bold text-navy">{item.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/70">{item.body}</p>
              </li>
            );
          })}
        </ul>

        <p className="mt-10 max-w-3xl text-lg font-medium text-navy">{t("note")}</p>
      </div>
    </section>
  );
}
