"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  AppWindow,
  Check,
  Globe,
  Languages,
  Mail,
  MessageCircle,
  Phone,
  Rocket,
  Route,
  Search,
  ShoppingBag,
  ShoppingCart,
} from "lucide-react";

// Lo que hacemos para empresas: one screen. On the left the seven services;
// on the right a browser window in 3D that follows the pointer and plays a
// small live scene for the chosen service (real client sites where we have
// them, animated UI for the rest). Autoplays while in view, stops on pick.
// Order matches `empresas.servicios.items` in messages/*.json.
const ICONS = [Globe, ShoppingBag, Rocket, AppWindow, Route, Languages, Search];
const URLS = ["shevat.eu", "creativefavours.vercel.app", "better-coffee.vercel.app", null, null, null, null];
const STEP_MS = 5200;
const EASE = [0.22, 1, 0.36, 1] as const;

type Item = { title: string; body: string; chip: string };

/* ---------- scenes ---------- */

function Shot({ src, alt, pan }: { src: string; alt: string; pan?: boolean }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="absolute inset-0"
      initial={{ scale: 1.08 }}
      animate={reduce ? { scale: 1.02 } : { scale: pan ? [1.08, 1.18] : [1.02, 1.08], x: pan ? ["0%", "-3%"] : 0 }}
      transition={{ duration: STEP_MS / 1000 + 1, ease: "linear" }}
    >
      <Image src={src} alt={alt} fill sizes="(min-width:1024px) 640px, 92vw" className="object-cover object-top" />
    </motion.div>
  );
}

function CorporateScene() {
  return (
    <>
      <Shot src="/images/casos/shevat/home.jpg" alt="Shevat" pan />
      {/* An editor cursor selecting the headline, as if editing it live */}
      <motion.div
        className="absolute left-[4%] top-[33%] h-[14%] w-[36%] rounded-md border-2 border-flame-bright bg-flame/15"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: [0, 1, 1, 0], scaleX: [0, 1, 1, 1] }}
        transition={{ duration: 3.2, times: [0, 0.25, 0.8, 1], repeat: Infinity, repeatDelay: 0.6, ease: EASE }}
        style={{ originX: 0 }}
      />
    </>
  );
}

function ShopScene() {
  const [n, setN] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setN((v) => (v >= 3 ? 1 : v + 1)), 1300);
    return () => clearInterval(id);
  }, []);
  return (
    <>
      <Shot src="/images/casos/creative-favours/landing.png" alt="Creative Favours" />
      <div className="absolute right-[4%] top-[3%] flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[11px] font-bold text-navy shadow-lg">
        <ShoppingCart className="size-3.5" aria-hidden="true" />
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span key={n} initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 10, opacity: 0 }}>
            {n}
          </motion.span>
        </AnimatePresence>
      </div>
      {/* a product flying to the cart */}
      <motion.div
        key={n}
        className="absolute bottom-[18%] left-[50%] size-10 rounded-lg bg-[#c94f7c] shadow-xl ring-2 ring-white"
        initial={{ opacity: 0, x: 0, y: 0, scale: 1 }}
        animate={{ opacity: [0, 1, 1, 0], x: [0, 40, 160], y: [0, -120, -240], scale: [1, 0.9, 0.3] }}
        transition={{ duration: 1.1, ease: "easeIn" }}
      />
    </>
  );
}

function LaunchScene() {
  const [count, setCount] = useState(1240);
  useEffect(() => {
    const id = setInterval(() => setCount((c) => c + 1 + Math.floor(Math.random() * 3)), 700);
    return () => clearInterval(id);
  }, []);
  return (
    <>
      <Shot src="/images/casos/better-coffee/home.jpg" alt="Better Coffee" />
      <div className="absolute inset-x-[18%] bottom-[8%] flex items-center gap-2 rounded-full bg-white p-1.5 ps-4 shadow-2xl">
        <motion.span
          className="flex-1 overflow-hidden whitespace-nowrap text-[11px] text-navy/70"
          initial={{ width: "0%" }}
          animate={{ width: ["0%", "100%", "100%"] }}
          transition={{ duration: 2.4, times: [0, 0.6, 1], repeat: Infinity, ease: "linear" }}
        >
          you@email.com
        </motion.span>
        <span className="rounded-full bg-[#111] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white">
          Join
        </span>
      </div>
      <div className="absolute left-[4%] top-[14%] rounded-xl bg-[#111]/85 px-3 py-2 font-mono text-white backdrop-blur">
        <span className="block text-[9px] uppercase tracking-[0.2em] text-white/60">waitlist</span>
        <span className="text-lg font-bold tabular-nums">{count.toLocaleString("en")}</span>
      </div>
    </>
  );
}

