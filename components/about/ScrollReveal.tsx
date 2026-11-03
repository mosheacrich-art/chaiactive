"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

// The one scroll-in effect used across the site: a short fade-up, once.
// With prefers-reduced-motion the content is simply there, no animation.
const EASE = [0.22, 1, 0.36, 1] as const;

export default function ScrollReveal({
  children,
  delay = 0,
  y = 16,
  duration = 0.6,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration, delay: Math.min(delay, 0.24), ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
