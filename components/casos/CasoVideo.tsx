"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

// A short screen recording of the live site: muted, looping, plays only
// while the card is on screen. With reduced motion it stays on the poster
// and shows the native controls so the visitor can play it.
export default function CasoVideo({ src, poster, label }: { src: string; poster: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const v = ref.current;
    if (!v || reduce) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.35 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [reduce]);

  return (
    <video
      ref={ref}
      className="absolute inset-0 size-full object-cover object-top"
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      controls={!!reduce}
      aria-label={label}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
