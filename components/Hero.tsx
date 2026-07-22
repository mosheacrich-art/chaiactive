"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import HeroVisual from "./HeroVisual";

const AUTO_ADVANCE_MS = 5000;

export default function Hero() {
  const t = useTranslations("hero");
  const titleLines = t.raw("titleLines") as string[];
  const tabs = t.raw("tabs") as string[];

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => {
      setIndex((i) => (i + 1) % tabs.length);
    }, AUTO_ADVANCE_MS);
    return () => clearTimeout(id);
  }, [paused, index, tabs.length]);

  return (
    <section className="relative overflow-hidden bg-[#f7f1ec] pb-16 pt-14 sm:pb-24 sm:pt-20">
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.15fr]">
        <div>
          <p className="mb-4 inline-flex rounded-full bg-navy/5 px-4 py-1.5 text-sm font-medium text-navy">
            {t("eyebrow")}
          </p>
          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            {titleLines.map((line, i) => (
              <span
                key={line}
                className={`block ${
                  i === titleLines.length - 1 ? "text-gold" : "text-navy"
                }`}
              >
                {line}
              </span>
            ))}
          </h1>

          <p className="mt-6 max-w-md text-lg text-ink/70">{t("subtitle")}</p>

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
        </div>

        <HeroVisual
          tabLabels={tabs}
          activeIndex={index}
          onSelect={setIndex}
          onPauseChange={setPaused}
        />
      </div>
    </section>
  );
}
