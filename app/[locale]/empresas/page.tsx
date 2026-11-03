import { setRequestLocale, getTranslations } from "next-intl/server";
import PageShell from "@/components/layout/PageShell";
import { pageMetadata } from "@/lib/seo";
import PageHero from "@/components/layout/PageHero";
import CtaBand from "@/components/layout/CtaBand";
import { ContactLink, buttonSecondary } from "@/components/layout/Buttons";
import IdeaSection from "@/components/IdeaSection";
import ServiciosScroll from "@/components/empresas/ServiciosScroll";
import { CasosEmpresas, Proceso, Sectores } from "@/components/empresas/Sections";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return pageMetadata(locale, "/empresas", "empresas.meta");
}

export default async function EmpresasPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("empresas");

  return (
    <PageShell interest="empresa">
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        actions={
          <>
            <ContactLink interest="empresa">{t("hero.ctaPrimary")}</ContactLink>
            <a href="#proyectos" className={buttonSecondary}>{t("hero.ctaSecondary")}</a>
          </>
        }
      />
      <Sectores />
      <ServiciosScroll />
      <CasosEmpresas />
      <Proceso />
      <IdeaSection />
      <CtaBand title={t("cta.title")} body={t("cta.body")}>
        <ContactLink interest="empresa">{t("cta.button")}</ContactLink>
      </CtaBand>
    </PageShell>
  );
}
