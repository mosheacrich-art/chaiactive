import Image from "next/image";
import { useTranslations } from "next-intl";

const LOGOS = ["logos/jabad.png", "logos/creative-favours.png", "logos/perashapp.png"];

export default function Confianza() {
  const t = useTranslations("confianza");
  const items = t.raw("items") as { name: string; role: string }[];

  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-center text-xs font-semibold uppercase tracking-wider text-ink/40">
          {t("title")}
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {items.map((item, i) => (
            <div
              key={item.name}
              className="flex flex-col items-center gap-4 rounded-2xl bg-white p-8 text-center shadow-sm"
            >
              <div className="relative h-16 w-16">
                <Image
                  src={`/images/${LOGOS[i]}`}
                  alt={item.name}
                  fill
                  sizes="64px"
                  className="rounded-xl object-contain"
                />
              </div>
              <div>
                <p className="font-bold text-navy">{item.name}</p>
                <p className="text-xs text-ink/40">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
