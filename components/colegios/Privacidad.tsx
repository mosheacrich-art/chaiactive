"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Database, Download, EyeOff, FileSearch, KeyRound, Lock, Server, ShieldCheck, Megaphone } from "lucide-react";
import SpecHeader from "@/components/home/SpecHeader";

// The school app's privacy commitments, in the same plain technical style as
// the Tecnología section on the home: filter tabs with counts and a hairline
// grid. These are commitments for a product not yet in use, so the copy says
// "we commit", never "we are certified".
// Order matches `colegios.privacidad.items` in messages/*.json.
type Cat = "law" | "tech" | "use";
const META: { icon: typeof Lock; cat: Cat }[] = [
  { icon: Database, cat: "law" },
  { icon: ShieldCheck, cat: "law" },
  { icon: Server, cat: "tech" },
  { icon: Lock, cat: "tech" },
  { icon: KeyRound, cat: "tech" },
  { icon: EyeOff, cat: "tech" },
  { icon: FileSearch, cat: "law" },
  { icon: Megaphone, cat: "use" },
  { icon: Download, cat: "use" },
];
const CATS: Cat[] = ["law", "tech", "use"];

type Item = { title: string; body: string };

function Corner({ side }: { side: "start" | "end" }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute -top-3 size-4 border-t border-navy/40 ${side === "start" ? "-start-3 border-s" : "-end-3 border-e"}`}
    />
  );
}

export default function Privacidad() {
  const t = useTranslations("colegios.privacidad");
  const items = (t.raw("items") as Item[]).map((it, i) => ({ ...it, ...META[i] }));
  const reduce = useReducedMotion();
  const [cat, setCat] = useState<Cat | "all">("all");
  const shown = cat === "all" ? items : items.filter((x) => x.cat === cat);

  const tabs: { id: Cat | "all"; label: string; count: number }[] = [
    { id: "all", label: t("all"), count: items.length },
    ...CATS.map((c) => ({ id: c, label: t(`categories.${c}`), count: items.filter((x) => x.cat === c).length })),
  ];

  return (
    <section id="privacidad" aria-labelledby="privacidad-title" className="surface-haze scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SpecHeader id="privacidad-title" eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />

        <div className="relative mt-12">
          <Corner side="start" />
          <Corner side="end" />
          <div
            role="tablist"
            aria-label={t("filterLabel")}
            className="-mx-4 flex gap-x-1 overflow-x-auto border-b border-navy/15 px-4 pb-4 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:gap-y-2 sm:overflow-visible sm:px-0"
          >
            {tabs.map((tab) => {
              const on = tab.id === cat;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setCat(tab.id)}
                  className={`min-h-11 shrink-0 whitespace-nowrap px-4 font-mono text-xs font-medium uppercase tracking-[0.18em] transition-colors duration-150 ${
                    on ? "bg-royal text-white" : "text-navy/80 hover:bg-navy/5 hover:text-navy"
                  }`}
                >
                  {tab.label}
                  <span className={`ms-2 tabular-nums ${on ? "text-white/70" : "text-navy/45"}`}>{tab.count}</span>
                </button>
              );
            })}
          </div>

          <motion.ul layout={!reduce} className="mt-6 grid border-s border-t border-navy/15 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence initial={false} mode="popLayout">
              {shown.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.li
                    key={item.title}
                    layout={!reduce}
                    initial={reduce ? false : { opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                    className="group border-b border-e border-navy/15 p-6 transition-colors duration-150 hover:bg-white/70 sm:p-7"
                  >
                    <Icon className="size-6 text-royal transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
                    <h3 className="mt-4 font-bold text-navy">{item.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink/70">{item.body}</p>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