function AppScene() {
  const bars = [42, 68, 54, 86, 61, 93, 77];
  return (
    <div className="absolute inset-0 flex bg-haze">
      <div className="flex w-[18%] flex-col gap-2 bg-deep p-3">
        <span className="mb-2 h-3 w-10 rounded bg-white/80" />
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} className={`h-2.5 rounded ${i === 1 ? "bg-flame" : "bg-white/15"}`} />
        ))}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="grid grid-cols-3 gap-3">
          {["€18.4k", "326", "97%"].map((v, i) => (
            <motion.div
              key={v}
              className="rounded-lg bg-white p-3 shadow-sm"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08, ease: EASE }}
            >
              <span className="block h-1.5 w-10 rounded bg-navy/15" />
              <span className="mt-2 block text-base font-bold text-navy tabular-nums">{v}</span>
            </motion.div>
          ))}
        </div>
        <div className="flex flex-1 items-end gap-2 rounded-lg bg-white p-4 shadow-sm">
          {bars.map((h, i) => (
            <motion.span
              key={i}
              className={`flex-1 rounded-t ${i === 5 ? "bg-royal" : "bg-flame-bright/60"}`}
              initial={{ height: "4%" }}
              animate={{ height: [`4%`, `${h}%`, `${Math.max(20, h - 18)}%`, `${h}%`] }}
              transition={{ duration: 3.4, delay: 0.2 + i * 0.06, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[0, 1, 2].map((col) => (
            <div key={col} className="flex flex-col gap-1.5 rounded-md bg-haze-2 p-2">
              {Array.from({ length: col === 1 ? 2 : 1 }, (_, i) => (
                <span key={i} className="h-3 rounded bg-white" />
              ))}
            </div>
          ))}
        </div>
      </div>
      {/* a card moving across the board */}
      <motion.span
        className="absolute bottom-[11%] h-3 w-[19%] rounded bg-royal shadow-lg"
        animate={{ left: ["22%", "48%", "74%", "74%"] }}
        transition={{ duration: 3.6, times: [0, 0.4, 0.8, 1], repeat: Infinity, ease: EASE }}
      />
    </div>
  );
}

function FormScene() {
  const reduce = useReducedMotion();
  const channels = [
    { Icon: Mail, y: 25 },
    { Icon: Phone, y: 50 },
    { Icon: MessageCircle, y: 75 },
  ];
  const path = "M 150 50 C 200 50, 210 75, 265 75";
  return (
    <div className="absolute inset-0 bg-haze">
      <svg viewBox="0 0 320 100" preserveAspectRatio="none" className="absolute inset-0 size-full" aria-hidden="true">
        {channels.map((c) => (
          <path key={c.y} d={`M 150 50 C 200 50, 210 ${c.y}, 265 ${c.y}`} fill="none" stroke="var(--color-haze-3)" strokeWidth="0.8" />
        ))}
        <path d={path} fill="none" stroke="var(--color-royal)" strokeWidth="1" strokeDasharray="3 3" />
        {!reduce && (
          <circle r="2.4" fill="var(--color-flame)">
            <animateMotion dur="1.6s" repeatCount="indefinite" path={path} />
          </circle>
        )}
      </svg>
      {/* The form card, stepping through 1 → 2 → 3 */}
      <div className="absolute left-[6%] top-1/2 w-[38%] -translate-y-1/2 rounded-xl bg-white p-4 shadow-xl">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-1.5 flex-1 rounded-full bg-haze-3"
              animate={{ backgroundColor: ["#ccdcf2", "#1d52de", "#1d52de"] }}
              transition={{ duration: 3, delay: i * 0.8, times: [0, 0.1, 1], repeat: Infinity, repeatDelay: 0 }}
            />
          ))}
        </div>
        <span className="mt-4 block h-2 w-2/3 rounded bg-navy/20" />
        <span className="mt-3 block h-7 rounded-md border border-haze-3" />
        <span className="mt-2 block h-7 rounded-md border border-haze-3" />
        <motion.span
          className="mt-3 flex h-7 items-center justify-center rounded-md bg-royal text-white"
          animate={{ scale: [1, 1, 0.94, 1] }}
          transition={{ duration: 1.6, times: [0, 0.7, 0.8, 1], repeat: Infinity }}
        >
          <Check className="size-3.5" aria-hidden="true" />
        </motion.span>
      </div>
      {channels.map(({ Icon, y }, i) => (
        <span
          key={y}
          className={`absolute right-[6%] grid size-10 -translate-y-1/2 place-items-center rounded-full shadow-lg ${
            i === 2 ? "bg-[#25d366] text-white ring-4 ring-[#25d366]/25" : "bg-white text-navy/60"
          }`}
          style={{ top: `${y}%` }}
        >
          <Icon className="size-4.5" aria-hidden="true" />
        </span>
      ))}
    </div>
  );
}

