"use client";

import { useState, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Globe } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales } from "@/i18n/routing";

export default function LanguageSwitcher() {
  const t = useTranslations("languageSwitcher");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  function switchTo(next: string) {
    setOpen(false);
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t("label")}
        aria-expanded={open}
        disabled={isPending}
        className="flex items-center gap-1.5 rounded-full border border-navy/15 px-3 py-1.5 text-sm font-medium text-navy transition hover:border-navy/30 hover:bg-navy/5"
      >
        <Globe className="size-4" aria-hidden="true" />
        {t(locale as "es" | "en" | "he" | "fr")}
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="close"
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setOpen(false)}
          />
          <ul className="absolute end-0 top-full z-50 mt-2 w-40 overflow-hidden rounded-xl border border-navy/10 bg-cream shadow-lg">
            {locales.map((code) => (
              <li key={code}>
                <button
                  type="button"
                  onClick={() => switchTo(code)}
                  className={`block w-full px-4 py-2 text-start text-sm transition hover:bg-navy/5 ${
                    code === locale ? "font-semibold text-gold" : "text-navy"
                  }`}
                >
                  {t(code)}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
