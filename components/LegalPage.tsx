import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { AlertTriangle } from "lucide-react";

type Section = { heading: string; paragraphs: string[] };

export default function LegalPage({
  namespace,
}: {
  namespace: "avisoLegal" | "privacidad" | "cookies";
}) {
  const t = useTranslations("legal");
  const meta = useTranslations("meta");
  const needsReview = meta.raw("needsReview") as boolean;
  const sections = t.raw(`${namespace}.sections`) as Section[];

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Link
        href="/"
        className="text-sm font-medium text-navy/60 hover:text-navy"
      >
        ← Chai Active
      </Link>

      <h1 className="mt-4 text-3xl font-extrabold text-navy">
        {t(`${namespace}.title`)}
      </h1>
      <p className="mt-1 text-sm text-navy/50">{t(`${namespace}.updated`)}</p>

      <div className="mt-6 flex gap-3 rounded-xl border border-gold/40 bg-gold/10 p-4 text-sm text-navy/80">
        <AlertTriangle className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden="true" />
        <p>{t("reviewBanner")}</p>
      </div>

      {needsReview && (
        <div className="mt-3 flex gap-3 rounded-xl border border-navy/15 bg-navy/5 p-4 text-sm text-navy/70">
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-navy/50" aria-hidden="true" />
          <p>{meta("draftNotice")}</p>
        </div>
      )}

      <div className="mt-10 space-y-8">
        {sections.map((section, i) => (
          <section key={i}>
            {section.heading && (
              <h2 className="text-lg font-bold text-navy">
                {section.heading}
              </h2>
            )}
            <div className="mt-2 space-y-2">
              {section.paragraphs.map((p, j) => (
                <p key={j} className="text-sm leading-relaxed text-navy/75">
                  {p}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
