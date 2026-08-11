import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Confianza from "@/components/Confianza";
import ServicesSection from "@/components/ServicesSection";
import CasosDeExito from "@/components/CasosDeExito";
import SobreNosotros from "@/components/SobreNosotros";
import IdeaSection from "@/components/IdeaSection";
import Contacto from "@/components/Contacto";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Confianza />
        <ServicesSection />
        <CasosDeExito />
        <SobreNosotros />
        <IdeaSection />
        <Contacto />
      </main>
      <Footer />
    </>
  );
}
