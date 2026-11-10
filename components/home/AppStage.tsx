"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Link } from "@/i18n/navigation";
import IPhoneFrame, { IPHONE } from "@/components/demo/IPhoneFrame";

// The home's one big moment: a single 3D iPhone held on screen while the
// visitor scrolls through what we build. Every screen is a real capture of
// a live app or client site (public/images/stage). When the line changes
// (communities → schools → business) the phone turns a full circle and the
// ground changes colour; the screen swaps while its back is to the viewer.

type Line = "comunidades" | "colegios" | "empresas";
type Step = { line: Line; key: string; shot: string };

const STEPS: Step[] = [
  { line: "comunidades", key: "kehalHome", shot: "kehal-home" },
  { line: "comunidades", key: "kehalMikve", shot: "kehal-mikve" },
  { line: "colegios", key: "alumno", shot: "colegio-alumno" },
  { line: "colegios", key: "familia", shot: "colegio-familia" },
  { line: "colegios", key: "calendario", shot: "colegio-calendario" },
  { line: "empresas", key: "creativeFavours", shot: "cf-home" },
  { line: "empresas", key: "kippot", shot: "cf-kippot" },
  { line: "empresas", key: "shevat", shot: "shevat-home" },
  { line: "empresas", key: "betterCoffee", shot: "bettercoffee-home" },
];
const N = STEPS.length;
const LINES: Line[] = ["comunidades", "colegios", "empresas"];
const firstOf = (l: Line) => STEPS.findIndex((s) => s.line === l);

// Ground and ink per line: cream for communities, the school app's pine
// green for schools, navy for business.
const THEME: Record<Line, { bg: string; ink: string; muted: string; accent: string; back: string }> = {
  comunidades: { bg: "#f7f1ec", ink: "#1b2a4a", muted: "rgba(27,42,74,.68)", accent: "#8a6a1f", back: "#7a1f2b" },
  colegios: { bg: "#1f4d3f", ink: "#fbf6ec", muted: "rgba(251,246,236,.75)", accent: "#e0913a", back: "#e0913a" },
  empresas: { bg: "#1b2a4a", ink: "#ffffff", muted: "rgba(255,255,255,.72)", accent: "#d4b65f", back: "#d4437c" },
};

const HREF: Record<Line, "/colegios" | "/empresas" | { pathname: "/comunidades" | "/colegios"; hash: string }> = {
  comunidades: { pathname: "/comunidades", hash: "demo" },
  colegios: { pathname: "/colegios", hash: "demo" },
  empresas: "/empresas",
};

function useViewport() {
  return useSyncExternalStore(
    (cb) => {
      window.addEventListener("resize", cb);
      return () => window.removeEventListener("resize", cb);
    },
    () => `${window.innerWidth}x${window.innerHeight}`,
    () => "1440x900"
  );
}

