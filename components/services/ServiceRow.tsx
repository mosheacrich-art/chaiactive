"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";

export default function ServiceRow({
  id,
  image,
  title,
  description,
  priority,
}: {
  id: string;
  image: string;
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
      className="grid overflow-hidden rounded-3xl bg-white shadow-sm sm:grid-cols-2"
    >
      <div className="relative aspect-[4/3] sm:aspect-auto">
        <Image
          src={`/images/${image}`}
          alt={title}
          fill
          priority={priority}
          sizes="(min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col justify-center p-8 sm:p-12">
        <h3 className="text-2xl font-bold text-navy sm:text-3xl">{title}</h3>
        <p className="mt-4 max-w-md text-lg text-ink/60">{description}</p>
      </div>
    </motion.div>
  );
}
