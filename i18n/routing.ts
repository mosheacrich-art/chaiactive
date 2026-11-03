import { defineRouting } from "next-intl/routing";

export const locales = ["es", "en", "he", "fr"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "es";

// Locales that read right-to-left. Hebrew is the only one today, but
// keeping this as a list (not a single check) means adding Yiddish or
// Arabic later doesn't require touching every RTL-aware component.
export const rtlLocales: Locale[] = ["he"];

export function isRtl(locale: string) {
  return rtlLocales.includes(locale as Locale);
}

export const SITE_URL = "https://chaiactive.com";

// Localised slugs. Keys are the internal route (the folder name under
// app/[locale]/); values are what each language shows in the URL.
// Hebrew keeps the Spanish slugs on purpose: Hebrew characters in URLs get
// percent-encoded when shared and become unreadable.
export const pathnames = {
  "/": "/",
  "/comunidades": {
    es: "/comunidades",
    en: "/communities",
    fr: "/communautes",
    he: "/comunidades",
  },
  "/colegios": {
    es: "/colegios",
    en: "/schools",
    fr: "/ecoles",
    he: "/colegios",
  },
  "/empresas": {
    es: "/empresas",
    en: "/business",
    fr: "/entreprises",
    he: "/empresas",
  },
  "/aviso-legal": "/aviso-legal",
  "/privacidad": "/privacidad",
  "/cookies": "/cookies",
} as const;

export type AppPathname = keyof typeof pathnames;

export const routing = defineRouting({
  locales,
  defaultLocale,
  // "es" (the default) stays unprefixed at "/"; the others live at /en, /he, /fr
  localePrefix: "as-needed",
  pathnames,
});
