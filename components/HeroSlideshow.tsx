"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const slides = [
  { src: "mockup-eventos.png", alt: "Eventos e inicio — Kehál Platform" },
  { src: "mockup-mikve.png", alt: "Reserva de Mikve — Kehál Platform" },
  { src: "mockup-donativos.png", alt: "Donativos — Kehál Platform" },
];

export default function HeroSlideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-[620px]">
      <div className="relative aspect-[1142/1377] w-full">
        {slides.map((slide, i) => (
          <Image
            key={slide.src}
            src={`/images/app/${slide.src}`}
            alt={slide.alt}
            fill
            priority={i === 0}
            sizes="(min-width: 1024px) 620px, 100vw"
            className={`object-contain transition-opacity duration-700 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={slide.alt}
            className={`h-2 rounded-full transition-all ${
              i === index ? "w-6 bg-navy" : "w-2 bg-navy/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
