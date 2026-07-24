"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const ADVANCE_MS = 2800;

export default function ScreenshotSlideshow({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, ADVANCE_MS);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <div className="relative h-full w-full bg-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: reduceMotion ? 0 : 0.4 } }}
          exit={{ opacity: 0, transition: { duration: reduceMotion ? 0 : 0.3 } }}
          className="absolute inset-0"
        >
          <Image
            src={`/images/${images[index]}`}
            alt={alt}
            fill
            className="object-contain"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-3 start-1/2 z-10 flex -translate-x-1/2 gap-1.5">
        {images.map((src, i) => (
          <span
            key={src}
            className={`h-1.5 w-1.5 rounded-full transition-colors ${
              i === index ? "bg-navy" : "bg-navy/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
