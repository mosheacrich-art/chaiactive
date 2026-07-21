import { useTranslations } from "next-intl";

export default function Confianza() {
  const t = useTranslations("confianza");
  const items = t.raw("items") as { name: string; role: string }[];

  return (
    <section className="border-y border-navy/10 bg-cream-dark/50 py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-center text-sm font-semibold uppercase tracking-wide text-navy/60">
          {t("title")}
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {items.map((item, i) => (
            <div
              key={item.name}
              className={`rounded-2xl border px-6 py-5 text-center ${
                i === 0
                  ? "border-gold/40 bg-navy text-cream"
                  : "border-navy/10 bg-white/70 text-navy"
              }`}
            >
              <p className="font-serif text-xl font-bold">{item.name}</p>
              <p
                className={`mt-1 text-sm ${
                  i === 0 ? "text-cream/70" : "text-navy/60"
                }`}
              >
                {item.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
