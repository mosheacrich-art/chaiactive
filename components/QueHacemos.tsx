import { useTranslations } from "next-intl";
import { Users, Languages, HeartHandshake, LayoutGrid } from "lucide-react";

const icons = [Users, Languages, HeartHandshake, LayoutGrid];

export default function QueHacemos() {
  const t = useTranslations("queHacemos");
  const items = t.raw("items") as { title: string; body: string }[];

  return (
    <section id="que-hacemos" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-gold">
          {t("eyebrow")}
        </p>
        <h2 className="mt-3 font-serif text-3xl font-bold text-navy sm:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-4 text-lg text-navy/70">{t("intro")}</p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => {
          const Icon = icons[i];
          return (
            <div
              key={item.title}
              className="rounded-2xl border border-navy/10 bg-white/60 p-6"
            >
              <Icon className="size-8 text-gold" aria-hidden="true" />
              <h3 className="mt-4 font-serif text-lg font-semibold text-navy">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-navy/70">
                {item.body}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
