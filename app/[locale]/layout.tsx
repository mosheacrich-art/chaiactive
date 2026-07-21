import type { Metadata } from "next";
import { Playfair_Display, Frank_Ruhl_Libre, Assistant } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, isRtl, type Locale } from "@/i18n/routing";
import "../globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading-latin",
  display: "swap",
});

const frankRuhlLibre = Frank_Ruhl_Libre({
  subsets: ["hebrew", "latin"],
  variable: "--font-heading-hebrew",
  display: "swap",
});

const assistant = Assistant({
  subsets: ["latin", "hebrew"],
  variable: "--font-body",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title"),
    description: t("description"),
    metadataBase: new URL("https://chaiactive.vercel.app"),
    alternates: {
      languages: {
        es: "/",
        en: "/en",
        he: "/he",
        fr: "/fr",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const dir = isRtl(locale) ? "rtl" : "ltr";
  const headingFontVar =
    locale === "he" ? frankRuhlLibre.variable : playfair.variable;

  return (
    <html lang={locale} dir={dir} data-scroll-behavior="smooth">
      <body
        className={`${headingFontVar} ${assistant.variable} bg-cream text-ink antialiased`}
        style={
          {
            "--font-heading": locale === "he"
              ? "var(--font-heading-hebrew)"
              : "var(--font-heading-latin)",
          } as React.CSSProperties
        }
      >
        <NextIntlClientProvider locale={locale as Locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
