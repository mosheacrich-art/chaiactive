"use client";

import { forwardRef } from "react";
import { Playfair_Display } from "next/font/google";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, Lightbulb, type LucideIcon } from "lucide-react";
import DeviceStage from "./DeviceStage";
import type { ServiceCardData } from "./FloatingCard";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

export type ServiceBannerProps = {
  id: string;
  number: string;
  eyebrow: string;
  headlineLines: string[];
  description: string;
  chips: { icon: LucideIcon; label: string }[];
  cta: string;
  ctaHref?: string;
  asideNote?: string;
  device: "phone" | "laptop";
  deviceImage: string;
  cards: (ServiceCardData & { icon: LucideIcon })[];
  tone: "cream" | "white";
};

const ServiceBanner = forwardRef<HTMLElement, ServiceBannerProps>(function ServiceBanner(
  {
    id,
    number,
    eyebrow,
    headlineLines,
    description,
    chips,
    cta,
    ctaHref = "#contacto",
    asideNote,
    device,
    deviceImage,
    cards,
    tone,
  },
  ref
) {
  const reduceMotion = useReducedMotion();

  const textVariants: Variants = {
    hidden: { opacity: 0, x: reduceMotion ? 0 : -24 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section
      id={id}
      ref={ref}
      className={`flex min-h-screen items-center border-b border-black/5 py-20 ${
        tone === "cream" ? "bg-cream" : "bg-white"
      }`}
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={textVariants}
        >
          <div className="mb-5 flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-xl bg-gold text-base font-bold text-navy-dark">
              {number}
            </span>
            <p className="text-sm font-bold uppercase tracking-[0.15em] text-gold">
              {eyebrow}
            </p>
          </div>

          <h2
            className={`${playfair.className} text-4xl leading-[1.15] tracking-tight sm:text-5xl`}
          >
            {headlineLines.map((line, i) => (
              <span
                key={line}
                className={`block ${
                  i === headlineLines.length - 1 ? "text-gold" : "text-navy"
                }`}
              >
                {line}
              </span>
            ))}
          </h2>

          <p className="mt-5 max-w-md text-lg text-ink/60">{description}</p>

          <div className="mt-4 h-1 w-10 rounded-full bg-gold" />

          <div className="mt-6 flex flex-wrap gap-4">
            {chips.map((chip) => {
              const Icon = chip.icon;
              return (
                <div key={chip.label} className="flex w-16 flex-col items-center gap-2 text-center">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-gold/15">
                    <Icon className="size-5 text-navy" aria-hidden="true" />
                  </div>
                  <span className="text-xs font-medium text-ink/60">{chip.label}</span>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-6">
            <a
              href={ctaHref}
              className="inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white transition hover:bg-navy-light"
            >
              {cta}
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            {asideNote && (
              <p className="flex max-w-[220px] items-center gap-2 text-sm text-ink/60">
                <Lightbulb className="size-5 shrink-0 text-gold" aria-hidden="true" />
                {asideNote}
              </p>
            )}
          </div>
        </motion.div>

        <DeviceStage device={device} deviceImage={deviceImage} cards={cards} />
      </div>
    </section>
  );
});

export default ServiceBanner;
