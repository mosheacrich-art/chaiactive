import type { ReactNode } from "react";

// Shared intro block for the three audience pages. Each page passes its own
// background and visual so the three heroes don't look identical.
export default function PageHero({
  eyebrow,
  title,
  subtitle,
  actions,
  visual,
  className = "bg-cream",
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  actions?: ReactNode;
  visual?: ReactNode;
  className?: string;
}) {
  return (
    <section className={`relative overflow-hidden pb-16 pt-14 sm:pb-24 sm:pt-20 ${className}`}>
      <div
        className={`relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 ${
          visual ? "lg:grid-cols-[1fr_1.1fr]" : ""
        }`}
      >
        <div className={visual ? "" : "mx-auto max-w-3xl text-center"}>
          <p className="text-sm font-semibold uppercase tracking-wider text-gold-dark">{eyebrow}</p>
          <h1 className="mt-4 text-4xl font-extrabold leading-[1.1] tracking-tight text-navy sm:text-5xl lg:text-[3.4rem]">
            {title}
          </h1>
          <p className={`mt-6 text-lg text-ink/70 ${visual ? "max-w-lg" : "mx-auto max-w-2xl"}`}>
            {subtitle}
          </p>
          {actions && (
            <div className={`mt-8 flex flex-col gap-3 sm:flex-row ${visual ? "" : "sm:justify-center"}`}>
              {actions}
            </div>
          )}
        </div>
        {visual}
      </div>
    </section>
  );
}
