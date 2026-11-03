"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";

// Page links go to their own route; "casos" and "nosotros" are sections of
// the home page; "contacto" is a section present at the bottom of every page.
const links = [
  { key: "comunidades", href: "/comunidades" },
  { key: "colegios", href: "/colegios" },
  { key: "empresas", href: "/empresas" },
  { key: "casos", href: { pathname: "/", hash: "casos" } },
  { key: "nosotros", href: { pathname: "/", hash: "nosotros" } },
] as const;

const linkFocus =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

export default function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function isActive(href: (typeof links)[number]["href"]) {
    return typeof href === "string" && pathname === href;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/85 backdrop-blur">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-navy focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        {t("skip")}
      </a>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" aria-label="Chai Active" className={`rounded ${linkFocus}`}>
          <Image
            src="/images/brand/chai-active-icon.png"
            alt="Chai Active"
            width={515}
            height={389}
            priority
            className="h-9 w-auto"
          />
        </Link>

        <nav aria-label={t("label")} className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`rounded text-[15px] font-medium transition hover:text-ink ${linkFocus} ${
                isActive(link.href) ? "text-navy" : "text-ink/65"
              }`}
            >
              {t(link.key)}
            </Link>
          ))}
          <a
            href="#contacto"
            className={`rounded text-[15px] font-medium text-ink/65 transition hover:text-ink ${linkFocus}`}
          >
            {t("contacto")}
          </a>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <a
            href="#contacto"
            className={`rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-light ${linkFocus}`}
          >
            {t("cta")}
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t("closeMenu") : t("openMenu")}
            aria-expanded={open}
            className={`rounded-full border border-black/10 p-2 text-navy ${linkFocus}`}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav aria-label={t("label")} className="border-t border-black/5 bg-white lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 sm:px-6">
            {links.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-2 py-2.5 text-base font-medium text-ink/75 transition hover:bg-black/5 ${linkFocus}`}
              >
                {t(link.key)}
              </Link>
            ))}
            <a
              href="#contacto"
              onClick={() => setOpen(false)}
              className={`rounded-lg px-2 py-2.5 text-base font-medium text-ink/75 transition hover:bg-black/5 ${linkFocus}`}
            >
              {t("contacto")}
            </a>
            <a
              href="#contacto"
              onClick={() => setOpen(false)}
              className={`mt-2 rounded-full bg-navy px-5 py-2.5 text-center text-sm font-semibold text-white ${linkFocus}`}
            >
              {t("cta")}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
