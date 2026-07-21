import { useTranslations } from "next-intl";

export default function ComoLoHacemos() {
  const t = useTranslations("comoLoHacemos");
  const steps = t.raw("steps") as { n: string; title: string; body: string }[];

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

        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step) => (
            <li key={step.n} className="border-s-2 border-gold/50 ps-4">
              <span className="font-serif text-3xl font-bold text-gold-light">
                {step.n}
              </span>
              <h3 className="mt-2 font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/70">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
