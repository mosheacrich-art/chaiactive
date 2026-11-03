import { setRequestLocale, getTranslations } from "next-intl/server";
import PageShell from "@/components/layout/PageShell";
import PageHero from "@/components/layout/PageHero";
import { ContactLink } from "@/components/layout/Buttons";

export default async function ColegiosPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("colegios.hero");

  return (
    <PageShell interest="colegio">
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
        actions={
          <>
            <ContactLink interest="colegio">{t("ctaPrimary")}</ContactLink>
            <ContactLink interest="colegio" variant="secondary">{t("ctaSecondary")}</ContactLink>
          </>
        }
      />
    </PageShell>
  );
}
