import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { buttonPrimary, buttonSecondary } from "./layout/Buttons";
import HeroCollage from "./home/HeroCollage";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="overflow-hidden bg-[#f7f1ec] pb-28 pt-16 sm:pb-36 sm:pt-24">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <h1 className="text-5xl font-bold leading-[1.05] text-navy sm:text-7xl">{t("title")}</h1>
        <p className="mx-auto mt-6 max-w-[34rem] text-lg text-ink/70 sm:text-xl">{t("subtitle")}</p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <a href="#contacto" className={buttonPrimary}>
            {t("ctaPrimary")}
            <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
          </a>
          <a href="#casos" className={buttonSecondary}>
            {t("ctaSecondary")}
          </a>
        </div>
        <HeroCollage />
      </div>
    </section>
  );
}
