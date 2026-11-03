"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { CalendarDays, Droplets, HandHeart, Ticket } from "lucide-react";

// Illustrative preview only: shows how one app takes each community's
// name, colour and language. The sample strings are deliberately fixed per
// language (they are what the demo is demonstrating), not page translations.
const COLORS = ["#1b2e5e", "#7a2e3b", "#1f5a4a", "#6b4a1f", "#3b3f8f"];

const SAMPLE = {
  es: { dir: "ltr", greeting: "Shabat Shalom", items: ["Próximos eventos", "Reservar mikvé", "Donar", "Calendario hebreo"] },
  en: { dir: "ltr", greeting: "Shabbat Shalom", items: ["Upcoming events", "Book the mikveh", "Donate", "Hebrew calendar"] },
  fr: { dir: "ltr", greeting: "Chabbat Chalom", items: ["Prochains événements", "Réserver le mikvé", "Faire un don", "Calendrier hébraïque"] },
  he: { dir: "rtl", greeting: "שבת שלום", items: ["אירועים קרובים", "הזמנת מקווה", "תרומה", "לוח שנה עברי"] },
} as const;

type Lang = keyof typeof SAMPLE;
const LANGS: { code: Lang; label: string }[] = [
  { code: "es", label: "ES" },
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
  { code: "he", label: "עב" },
];
const ITEM_ICONS = [Ticket, Droplets, HandHeart, CalendarDays];

export default function Identidad() {
  const t = useTranslations("comunidades.identidad");
  const [name, setName] = useState("");
  const [color, setColor] = useState(COLORS[0]);
  const [lang, setLang] = useState<Lang>("es");
  const sample = SAMPLE[lang];
  const shownName = name.trim() || t("namePlaceholder");
  const initials = shownName
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <section className="bg-navy py-20 text-white sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{t("title")}</h2>
          <p className="mt-4 text-lg text-white/80">{t("body")}</p>

          <div className="mt-8 space-y-6 rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
            <div>
              <label htmlFor="community-name" className="text-sm font-semibold text-white/90">
                {t("nameLabel")}
              </label>
              <input
                id="community-name"
                value={name}
                maxLength={32}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("namePlaceholder")}
                className="mt-2 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-white placeholder:text-white/50 outline-none focus-visible:border-gold focus-visible:ring-2 focus-visible:ring-gold/50"
              />
            </div>

            <fieldset>
              <legend className="text-sm font-semibold text-white/90">{t("colorLabel")}</legend>
              <div className="mt-2 flex gap-3">
                {COLORS.map((c, i) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    aria-label={`${t("colorLabel")} ${i + 1}`}
                    aria-pressed={color === c}
                    className={`size-9 rounded-full ring-2 ring-offset-2 ring-offset-navy transition ${
                      color === c ? "ring-gold" : "ring-transparent"
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-sm font-semibold text-white/90">{t("langLabel")}</legend>
              <div className="mt-2 flex gap-2">
                {LANGS.map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => setLang(l.code)}
                    aria-pressed={lang === l.code}
                    className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                      lang === l.code ? "bg-gold text-navy-dark" : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>
        </div>

        {/* Phone preview */}
        <div className="flex flex-col items-center">
          <div
            dir={sample.dir}
            lang={lang}
            aria-live="polite"
            className="w-[280px] overflow-hidden rounded-[2.5rem] border-[10px] border-navy-dark bg-cream text-ink shadow-2xl"
          >
            <div className="px-5 pb-6 pt-8 text-white transition-colors" style={{ backgroundColor: color }}>
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-full bg-white/90 text-sm font-bold" style={{ color }}>
                  {initials}
                </span>
                <span className="truncate text-base font-bold">{shownName}</span>
              </div>
              <p className="mt-5 text-2xl font-extrabold">{sample.greeting}</p>
            </div>
            <ul className="grid grid-cols-2 gap-3 p-4">
              {sample.items.map((label, i) => {
                const Icon = ITEM_ICONS[i];
                return (
                  <li key={label} className="rounded-2xl bg-white p-3 shadow-sm">
                    <Icon className="size-5" style={{ color }} aria-hidden="true" />
                    <p className="mt-2 text-xs font-semibold leading-tight">{label}</p>
                  </li>
                );
              })}
            </ul>
          </div>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-white/60">{t("sampleLabel")}</p>
        </div>
      </div>
    </section>
  );
}
