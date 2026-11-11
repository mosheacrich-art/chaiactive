"use client";

import { useState, type PointerEvent } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useAnimationControls,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type PanInfo,
} from "framer-motion";
import { Link } from "@/i18n/navigation";
import IPhoneFrame, { IPHONE } from "@/components/demo/IPhoneFrame";

// What we build, in one screen: three lines, one real capture each
// (public/images/stage), switched with the 01/02/03 tabs or a swipe on the
// phone. The phone follows the pointer a little in 3D and makes a short
// turn when the line changes. No scroll pinning.

type Line = "comunidades" | "colegios" | "empresas";
const LINES: { line: Line; key: string; shot: string }[] = [
  { line: "comunidades", key: "kehalHome", shot: "kehal-home" },
  { line: "colegios", key: "familia", shot: "colegio-familia" },
  { line: "empresas", key: "betterCoffee", shot: "bettercoffee-home" },
];

// Ground and ink per line, from the site palette: haze for communities,
// deep for schools, void for business.
const THEME: Record<Line, { bg: string; ink: string; muted: string; kicker: string; accent: string; onAccent: string }> = {
  comunidades: { bg: "#f3f7fc", ink: "#0d1a32", muted: "#394860", kicker: "#1d52de", accent: "#1d52de", onAccent: "#ffffff" },
  colegios: { bg: "#0c1d40", ink: "#f1f6fc", muted: "#b1bfd1", kicker: "#60b0ff", accent: "#1485f4", onAccent: "#ffffff" },
  empresas: { bg: "#040c20", ink: "#f1f6fc", muted: "#b1bfd1", kicker: "#60b0ff", accent: "#1d52de", onAccent: "#ffffff" },
};

const HREF: Record<Line, "/empresas" | { pathname: "/comunidades" | "/colegios"; hash: string }> = {
  comunidades: { pathname: "/comunidades", hash: "demo" },
  colegios: { pathname: "/colegios", hash: "demo" },
  empresas: "/empresas",
};

const EASE = [0.22, 1, 0.36, 1] as const;
// The screen slides like a swipe; `custom` carries the direction so the
// leaving screen goes the right way too.
const SLIDE = {
  enter: (d: number) => ({ x: `${100 * d}%` }),
  center: { x: "0%" },
  exit: (d: number) => ({ x: `${-100 * d}%` }),
};
const FADE = { enter: { opacity: 0 }, center: { opacity: 1 }, exit: { opacity: 0 } };

export default function AppStage() {
  const t = useTranslations("stage");
  const reduce = useReducedMotion();
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);
  const turn = useAnimationControls();

  // Pointer tilt: small and springy.
  const tx = useMotionValue(0);
  const ty = useMotionValue(0);
  const rotateY = useSpring(tx, { stiffness: 160, damping: 18 });
  const rotateX = useSpring(ty, { stiffness: 160, damping: 18 });
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    tx.set(((e.clientX - r.left) / r.width - 0.5) * 16);
    ty.set(-((e.clientY - r.top) / r.height - 0.5) * 10);
  };
  const onPointerLeave = () => {
    tx.set(0);
    ty.set(0);
  };

  const go = (next: number) => {
    const n = (next + LINES.length) % LINES.length;
    if (n === index) return;
    const d = next > index ? 1 : -1;
    setState([n, d]);
    if (!reduce) turn.start({ rotateY: [0, -18 * d, 0], transition: { duration: 0.45, ease: EASE } });
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -50) go(index + 1);
    else if (info.offset.x > 50) go(index - 1);
  };

  const { line, key, shot } = LINES[index];
  const theme = THEME[line];
  const scale = 0.72;

  return (
    <section
      id="casos"
      aria-label={t("label")}
      className="scroll-mt-16 overflow-hidden py-16 transition-colors duration-300 sm:py-24"
      style={{ backgroundColor: theme.bg, color: theme.ink }}
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:gap-16">
        {/* Words */}
        <div>
          <div role="tablist" aria-label={t("linesLabel")} className="flex flex-wrap gap-1.5 sm:gap-2">
            {LINES.map((l, i) => {
              const on = i === index;
              return (
                <button
                  key={l.line}
                  role="tab"
                  type="button"
                  aria-selected={on}
                  aria-controls="stage-panel"
                  onClick={() => go(i)}
                  className="min-h-11 rounded-full border px-3 text-[13px] font-semibold sm:px-4 sm:text-sm transition-[background-color,color,border-color,transform] duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97]"
                  style={
                    on
                      ? { backgroundColor: theme.ink, color: theme.bg, borderColor: theme.ink }
                      : { borderColor: theme.muted, color: theme.ink }
                  }
                >
                  <span className="me-1.5 font-mono tabular-nums opacity-60">0{i + 1}</span>
                  {t(`lines.${l.line}`)}
                </button>
              );
            })}
          </div>

          <div id="stage-panel" role="tabpanel" className="relative mt-8 min-h-[17rem] sm:min-h-[19rem] lg:mt-10 lg:min-h-[22rem]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={key}
                initial={reduce ? { opacity: 0 } : { opacity: 0, x: 24 * dir }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, x: -24 * dir }}
                transition={{ duration: 0.18, ease: EASE }}
              >
                <p className="font-mono text-xs font-medium uppercase tracking-[0.22em]" style={{ color: theme.kicker }}>
                  {t(`steps.${key}.kicker`)}
                </p>
                <h2 className="mt-3 max-w-xl text-4xl font-bold leading-[1.06] sm:text-5xl lg:text-6xl">{t(`steps.${key}.title`)}</h2>
                <p className="mt-4 max-w-md text-lg" style={{ color: theme.muted }}>
                  {t(`steps.${key}.body`)}
                </p>
                <Link
                  href={HREF[line]}
                  className="group mt-7 inline-flex min-h-11 items-center gap-2 rounded-full px-5 font-semibold transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97]"
                  style={{ backgroundColor: theme.accent, color: theme.onAccent }}
                >
                  {t(`cta.${line}`)}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180" aria-hidden="true" />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* The phone */}
        <div
          className="relative mx-auto touch-pan-y"
          style={{ width: IPHONE.width * scale, height: IPHONE.height * scale, perspective: 1400 }}
          onPointerMove={onPointerMove}
          onPointerLeave={onPointerLeave}
        >
          <div aria-hidden="true" className="absolute -bottom-5 left-1/2 h-8 w-3/4 -translate-x-1/2 rounded-[50%] bg-black/30 blur-2xl" />
          <motion.div
            drag={reduce ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={onDragEnd}
            className="absolute left-0 top-0 origin-top-left cursor-grab active:cursor-grabbing"
            style={{ width: IPHONE.width, height: IPHONE.height, scale, rotateY: reduce ? 0 : rotateY, rotateX: reduce ? 0 : rotateX }}
          >
            <motion.div animate={turn} className="h-full w-full">
              <IPhoneFrame>
                <div className="absolute inset-0 overflow-hidden">
                  <AnimatePresence initial={false} custom={dir}>
                    <motion.div
                      key={shot}
                      className="absolute inset-0"
                      custom={dir}
                      variants={reduce ? FADE : SLIDE}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.38, ease: EASE }}
                    >
                      <Image
                        src={`/images/stage/${shot}.jpg`}
                        alt={t(`steps.${key}.alt`)}
                        fill
                        sizes="300px"
                        priority={index === 0}
                        draggable={false}
                        className="select-none object-cover object-top"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </IPhoneFrame>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
