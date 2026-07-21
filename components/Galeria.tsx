import { useTranslations } from "next-intl";
import BrowserFrame from "./BrowserFrame";

type Item = { image: string; caption: string };

export default function Galeria() {
  const t = useTranslations("galeria");
  const items = t.raw("items") as Item[];

  return (
    <section className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
          {t("title")}
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <figure key={item.image}>
              <BrowserFrame src={item.image} alt={item.caption} />
              <figcaption className="mt-2 text-center text-sm font-medium text-ink/50">
                {item.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
