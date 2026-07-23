"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import ServiceBanner from "./services/ServiceBanner";
import ServicesProgressNav from "./services/ServicesProgressNav";
import { SERVICES_CONFIG } from "./services/data";

type BannerText = {
  number: string;
  eyebrow: string;
  headline: string[];
  description: string;
  chips: string[];
  cta: string;
  asideNote?: string;
  cards: { title: string; value?: string; note?: string }[];
};

export default function ServicesSection() {
  const t = useTranslations("servicios");
  const banners = t.raw("banners") as BannerText[];

  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [navVisible, setNavVisible] = useState(false);

  useEffect(() => {
    const wrapperObserver = new IntersectionObserver(
      ([entry]) => setNavVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    if (wrapperRef.current) wrapperObserver.observe(wrapperRef.current);

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.findIndex((el) => el === entry.target);
            if (index !== -1) setActiveIndex(index);
          }
        });
      },
      { threshold: 0.5 }
    );
    sectionRefs.current.forEach((el) => {
      if (el) sectionObserver.observe(el);
    });

    return () => {
      wrapperObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, [banners.length]);

  return (
    <div ref={wrapperRef} id="servicios">
      <ServicesProgressNav
        activeIndex={activeIndex}
        visible={navVisible}
        items={SERVICES_CONFIG.map((config, i) => ({
          id: `servicio-${config.slug}`,
          number: banners[i]?.number ?? String(i + 1),
          label: banners[i]?.eyebrow ?? config.slug,
        }))}
      />

      {SERVICES_CONFIG.map((config, i) => {
        const text = banners[i];
        if (!text) return null;

        return (
          <ServiceBanner
            key={config.slug}
            ref={(el) => {
              sectionRefs.current[i] = el;
            }}
            id={`servicio-${config.slug}`}
            number={text.number}
            eyebrow={text.eyebrow}
            headlineLines={text.headline}
            description={text.description}
            chips={config.chipIcons.map((icon, ci) => ({ icon, label: text.chips[ci] }))}
            cta={text.cta}
            asideNote={text.asideNote}
            device={config.device}
            deviceImage={config.deviceImage}
            cards={config.cardIcons.map((icon, ci) => ({ icon, ...text.cards[ci] }))}
            cardsLayout={config.cardsLayout}
            tone={i % 2 === 0 ? "cream" : "white"}
          />
        );
      })}
    </div>
  );
}
