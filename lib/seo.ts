import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getPathname } from "@/i18n/navigation";
import { locales, defaultLocale, SITE_URL, type AppPathname, type Locale } from "@/i18n/routing";

// Absolute URL of a route in a given locale, e.g. ("/colegios", "en") → https://…/en/schools
export function localizedUrl(href: AppPathname, locale: Locale) {
  const path = getPathname({ href, locale });
  return `${SITE_URL}${path === "/" ? "" : path}` || SITE_URL;
}

// hreflang map for a route, including x-default (the Spanish version).
export function languageAlternates(href: AppPathname) {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = localizedUrl(href, l);
  languages["x-default"] = localizedUrl(href, defaultLocale);
  return languages;
}

// Per-page metadata: title, description, canonical and hreflang.
// `namespace` points at a `{ title, description }` block in messages/*.json.
export async function pageMetadata(locale: string, href: AppPathname, namespace: string): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace });
  const title = t("title");
  const description = t("description");
  const url = localizedUrl(href, locale as Locale);
  return {
    title,
    description,
    alternates: { canonical: url, languages: languageAlternates(href) },
    openGraph: {
      title,
      description,
      url,
      siteName: "Chai Active",
      locale,
      type: "website",
    },
  };
}
