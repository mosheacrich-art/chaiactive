"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Check } from "lucide-react";

type Item = { title: string; points: string[] };

// Same idea as the services banners on /comunidades (one module per step,
// shown while you scroll), but with a different rhythm: a sticky index on
// the side that follows the reader instead of a full-width carousel.
export default function ModulosScroll() {
  const t = useTranslations("colegios.modulos");
  const items = t.raw("items") as Item[];
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="modulos" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">{t("title")}</h2>
          <p className="mt-4 text-lg text-ink/70">{t("intro")}</p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[280px_1fr] lg:gap-16">
          <nav aria-label={t("title")} className="hidden lg:block">
            <ol className="sticky top-28 space-y-1 border-s border-navy/10">
              {items.map((item, i) => (
                <li key={item.title}>
                  <a
                    href={`#modulo-${i}`}
                    aria-current={active === i ? "true" : undefined}
                    className={`-ms-px block border-s-2 py-2 ps-5 text-[15px] transition ${
                      active === i
                        ? "border-gold font-bold text-navy"
                        : "border-transparent text-ink/60 hover:text-navy"
                    }`}
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="space-y-6 lg:space-y-10">
            {items.map((item, i) => (
              <article
                key={item.title}
                id={`modulo-${i}`}
                data-index={i}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                className={`scroll-mt-28 rounded-3xl border p-7 transition-colors sm:p-10 lg:min-h-[45vh] ${
                  active === i ? "border-navy/20 bg-cream" : "border-navy/10 bg-white"
                }`}
              >
                <span className="text-sm font-semibold text-gold-dark">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 text-2xl font-extrabold text-navy sm:text-3xl">{item.title}</h3>
                <ul className="mt-6 space-y-3">
                  {item.points.map((point) => (
                    <li key={point} className="flex gap-3 text-lg text-ink/75">
                      <Check className="mt-1 size-5 shrink-0 text-gold-dark" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
