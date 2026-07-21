"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";

const links = [
  { href: "#que-hacemos", key: "queHacemos" },
  { href: "#servicios", key: "servicios" },
  { href: "#casos", key: "casos" },
  { href: "#nosotros", key: "nosotros" },
  { href: "#contacto", key: "contacto" },
] as const;

export default function Header() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-navy/10 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="font-serif text-xl font-bold tracking-tight text-navy">
          Chai Active
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className="text-sm font-medium text-navy/80 transition hover:text-navy"
            >
              {t(link.key)}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <a
            href="#contacto"
            className="rounded-full bg-navy px-5 py-2 text-sm font-semibold text-cream transition hover:bg-navy-light"
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
            className="rounded-full border border-navy/15 p-2 text-navy"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-navy/10 bg-cream lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 sm:px-6">
            {links.map((link) => (
              <a
                key={link.key}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2.5 text-sm font-medium text-navy/80 transition hover:bg-navy/5 hover:text-navy"
              >
                {t(link.key)}
              </a>
            ))}
            <a
              href="#contacto"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-navy px-5 py-2.5 text-center text-sm font-semibold text-cream"
            >
              {t("cta")}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
