"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Check, type LucideIcon } from "lucide-react";
import IPhoneFrame, { IPHONE } from "@/components/demo/IPhoneFrame";

// A product's modules as an explorer: pick one and the phone shows its real
// screen (captured from the live demo). It walks through them on its own
// while in view, with a progress bar on the active one, until the visitor
// picks one. No auto-advance under reduced motion.
// Used by /comunidades (Kehál) and /colegios (school app).

export type ExplorerModule = {
  icon: LucideIcon;
  /** Path under /public, e.g. "/images/modulos/mikve.jpg". */
  src: string;
  title: string;
  body?: string;
  points?: string[];
};

const STEP_MS = 4200;
const EASE = [0.22, 1, 0.36, 1] as const;
// `custom` carries the direction, so the leaving screen goes the right way.
const SLIDE = {
  enter: (d: number) => ({ x: `${100 * d}%` }),
  center: { x: "0%" },
  exit: (d: number) => ({ x: `${-100 * d}%` }),
};
const FADE = { enter: { opacity: 0 }, center: { opacity: 1 }, exit: { opacity: 0 } };

export default function ModuleExplorer({
  id,
  title,
  intro,
  modules,
}: {
  id: string;
  title: string;
  intro: string;
  modules: ExplorerModule[];
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [[index, dir], setState] = useState<[number, number]>([0, 1]);
  const [auto, setAuto] = useState(true);
  const playing = auto && inView && !reduce;
  const n = modules.length;

  useEffect(() => {
    if (!playing) return;
    const timer = setTimeout(() => setState(([i]) => [(i + 1) % n, 1]), STEP_MS);
    return () => clearTimeout(timer);
  }, [playing, index, n]);

  const pick = (i: number) => {
    setAuto(false);
    if (i !== index) setState([i, i > index ? 1 : -1]);
  };

  const item = modules[index];
  const scale = 0.68;
  const titleId = `${id}-title`;
  const panelId = `${id}-panel`;

  return (
    <section id={id} ref={ref} aria-labelledby={titleId} className="surface-haze scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-end gap-6 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <h2 id={titleId} className="text-4xl font-extrabold leading-[0.98] text-navy sm:text-5xl">
            {title}
          </h2>
          <p className="max-w-md text-lg leading-relaxed text-ink/70">{intro}</p>
        </div>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
          <div>
            {/* Module picker */}
            <div
              role="tablist"
              aria-label={title}
              className={`grid grid-cols-3 gap-2 sm:gap-3 ${n % 3 === 1 ? "sm:grid-cols-4" : ""}`}
            >
              {modules.map((m, i) => {
                const Icon = m.icon;
                const on = i === index;
                return (
                  <button
                    key={m.src}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    aria-controls={panelId}
                    onClick={() => pick(i)}
                    className={`group relative flex min-h-[5.5rem] flex-col items-start justify-between overflow-hidden rounded-2xl border p-3 text-start transition-[background-color,border-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] sm:p-4 ${
                      on
                        ? "border-royal bg-royal text-white shadow-[0_12px_30px_-12px_rgb(29_82_222/0.6)]"
                        : "border-navy/10 bg-white text-navy hover:border-royal/40"
                    }`}
                  >
                    <Icon className={`size-5 ${on ? "text-white" : "text-royal"}`} aria-hidden="true" />
                    <span className="mt-3 text-[13px] font-semibold leading-tight sm:text-sm">{m.title}</span>
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
            <div id={panelId} role="tabpanel" aria-live="polite" className="relative mt-6 min-h-[9rem] rounded-2xl border border-navy/10 bg-white p-6">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={index}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.18, ease: EASE }}
                >
                  <p className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-royal">
                    {String(index + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 text-xl font-bold text-navy">{item.title}</h3>
                  {item.body && <p className="mt-2 text-[15px] leading-relaxed text-ink/70">{item.body}</p>}
                  {item.points && (
                    <ul className="mt-3 grid gap-1.5 sm:grid-cols-2 sm:gap-x-6">
                      {item.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-2 text-[15px] leading-snug text-ink/75">
                          <Check className="mt-0.5 size-4 shrink-0 text-royal" aria-hidden="true" />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  )}
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
                      key={item.src}
                      custom={dir}
                      className="absolute inset-0"
                      variants={reduce ? FADE : SLIDE}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.4, ease: EASE }}
                    >
                      <Image src={item.src} alt={item.title} fill sizes="280px" className="object-cover object-top" />
                    </motion.div>
                  </AnimatePresence>
                  {/* Warm the cache so every switch is instant. */}
                  <div aria-hidden="true" className="sr-only">
                    {modules.map((m) => (
                      <Image key={m.src} src={m.src} alt="" width={393} height={768} sizes="280px" loading="eager" />
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
