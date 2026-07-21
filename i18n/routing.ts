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

export const routing = defineRouting({
  locales,
  defaultLocale,
  // "es" (the default) stays unprefixed at "/"; the others live at /en, /he, /fr
  localePrefix: "as-needed",
});
