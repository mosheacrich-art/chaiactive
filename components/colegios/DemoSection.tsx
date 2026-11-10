import { useTranslations } from "next-intl";
import DeviceDemo from "@/components/demo/DeviceDemo";
import { SCHOOL_DEMO_URL } from "@/lib/contact";

// Same live demo block as /comunidades#demo, with the school app.
// Fictitious school ("Colegio Demo") and fictitious data only.
export default function DemoSection() {
  const t = useTranslations("colegios.demo");
  return (
    <section id="demo" className="scroll-mt-20 bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-navy sm:text-5xl">{t("title")}</h2>
          <p className="mt-4 text-lg text-ink/70">{t("intro")}</p>
        </div>
        <div className="mt-12">
          <DeviceDemo src={SCHOOL_DEMO_URL} title={t("frameTitle")} badge={t("badge")} />
        </div>
      </div>
    </section>
  );
}
