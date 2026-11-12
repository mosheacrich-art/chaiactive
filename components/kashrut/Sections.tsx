import { useTranslations } from "next-intl";
import { Bot, FileText, MapPin, RefreshCw, Search, Smartphone } from "lucide-react";
import ScrollReveal from "@/components/about/ScrollReveal";
import SpecHeader from "@/components/home/SpecHeader";
import KashrutMockup from "./KashrutMockup";

type Stat = { value: string; label: string };
type Item = { title: string; body: string };

// Honesty rule for this page: the figures are counted from the app's own
// catalogue (repo mosheacrich-art/kosher, server/data/*.json, 2026-11):
// 418 products in 26 categories, 16 businesses. No usage figures.
export function Caso() {
  const t = useTranslations("kashrut.caso");
  const stats = t.raw("stats") as Stat[];

  return (
    <section id="app" className="scroll-mt-20 bg-cream py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:gap-20">
        <ScrollReveal>
          <p className="text-sm font-semibold uppercase tracking-wider text-gold-dark">{t("eyebrow")}</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">{t("title")}</h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink/70">{t("body")}</p>

          <ul className="mt-8 grid grid-cols-3 border-s border-t border-navy/15">
            {stats.map((s) => (
              <li key={s.label} className="border-b border-e border-navy/15 px-4 py-6">
                <span className="block font-display text-3xl font-extrabold text-navy sm:text-4xl" dir="ltr">
                  {s.value}
                </span>
                <span className="mt-2 block font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-mist-2">{s.label}</span>
              </li>
            ))}
          </ul>
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <KashrutMockup />
        </ScrollReveal>
      </div>
    </section>
  );
}

// Same order as `kashrut.funciones.items`.
const ICONS = [Search, FileText, Bot, MapPin, Smartphone, RefreshCw];

export function Funciones() {
  const t = useTranslations("kashrut.funciones");
  const items = t.raw("items") as Item[];

  return (
    <section id="funciones" aria-labelledby="funciones-title" className="scroll-mt-20 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SpecHeader id="funciones-title" eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />
        <ul className="mt-12 grid border-s border-t border-navy/15 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const Icon = ICONS[i] ?? Search;
            return (
              <li key={item.title} className="group border-b border-e border-navy/15 p-5 transition-colors duration-150 hover:bg-haze sm:p-7">
                <Icon className="size-5 text-gold-dark transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
                <h3 className="mt-4 font-bold text-navy-dark">{item.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/70">{item.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function ComoTrabajamos() {
  const t = useTranslations("kashrut.pasos");
  const items = t.raw("items") as Item[];

  return (
    <section className="surface-haze py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">{t("title")}</h2>
          <p className="mt-4 text-lg text-ink/70">{t("intro")}</p>
        </div>
        <ol className="mt-12 grid gap-4 sm:grid-cols-3">
          {items.map((item, i) => (
            <li key={item.title}>
              <ScrollReveal delay={i * 0.06} className="h-full rounded-2xl border border-navy/10 bg-white p-6">
                <span className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-royal">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-lg font-bold text-navy">{item.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/70">{item.body}</p>
              </ScrollReveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
