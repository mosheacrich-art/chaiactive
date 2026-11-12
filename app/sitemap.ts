import type { MetadataRoute } from "next";
import { locales, type AppPathname } from "@/i18n/routing";
import { languageAlternates, localizedUrl } from "@/lib/seo";

const ROUTES: { href: AppPathname; priority: number }[] = [
  { href: "/", priority: 1 },
  { href: "/comunidades", priority: 0.9 },
  { href: "/colegios", priority: 0.9 },
  { href: "/kashrut", priority: 0.9 },
  { href: "/empresas", priority: 0.9 },
  { href: "/aviso-legal", priority: 0.2 },
  { href: "/privacidad", priority: 0.2 },
  { href: "/cookies", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.flatMap(({ href, priority }) =>
    locales.map((locale) => ({
      url: localizedUrl(href, locale),
      lastModified: new Date(),
      priority,
      alternates: { languages: languageAlternates(href) },
    }))
  );
}
