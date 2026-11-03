"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import BrowserShot from "./BrowserShot";

// Real captures only (no conceptual school mockup here, so no label needed):
// Chabad Barcelona's Kehál dashboard in front, Shevat's site behind, and the
// Kehál events screen on a phone overlapping the corner.
export default function HeroCollage() {
  const t = useTranslations("hero.collage");
  const reduce = useReducedMotion();
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <div className="relative mx-auto mt-14 max-w-5xl sm:mt-20">
      {/* Back: Shevat (hidden on small screens to keep the composition readable) */}
      <motion.div {...rise(0.25)} className="absolute -top-8 end-0 hidden w-[46%] md:block">
        <BrowserShot
          src="/images/casos/shevat/home.jpg"
          alt={t("shevat")}
          width={1383}
          height={868}
          sizes="(min-width: 1024px) 460px, 46vw"
          label="shevat.eu"
          className="opacity-90"
        />
      </motion.div>

      {/* Front: Kehál at Chabad Barcelona */}
      <motion.div {...rise(0.1)} className="relative z-10 w-full md:w-[78%]">
        <BrowserShot
          src="/images/casos/jabad/inicio.png"
          alt={t("jabad")}
          width={2000}
          height={1500}
          sizes="(min-width: 1024px) 780px, (min-width: 768px) 78vw, 100vw"
          priority
          label="bcnkehila.com"
        />
      </motion.div>

      {/* Phone overlapping the bottom corner */}
      <motion.div
        {...rise(0.4)}
        className="absolute -bottom-10 end-2 z-20 w-[34%] max-w-[210px] sm:end-6 md:end-[8%]"
      >
        <Image
          src="/images/services/eventos-phone-cutout.png"
          alt={t("phone")}
          width={425}
          height={915}
          sizes="210px"
          priority
          className="h-auto w-full drop-shadow-[0_24px_30px_rgba(18,32,63,0.28)]"
        />
      </motion.div>
    </div>
  );
}
