import { setRequestLocale, getTranslations } from "next-intl/server";
import PageShell from "@/components/layout/PageShell";
import PageHero from "@/components/layout/PageHero";
import { ContactLink } from "@/components/layout/Buttons";
import IdeaSection from "@/components/IdeaSection";

export default async function EmpresasPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("empresas.hero");

  return (
    <PageShell interest="empresa">
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
        actions={<ContactLink interest="empresa">{t("ctaPrimary")}</ContactLink>}
      />
      <IdeaSection />
    </PageShell>
  );
}
