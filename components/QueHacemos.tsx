import { useTranslations } from "next-intl";
import { Users, Languages, HeartHandshake, LayoutGrid } from "lucide-react";

const icons = [Users, Languages, HeartHandshake, LayoutGrid];
const tileStyles = [
  "bg-cream text-navy",
  "bg-navy text-white",
  "bg-gold/15 text-navy",
  "bg-navy-light text-white",
];

export default function QueHacemos() {
  const t = useTranslations("queHacemos");
  const items = t.raw("items") as { title: string; body: string }[];

  return (
    <section id="que-hacemos" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <h2 className="text-center text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
        {t("title")}
      </h2>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {items.map((item, i) => {
          const Icon = icons[i];
          return (
            <div
              key={item.title}
              className={`rounded-3xl p-8 ${tileStyles[i]}`}
            >
              <Icon className="size-7 opacity-70" aria-hidden="true" />
              <h3 className="mt-4 text-xl font-bold">{item.title}</h3>
              <p className="mt-2 text-sm opacity-80">{item.body}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
