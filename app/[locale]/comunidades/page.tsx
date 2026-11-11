import { setRequestLocale, getTranslations } from "next-intl/server";
import PageShell from "@/components/layout/PageShell";
import { pageMetadata } from "@/lib/seo";
import ComunidadesHero from "@/components/comunidades/ComunidadesHero";
import Modulos from "@/components/comunidades/Modulos";
import CasoJabad from "@/components/comunidades/CasoJabad";
import DemoSection from "@/components/comunidades/DemoSection";
import CtaBand from "@/components/layout/CtaBand";
import { ContactLink } from "@/components/layout/Buttons";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return pageMetadata(locale, "/comunidades", "comunidades.meta");
}

export default async function ComunidadesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("comunidades.cta");

  return (
    <PageShell interest="comunidad">
      <ComunidadesHero />
      <DemoSection />
      <CasoJabad />
      <Modulos />
      <CtaBand title={t("title")} body={t("body")}>
        <ContactLink interest="comunidad">{t("button")}</ContactLink>
      </CtaBand>
    </PageShell>
  );
}
