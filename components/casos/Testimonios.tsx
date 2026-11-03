"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Quote } from "lucide-react";
import { TESTIMONIOS_APPROVED } from "./data";

type Testimonio = { slug: string; quote: string; authorName: string; authorRole: string };

const AUTO_ADVANCE_MS = 7000;

// "Success Stories" carousel. Renders nothing until at least one quote is
// approved (TESTIMONIOS_APPROVED in ./data.ts): drafts are never shown as real.
export default function Testimonios() {
  const t = useTranslations("casos");
  const all = t.raw("testimonios") as Testimonio[];
  const items = all.filter((x) => TESTIMONIOS_APPROVED[x.slug]);
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || reduceMotion || items.length < 2) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % items.length), AUTO_ADVANCE_MS);
    return () => clearTimeout(id);
  }, [paused, reduceMotion, index, items.length]);

  if (items.length === 0) return null;
  const item = items[index % items.length];

  return (
    <div
      className="mt-16 rounded-3xl bg-navy p-8 sm:p-12"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <h3 className="sr-only">{t("testimoniosTitle")}</h3>
      <Quote className="size-10 text-gold" aria-hidden="true" />
      <AnimatePresence mode="wait">
        <motion.figure
          key={item.slug}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: reduceMotion ? 0 : 0.4 } }}
          exit={{ opacity: 0, transition: { duration: reduceMotion ? 0 : 0.25 } }}
        >
          <blockquote className="mt-6 text-2xl leading-snug text-white sm:text-3xl">{item.quote}</blockquote>
          <figcaption className="mt-8">
            <p className="font-semibold text-white">{item.authorName}</p>
            <p className="text-sm text-white/70">{item.authorRole}</p>
          </figcaption>
        </motion.figure>
      </AnimatePresence>
      {items.length > 1 && (
        <div className="mt-8 flex gap-2">
          {items.map((x, i) => (
            <button
              key={x.slug}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={x.authorName}
              aria-current={i === index}
              className={`h-1.5 w-10 rounded-full ${i === index ? "bg-gold" : "bg-white/25"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
