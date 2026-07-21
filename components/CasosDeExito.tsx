import { useTranslations } from "next-intl";

type Case = {
  name: string;
  tag: string;
  link?: string;
  challenge: string;
  solution: string;
  result: string;
};

export default function CasosDeExito() {
  const t = useTranslations("casos");
  const labels = t.raw("labels") as {
    challenge: string;
    solution: string;
    result: string;
  };
  const cases: Case[] = [
    t.raw("jabad"),
    t.raw("creativeFavours"),
    t.raw("perashapp"),
  ];

  return (
    <section id="casos" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-gold">
          {t("eyebrow")}
        </p>
        <h2 className="mt-3 font-serif text-3xl font-bold text-navy sm:text-4xl">
          {t("title")}
        </h2>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {cases.map((c) => (
          <article
            key={c.name}
            className="flex flex-col rounded-2xl border border-navy/10 bg-white/60 p-6"
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-serif text-xl font-bold text-navy">{c.name}</h3>
              <span className="whitespace-nowrap rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-gold">
                {c.tag}
              </span>
            </div>
            {c.link && (
              <p className="mt-1 text-xs font-medium text-navy/50">{c.link}</p>
            )}

            <dl className="mt-4 space-y-4 text-sm">
              <div>
                <dt className="font-semibold text-navy/80">{labels.challenge}</dt>
                <dd className="mt-1 leading-relaxed text-navy/70">
                  {c.challenge}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-navy/80">{labels.solution}</dt>
                <dd className="mt-1 leading-relaxed text-navy/70">
                  {c.solution}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-navy/80">{labels.result}</dt>
                <dd className="mt-1 leading-relaxed text-navy/70">{c.result}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}
