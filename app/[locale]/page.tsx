import { setRequestLocale } from "next-intl/server";
import PageShell from "@/components/layout/PageShell";
import Hero from "@/components/Hero";
import ProjectStrip from "@/components/home/ProjectStrip";
import AppStage from "@/components/home/AppStage";
import StatStrip from "@/components/home/StatStrip";
import TechStack from "@/components/home/TechStack";
import Seguridad from "@/components/home/Seguridad";
import SobreNosotros from "@/components/SobreNosotros";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <PageShell>
      <Hero />
      <ProjectStrip />
      <AppStage />
      <StatStrip />
      <TechStack />
      <Seguridad />
      <SobreNosotros />
    </PageShell>
  );
}
