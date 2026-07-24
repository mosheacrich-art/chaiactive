"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { CASOS_CONFIG } from "./casos/data";
import PhotoPlaceholder from "./casos/PhotoPlaceholder";
import ScreenshotSlideshow from "./casos/ScreenshotSlideshow";

const AUTO_ADVANCE_MS = 6000;

type Slide = {
  name: string;
  description: string;
  quote: string;
  authorName: string;
  authorRole: string;
};

export default function CasosDeExito() {
  const t = useTranslations("casos");
  const slides = t.raw("slides") as Slide[];
  const reduceMotion = useReducedMotion();

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, AUTO_ADVANCE_MS);
    return () => clearTimeout(id);
  }, [paused, index, slides.length]);

  const slide = slides[index];
  const config = CASOS_CONFIG[index];

  const variants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: reduceMotion ? 0 : 0.4, ease: "easeOut" } },
    exit: { opacity: 0, transition: { duration: reduceMotion ? 0 : 0.25 } },
  };

  function goTo(i: number) {
    setIndex((i + slides.length) % slides.length);
  }

  return (
    <section id="casos" className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
          {t("title")}
        </h2>

        <div
          className="relative mt-12"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Previous"
            className="absolute start-0 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 rounded-full bg-white p-3 shadow-md transition hover:bg-cream sm:flex"
          >
            <ChevronLeft className="size-5 text-navy" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Next"
            className="absolute end-0 top-1/2 z-10 hidden -translate-y-1/2 translate-x-1/2 rounded-full bg-white p-3 shadow-md transition hover:bg-cream sm:flex"
          >
            <ChevronRight className="size-5 text-navy" aria-hidden="true" />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={variants}
              className="grid gap-5 lg:grid-cols-2"
            >
              <div className="flex flex-col gap-5">
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                  {config.screenshots ? (
                    <ScreenshotSlideshow images={config.screenshots} alt={slide.name} />
                  ) : config.photoPending ? (
                    <PhotoPlaceholder label={t("photoPending")} />
                  ) : null}
                  <div className="absolute bottom-4 start-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white p-2 shadow-md">
                    <Image
                      src={`/images/${config.logo}`}
                      alt={slide.name}
                      width={40}
                      height={40}
                      className="h-full w-full object-contain"
                    />
                  </div>
                </div>
                <div className="rounded-2xl bg-white p-6">
                  <p className="text-ink/70">{slide.description}</p>
                </div>
              </div>

              <div className="flex flex-col justify-between rounded-2xl bg-navy p-8 sm:p-10">
                <Quote className="size-10 text-gold" aria-hidden="true" />
                <p className="mt-6 text-2xl leading-snug text-white sm:text-3xl">
                  {slide.quote}
                </p>
                <div className="mt-8 text-end">
                  <p className="font-semibold text-white">{slide.authorName}</p>
                  <p className="text-sm text-white/60">{slide.authorRole}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.name}
              type="button"
              onClick={() => goTo(i)}
              aria-label={s.name}
              className="h-1.5 w-16 overflow-hidden rounded-full bg-navy/15"
            >
              <span
                className={`block h-full rounded-full bg-navy transition-all ${
                  i === index ? "w-full" : "w-0"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
