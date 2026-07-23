import Image from "next/image";
import { useTranslations } from "next-intl";

const LOGOS = ["logos/jabad.png", "logos/creative-favours.png", "logos/perashapp.png"];

export default function Confianza() {
  const t = useTranslations("confianza");
  const items = t.raw("items") as { name: string; role: string }[];

  return (
    <section className="py-12">
      <div className="mx-auto max-w-xl px-4 sm:px-6">
        <p className="text-center text-sm font-semibold uppercase tracking-wider text-ink/40">
          {t("title")}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-16">
          {items.map((item, i) => (
            <div key={item.name} className="relative h-28 w-28">
              <Image
                src={`/images/${LOGOS[i]}`}
                alt={item.name}
                fill
                sizes="112px"
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
