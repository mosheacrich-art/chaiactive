import { useTranslations } from "next-intl";
import DeviceDemo from "@/components/demo/DeviceDemo";
import { KEHAL_DEMO_URL } from "@/lib/contact";

export default function DemoSection() {
  const t = useTranslations("comunidades.demo");
  return (
    <section id="demo" className="scroll-mt-20 bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-navy sm:text-5xl">{t("title")}</h2>
          <p className="mt-4 text-lg text-ink/70">{t("intro")}</p>
        </div>
        <div className="mt-12">
          <DeviceDemo src={KEHAL_DEMO_URL} title={t("frameTitle")} badge={t("badge")} />
        </div>
      </div>
    </section>
  );
}
