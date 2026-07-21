import { useTranslations } from "next-intl";
import { Check } from "lucide-react";

type Path = { title: string; body: string; items: string[] };

export default function Precios() {
  const t = useTranslations("precios");
  const pathApp = t.raw("pathApp") as Path;
  const pathModulo = t.raw("pathModulo") as Path;

  return (
    <section className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
          {t("title")}
        </h2>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {[pathApp, pathModulo].map((path) => (
            <div key={path.title} className="rounded-3xl bg-white p-8">
              <h3 className="text-xl font-bold text-navy">{path.title}</h3>
              <p className="mt-2 text-sm text-ink/60">{path.body}</p>
              <ul className="mt-6 space-y-3">
                {path.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-ink/80">
                    <Check className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 text-center">
          <p className="text-ink/60">{t("note")}</p>
          <a
            href="#contacto"
            className="rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white transition hover:bg-navy-light"
          >
            {t("cta")}
          </a>
        </div>
      </div>
    </section>
  );
}
