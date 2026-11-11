import type { Metadata } from "next";
import { Assistant, Frank_Ruhl_Libre, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import { routing, isRtl, SITE_URL, type Locale } from "@/i18n/routing";
import "../globals.css";

// Latin text and headings: Satoshi, loaded from the Fontshare API in <head>
// (its licence forbids putting the font files in a public repo). Labels:
// Geist Mono. Hebrew: Assistant (body) and Frank Ruhl Libre (headings).
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-data",
  display: "swap",
});

const assistant = Assistant({
  subsets: ["latin", "hebrew"],
  variable: "--font-body",
  display: "swap",
});

// Hebrew headings: Playfair has no Hebrew glyphs, so RTL uses Frank Ruhl Libre
// (applied in globals.css under html[dir="rtl"]).
const frankRuhl = Frank_Ruhl_Libre({
  subsets: ["hebrew", "latin"],
  weight: ["500", "700", "900"],
  variable: "--font-hebrew-serif",
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
  return {
    metadataBase: new URL(SITE_URL),
    ...(await pageMetadata(locale, "/", "metadata")),
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
  const t = await getTranslations({ locale, namespace: "metadata" });
  const dir = isRtl(locale) ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} data-scroll-behavior="smooth">
      <head>
        {/* Satoshi from Fontshare (ITF Free Font License). Served by their API
            on purpose: the repo is public and the licence forbids
            redistributing the font files. */}
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="" />
        <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap" />
      </head>
      <body className={`${geistMono.variable} ${assistant.variable} ${frankRuhl.variable} bg-haze text-ink antialiased`}>
        <script
          type="application/ld+json"
          // Organization + WebSite structured data for search engines.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${SITE_URL}/#organization`,
                  name: "Chai Active",
                  url: SITE_URL,
                  logo: `${SITE_URL}/images/brand/chai-active-icon.png`,
                  description: t("description"),
                  address: { "@type": "PostalAddress", addressLocality: "Barcelona", addressCountry: "ES" },
                  founder: [
                    { "@type": "Person", name: "Isaac Ayash Belilty" },
                    { "@type": "Person", name: "Moshe Acrish" },
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": `${SITE_URL}/#website`,
                  url: SITE_URL,
                  name: "Chai Active",
                  inLanguage: ["es", "en", "he", "fr"],
                  publisher: { "@id": `${SITE_URL}/#organization` },
                },
              ],
            }),
          }}
        />
        <NextIntlClientProvider locale={locale as Locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
