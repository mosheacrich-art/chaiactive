import Header from "@/components/Header";
import Hero from "@/components/Hero";
import QueHacemos from "@/components/QueHacemos";
import Confianza from "@/components/Confianza";
import ComoLoHacemos from "@/components/ComoLoHacemos";
import Servicios from "@/components/Servicios";
import Galeria from "@/components/Galeria";
import CasosDeExito from "@/components/CasosDeExito";
import Seguridad from "@/components/Seguridad";
import Precios from "@/components/Precios";
import SobreNosotros from "@/components/SobreNosotros";
import Contacto from "@/components/Contacto";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <QueHacemos />
        <Confianza />
        <ComoLoHacemos />
        <Servicios />
        <Galeria />
        <CasosDeExito />
        <Seguridad />
        <Precios />
        <SobreNosotros />
        <Contacto />
      </main>
      <Footer />
    </>
  );
}
