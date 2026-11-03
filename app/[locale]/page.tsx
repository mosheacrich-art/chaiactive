import { setRequestLocale } from "next-intl/server";
import PageShell from "@/components/layout/PageShell";
import Hero from "@/components/Hero";
import QueHacemos from "@/components/home/QueHacemos";
import AudienceCards from "@/components/home/AudienceCards";
import CasosDeExito from "@/components/CasosDeExito";
import SobreNosotros from "@/components/SobreNosotros";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <PageShell>
      <Hero />
      <AudienceCards />
      <QueHacemos />
      <CasosDeExito />
      <SobreNosotros />
    </PageShell>
  );
}
