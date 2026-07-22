"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import HeroVisual from "./HeroVisual";

const AUTO_ADVANCE_MS = 5000;

type HeroState = { tabLabel: string; leadWord: string; rest: string };

export default function Hero() {
  const t = useTranslations("hero");
  const states = t.raw("states") as HeroState[];
  const reduceMotion = useReducedMotion();

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => {
      setIndex((i) => (i + 1) % states.length);
    }, AUTO_ADVANCE_MS);
    return () => clearTimeout(id);
  }, [paused, index, states.length]);

  const active = states[index];

  return (
    <section className="relative overflow-hidden bg-[#f7f1ec] pb-16 pt-14 sm:pb-24 sm:pt-20">
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.15fr]">
        <div>
          <p className="mb-4 inline-flex rounded-full bg-navy/5 px-4 py-1.5 text-sm font-medium text-navy">
            {t("eyebrow")}
          </p>
          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-navy sm:text-5xl lg:text-6xl">
            {t("title")}
          </h1>

          <div className="relative mt-6 min-h-[5rem] max-w-md sm:min-h-[3.5rem]">
            <AnimatePresence mode="sync">
              <motion.p
                key={index}
                className="absolute inset-0 text-lg text-ink/70"
                initial={{ opacity: reduceMotion ? 1 : 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <span className="font-bold text-navy">{active.leadWord}</span>{" "}
                {active.rest}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#servicios"
              className="rounded-full bg-navy px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-navy-light"
            >
              {t("ctaPrimary")}
            </a>
            <a
              href="#contacto"
              className="rounded-full border border-navy/15 px-6 py-3 text-center text-sm font-semibold text-navy transition hover:bg-navy/5"
            >
              {t("ctaSecondary")}
            </a>
          </div>

          <p className="mt-6 text-sm text-ink/40">{t("trust")}</p>
        </div>

        <HeroVisual
          tabLabels={states.map((s) => s.tabLabel)}
          activeIndex={index}
          onSelect={setIndex}
          onPauseChange={setPaused}
        />
      </div>
    </section>
  );
}
