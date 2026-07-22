"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MapPin } from "lucide-react";

export default function PathsConverge({
  location1,
  location2,
}: {
  location1: string;
  location2: string;
}) {
  const reduceMotion = useReducedMotion();
  const pathTransition = {
    duration: reduceMotion ? 0 : 1,
    ease: "easeOut" as const,
  };

  return (
    <div className="relative mx-auto my-4 h-28 w-full max-w-md sm:h-32">
      <svg
        viewBox="0 0 400 110"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <motion.path
          d="M35,22 C140,22 170,88 200,88"
          fill="none"
          stroke="#c1932f"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={pathTransition}
        />
        <motion.path
          d="M365,22 C260,22 230,88 200,88"
          fill="none"
          stroke="#c1932f"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ ...pathTransition, delay: reduceMotion ? 0 : 0.1 }}
        />
        <circle cx="200" cy="88" r="3" fill="#1b2e5e" />
      </svg>

      <div className="relative flex h-full items-start justify-between">
        <div className="flex flex-col items-center gap-1.5 rounded-xl bg-cream px-4 py-2.5 text-center">
          <MapPin className="size-4 text-navy" aria-hidden="true" />
          <span className="text-sm font-semibold text-navy">{location1}</span>
        </div>
        <div className="flex flex-col items-center gap-1.5 rounded-xl bg-cream px-4 py-2.5 text-center">
          <MapPin className="size-4 text-navy" aria-hidden="true" />
          <span className="text-sm font-semibold text-navy">{location2}</span>
        </div>
      </div>
    </div>
  );
}