const HELLO = [
  { w: "Hola", dir: "ltr" },
  { w: "Hello", dir: "ltr" },
  { w: "Bonjour", dir: "ltr" },
  { w: "שלום", dir: "rtl" },
] as const;

function LangScene() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % HELLO.length), 1200);
    return () => clearInterval(id);
  }, []);
  const h = HELLO[i];
  return (
    <div className="absolute inset-0 bg-white" dir={h.dir}>
      <div className="flex items-center justify-between border-b border-haze-2 px-5 py-3">
        <span className="h-3 w-14 rounded bg-navy" />
        <div className="flex gap-1">
          {["ES", "EN", "FR", "HE"].map((l, k) => (
            <span
              key={l}
              className={`rounded px-1.5 py-0.5 font-mono text-[9px] font-bold transition-colors duration-200 ${
                k === i ? "bg-royal text-white" : "text-navy/40"
              }`}
            >
              {l}
            </span>
          ))}
        </div>
      </div>
      <motion.div layout className="flex flex-col gap-3 px-6 pt-8" transition={{ ease: EASE, duration: 0.5 }}>
        <AnimatePresence mode="wait">
          <motion.span
            key={h.w}
            className="font-display text-5xl text-navy"
            initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            {h.w}
          </motion.span>
        </AnimatePresence>
        <span className="h-2 w-3/4 rounded bg-navy/15" />
        <span className="h-2 w-1/2 rounded bg-navy/15" />
        <span className="mt-3 h-8 w-28 rounded-full bg-royal" />
      </motion.div>
    </div>
  );
}

