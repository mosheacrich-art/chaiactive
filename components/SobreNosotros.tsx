"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import SpecHeader from "@/components/home/SpecHeader";

// Nuestra historia: the two founders, the route between Barcelona and Israel,
// the story as a three-step line that fills as you scroll, and the closing
// sentence lighting up word by word.
// Order matches the `founders` array in messages/*.json: Isaac, Moshe.
const PHOTOS = ["/images/founders/isaac-ayash.jpg", "/images/founders/moshe-acrish.jpg"];
const CITIES = ["Barcelona", "Israel"];
const EASE = [0.22, 1, 0.36, 1] as const;

type Founder = { name: string; role: string; quote: string };

function Portrait({ founder, src, city, flip }: { founder: Founder; src: string; city: string; flip?: boolean }) {
  return (
    <figure className="group">
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-navy shadow-[0_30px_60px_-30px_rgb(13_26_50/0.5)]">
        <Image
          src={src}
          alt={founder.name}
          fill
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-void/85 to-transparent" />
        <span
          className={`absolute top-4 rounded-full bg-white/90 px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-navy backdrop-blur ${
            flip ? "end-4" : "start-4"
          }`}
        >
          {city}
        </span>
        <figcaption className="absolute inset-x-0 bottom-0 p-5 text-white">
          <span className="block text-xl font-bold">{founder.name}</span>
          <span className="mt-1 block text-sm text-white/75">{founder.role}</span>
        </figcaption>
      </div>
      <blockquote className="mt-4 border-s-2 border-royal ps-4 text-[15px] leading-relaxed text-ink/75">
        {founder.quote}
      </blockquote>
    </figure>
  );
}

// The arc between the two portraits: it draws itself once when it comes into
// view, then a dot keeps travelling along it.
function Route({ label }: { label: string }) {
  const reduce = useReducedMotion();
  const path = "M 8 120 C 60 10, 160 10, 212 120";
  return (
    <div className="relative hidden h-full items-center justify-center lg:flex" aria-hidden="true">
      <svg viewBox="0 0 220 130" className="w-[220px] overflow-visible">
        <path d={path} fill="none" stroke="var(--color-haze-3)" strokeWidth="2" />
        <motion.path
          d={path}
          fill="none"
          stroke="var(--color-royal)"
          strokeWidth="2"
          strokeDasharray="5 7"
          initial={reduce ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.4, ease: EASE }}
        />
        <circle cx="8" cy="120" r="5" fill="var(--color-royal)" />
        <circle cx="212" cy="120" r="5" fill="var(--color-royal)" />
        {!reduce && (
          <circle r="6" fill="var(--color-flame)">
            <animateMotion dur="3.2s" repeatCount="indefinite" path={path} keyPoints="0;1" keyTimes="0;1" calcMode="linear" />
          </circle>
        )}
      </svg>
      <span className="absolute top-[38%] whitespace-nowrap font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-royal">
        {label}
      </span>
    </div>
  );
}

// One word of the closing sentence: from faint to full as the reader scrolls.
function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return <motion.span style={{ opacity }}>{word} </motion.span>;
}

export default function SobreNosotros() {
  const t = useTranslations("sobreNosotros");
  const reduce = useReducedMotion();
  const paragraphs = t.raw("paragraphs") as string[];
  const founders = t.raw("founders") as Founder[];
  const steps = t.raw("steps") as string[];

  // Story line: fills while the timeline crosses the screen.
  const lineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: lineProgress } = useScroll({ target: lineRef, offset: ["start 85%", "end 55%"] });
  const fill = useTransform(lineProgress, [0, 1], [0, 1]);
  const [lit, setLit] = useState(reduce ? 3 : 0);
  useMotionValueEvent(lineProgress, "change", (v) => setLit(v > 0.85 ? 3 : v > 0.45 ? 2 : v > 0.05 ? 1 : 0));

  // Closing sentence, word by word.
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress: quoteProgress } = useScroll({ target: quoteRef, offset: ["start 90%", "end 45%"] });
  const words = t("pullQuote").split(" ");

  return (
    <section id="nosotros" aria-labelledby="nosotros-title" className="surface-haze scroll-mt-20 overflow-hidden py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SpecHeader id="nosotros-title" eyebrow={t("eyebrow")} title={t("title")} intro={t("subhead")} />

        {/* The founders and the route between them */}
        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
          <Portrait founder={founders[0]} src={PHOTOS[0]} city={CITIES[0]} />
          <Route label={t("bridge")} />
          <Portrait founder={founders[1]} src={PHOTOS[1]} city={CITIES[1]} flip />
        </div>

        {/* The story as three steps on a line that fills as you scroll */}
        <div ref={lineRef} className="relative mt-24">
          <div aria-hidden="true" className="absolute inset-x-0 top-[7px] hidden h-0.5 bg-haze-3 md:block">
            <motion.div className="h-full origin-left bg-royal rtl:origin-right" style={{ scaleX: reduce ? 1 : fill }} />
          </div>
          <ol className="grid gap-10 md:grid-cols-3 md:gap-8">
            {paragraphs.map((p, i) => {
              const on = i < lit;
              return (
                <li key={i} className="relative">
                  <span
                    aria-hidden="true"
                    className={`relative block size-4 rounded-full border-2 transition-colors duration-300 ${
                      on ? "border-royal bg-royal shadow-[0_0_0_6px_rgb(29_82_222/0.15)]" : "border-haze-3 bg-white"
                    }`}
                  />
                  <p className="mt-5 font-mono text-xs font-medium uppercase tracking-[0.22em] text-royal">
                    {String(i + 1).padStart(2, "0")} · {steps[i]}
                  </p>
                  <p className={`mt-3 text-base leading-relaxed transition-colors duration-300 ${on ? "text-ink/80" : "text-ink/55"}`}>
                    {p}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Closing sentence */}
        <p ref={quoteRef} className="font-display mx-auto mt-24 max-w-4xl text-center text-3xl font-extrabold leading-tight text-navy sm:text-5xl">
          {reduce
            ? t("pullQuote")
            : words.map((w, i) => (
                <Word key={i} word={w} progress={quoteProgress} range={[i / words.length, (i + 1) / words.length]} />
              ))}
        </p>
      </div>
    </section>
  );
}
