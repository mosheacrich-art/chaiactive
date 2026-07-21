import { useTranslations } from "next-intl";
import { Check } from "lucide-react";

type Path = { title: string; body: string; items: string[] };

export default function Precios() {
  const t = useTranslations("precios");
  const pathApp = t.raw("pathApp") as Path;
  const pathModulo = t.raw("pathModulo") as Path;

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-gold">
          {t("eyebrow")}
        </p>
        <h2 className="mt-3 font-serif text-3xl font-bold text-navy sm:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-4 text-lg text-navy/70">{t("intro")}</p>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {[pathApp, pathModulo].map((path) => (
          <div
            key={path.title}
            className="rounded-2xl border border-navy/10 bg-white/60 p-8"
          >
            <h3 className="font-serif text-xl font-bold text-navy">
              {path.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-navy/70">
              {path.body}
            </p>
            <ul className="mt-6 space-y-3">
              {path.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-navy/80">
                  <Check className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl bg-cream-dark/50 p-8 text-center">
        <p className="max-w-xl text-navy/70">{t("note")}</p>
        <a
          href="#contacto"
          className="rounded-full bg-navy px-6 py-3 text-sm font-semibold text-cream transition hover:bg-navy-light"
        >
          {t("cta")}
        </a>
      </div>
    </section>
  );
}
