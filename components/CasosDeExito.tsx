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
      <h2 className="text-center text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
        {t("title")}
      </h2>

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {cases.map((c) => (
          <article
            key={c.name}
            className="flex flex-col rounded-2xl bg-navy p-6 text-white"
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-lg font-bold">{c.name}</h3>
              <span className="whitespace-nowrap rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold text-gold-light">
                {c.tag}
              </span>
            </div>
            {c.link && <p className="mt-1 text-xs text-white/40">{c.link}</p>}

            <div className="mt-4 space-y-3 text-sm text-white/80">
              <p><span className="font-semibold text-white">{labels.challenge}: </span>{c.challenge}</p>
              <p><span className="font-semibold text-white">{labels.solution}: </span>{c.solution}</p>
              <p><span className="font-semibold text-white">{labels.result}: </span>{c.result}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
