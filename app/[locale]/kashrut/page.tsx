import { setRequestLocale, getTranslations } from "next-intl/server";
import PageShell from "@/components/layout/PageShell";
import { pageMetadata } from "@/lib/seo";
import PageHero from "@/components/layout/PageHero";
import CtaBand from "@/components/layout/CtaBand";
import { ContactLink, buttonPrimary } from "@/components/layout/Buttons";
import { Caso, ComoTrabajamos, Funciones } from "@/components/kashrut/Sections";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return pageMetadata(locale, "/kashrut", "kashrut.meta");
}

export default async function KashrutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("kashrut");

  return (
    <PageShell interest="kashrut">
      <PageHero
        className="surface-haze"
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        actions={
          <>
            <a href="#app" className={buttonPrimary}>{t("hero.ctaPrimary")}</a>
            <ContactLink interest="kashrut" variant="secondary">{t("hero.ctaSecondary")}</ContactLink>
          </>
        }
      />
      <Caso />
      <Funciones />
      <ComoTrabajamos />
      <CtaBand title={t("cta.title")} body={t("cta.body")}>
        <ContactLink interest="kashrut">{t("cta.button")}</ContactLink>
      </CtaBand>
    </PageShell>
  );
}
