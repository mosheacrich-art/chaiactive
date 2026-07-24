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
}: {
  id: string;
  image: string;
  width: number;
  height: number;
  title: string;
  description: string;
  priority?: boolean;
}) {
  const reduceMotion = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <motion.div
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      className="grid h-full overflow-hidden rounded-3xl bg-white shadow-sm sm:grid-cols-2"
    >
      <div className="flex items-center justify-center bg-cream p-6 sm:p-8">
        <Image
          src={`/images/${image}`}
          alt={title}
          width={width}
          height={height}
          priority={priority}
          sizes="(min-width: 640px) 55vw, 100vw"
          className="h-auto w-full object-contain"
        />
      </div>

      <div className="flex flex-col justify-center p-10 sm:p-16">
        <h3 className="text-3xl font-bold text-navy sm:text-4xl">{title}</h3>
        <p className="mt-5 max-w-lg text-xl text-ink/60">{description}</p>
      </div>
    </motion.div>
  );
}