export default function AppStage() {
  const t = useTranslations("stage");
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [vw, vh] = useViewport().split("x").map(Number);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(N - 1, Math.max(0, Math.floor(v * N))));
  });

  // Full turns at each change of line, a gentle sway inside a line.
  const b1 = firstOf("colegios") / N;
  const b2 = firstOf("empresas") / N;
  const d = 0.45 / N;
  const spin = useTransform(p, [b1 - d, b1 + d, b2 - d, b2 + d], [0, 360, 360, 720]);
  const rotateY = useTransform([spin, p] as const, ([s, v]: number[]) => s + Math.sin(v * N * Math.PI) * 9 - 4);
  const rotateX = useTransform(p, [0, 1], [6, -4]);
  const lift = useTransform(spin, (s) => -Math.abs(Math.sin((s * Math.PI) / 360)) * 14);
  const e = d / 3;
  const bg = useTransform(p, [b1 - e, b1 + e, b2 - e, b2 + e], [THEME.comunidades.bg, THEME.colegios.bg, THEME.colegios.bg, THEME.empresas.bg]);

  const step = STEPS[active];
  const line = step.line;
  const theme = THEME[line];
  const lineIndex = LINES.indexOf(line);

  // Phone size: as tall as the screen allows (smaller on a phone, where the
  // text sits above it).
  const narrow = vw < 1024;
  // 64px: the fixed header.
  const room = narrow ? (vh - 64) * 0.42 : (vh - 64) * 0.82;
  const scale = Math.min(narrow ? 0.62 : 0.86, room / IPHONE.height);

  const jump = (l: Line) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const travel = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + travel * ((firstOf(l) + 0.5) / N), behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <motion.section
      ref={ref}
      id="casos"
      aria-label={t("label")}
      className="relative"
      style={{ height: `${N * 85}svh`, backgroundColor: bg }}
    >
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden pt-16">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-6 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:gap-16">
          {/* Words */}
          <div className="relative z-10 transition-colors duration-500" style={{ color: theme.ink }}>
            <nav aria-label={t("linesLabel")} className="flex flex-wrap gap-2">
              {LINES.map((l, i) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => jump(l)}
                  aria-current={l === line ? "step" : undefined}
                  className="rounded-full border px-3 py-1.5 text-xs font-semibold sm:px-4 sm:py-2 sm:text-sm transition-[background-color,color,border-color,transform] duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
                  style={
                    l === line
                      ? { backgroundColor: theme.ink, color: theme.bg, borderColor: theme.ink }
                      : { borderColor: theme.muted, color: theme.ink }
                  }
                >
                  <span className="me-1.5 tabular-nums opacity-60">0{i + 1}</span>
                  {t(`lines.${l}`)}
                </button>
              ))}
            </nav>

            <div className="relative mt-5 min-h-[12rem] sm:mt-8 sm:min-h-[15rem] lg:mt-12">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={step.key}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12, filter: "blur(4px)" }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="text-sm font-semibold uppercase tracking-wider" style={{ color: theme.accent }}>
                    {t(`steps.${step.key}.kicker`)}
                  </p>
                  <h2 className="mt-3 max-w-xl text-3xl font-bold leading-[1.08] sm:text-5xl lg:text-6xl">
                    {t(`steps.${step.key}.title`)}
                  </h2>
                  <p className="mt-4 max-w-md text-base sm:text-lg" style={{ color: theme.muted }}>
                    {t(`steps.${step.key}.body`)}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-4 flex items-center gap-6 sm:mt-6">
              <Link
                href={HREF[line]}
                className="group inline-flex min-h-11 items-center gap-2 rounded-full px-5 font-semibold transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
                style={{ backgroundColor: theme.accent, color: line === "comunidades" ? "#fff" : theme.bg }}
              >
                {t(`cta.${line}`)}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180" aria-hidden="true" />
              </Link>
              {/* Progress through the line */}
              <div className="flex gap-1.5" aria-hidden="true">
                {STEPS.filter((s) => s.line === line).map((s) => (
                  <span
                    key={s.key}
                    className="h-1.5 rounded-full transition-all duration-300"
                    style={{
                      width: s.key === step.key ? 28 : 8,
                      backgroundColor: s.key === step.key ? theme.ink : theme.muted,
                      opacity: s.key === step.key ? 1 : 0.5,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* The phone */}
          <div
            className="relative mx-auto"
            style={{ width: IPHONE.width * scale, height: IPHONE.height * scale, perspective: 1800 }}
          >
            {/* Soft shadow on the ground */}
            <div
              aria-hidden="true"
              className="absolute -bottom-6 left-1/2 h-8 w-3/4 -translate-x-1/2 rounded-[50%] bg-black/25 blur-2xl"
            />
            <motion.div
              className="absolute left-0 top-0 origin-top-left"
              style={{ width: IPHONE.width, height: IPHONE.height, scale }}
            >
              <motion.div
                className="relative h-full w-full"
                style={{
                  transformStyle: "preserve-3d",
                  rotateY: reduce ? 0 : rotateY,
                  rotateX: reduce ? 0 : rotateX,
                  y: reduce ? 0 : lift,
                }}
              >
                {/* Front */}
                <div className="absolute inset-0" style={{ backfaceVisibility: "hidden" }}>
                  <IPhoneFrame>
                    {STEPS.map((s, i) => (
                      <Image
                        key={s.key}
                        src={`/images/stage/${s.shot}.jpg`}
                        alt={i === active ? t(`steps.${s.key}.alt`) : ""}
                        aria-hidden={i === active ? undefined : true}
                        fill
                        sizes="400px"
                        priority={i < 2}
                        className="object-cover object-top transition-opacity duration-500"
                        style={{ opacity: i === active ? 1 : 0 }}
                      />
                    ))}
                  </IPhoneFrame>
                </div>
                {/* Back: the line's colour and our mark */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center justify-center rounded-[64px] border-[13px] border-[#1c1c1e] transition-colors duration-300"
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", backgroundColor: THEME[LINES[Math.min(2, lineIndex)]].back }}
                >
                  <div className="absolute left-6 top-6 grid size-36 grid-cols-2 gap-3 rounded-[40px] bg-black/20 p-5">
                    {[0, 1, 2].map((k) => (
                      <span key={k} className="rounded-full bg-black/60 ring-4 ring-white/10" />
                    ))}
                  </div>
                  <Image src="/images/brand/chai-active-icon.png" alt="" width={120} height={120} className="opacity-90 brightness-0 invert" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
