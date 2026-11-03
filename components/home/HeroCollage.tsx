"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import BrowserShot from "./BrowserShot";
import DeviceDemo from "@/components/demo/DeviceDemo";
import { KEHAL_DEMO_URL } from "@/lib/contact";

// Hero composition: Kehál at Chabad Barcelona in a browser window (real
// capture) and, in front, an iPhone running the live Kehál demo (real app,
// fictitious data). The phone is fully interactive.
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
      <div className="flex flex-col items-center gap-6 md:block">
        {/* Back: real capture of Kehál in production (hidden on small screens) */}
        <motion.div {...rise(0.1)} className="hidden md:block md:w-[80%]">
          <BrowserShot
            src="/images/casos/jabad/inicio.png"
            alt={t("jabad")}
            width={2000}
            height={1500}
            sizes="(min-width: 1024px) 820px, 80vw"
            priority
            label="bcnkehila.com"
          />
        </motion.div>

        {/* Front: the live demo on an iPhone */}
        <motion.div
          {...rise(0.3)}
          className="w-[280px] md:absolute md:end-0 md:top-1/2 md:w-[300px] md:-translate-y-[42%]"
        >
          <DeviceDemo src={KEHAL_DEMO_URL} title={t("phone")} devices={["phone"]} bare eager maxPhoneHeight={600} />
          <p className="mt-4 text-center text-xs font-semibold uppercase tracking-wider text-gold-dark">
            {t("live")}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
