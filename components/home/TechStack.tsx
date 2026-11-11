"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  siAndroid,
  siApple,
  siCapacitor,
  siClaude,
  siGithub,
  siHtml5,
  siJavascript,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siReact,
  siResend,
  siStripe,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siVercel,
  siVite,
  type SimpleIcon,
} from "simple-icons";
import SpecHeader from "./SpecHeader";

// Only tools that are really in our repos (Kehál, the school app, client
// sites). Add one here when a project starts using it, not before.
type Cat = "frontend" | "languages" | "backend" | "mobile" | "services" | "deploy";
const TOOLS: { name: string; icon: SimpleIcon; cat: Cat }[] = [
  { name: "Next.js", icon: siNextdotjs, cat: "frontend" },
  { name: "React", icon: siReact, cat: "frontend" },
  { name: "Tailwind CSS", icon: siTailwindcss, cat: "frontend" },
  { name: "Vite", icon: siVite, cat: "frontend" },
  { name: "HTML5", icon: siHtml5, cat: "frontend" },
  { name: "TypeScript", icon: siTypescript, cat: "languages" },
  { name: "JavaScript", icon: siJavascript, cat: "languages" },
  { name: "Supabase", icon: siSupabase, cat: "backend" },
  { name: "PostgreSQL", icon: siPostgresql, cat: "backend" },
  { name: "Node.js", icon: siNodedotjs, cat: "backend" },
  { name: "Capacitor", icon: siCapacitor, cat: "mobile" },
  { name: "iOS", icon: siApple, cat: "mobile" },
  { name: "Android", icon: siAndroid, cat: "mobile" },
  { name: "Stripe", icon: siStripe, cat: "services" },
  { name: "Resend", icon: siResend, cat: "services" },
  { name: "Claude", icon: siClaude, cat: "services" },
  { name: "Vercel", icon: siVercel, cat: "deploy" },
  { name: "GitHub", icon: siGithub, cat: "deploy" },
];
const CATS: Cat[] = ["frontend", "languages", "backend", "mobile", "services", "deploy"];

function Corner({ side }: { side: "start" | "end" }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute -top-3 size-4 border-t border-navy/40 ${
        side === "start" ? "-start-3 border-s" : "-end-3 border-e"
      }`}
    />
  );
}

export default function TechStack() {
  const t = useTranslations("stack");
  const reduce = useReducedMotion();
  const [cat, setCat] = useState<Cat | "all">("all");
  const shown = cat === "all" ? TOOLS : TOOLS.filter((x) => x.cat === cat);

  const tabs: { id: Cat | "all"; label: string; count: number }[] = [
    { id: "all", label: t("all"), count: TOOLS.length },
    ...CATS.map((c) => ({ id: c, label: t(`categories.${c}`), count: TOOLS.filter((x) => x.cat === c).length })),
  ];

  return (
    <section aria-labelledby="stack-title" className="surface-haze py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SpecHeader id="stack-title" eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />

        <div className="relative mt-12">
          <Corner side="start" />
          <Corner side="end" />
          <div role="tablist" aria-label={t("filterLabel")} className="-mx-4 flex gap-x-1 overflow-x-auto border-b border-navy/15 px-4 pb-4 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:gap-y-2 sm:overflow-visible sm:px-0">
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

          <motion.ul layout={!reduce} className="mt-6 grid grid-cols-3 border-s border-t border-navy/15 lg:grid-cols-6">
            <AnimatePresence initial={false} mode="popLayout">
              {shown.map((tool) => (
                <motion.li
                  key={tool.name}
                  layout={!reduce}
                  initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex h-24 flex-col items-center justify-center gap-2 border-b border-e border-navy/15 px-2 text-center sm:flex-row sm:justify-start sm:gap-3 sm:px-5 sm:text-start transition-colors duration-150 hover:bg-white/70"
                >
                  <svg
                    role="img"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="size-6 shrink-0 fill-navy transition-transform duration-200 group-hover:scale-110"
                  >
                    <path d={tool.icon.path} />
                  </svg>
                  <span className="text-xs font-medium text-navy sm:text-base">{tool.name}</span>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
