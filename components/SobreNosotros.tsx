import { Playfair_Display } from "next/font/google";
import { useTranslations } from "next-intl";
import ScrollReveal from "./about/ScrollReveal";
import HebrewPattern from "./about/HebrewPattern";
import FounderCard from "./about/FounderCard";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

type Founder = { name: string; role: string; quote: string };

// Order matches the `founders` array in messages/*.json: Isaac Ayash, Moshe Acrish.
const FOUNDER_PHOTOS = [
  "/images/founders/isaac-ayash.png",
  "/images/founders/moshe-acrish.png",
];

export default function SobreNosotros() {
  const t = useTranslations("sobreNosotros");
  const paragraphs = t.raw("paragraphs") as string[];
  const founders = t.raw("founders") as Founder[];

  return (
    <section id="nosotros" className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl px-4 py-12 text-center sm:px-8">
          <HebrewPattern />
          <ScrollReveal y={20} className="relative">
            <p className="text-sm font-semibold uppercase tracking-wider text-gold">
              {t("eyebrow")}
            </p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">
              {t("title")}
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-xl text-ink/70">
              {t("subhead")}
            </p>
          </ScrollReveal>
        </div>

        <div className="mx-auto mt-14 flex max-w-[480px] flex-col gap-8">
          <ScrollReveal delay={0}>
            <p className="text-start text-base leading-[1.6] text-ink/70">
              {paragraphs[0]}
            </p>
            <p className="mt-3 text-start text-xs font-semibold uppercase tracking-widest text-ink/35">
              {t("anchorCaption")}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.09}>
            <p className="text-start text-base leading-[1.6] text-ink/70">
              {paragraphs[1]}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.18}>
            <p className="text-start text-base leading-[1.6] text-ink/70">
              {paragraphs[2]}
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal duration={0.7} className="mt-16 sm:mt-20">
          <p
            className={`${playfair.className} mx-auto max-w-2xl text-center text-3xl leading-snug text-navy sm:text-4xl`}
          >
            {t("pullQuote")}
          </p>
        </ScrollReveal>

        <ScrollReveal className="mt-16 sm:mt-20">
          <h3 className="text-center text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
            {t("foundersHeader")}
          </h3>
        </ScrollReveal>

        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          {founders.map((founder, i) => (
            <ScrollReveal key={founder.name} delay={i * 0.09}>
              <FounderCard
                name={founder.name}
                role={founder.role}
                quote={founder.quote}
                photoSrc={FOUNDER_PHOTOS[i]}
              />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-12 sm:mt-16">
          <p className="mx-auto max-w-2xl text-center text-lg italic text-ink/50">
            {t("finalLine")}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
