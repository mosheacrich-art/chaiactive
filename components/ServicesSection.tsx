import { useLocale, useTranslations } from "next-intl";
import ServiceRow from "./services/ServiceRow";
import { SERVICES_CONFIG, type ServiceRowConfig } from "./services/data";

type BannerText = {
  eyebrow: string;
  description: string;
};

function pickImage(config: ServiceRowConfig, locale: string) {
  const images = config.images;
  if (locale === "en" && images.en) return images.en;
  if (locale === "fr" && images.fr) return images.fr;
  if (locale === "he" && images.he) return images.he;
  return images.es;
}

export default function ServicesSection() {
  const t = useTranslations("servicios");
  const locale = useLocale();
  const banners = t.raw("banners") as BannerText[];

  return (
    <section id="servicios" className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
          {t("sectionTitle")}
        </h2>

        <div className="mt-12 flex flex-col gap-6">
          {SERVICES_CONFIG.map((config, i) => {
            const text = banners[i];
            if (!text) return null;
            const image = pickImage(config, locale);

            return (
              <ServiceRow
                key={config.slug}
                id={`servicio-${config.slug}`}
                image={image.src}
                width={image.width}
                height={image.height}
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
