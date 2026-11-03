"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useReducedMotion } from "framer-motion";
import HeroVisual from "@/components/HeroVisual";
import PageHero from "@/components/layout/PageHero";
import { ContactLink, buttonPrimary } from "@/components/layout/Buttons";

const AUTO_ADVANCE_MS = 5000;

// The Kehál hero that used to open the home page, now on /comunidades.
export default function ComunidadesHero() {
  const t = useTranslations("comunidades.hero");
  const tabs = t.raw("tabs") as string[];
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (paused || reduceMotion) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % tabs.length), AUTO_ADVANCE_MS);
    return () => clearTimeout(id);
  }, [paused, reduceMotion, index, tabs.length]);

  return (
    <PageHero
      className="bg-[#f7f1ec]"
      eyebrow={t("eyebrow")}
      title={t("title")}
      subtitle={t("subtitle")}
      actions={
        <>
          <a href="#demo" className={buttonPrimary}>{t("ctaPrimary")}</a>
          <ContactLink interest="comunidad" variant="secondary">{t("ctaSecondary")}</ContactLink>
        </>
      }
      visual={
        <HeroVisual tabLabels={tabs} activeIndex={index} onSelect={setIndex} onPauseChange={setPaused} />
      }
    />
  );
}
