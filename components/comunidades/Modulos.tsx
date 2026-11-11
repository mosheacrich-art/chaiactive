"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import {
  BookOpen,
  Briefcase,
  CalendarDays,
  Droplets,
  HandHeart,
  LayoutDashboard,
  Sparkles,
  Ticket,
  UserCheck,
} from "lucide-react";
import IPhoneFrame, { IPHONE } from "@/components/demo/IPhoneFrame";

// The nine Kehál modules as an explorer: pick one and the phone shows its
// real screen (captured from the live demo, public/images/modulos). It
// walks through them on its own while in view, until the visitor picks one.
// Order matches `comunidades.modulos.items` in messages/*.json.
const MODULES = [
  { icon: UserCheck, shot: "membresia" },
  { icon: CalendarDays, shot: "calendario" },
  { icon: Ticket, shot: "eventos" },
  { icon: Droplets, shot: "mikve" },
  { icon: HandHeart, shot: "donativos" },
  { icon: Sparkles, shot: "ciclo" },
  { icon: BookOpen, shot: "tora" },
  { icon: Briefcase, shot: "jconnect" },
  { icon: LayoutDashboard, shot: "admin" },
];
const STEP_MS = 4200;
const EASE = [0.22, 1, 0.36, 1] as const;
// `custom` carries the direction, so the leaving screen goes the right way.
const SLIDE = {
  enter: (d: number) => ({ x: `${100 * d}%` }),
  center: { x: "0%" },
  exit: (d: number) => ({ x: `${-100 * d}%` }),
};
const FADE = { enter: { opacity: 0 }, center: { opacity: 1 }, exit: { opacity: 0 } };

type Item = { title: string; body: string };

export default function Modulos() {
  const t = useTranslations("comunidades.modulos");
  const items = t.raw("items") as Item[];
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [[index, dir], setState] = useState<[number, number]>([0, 1]);
  const [auto, setAuto] = useState(true);
  const playing = auto && inView && !reduce;

  useEffect(() => {
    if (!playing) return;
    const id = setTimeout(() => setState(([i]) => [(i + 1) % MODULES.length, 1]), STEP_MS);
    return () => clearTimeout(id);
  }, [playing, index]);

  const pick = (i: number) => {
    setAuto(false);
    if (i !== index) setState([i, i > index ? 1 : -1]);
  };

  const item = items[index];
  const scale = 0.68;

  return (
    <section id="modulos" ref={ref} aria-labelledby="modulos-title" className="surface-haze scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-end gap-6 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <h2 id="modulos-title" className="text-4xl font-extrabold leading-[0.98] text-navy sm:text-5xl">
            {t("title")}
          </h2>
          <p className="max-w-md text-lg leading-relaxed text-ink/70">{t("intro")}</p>
        </div>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
          <div>
            {/* Module picker */}
            <div role="tablist" aria-label={t("title")} className="grid grid-cols-3 gap-2 sm:gap-3">
              {MODULES.map((m, i) => {
                const Icon = m.icon;
                const on = i === index;
                return (
                  <button
                    key={m.shot}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    aria-controls="modulo-panel"
                    onClick={() => pick(i)}
                    className={`group relative flex min-h-[5.5rem] flex-col items-start justify-between overflow-hidden rounded-2xl border p-3 text-start transition-[background-color,border-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] sm:p-4 ${
                      on
                        ? "border-royal bg-royal text-white shadow-[0_12px_30px_-12px_rgb(29_82_222/0.6)]"
                        : "border-navy/10 bg-white text-navy hover:border-royal/40"
                    }`}
                  >
                    <Icon className={`size-5 ${on ? "text-white" : "text-royal"}`} aria-hidden="true" />
                    <span className="mt-3 text-[13px] font-semibold leading-tight sm:text-sm">{items[i].title}</span>
                    {/* Time left on this module while it plays by itself */}
                    {on && playing && (
                      <motion.span
                        key={`bar-${index}`}
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-1 origin-left bg-white/70 rtl:origin-right"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: STEP_MS / 1000, ease: "linear" }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* What the selected module does */}
            <div id="modulo-panel" role="tabpanel" aria-live="polite" className="relative mt-6 min-h-[8rem] rounded-2xl border border-navy/10 bg-white p-6">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={index}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.18, ease: EASE }}
                >
                  <p className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-royal">
                    {String(index + 1).padStart(2, "0")} / {String(MODULES.length).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 text-xl font-bold text-navy">{item.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink/70">{item.body}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* The phone, with the module's real screen */}
          <div className="relative mx-auto" style={{ width: IPHONE.width * scale, height: IPHONE.height * scale }}>
            <div aria-hidden="true" className="absolute -bottom-5 left-1/2 h-8 w-3/4 -translate-x-1/2 rounded-[50%] bg-navy/25 blur-2xl" />
            <div className="absolute left-0 top-0 origin-top-left" style={{ width: IPHONE.width, height: IPHONE.height, transform: `scale(${scale})` }}>
              <IPhoneFrame>
                <div className="absolute inset-0 overflow-hidden">
                  <AnimatePresence initial={false} custom={dir}>
                    <motion.div
                      key={MODULES[index].shot}
                      custom={dir}
                      className="absolute inset-0"
                      variants={reduce ? FADE : SLIDE}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.4, ease: EASE }}
                    >
                      <Image
                        src={`/images/modulos/${MODULES[index].shot}.jpg`}
                        alt={item.title}
                        fill
                        sizes="280px"
                        className="object-cover object-top"
                      />
                    </motion.div>
                  </AnimatePresence>
                  {/* Warm the cache so every switch is instant. */}
                  <div aria-hidden="true" className="sr-only">
                    {MODULES.map((m) => (
                      <Image key={m.shot} src={`/images/modulos/${m.shot}.jpg`} alt="" width={393} height={768} sizes="280px" loading="eager" />
                    ))}
                  </div>
                </div>
              </IPhoneFrame>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
