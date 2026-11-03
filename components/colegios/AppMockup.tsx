"use client";

import { useState, type KeyboardEvent } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BookOpen, CalendarDays, Home, MessageCircle, UserRound, ChevronRight, Bell } from "lucide-react";

const TABS = [
  { key: "inicio", Icon: Home },
  { key: "materias", Icon: BookOpen },
  { key: "calendario", Icon: CalendarDays },
  { key: "mensajes", Icon: MessageCircle },
  { key: "ficha", Icon: UserRound },
] as const;

type TabKey = (typeof TABS)[number]["key"];

// Conceptual design of the school app: NOT a screenshot of a product in use.
// All data shown is sample data (labelled as such under the phone).
export default function AppMockup() {
  const t = useTranslations("colegios.app");
  const [tab, setTab] = useState<TabKey>("inicio");
  const reduceMotion = useReducedMotion();

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    const dir = (event.key === "ArrowRight" ? 1 : -1) * (document.dir === "rtl" ? -1 : 1);
    const i = TABS.findIndex((x) => x.key === tab);
    const next = TABS[(i + dir + TABS.length) % TABS.length].key;
    setTab(next);
    document.getElementById(`school-tab-${next}`)?.focus();
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex h-[600px] w-[300px] flex-col overflow-hidden rounded-[2.75rem] border-[10px] border-navy-dark bg-cream shadow-2xl shadow-navy/25">
        <div className="mx-auto mt-2 h-5 w-24 rounded-full bg-navy-dark" aria-hidden="true" />

        <div
          id={`school-panel-${tab}`}
          role="tabpanel"
          aria-labelledby={`school-tab-${tab}`}
          className="relative flex-1 overflow-y-auto px-4 pb-4 pt-3"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
              animate={{ opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : 0.25 } }}
              exit={{ opacity: 0, transition: { duration: reduceMotion ? 0 : 0.15 } }}
            >
              {tab === "inicio" && <Inicio />}
              {tab === "materias" && <Materias />}
              {tab === "calendario" && <Calendario />}
              {tab === "mensajes" && <Mensajes />}
              {tab === "ficha" && <Ficha />}
            </motion.div>
          </AnimatePresence>
        </div>

        <div
          role="tablist"
          aria-label={t("title")}
          onKeyDown={onKeyDown}
          className="grid grid-cols-5 border-t border-navy/10 bg-white px-1 pb-3 pt-2"
        >
          {TABS.map(({ key, Icon }) => {
            const active = key === tab;
            return (
              <button
                key={key}
                id={`school-tab-${key}`}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls={`school-panel-${key}`}
                tabIndex={active ? 0 : -1}
                onClick={() => setTab(key)}
                className={`flex flex-col items-center gap-1 rounded-lg py-1 text-[10px] font-semibold transition ${
                  active ? "text-navy" : "text-ink/65"
                }`}
              >
                <Icon className={`size-5 ${active ? "text-gold-dark" : ""}`} aria-hidden="true" />
                {t(`tabs.${key}`)}
              </button>
            );
          })}
        </div>
      </div>
      <p className="mt-4 rounded-full bg-gold/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold-dark">
        {t("conceptLabel")}
      </p>
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  // Background defaults to white unless the caller passes its own bg-*.
  const bg = /(^|\s)bg-/.test(className) ? "" : "bg-white";
  return <div className={`rounded-2xl p-3.5 shadow-sm ${bg} ${className}`}>{children}</div>;
}

function Inicio() {
  const t = useTranslations("colegios.app.inicio");
  const agenda = t.raw("agenda") as string[];
  return (
    <div className="space-y-3">
      <div>
        <p className="text-lg font-extrabold text-navy">{t("greeting")}</p>
        <p className="text-xs text-ink/70">
          {t("date")} · <span className="text-gold-dark">{t("hebrewDate")}</span>
        </p>
      </div>
      <Card className="bg-navy text-white">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-gold-light">{t("nextLabel")}</p>
        <p className="mt-1 text-sm font-bold">{t("next")}</p>
      </Card>
      <Card>
        <p className="text-[10px] font-semibold uppercase tracking-wider text-ink/65">{t("agendaLabel")}</p>
        <ul className="mt-2 space-y-1.5">
          {agenda.map((item) => (
            <li key={item} className="flex items-center gap-2 text-xs text-ink/80">
              <span className="size-1.5 rounded-full bg-gold" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </Card>
      <Card className="border border-gold/40">
        <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-gold-dark">
          <Bell className="size-3" aria-hidden="true" />
          {t("noticeLabel")}
        </p>
        <p className="mt-1 text-xs text-ink/80">{t("notice")}</p>
      </Card>
    </div>
  );
}

function Materias() {
  const t = useTranslations("colegios.app");
  const items = t.raw("materias.items") as { name: string; grade: string; status: string }[];
  return (
    <div className="space-y-2">
      <p className="text-lg font-extrabold text-navy">{t("tabs.materias")}</p>
      {items.map((m) => (
        <Card key={m.name} className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-navy">{m.name}</p>
            <p className="text-[10px] text-ink/65">{m.status}</p>
          </div>
          <span className="text-lg font-extrabold text-navy">{m.grade}</span>
        </Card>
      ))}
    </div>
  );
}

function Calendario() {
  const t = useTranslations("colegios.app");
  const days = t.raw("calendario.days") as { day: string; event: string }[];
  return (
    <div className="space-y-2">
      <p className="text-lg font-extrabold text-navy">{t("tabs.calendario")}</p>
      <p className="text-xs text-ink/70">{t("calendario.week")}</p>
      {days.map((d) => (
        <Card key={d.day} className="flex items-center gap-3 py-2.5">
          <span className="w-8 text-xs font-bold text-ink/65">{d.day}</span>
          <span className={`text-xs ${d.event ? "font-semibold text-navy" : "text-ink/30"}`}>{d.event || "·"}</span>
        </Card>
      ))}
      <div className="rounded-2xl bg-gold/15 p-3 text-[11px] font-semibold text-gold-dark">{t("calendario.shabat")}</div>
    </div>
  );
}

function Mensajes() {
  const t = useTranslations("colegios.app");
  const items = t.raw("mensajes.items") as { from: string; text: string; meta: string }[];
  return (
    <div className="space-y-2">
      <p className="text-lg font-extrabold text-navy">{t("tabs.mensajes")}</p>
      {items.map((m) => (
        <Card key={m.from}>
          <div className="flex items-center justify-between gap-2">
            <p className="truncate text-xs font-bold text-navy">{m.from}</p>
            <span className="shrink-0 text-[10px] font-semibold text-gold-dark">{m.meta}</span>
          </div>
          <p className="mt-1 text-xs text-ink/70">{m.text}</p>
        </Card>
      ))}
    </div>
  );
}

function Ficha() {
  const t = useTranslations("colegios.app.ficha");
  const rows = t.raw("rows") as string[];
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <span className="flex size-12 items-center justify-center rounded-full bg-navy text-lg font-bold text-white">
          {t("name").slice(0, 1)}
        </span>
        <div>
          <p className="text-base font-extrabold text-navy">{t("name")}</p>
          <p className="text-[11px] text-ink/70">{t("course")}</p>
        </div>
      </div>
      <div className="divide-y divide-navy/5 overflow-hidden rounded-2xl bg-white shadow-sm">
        {rows.map((row) => (
          <div key={row} className="flex items-center justify-between px-3.5 py-3 text-xs font-medium text-navy">
            {row}
            <ChevronRight className="size-4 text-ink/30 rtl:rotate-180" aria-hidden="true" />
          </div>
        ))}
      </div>
    </div>
  );
}
