import { useTranslations } from "next-intl";
import BrowserFrame from "./BrowserFrame";

type Item = { image: string; caption: string };

export default function Galeria() {
  const t = useTranslations("galeria");
  const items = t.raw("items") as Item[];

  return (
    <section className="bg-cream-dark/40 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-gold">
            {t("eyebrow")}
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-navy sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-navy/70">{t("intro")}</p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <figure key={item.image}>
              <BrowserFrame src={item.image} alt={item.caption} />
              <figcaption className="mt-3 text-center text-sm font-medium text-navy/70">
                {item.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
