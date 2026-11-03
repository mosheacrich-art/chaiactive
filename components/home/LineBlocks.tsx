import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import ScrollReveal from "@/components/about/ScrollReveal";
import AppMockup from "@/components/colegios/AppMockup";
import BrowserShot from "./BrowserShot";

type Block = { label: string; title: string; body: string; cta: string };

// One idea per block: label, one-line headline, arrow link, big capture.
// Image side and background alternate (cream / white / navy) to give the
// scroll a rhythm. `flip` swaps sides; logical properties keep RTL correct.
function LineBlock({
  block,
  href,
  visual,
  flip,
  tone,
}: {
  block: Block;
  href: "/comunidades" | "/colegios" | "/empresas";
  visual: ReactNode;
  flip?: boolean;
  tone: "cream" | "white" | "navy";
}) {
  const dark = tone === "navy";
  const bg = { cream: "bg-cream", white: "bg-white", navy: "bg-navy" }[tone];
  return (
    <section className={`${bg} py-20 sm:py-28`}>
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <ScrollReveal className={flip ? "lg:order-2" : ""}>
          <p className={`text-sm font-semibold uppercase tracking-wider ${dark ? "text-gold-light" : "text-gold-dark"}`}>
            {block.label}
          </p>
          <h2 className={`mt-3 text-4xl font-bold leading-tight sm:text-5xl ${dark ? "text-white" : "text-navy"}`}>
            {block.title}
          </h2>
          <p className={`mt-5 max-w-[30rem] text-lg ${dark ? "text-white/80" : "text-ink/70"}`}>{block.body}</p>
          <Link
            href={href}
            className={`group mt-8 inline-flex items-center gap-2 rounded font-semibold underline-offset-4 hover:underline ${
              dark ? "text-white" : "text-navy"
            }`}
          >
            {block.cta}
            <ArrowRight
              className="size-4 transition group-hover:translate-x-1 motion-reduce:transition-none rtl:rotate-180 rtl:group-hover:-translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </ScrollReveal>
        <ScrollReveal delay={0.1} y={24} className={flip ? "lg:order-1" : ""}>
          {visual}
        </ScrollReveal>
      </div>
    </section>
  );
}

export default function LineBlocks() {
  const t = useTranslations("blocks");
  return (
    <>
      <LineBlock
        tone="cream"
        href="/comunidades"
        block={t.raw("comunidades") as Block}
        visual={
          <BrowserShot
            src="/images/casos/jabad/eventos.png"
            alt={t("comunidades.alt")}
            width={2000}
            height={1500}
            sizes="(min-width: 1024px) 640px, 100vw"
            label="bcnkehila.com"
          />
        }
      />
      <LineBlock
        tone="white"
        flip
        href="/colegios"
        block={t.raw("colegios") as Block}
        visual={
          <div className="flex justify-center">
            <AppMockup />
          </div>
        }
      />
      <LineBlock
        tone="navy"
        href="/empresas"
        block={t.raw("empresas") as Block}
        visual={
          <BrowserShot
            src="/images/casos/creative-favours/landing.png"
            alt={t("empresas.alt")}
            width={1999}
            height={1255}
            sizes="(min-width: 1024px) 640px, 100vw"
            label="creativefavours.vercel.app"
          />
        }
      />
    </>
  );
}
