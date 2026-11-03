import { useTranslations } from "next-intl";
import { CASOS_CONFIG } from "./casos/data";
import CasoCard from "./casos/CasoCard";

export default function CasosDeExito() {
  const t = useTranslations("casos");

  return (
    <section id="casos" className="scroll-mt-20 bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">{t("title")}</h2>
          <p className="mt-4 text-lg text-ink/70">{t("intro")}</p>
        </div>

        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CASOS_CONFIG.map((config, i) => (
            <li key={config.slug} className={i === 0 ? "lg:col-span-2" : ""}>
              <CasoCard config={config} />
            </li>
          ))}
        </ul>

      </div>
    </section>
  );
}
