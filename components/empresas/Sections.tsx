import { useTranslations } from "next-intl";
import ScrollReveal from "@/components/about/ScrollReveal";
import CasoCard from "@/components/casos/CasoCard";
import { CASOS_CONFIG } from "@/components/casos/data";

type Step = { title: string; body: string };

export function Sectores() {
  const t = useTranslations("empresas.sectores");
  const items = t.raw("items") as string[];
  return (
    <section className="py-14">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-ink/70">{t("title")}</h2>
        <ul className="mt-5 flex flex-wrap justify-center gap-3">
          {items.map((item) => (
            <li key={item} className="rounded-full border border-navy/15 px-5 py-2.5 text-sm font-medium text-navy">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Proceso() {
  const t = useTranslations("empresas.proceso");
  const steps = t.raw("steps") as Step[];
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">{t("title")}</h2>
        <ol className="relative mt-12 grid gap-10 md:grid-cols-4 md:gap-6">
          <span aria-hidden="true" className="absolute inset-x-0 top-5 hidden h-px bg-navy/15 md:block" />
          {steps.map((step, i) => (
            <ScrollReveal key={step.title} delay={i * 0.08} className="relative">
              <li>
                <span className="relative flex size-10 items-center justify-center rounded-full bg-gold text-sm font-bold text-navy-dark">
                  {i + 1}
                </span>
                <h3 className="mt-5 text-lg font-bold text-navy">{step.title}</h3>
                <p className="mt-2 text-[15px] text-ink/70">{step.body}</p>
              </li>
            </ScrollReveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function CasosEmpresas() {
  const t = useTranslations("empresas.casos");
  const casos = CASOS_CONFIG.filter((c) => c.line === "empresas");
  return (
    <section id="proyectos" className="scroll-mt-20 bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">{t("title")}</h2>
        <p className="mt-4 max-w-2xl text-lg text-ink/70">{t("intro")}</p>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2">
          {casos.map((config) => (
            <li key={config.slug}>
              <CasoCard config={config} compact />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
