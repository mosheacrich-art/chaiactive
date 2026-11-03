import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClosingQuote from "./ClosingQuote";
import Contacto from "@/components/Contacto";
import type { Interest } from "@/lib/contact";

// Every public page shares the same frame: header, page content, the
// contact section (so "#contacto" works everywhere) and the footer.
export default function PageShell({
  children,
  interest,
}: {
  children: ReactNode;
  interest?: Interest;
}) {
  return (
    <>
      <Header />
      <main id="contenido">
        {children}
        <Contacto defaultInterest={interest} />
        <ClosingQuote />
      </main>
      <Footer />
    </>
  );
}
