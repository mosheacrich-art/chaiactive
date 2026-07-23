import Image from "next/image";
import { useTranslations } from "next-intl";

const LOGOS = ["logos/jabad.png", "logos/creative-favours.png", "logos/perashapp.png"];

export default function Confianza() {
  const t = useTranslations("confianza");
  const items = t.raw("items") as { name: string; role: string }[];

  return (
    <section className="py-16">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <p className="text-center text-xs font-semibold uppercase tracking-wider text-ink/40">
          {t("title")}
        </p>
        <div className="mt-8 flex flex-wrap items-start justify-center gap-x-10 gap-y-8">
          {items.map((item, i) => (
            <div key={item.name} className="flex w-28 flex-col items-center gap-3 text-center">
              <div className="relative h-20 w-20">
                <Image
                  src={`/images/${LOGOS[i]}`}
                  alt={item.name}
                  fill
                  sizes="80px"
                  className="object-contain"
                />
              </div>
              <div>
                <p className="text-sm font-bold text-navy">{item.name}</p>
                <p className="text-xs text-ink/40">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
