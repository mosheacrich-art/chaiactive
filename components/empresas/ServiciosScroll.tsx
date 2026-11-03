"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Globe, ShoppingBag, Rocket, AppWindow, Route, Languages, Search } from "lucide-react";

const ICONS = [Globe, ShoppingBag, Rocket, AppWindow, Route, Languages, Search];

type Item = { title: string; body: string };

// Third variant of the services-banner pattern: a horizontal track that the
// reader scrolls with the mouse wheel or finger (scroll-snap), each service a
// banner. A progress bar follows the horizontal position.
export default function ServiciosScroll() {
  const t = useTranslations("empresas.servicios");
  const items = t.raw("items") as Item[];
  const track = useRef<HTMLUListElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollXProgress } = useScroll({ container: track });
  const width = useTransform(scrollXProgress, [0, 1], ["8%", "100%"]);

  return (
    <section className="bg-navy py-20 text-white sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{t("title")}</h2>
        <p className="mt-4 max-w-2xl text-lg text-white/80">{t("intro")}</p>
      </div>

      <ul
        ref={track}
        tabIndex={0}
        aria-label={t("title")}
        className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-6 [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-gold sm:px-[max(1.5rem,calc((100vw_-_72rem)/2_+_1.5rem))] scroll-px-4 sm:scroll-px-[max(1.5rem,calc((100vw_-_72rem)/2_+_1.5rem))]"
      >
        {items.map((item, i) => {
          const Icon = ICONS[i];
          return (
            <li
              key={item.title}
              className="flex min-h-[280px] w-[78vw] max-w-[340px] shrink-0 snap-start flex-col rounded-3xl bg-white/[0.06] p-8 ring-1 ring-white/10"
            >
              <div className="flex items-center justify-between">
                <Icon className="size-8 text-gold-light" aria-hidden="true" />
                <span className="text-sm font-semibold text-white/50">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="mt-14">
                <h3 className="text-2xl font-bold">{item.title}</h3>
                <p className="mt-3 text-white/75">{item.body}</p>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mx-auto max-w-6xl px-4 sm:px-6" aria-hidden="true">
        <div className="h-1 overflow-hidden rounded-full bg-white/10">
          <motion.div className="h-full rounded-full bg-gold" style={reduceMotion ? { width: "100%" } : { width }} />
        </div>
      </div>
    </section>
  );
}
