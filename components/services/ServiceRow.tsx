"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";

export default function ServiceRow({
  id,
  image,
  width,
  height,
  title,
  description,
  priority,
  layout = "horizontal",
}: {
  id: string;
  image: string;
  width: number;
  height: number;
  title: string;
  description: string;
  priority?: boolean;
  layout?: "horizontal" | "stacked";
}) {
  const reduceMotion = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const isStacked = layout === "stacked";

  return (
    <motion.div
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      className={`grid h-full overflow-hidden rounded-3xl bg-white shadow-sm ${
        isStacked ? "grid-cols-1" : "sm:grid-cols-2"
      }`}
    >
      <div className="flex items-center justify-center bg-cream p-4">
        <Image
          src={`/images/${image}`}
          alt={title}
          width={width}
          height={height}
          priority={priority}
          sizes={isStacked ? "(min-width: 640px) 50vw, 100vw" : "(min-width: 640px) 50vw, 100vw"}
          className="h-auto w-full object-contain"
        />
      </div>

      <div className={`flex flex-col justify-center ${isStacked ? "p-6" : "p-8 sm:p-12"}`}>
        <h3 className={`font-bold text-navy ${isStacked ? "text-xl" : "text-2xl sm:text-3xl"}`}>
          {title}
        </h3>
        <p className={`text-ink/60 ${isStacked ? "mt-2 text-sm" : "mt-4 max-w-md text-lg"}`}>
          {description}
        </p>
      </div>
    </motion.div>
  );
}