function SeoScene({ domain }: { domain: string }) {
  const [up, setUp] = useState(false);
  useEffect(() => {
    const id = setInterval(() => setUp((v) => !v), 1800);
    return () => clearInterval(id);
  }, []);
  const rows = up ? ["us", "a", "b", "c"] : ["a", "b", "c", "us"];
  return (
    <div className="absolute inset-0 bg-white px-[6%] pt-[5%]">
      <div className="flex items-center gap-2 rounded-full border border-haze-3 px-4 py-2 shadow-sm">
        <Search className="size-3.5 text-navy/50" aria-hidden="true" />
        <span className="h-2 w-32 rounded bg-navy/20" />
      </div>
      <ul className="mt-4 flex flex-col gap-2.5">
        {rows.map((r) => (
          <motion.li
            key={r}
            layout
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className={`rounded-lg p-2.5 ${r === "us" ? "bg-haze ring-1 ring-royal/40" : ""}`}
          >
            {r === "us" ? (
              <span className="block font-mono text-[10px] text-royal">{domain}</span>
            ) : (
              <span className="block h-1.5 w-20 rounded bg-navy/15" />
            )}
            <span className={`mt-1.5 block h-2.5 rounded ${r === "us" ? "w-3/5 bg-royal" : "w-1/2 bg-[#1a0dab]/30"}`} />
            <span className="mt-1.5 block h-1.5 w-4/5 rounded bg-navy/10" />
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- stage ---------- */

export default function ServiciosStage() {
  const t = useTranslations("empresas.servicios");
  const items = t.raw("items") as Item[];
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [dir, setDir] = useState(1);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.45 });

  useEffect(() => {
    if (!auto || !inView || reduce) return;
    const id = setTimeout(() => {
      setDir(1);
      setActive((a) => (a + 1) % items.length);
    }, STEP_MS);
    return () => clearTimeout(id);
  }, [active, auto, inView, reduce, items.length]);

  const pick = (i: number) => {
    setAuto(false);
    setDir(i >= active ? 1 : -1);
    setActive(i);
  };

  // Pointer tilt
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [12, 0]), { stiffness: 140, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-20, 4]), { stiffness: 140, damping: 18 });
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const scenes = [
    <CorporateScene key="0" />,
    <ShopScene key="1" />,
    <LaunchScene key="2" />,
    <AppScene key="3" />,
    <FormScene key="4" />,
    <LangScene key="5" />,
    <SeoScene key="6" domain={t("domain")} />,
  ];
  const url = URLS[active] ?? t("domain");
  const ActiveIcon = ICONS[active];

  return (
    <section
      ref={ref}
      id="servicios"
      aria-labelledby="servicios-title"
      className="surface-void relative scroll-mt-20 overflow-hidden py-20 sm:py-24"
    >
      {/* faint grid on the ground */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(var(--color-mist)_1px,transparent_1px),linear-gradient(90deg,var(--color-mist)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_70%_50%,black,transparent_70%)]"
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-flame-bright">{t("eyebrow")}</p>
        <div className="mt-4 grid items-end gap-6 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <h2 id="servicios-title" className="text-4xl leading-[0.98] text-white sm:text-5xl lg:text-6xl">
            {t("title")}
          </h2>
          <p className="max-w-md text-lg leading-relaxed text-white/65">{t("intro")}</p>
        </div>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.35fr)] lg:gap-14">
          {/* The services */}
          <div role="tablist" aria-label={t("pickLabel")} className="order-2 flex flex-col lg:order-1">
            {items.map((item, i) => {
              const on = i === active;
              const Icon = ICONS[i];
              return (
                <button
                  key={item.title}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  aria-controls="servicios-stage"
                  onClick={() => pick(i)}
                  className={`group relative overflow-hidden border-b border-white/10 py-3.5 text-start transition-colors duration-200 ${
                    on ? "text-white" : "text-white/50 hover:text-white/85"
                  }`}
                >
                  <span className="flex items-center gap-4">
                    <span className={`font-mono text-[11px] tabular-nums ${on ? "text-flame-bright" : "text-white/35"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <Icon
                      className={`size-5 shrink-0 transition-transform duration-200 group-hover:scale-110 ${on ? "text-flame-bright" : ""}`}
                      aria-hidden="true"
                    />
                    <span className="text-lg font-bold leading-tight">{item.title}</span>
                  </span>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.span
                        className="block overflow-hidden"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: EASE }}
                      >
                        <span className="block ps-[3.75rem] pt-2 text-[15px] leading-relaxed text-white/65">{item.body}</span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {on && (
                    <motion.span
                      key={`${active}-${auto}`}
                      aria-hidden="true"
                      className="absolute bottom-0 start-0 h-0.5 bg-flame"
                      initial={{ width: auto && !reduce ? "0%" : "100%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: auto && !reduce ? STEP_MS / 1000 : 0, ease: "linear" }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* The 3D stage */}
          <div
            className="order-1 [perspective:1600px] lg:order-2"
            onPointerMove={onMove}
            onPointerLeave={onLeave}
          >
            <motion.div
              id="servicios-stage"
              role="tabpanel"
              aria-label={items[active].title}
              className="relative [transform-style:preserve-3d]"
              style={reduce ? undefined : { rotateX: rx, rotateY: ry }}
            >
              {/* glow behind */}
              <div
                aria-hidden="true"
                className="absolute -inset-10 rounded-[3rem] bg-royal/30 blur-3xl [transform:translateZ(-120px)]"
              />
              {/* a second, ghost window behind for depth */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-2xl border border-white/10 bg-deep/60 [transform:translate3d(28px,-26px,-90px)]"
              />

              {/* the window */}
              <div dir="ltr" className="relative overflow-hidden rounded-2xl bg-white shadow-[0_50px_100px_-30px_rgb(0_0_0/0.7)] ring-1 ring-white/15">
                <div className="flex items-center gap-2 bg-[#eef2f8] px-4 py-2.5">
                  <span className="flex gap-1.5">
                    <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                    <span className="size-2.5 rounded-full bg-[#febc2e]" />
                    <span className="size-2.5 rounded-full bg-[#28c840]" />
                  </span>
                  <span className="mx-auto flex min-w-0 items-center gap-1.5 rounded-md bg-white px-3 py-1 font-mono text-[11px] text-navy/60">
                    <span className="size-1.5 shrink-0 rounded-full bg-[#28c840]" />
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={url}
                        className="truncate"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.15 }}
                      >
                        {url}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                  <span className="w-[42px]" />
                </div>
                <div className="relative aspect-[16/10] overflow-hidden bg-haze">
                  <AnimatePresence initial={false} custom={dir} mode="popLayout">
                    <motion.div
                      key={active}
                      custom={dir}
                      className="absolute inset-0"
                      variants={{
                        enter: (d: number) => (reduce ? { opacity: 0 } : { opacity: 0, x: `${d * 18}%`, scale: 0.96 }),
                        center: { opacity: 1, x: 0, scale: 1 },
                        exit: (d: number) => (reduce ? { opacity: 0 } : { opacity: 0, x: `${d * -18}%`, scale: 0.96 }),
                      }}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.45, ease: EASE }}
                    >
                      {scenes[active]}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* floating chip, closer to the viewer */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  className="absolute -bottom-6 start-4 flex items-center gap-2.5 rounded-2xl bg-white px-4 py-3 text-navy shadow-[0_24px_50px_-16px_rgb(0_0_0/0.6)] sm:-start-8"
                  initial={reduce ? { opacity: 0, z: 80 } : { opacity: 0, y: 16, scale: 0.9, z: 80 }}
                  animate={{ opacity: 1, y: 0, scale: 1, z: 80 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: 0.2, ease: EASE }}
                >
                  <span className="grid size-8 place-items-center rounded-lg bg-royal text-white">
                    <ActiveIcon className="size-4" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-bold">{items[active].chip}</span>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
