"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// `es` is the fallback for any locale without its own mockup yet.
const IMAGES: { es: string; en?: string; fr?: string; he?: string }[] = [
  {
    es: "mockup-eventos.png",
    en: "mockup-eventos-en.png",
    fr: "mockup-eventos-fr.png",
    he: "mockup-eventos-he.png",
  },
  {
    es: "mockup-donativos.png",
    en: "mockup-donativos-en.png",
    fr: "mockup-donativos-fr.png",
    he: "mockup-donativos-he.png",
  },
  {
    es: "mockup-mikve.png",
    en: "mockup-mikve-en.png",
    fr: "mockup-mikve-fr.png",
    he: "mockup-mikve-he.png",
  },
];

function pickImage(entry: (typeof IMAGES)[number], locale: string) {
  if (locale === "en" && entry.en) return entry.en;
  if (locale === "fr" && entry.fr) return entry.fr;
  if (locale === "he" && entry.he) return entry.he;
  return entry.es;
}

const HOVER_QUERY = "(hover: hover) and (pointer: fine)";

function subscribeHover(callback: () => void) {
  const mq = window.matchMedia(HOVER_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getHoverSnapshot() {
  return window.matchMedia(HOVER_QUERY).matches;
}

function getHoverServerSnapshot() {
  return false;
}

function useHasHover() {
  return useSyncExternalStore(
    subscribeHover,
    getHoverSnapshot,
    getHoverServerSnapshot
  );
}

export default function HeroVisual({
  tabLabels,
  activeIndex,
  onSelect,
  onPauseChange,
}: {
  tabLabels: string[];
  activeIndex: number;
  onSelect: (i: number) => void;
  onPauseChange: (paused: boolean) => void;
}) {
  const reduceMotion = useReducedMotion();
  const hasHover = useHasHover();
  const locale = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);
  const [drift, setDrift] = useState({ x: 0, y: 0 });

  // Desktop: very subtle drift following the cursor. Touch: slow idle bob instead.
  useEffect(() => {
    if (reduceMotion) return;

    if (hasHover) {
      const handleMove = (e: MouseEvent) => {
        const el = containerRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = ((e.clientX - cx) / rect.width) * 12;
        const dy = ((e.clientY - cy) / rect.height) * 12;
        setDrift({
          x: Math.max(-6, Math.min(6, dx)),
          y: Math.max(-6, Math.min(6, dy)),
        });
      };
      window.addEventListener("mousemove", handleMove);
      return () => window.removeEventListener("mousemove", handleMove);
    }
  }, [hasHover, reduceMotion]);

  const bobAnimation =
    !reduceMotion && !hasHover
      ? { y: [-4, 4, -4] }
      : undefined;

  return (
    <div ref={containerRef} className="w-full">
      <motion.div
        animate={
          hasHover
            ? { x: drift.x, y: drift.y }
            : bobAnimation
        }
        transition={
          hasHover
            ? { type: "tween", duration: 0.6, ease: "easeOut" }
            : { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }
        onMouseEnter={() => onPauseChange(true)}
        onMouseLeave={() => onPauseChange(false)}
        onFocus={() => onPauseChange(true)}
        onBlur={() => onPauseChange(false)}
        className="relative mx-auto w-full max-w-[620px]"
      >
        <div className="relative aspect-[1142/1377] w-full">
          <AnimatePresence initial={false}>
            <motion.div
              key={activeIndex}
              className="absolute inset-0"
              initial={{ opacity: 0, y: reduceMotion ? 0 : 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduceMotion ? 0 : -6 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Faked "cards cascade in" effect: a top-to-bottom wipe reveal,
                  since the source images bake the phone + floating cards into
                  a single flat layer (no independent card elements to stagger). */}
              <motion.div
                className="absolute inset-0"
                initial={{ clipPath: reduceMotion ? "inset(0 0 0 0)" : "inset(0 0 100% 0)" }}
                animate={{ clipPath: "inset(0 0 0% 0)" }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                <Image
                  src={`/images/app/${pickImage(IMAGES[activeIndex], locale)}`}
                  alt={tabLabels[activeIndex]}
                  fill
                  priority={activeIndex === 0}
                  sizes="(min-width: 1024px) 620px, 100vw"
                  className="object-contain"
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      <div
        role="tablist"
        aria-label={tabLabels.join(", ")}
        className="mt-5 flex justify-center gap-2"
        onMouseEnter={() => onPauseChange(true)}
        onMouseLeave={() => onPauseChange(false)}
      >
        {tabLabels.map((label, i) => (
          <button
            key={label}
            type="button"
            role="tab"
            aria-selected={i === activeIndex}
            onClick={() => onSelect(i)}
            onFocus={() => onPauseChange(true)}
            onBlur={() => onPauseChange(false)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
              i === activeIndex
                ? "border-gold bg-gold/10 text-navy"
                : "border-transparent text-ink/40 hover:text-ink/70"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
