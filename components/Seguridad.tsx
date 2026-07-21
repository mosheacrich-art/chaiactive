import { useTranslations } from "next-intl";
import { ShieldCheck, UserCheck, ScrollText, Lock } from "lucide-react";

const icons = [UserCheck, ShieldCheck, ScrollText, Lock];

export default function Seguridad() {
  const t = useTranslations("seguridad");
  const items = t.raw("items") as { title: string; body: string }[];

  return (
    <section className="bg-navy py-20 text-cream sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-gold-light">
            {t("eyebrow")}
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-cream/75">{t("intro")}</p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {items.map((item, i) => {
            const Icon = icons[i];
            return (
              <div
                key={item.title}
                className="rounded-2xl border border-cream/15 bg-cream/5 p-6"
              >
                <Icon className="size-7 text-gold-light" aria-hidden="true" />
                <h3 className="mt-4 font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/70">
                  {item.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
