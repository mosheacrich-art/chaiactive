import { useTranslations } from "next-intl";
import { ArrowRight, Database, KeyRound, Lock, MapPin, ShieldCheck, UserX } from "lucide-react";
import SpecHeader from "./SpecHeader";

type Seal = { value: string; label: string };
type Item = { title: string; body: string };

// Same order as `seguridad.items` in messages/*.json.
const ICONS = [Lock, ShieldCheck, Database, MapPin, KeyRound, UserX];

// Honesty rule for this section: the certifications (ISO 27001, SOC 2) are
// our providers' (Supabase, Vercel), never ours, and the copy says so.
// Data location verified 2026-11-11: Kehál's database in AWS eu-central-2
// (Zurich), the shops' in eu-west-1 (Ireland).
export default function Seguridad() {
  const t = useTranslations("seguridad");
  const seals = t.raw("seals") as Seal[];
  const items = t.raw("items") as Item[];

  return (
    <section id="seguridad" aria-labelledby="seguridad-title" className="scroll-mt-20 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SpecHeader id="seguridad-title" eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />

        {/* Key figures, as a strip of hairline cells */}
        <ul className="mt-12 grid grid-cols-2 border-s border-t border-navy/15 lg:grid-cols-4">
          {seals.map((seal) => (
            <li key={seal.value} className="border-b border-e border-navy/15 px-5 py-7">
              <span className="block font-sans text-3xl font-extrabold tracking-[-0.03em] text-navy-dark sm:text-4xl" dir="ltr">
                {seal.value}
              </span>
              <span className="mt-2 block text-xs font-bold uppercase tracking-[0.16em] text-navy/60">{seal.label}</span>
            </li>
          ))}
        </ul>

        {/* What it means in practice */}
        <ul className="grid border-s border-navy/15 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const Icon = ICONS[i] ?? ShieldCheck;
            return (
              <li key={item.title} className="group border-b border-e border-navy/15 p-5 transition-colors duration-150 hover:bg-cream sm:p-7">
                <Icon className="size-5 text-gold-dark transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
                <h3 className="mt-4 font-bold text-navy-dark">{item.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/70">{item.body}</p>
              </li>
            );
          })}
        </ul>

        <a
          href="#contacto"
          className="group mt-10 inline-flex min-h-11 items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-navy hover:text-gold-dark"
        >
          {t("note")}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
