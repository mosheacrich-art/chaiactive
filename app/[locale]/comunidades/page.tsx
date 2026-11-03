import { setRequestLocale } from "next-intl/server";
import PageShell from "@/components/layout/PageShell";
import ComunidadesHero from "@/components/comunidades/ComunidadesHero";
import ServicesSection from "@/components/ServicesSection";

export default async function ComunidadesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <PageShell interest="comunidad">
      <ComunidadesHero />
      <ServicesSection />
    </PageShell>
  );
}
