"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    hidden: { opacity: 0, x: reduceMotion ? 0 : 40 },
    visible: { opacity: 1, x: 0, transition: { duration: reduceMotion ? 0 : 0.45, ease: "easeOut" } },
    exit: { opacity: 0, x: reduceMotion ? 0 : -40, transition: { duration: reduceMotion ? 0 : 0.3 } },
  };

  return (
    <div className="relative w-full overflow-hidden">
      <button
        type="button"
        onClick={() => goTo(index - 1)}
        aria-label="Previous"
        className="absolute start-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-3 shadow-md transition hover:bg-cream sm:start-6"
      >
        <ChevronLeft className="size-6 text-navy" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => goTo(index + 1)}
        aria-label="Next"
        className="absolute end-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-3 shadow-md transition hover:bg-cream sm:end-6"
      >
        <ChevronRight className="size-6 text-navy" aria-hidden="true" />
      </button>

      <AnimatePresence mode="wait">
        <motion.div
          key={slide.slug}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
          className="flex min-h-[80vh] w-full flex-col items-center justify-center gap-10 px-6 py-16 sm:px-12 lg:flex-row lg:gap-16 lg:px-20"
        >
          <div className="max-w-lg text-center lg:text-start">
            <span className="text-sm font-semibold text-gold">{slide.number}</span>
            <h3 className="mt-2 text-4xl font-extrabold leading-[1.1] text-navy sm:text-5xl">
              {slide.title}
            </h3>
            <p className="mt-6 text-xl text-ink/60">{slide.description}</p>
          </div>

          <div className="w-full max-w-2xl">
            <Image
              src={`/images/${slide.image}`}
              alt={slide.title}
              width={slide.width}
              height={slide.height}
              sizes="(min-width: 1024px) 700px, 90vw"
              className="h-auto w-full object-contain"
            />
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center gap-2 pb-4">
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
  );
}
