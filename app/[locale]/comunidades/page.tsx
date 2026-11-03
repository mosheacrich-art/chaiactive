import { setRequestLocale, getTranslations } from "next-intl/server";
import PageShell from "@/components/layout/PageShell";
import ComunidadesHero from "@/components/comunidades/ComunidadesHero";
import ServicesSection from "@/components/ServicesSection";
import Modulos from "@/components/comunidades/Modulos";
import Identidad from "@/components/comunidades/Identidad";
import CasoJabad from "@/components/comunidades/CasoJabad";
import CtaBand from "@/components/layout/CtaBand";
import { ContactLink } from "@/components/layout/Buttons";

export default async function ComunidadesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("comunidades.cta");

  return (
    <PageShell interest="comunidad">
      <ComunidadesHero />
      <CasoJabad />
      <ServicesSection />
      <Modulos />
      <Identidad />
      <CtaBand title={t("title")} body={t("body")}>
        <ContactLink interest="comunidad">{t("button")}</ContactLink>
      </CtaBand>
    </PageShell>
  );
}
