import { setRequestLocale, getTranslations } from "next-intl/server";
import PageShell from "@/components/layout/PageShell";
import { pageMetadata } from "@/lib/seo";
import PageHero from "@/components/layout/PageHero";
import CtaBand from "@/components/layout/CtaBand";
import { ContactLink } from "@/components/layout/Buttons";
import AppMockup from "@/components/colegios/AppMockup";
import ModulosScroll from "@/components/colegios/ModulosScroll";
import {
  Bachillerato,
  CapaJudia,
  Empezamos,
  Futuro,
  Perfiles,
  Pilares,
  Privacidad,
  Profesorado,
} from "@/components/colegios/Sections";

// Honesty rule for this page: the school app is a product we offer and have
// designed, not one in use. No usage figures, no real screenshots, no school
// named as a client. Mockups carry the "Diseño conceptual" label.
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return pageMetadata(locale, "/colegios", "colegios.meta");
}

export default async function ColegiosPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("colegios");

  return (
    <PageShell interest="colegio">
      <PageHero
        className="bg-[#f7f1ec]"
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        actions={
          <>
            <ContactLink interest="colegio">{t("hero.ctaPrimary")}</ContactLink>
            <ContactLink interest="colegio" variant="secondary">{t("hero.ctaSecondary")}</ContactLink>
          </>
        }
      />
      <Pilares />
      <Perfiles />
      <section id="app" className="scroll-mt-20 py-20 sm:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:gap-20">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">{t("app.title")}</h2>
            <p className="mt-4 max-w-xl text-lg text-ink/70">{t("app.intro")}</p>
            <ol className="mt-8 space-y-3">
              {(["inicio", "materias", "calendario", "mensajes", "ficha"] as const).map((key, i) => (
                <li key={key} className="flex items-baseline gap-4">
                  <span className="text-sm font-semibold text-gold-dark">{i + 1}</span>
                  <span>
                    <span className="font-bold text-navy">{t(`app.tabs.${key}`)}</span>
                    <span className="text-ink/70"> · {t(`app.tabsInfo.${key}`)}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <AppMockup />
        </div>
      </section>
      <ModulosScroll />
      <CapaJudia />
      <Bachillerato />
      <Profesorado />
      <Privacidad />
      <Futuro />
      <Empezamos />
      <CtaBand title={t("cta.title")} body={t("cta.body")}>
        <ContactLink interest="colegio">{t("cta.primary")}</ContactLink>
        <ContactLink interest="colegio" variant="secondary">{t("cta.secondary")}</ContactLink>
      </CtaBand>
    </PageShell>
  );
}
