"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ServiceRow from "./ServiceRow";

export type CarouselSlide = {
  slug: string;
  image: string;
  width: number;
  height: number;
  title: string;
  description: string;
  number: string;
};

export default function ServicesCarousel({ slides }: { slides: CarouselSlide[] }) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  function goTo(i: number) {
    setIndex((i + slides.length) % slides.length);
  }

  const slide = slides[index];

  const variants: Variants = {
    hidden: { opacity: 0, x: reduceMotion ? 0 : 24 },
    visible: { opacity: 1, x: 0, transition: { duration: reduceMotion ? 0 : 0.4, ease: "easeOut" } },
    exit: { opacity: 0, x: reduceMotion ? 0 : -24, transition: { duration: reduceMotion ? 0 : 0.25 } },
  };

  return (
    <div>
      <div className="relative">
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
            key={slide.slug}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
          >
            <ServiceRow
              id={`servicio-${slide.slug}`}
              image={slide.image}
              width={slide.width}
              height={slide.height}
              title={slide.title}
              description={slide.description}
              layout="horizontal"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <span className="text-sm font-semibold text-navy">
          {slide.number}
          <span className="text-ink/30"> / {String(slides.length + 1).padStart(2, "0")}</span>
        </span>
        <div className="flex gap-2">
          {slides.map((s, i) => (
            <button
              key={s.slug}
              type="button"
              onClick={() => goTo(i)}
              aria-label={s.title}
              className="h-1.5 w-8 overflow-hidden rounded-full bg-navy/15"
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

      <div className="mt-4 flex justify-center gap-3 sm:hidden">
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          aria-label="Previous"
          className="rounded-full bg-white p-3 shadow-md"
        >
          <ChevronLeft className="size-5 text-navy" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => goTo(index + 1)}
          aria-label="Next"
          className="rounded-full bg-white p-3 shadow-md"
        >
          <ChevronRight className="size-5 text-navy" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
