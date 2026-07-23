import { useTranslations } from "next-intl";
import ServiceRow from "./services/ServiceRow";
import { SERVICES_CONFIG } from "./services/data";

type BannerText = {
  eyebrow: string;
  description: string;
};

export default function ServicesSection() {
  const t = useTranslations("servicios");
  const banners = t.raw("banners") as BannerText[];

  return (
    <section id="servicios" className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
          {t("sectionTitle")}
        </h2>

        <div className="mt-12 flex flex-col gap-6">
          {SERVICES_CONFIG.map((config, i) => {
            const text = banners[i];
            if (!text) return null;

            return (
              <ServiceRow
                key={config.slug}
                id={`servicio-${config.slug}`}
                image={config.image}
                title={text.eyebrow}
                description={text.description}
                priority={i === 0}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
