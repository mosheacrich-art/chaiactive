import { useTranslations } from "next-intl";

export default function ComoLoHacemos() {
  const t = useTranslations("comoLoHacemos");
  const steps = t.raw("steps") as { n: string; title: string; body: string }[];

  return (
    <section className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
          {t("title")}
        </h2>

        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step) => (
            <li key={step.n}>
              <span className="text-3xl font-extrabold text-gold">{step.n}</span>
              <h3 className="mt-2 font-bold text-navy">{step.title}</h3>
              <p className="mt-1 text-sm text-ink/60">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
