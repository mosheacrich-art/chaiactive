import { useTranslations } from "next-intl";

export default function Confianza() {
  const t = useTranslations("confianza");
  const items = t.raw("items") as { name: string; role: string }[];

  return (
    <section className="py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-center text-xs font-semibold uppercase tracking-wider text-ink/40">
          {t("title")}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {items.map((item) => (
            <div key={item.name} className="text-center">
              <p className="font-bold text-navy">{item.name}</p>
              <p className="text-xs text-ink/40">{item.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
