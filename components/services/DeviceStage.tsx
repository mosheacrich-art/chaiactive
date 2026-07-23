"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Sparkles as SparklesIcon, type LucideIcon } from "lucide-react";
import FloatingCard, { type ServiceCardData } from "./FloatingCard";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

export default function DeviceStage({
  device,
  deviceImage,
  cards,
}: {
  device: "phone" | "laptop";
  deviceImage: string;
  cards: (ServiceCardData & { icon: LucideIcon })[];
}) {
  const reduceMotion = useReducedMotion();
  const leftCards = cards.filter((_, i) => i % 2 === 0);
  const rightCards = cards.filter((_, i) => i % 2 === 1);

  const deviceVariants: Variants = {
    hidden: { opacity: 0, x: reduceMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut", delay: reduceMotion ? 0 : 0.1 },
    },
  };

  const decorVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, delay: reduceMotion ? 0 : 0.3 } },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className="relative grid grid-cols-1 items-center gap-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-3"
    >
      <motion.div
        variants={decorVariants}
        className="pointer-events-none absolute inset-0 hidden lg:block"
        aria-hidden="true"
      >
        <svg className="absolute inset-0 h-full w-full">
          <line x1="24%" y1="28%" x2="42%" y2="45%" stroke="#c1932f" strokeWidth="1" strokeDasharray="4 5" opacity="0.4" />
          <line x1="76%" y1="28%" x2="58%" y2="45%" stroke="#c1932f" strokeWidth="1" strokeDasharray="4 5" opacity="0.4" />
          <line x1="24%" y1="72%" x2="42%" y2="58%" stroke="#c1932f" strokeWidth="1" strokeDasharray="4 5" opacity="0.4" />
          <line x1="76%" y1="72%" x2="58%" y2="58%" stroke="#c1932f" strokeWidth="1" strokeDasharray="4 5" opacity="0.4" />
        </svg>
        <SparklesIcon className="absolute left-[12%] top-[8%] size-4 text-gold/40" />
        <SparklesIcon className="absolute right-[10%] bottom-[12%] size-3 text-gold/30" />
      </motion.div>

      <div className="hidden flex-col items-center justify-center gap-8 lg:flex">
        {leftCards.map((card) => (
          <FloatingCard key={card.title} {...card} />
        ))}
      </div>

      <motion.div
        variants={deviceVariants}
        className={
          device === "laptop"
            ? "relative mx-auto aspect-[670/700] w-full max-w-[480px]"
            : "relative mx-auto aspect-[425/915] w-full max-w-[260px]"
        }
      >
        <Image
          src={`/images/services/${deviceImage}`}
          alt=""
          fill
          sizes="(min-width: 1024px) 480px, 70vw"
          className="object-contain drop-shadow-2xl"
        />
      </motion.div>

      <div className="hidden flex-col items-center justify-center gap-8 lg:flex">
        {rightCards.map((card) => (
          <FloatingCard key={card.title} {...card} />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 lg:hidden">
        {cards.map((card) => (
          <FloatingCard key={card.title} {...card} />
        ))}
      </div>
    </motion.div>
  );
}
