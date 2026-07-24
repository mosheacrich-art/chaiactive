import { useLocale, useTranslations } from "next-intl";
import ServiceRow from "./services/ServiceRow";
import ServicesCarousel, { type CarouselSlide } from "./services/ServicesCarousel";
import { SERVICES_CONFIG, type ServiceRowConfig } from "./services/data";

type BannerText = {
  number: string;
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

  const [first, ...rest] = SERVICES_CONFIG;
  const firstText = banners[0];

  const slides: CarouselSlide[] = rest
    .map((config, i) => {
      const text = banners[i + 1];
      if (!text) return null;
      const image = pickImage(config, locale);
      return {
        slug: config.slug,
        image: image.src,
        width: image.width,
        height: image.height,
        title: text.eyebrow,
        description: text.description,
        number: text.number,
      };
    })
    .filter((slide): slide is CarouselSlide => slide !== null);

  return (
    <section id="servicios" className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl">
          <span className="text-navy">{t("sectionTitleStart")} </span>
          <span className="text-gold">{t("sectionTitleEnd")}</span>
        </h2>

        {/* Module 1 is the section's own introduction, so it stays static
            rather than living inside the swipeable carousel below. */}
        {first && firstText && (
          <div className="mt-12">
            <ServiceRow
              id={`servicio-${first.slug}`}
              image={pickImage(first, locale).src}
              width={pickImage(first, locale).width}
              height={pickImage(first, locale).height}
              title={firstText.eyebrow}
              description={firstText.description}
              priority
            />
          </div>
        )}
      </div>

      {/* Full-bleed, breaks out of the max-w-5xl container above so the
          slideshow spans the full viewport width. */}
      <div className="mt-16">
        <ServicesCarousel slides={slides} />
      </div>
    </section>
  );
}
